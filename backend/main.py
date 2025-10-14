from fastapi import FastAPI, HTTPException, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from pydantic import BaseModel
from data_processor import DataProcessor
from twitter_client import TwitterClient
import asyncio
import json
from typing import Dict, List
from fastapi.responses import StreamingResponse
import io
import csv
import uuid

# FastAPI app initialization
app = FastAPI(
    title="Social Media Dashboard API",
    description="Real-time social media analytics dashboard backend",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React app
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize components
data_processor = DataProcessor()
twitter_client = TwitterClient()

# Store dashboard state and active connections
class DashboardState:
    def __init__(self):
        self.is_streaming = False
        self.current_keyword = ""
        self.data = {
            'total_tweets': 0,
            'sentiment_distribution': {'positive': 0, 'negative': 0, 'neutral': 0},
            'hashtag_counts': {},
            'tweet_volume': [],
            'recent_tweets': []
        }

dashboard_state = DashboardState()

# WebSocket connection manager
class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[str, WebSocket] = {}

    async def connect(self, websocket: WebSocket, client_id: str):
        await websocket.accept()
        self.active_connections[client_id] = websocket

    def disconnect(self, client_id: str):
        if client_id in self.active_connections:
            del self.active_connections[client_id]

    async def send_personal_message(self, message: str, client_id: str):
        if client_id in self.active_connections:
            await self.active_connections[client_id].send_text(message)

    async def broadcast(self, message: str):
        disconnected_clients = []
        for client_id, connection in self.active_connections.items():
            try:
                await connection.send_text(message)
            except Exception:
                disconnected_clients.append(client_id)
        
        # Clean up disconnected clients
        for client_id in disconnected_clients:
            self.disconnect(client_id)

manager = ConnectionManager()

# Pydantic models for request/response validation
class StreamingRequest(BaseModel):
    keywords: List[str]  # Change from single keyword to list
    use_real_api: bool = False

class StreamingResponse(BaseModel):
    status: str
    keyword: str
    message: str

class MultiKeywordDashboardData(BaseModel):
    total_tweets: int
    sentiment_distribution: Dict[str, int]
    hashtag_counts: Dict[str, int]
    tweet_volume: List[Dict]
    recent_tweets: List[Dict]
    keyword_breakdown: Dict[str, Dict]  # Add keyword-level metrics

class DashboardDataResponse(BaseModel):
    total_tweets: int
    sentiment_distribution: Dict[str, int]
    hashtag_counts: Dict[str, int]
    tweet_volume: List[Dict]
    recent_tweets: List[Dict]

# REST API Routes
@app.get("/", response_class=HTMLResponse)
async def root():
    return """
    <html>
        <head>
            <title>Social Media Dashboard API</title>
        </head>
        <body>
            <h1>Social Media Dashboard API</h1>
            <p>Backend is running! Check the <a href="/docs">API documentation</a></p>
        </body>
    </html>
    """

@app.get("/api/health")
async def health_check():
    return {"status": "OK", "message": "Backend is running"}

""" @app.post("/api/start-streaming", response_model=StreamingResponse)
async def start_streaming(request: StreamingRequest):
    if dashboard_state.is_streaming:
        raise HTTPException(status_code=400, detail="Already streaming")
    
    dashboard_state.is_streaming = True
    dashboard_state.current_keyword = request.keyword
    dashboard_state.data = {
        'total_tweets': 0,
        'sentiment_distribution': {'positive': 0, 'negative': 0, 'neutral': 0},
        'hashtag_counts': {},
        'tweet_volume': [],
        'recent_tweets': []
    }
    
    # Reset data processor
    data_processor.reset()
    
    # Start mock streaming in background
    twitter_client.start_streaming(request.keyword, data_processor, manager)
    
    return StreamingResponse(
        status="started",
        keyword=request.keyword,
        message=f"Started streaming tweets for: {request.keyword}"
    ) """
@app.post("/api/start-streaming", response_model=StreamingResponse)
async def start_streaming(request: StreamingRequest):
    if dashboard_state.is_streaming:
        raise HTTPException(status_code=400, detail="Already streaming")
    
    dashboard_state.is_streaming = True
    dashboard_state.current_keyword = ", ".join(request.keywords)  # Join for display
    
    # Reset data processor
    data_processor.reset()
    
    # Start streaming - pass first keyword for now (we'll enhance this later)
    primary_keyword = request.keywords[0] if request.keywords else "technology"
    twitter_client.start_streaming(primary_keyword, data_processor, manager)
    
    return StreamingResponse(
        status="started",
        keyword=", ".join(request.keywords),
        message=f"Started streaming tweets for: {', '.join(request.keywords)}"
    )


@app.post("/api/stop-streaming")
async def stop_streaming():
    dashboard_state.is_streaming = False
    twitter_client.stop_streaming()
    return {"status": "stopped", "message": "Streaming stopped"}

@app.get("/api/dashboard-data", response_model=DashboardDataResponse)
async def get_dashboard_data():
    return DashboardDataResponse(**dashboard_state.data)

@app.get("/api/streaming-status")
async def get_streaming_status():
    return {
        "is_streaming": dashboard_state.is_streaming,
        "current_keyword": dashboard_state.current_keyword,
        "total_tweets": dashboard_state.data['total_tweets']
    }

@app.get("/api/export/csv")
async def export_csv():
    """Export dashboard data as CSV"""
    data = dashboard_state.data
    
    # Create CSV in memory
    output = io.StringIO()
    writer = csv.writer(output)
    
    # Write headers
    writer.writerow(['Metric', 'Value'])
    writer.writerow(['Total Tweets', data['total_tweets']])
    writer.writerow(['Positive Sentiment', data['sentiment_distribution']['positive']])
    writer.writerow(['Neutral Sentiment', data['sentiment_distribution']['neutral']])
    writer.writerow(['Negative Sentiment', data['sentiment_distribution']['negative']])
    
    # Write hashtags
    writer.writerow([])
    writer.writerow(['Hashtag', 'Count'])
    for hashtag, count in data['hashtag_counts'].items():
        writer.writerow([hashtag, count])
    
    # Prepare response
    output.seek(0)
    
    return StreamingResponse(
        io.BytesIO(output.getvalue().encode()),
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=dashboard_export.csv"}
    )

@app.get("/api/export/json")
async def export_json():
    """Export dashboard data as JSON"""
    return dashboard_state.data

# WebSocket endpoint
@app.websocket("/ws/{client_id}")
async def websocket_endpoint(websocket: WebSocket, client_id: str):
    await manager.connect(websocket, client_id)
    try:
        # Send current state immediately upon connection
        current_data = json.dumps({
            "type": "initial_data",
            "data": dashboard_state.data,
            "streaming_status": {
                "is_streaming": dashboard_state.is_streaming,
                "current_keyword": dashboard_state.current_keyword
            }
        })
        await manager.send_personal_message(current_data, client_id)
        
        while True:
            # Keep connection alive and handle incoming messages
            data = await websocket.receive_text()
            # Handle client messages if needed
            message = json.loads(data)
            if message.get("type") == "ping":
                await manager.send_personal_message(
                    json.dumps({"type": "pong"}), 
                    client_id
                )
                
    except WebSocketDisconnect:
        manager.disconnect(client_id)
        print(f"Client {client_id} disconnected")

# Background task to broadcast data updates
async def background_data_broadcast():
    """Background task to broadcast data updates to all WebSocket clients"""
    while True:
        if dashboard_state.is_streaming:
            # Get latest processed data
            latest_data = data_processor.get_dashboard_data()
            dashboard_state.data = latest_data
            
            # Broadcast to all connected clients
            message = json.dumps({
                "type": "data_update",
                "data": latest_data
            })
            await manager.broadcast(message)
        
        await asyncio.sleep(2)  # Update every 2 seconds

@app.on_event("startup")
async def startup_event():
    # Start the background broadcast task
    asyncio.create_task(background_data_broadcast())
    print("Social Media Dashboard API started!")
    print("Visit http://localhost:8000/docs for API documentation")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,  # Auto-reload on code changes
        log_level="info"
    )