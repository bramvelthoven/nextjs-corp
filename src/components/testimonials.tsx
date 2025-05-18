const testimonials = [
  { image: "/person1.jpg", text: "I can't believe how much better I feel" },
  { image: "/person2.jpg", text: "This is the best decision I've made in a long time" },
  { image: "/person3.jpg", text: "I'm so glad I tried this" },
]

export function Testimonials() {
  return (
    <section className="px-6 py-12 max-w-5xl mx-auto">
      <h3 className="text-xl font-semibold mb-6">Real people, real results</h3>
      <div className="flex gap-4 flex-wrap">
        {testimonials.map((t, idx) => (
          <div key={idx} className="flex flex-col items-center space-y-2">
            <img src={t.image} alt="Testimonial" className="w-20 h-20 rounded-full object-cover" />
            <p className="text-center text-sm text-gray-600 max-w-[200px]">{t.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
