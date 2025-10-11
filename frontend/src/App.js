import React from 'react';
import Dashboard from './components/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/Dashboard.css';

// Add Font Awesome for icons (you can also install the package: npm install @fortawesome/fontawesome-free)
const addFontAwesome = () => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css';
  document.head.appendChild(link);
};

function App() {
  // Add Font Awesome when component mounts
  React.useEffect(() => {
    addFontAwesome();
  }, []);

  return (
    <div className="App">
      <Dashboard />
    </div>
  );
}

export default App;