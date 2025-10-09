export default function TopHashtags() {
  const hashtags = [
    { tag: "#AI", count: 1542 },
    { tag: "#DataScience", count: 1310 },
    { tag: "#MachineLearning", count: 1164 },
    { tag: "#Tech", count: 948 },
    { tag: "#Innovation", count: 802 },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        Top Hashtags
      </h2>

      <ul className="space-y-3">
        {hashtags.map((item, i) => (
          <li
            key={i}
            className="flex justify-between items-center bg-gray-50 hover:bg-blue-50 px-4 py-2 rounded-lg transition"
          >
            <span className="font-medium text-blue-600">{item.tag}</span>
            <span className="text-sm text-gray-600">{item.count} posts</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
