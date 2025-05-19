import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
// @ts-expect-error typing issue
import BIRDS from "vanta/dist/vanta.birds.min"
import * as THREE from "three"

export function HeroSection() {
  const vantaRef = useRef<HTMLDivElement>(null)
  const vantaEffect = useRef<any>(null) 
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    // Only initialize if ref is set and not already initialized
    if (vantaRef.current && !vantaEffect.current) {
      vantaEffect.current = BIRDS({
        el: vantaRef.current,
        THREE,
        backgroundAlpha: 0.0,
        color1: 0x638763,
        color2: 0xA4C6BA,
        colorMode: "lerp",
        vertexColors: false,
        birdSize: 2,
        wingSpan: 30,
        speedLimit: 4,
        separation: 50,
        alignment: 50,
        cohesion: 50,
        quantity: 3,
      })
    }

    // Cleanup on unmount
    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy()
        vantaEffect.current = null
      }
    }
  }, [mounted])

  if (!mounted) return null

  return (
    <section
      ref={vantaRef}
      className="relative w-full h-[600px] flex items-center px-6 py-12 overflow-hidden"
    >
      <div className="absolute top-12 right-12 max-w-lg ml-10 z-40">
        <h2 className="text-4xl font-bold text-primary drop-shadow">
          Therapy for your mind
        </h2>
        <p className="mt-2 text-lg text-primary drop-shadow">
          The most advanced therapy methods, personalized for you, and available anytime.
        </p>
        <div className="flex justify-end mt-4">
          <Button variant="outline" asChild>
            <Link href="/chat">Lets have a chat!</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}