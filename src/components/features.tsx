const features = [
  { title: "Chat with a licensed therapist", text: "Licensed therapists use the latest techniques to help you improve your mental health." },
  { title: "Get the latest therapy techniques", text: "Licensed therapists use the latest techniques to help you improve your mental health." },
  { title: "Use at your own pace", text: "Licensed therapists use the latest techniques to help you improve your mental health." },
  { title: "Improve your mental health", text: "Licensed therapists use the latest techniques to help you improve your mental health." },
]

export function Features() {
  return (
    <section className="px-6 py-12 bg-gray-50">
      <h3 className="text-xl font-semibold mb-6">Facts about therapy</h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((f, idx) => (
          <div key={idx} className="bg-white p-4 rounded-xl shadow-sm border">
            <h4 className="font-semibold text-sm mb-2">{idx + 1}. {f.title}</h4>
            <p className="text-sm text-gray-500">{f.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
