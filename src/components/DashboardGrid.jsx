import TotalPosts from "./TotalPosts";
import SentimentGauge from "./SentimentGauge";
import PostsOverTime from "./PostsOverTime";
import TopHashtags from "./TopHashtags";
import LiveFeed from "./LiveFeed";

export default function DashboardGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
      <TotalPosts />
      <SentimentGauge />
      <PostsOverTime />
      <TopHashtags />
      <LiveFeed />
    </div>
  );
}
