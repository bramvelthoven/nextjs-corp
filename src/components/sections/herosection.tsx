import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
// @ts-expect-error typing issue
import BIRDS from "vanta/dist/vanta.birds.min"
import * as THREE from "three"

export function HeroSection() {
  const vantaRef = useRef<HTMLDivElement>(null)
  const vantaEffect = useRef<any>(null)

  useEffect(() => {
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
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        scale: 1.00,
        scaleMobile: 1.00,
      })
    }
    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy()
        vantaEffect.current = null
      }
    }
  }, [])

  return (
    <section className="relative w-full h-[600px] flex items-center px-6 py-12 overflow-hidden bg-background">
      <div
        ref={vantaRef}
        className="absolute inset-0 w-full h-full z-0"
        aria-hidden="true"
      />
      <div className="absolute top-12 right-12 max-w-lg ml-10 z-40">
        <h2 className="text-4xl font-bold text-primary drop-shadow">
          Therapy for your mind
        </h2>
        <p className="mt-2 text-lg text-primary drop-shadow">
          The most advanced therapy methods, personalized for you, and available anytime.
        </p>
        <div className="flex justify-end mt-4">
          <Button variant="outline" asChild>
            <Link href="/chat">Try our chat!</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}