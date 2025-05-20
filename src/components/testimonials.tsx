import Image from "next/image"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const testimonials = [
  { image: "/person1.png", text: "I can't believe how much better I feel", author: "Sarah J." },
  { image: "/person2.png", text: "This is the best decision I've made in a long time", author: "Mike D." },
  { image: "/person3.png", text: "I'm so glad I tried this", author: "Emily R." },
]

export function Testimonials() {
  return (
    <section className="px-6 py-12 max-w-5xl mx-auto">
      <h3 className="text-xl font-semibold mb-6">Real people, real results</h3>
      <div className="flex gap-4 flex-wrap">
        {testimonials.map((t, idx) => (
          <Card key={idx} className="w-[200px] justify-between gap-0 transition-all duration-200 hover:scale-105 hover:shadow-lg hover:bg-muted/40">
            <CardHeader className="items-center">
              <Image
                height={96}
                width={96}
                src={t.image}
                alt="Testimonial"
                className="rounded-full object-cover mx-auto"
              />
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm text-secondary-accent text-center">
                {t.text}
              </CardDescription>
              <div className="mt-2 text-xs text-center text-muted-foreground font-semibold">
                {t.author}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}