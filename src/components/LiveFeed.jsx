export default function LiveFeed() {
  const posts = [
    {
      user: "John Doe",
      text: "AI is revolutionizing data analysis!",
      time: "2 min ago",
    },
    {
      user: "Sarah Malik",
      text: "Just trained a neural net with 95% accuracy 🔥",
      time: "5 min ago",
    },
    {
      user: "TechGuru",
      text: "Big data + AI = the future of insights.",
      time: "8 min ago",
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition h-[350px] overflow-y-auto">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Live Feed</h2>

      <ul className="space-y-4">
        {posts.map((post, i) => (
          <li key={i} className="border-b pb-3 last:border-none">
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold text-blue-600">@{post.user}</span>
              <span className="text-xs text-gray-400">{post.time}</span>
            </div>
            <p className="text-gray-700 text-sm">{post.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
