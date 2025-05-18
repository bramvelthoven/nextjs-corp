import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative w-full max-w-5xl mx-auto px-6 py-12">
      <div className="relative rounded-2xl overflow-hidden shadow-lg">
        <Image
          src="/banner-fallback.jpg"
          alt="Therapy"
          width={1200}
          height={500}
          className="w-full object-cover"
        />
        <div className="absolute right-10 bottom-10 transform text-left max-w-lg">
          <h2 className="text-4xl font-bold text-primary drop-shadow">
            Therapy for your mind
          </h2>
          <p className="mt-2 text-lg text-primary drop-shadow">
            The most advanced therapy methods, personalized for you, and available anytime.
          </p>
          <div className="flex justify-end">
            <Button variant="outline" asChild>
            <Link href="/chat">Lets have a chat!</Link>
          </Button>
          </div>
        </div>
      </div>
    </section>
  )
}