"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRef } from "react"
import { useGsapFadeIn } from "@/components/hooks/useGsapFadeIn"

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  useGsapFadeIn(sectionRef);

  return (
    <section ref={sectionRef} className="flex flex-col items-center justify-center min-h-screen py-12 px-4 bg-[color-background]">
      <h1 className="text-4xl font-bold mb-2 text-[color-primary]">How Solaro.io Works</h1>
      <p className="mb-10 text-lg text-[color-foreground]/80 text-center max-w-2xl">
        Solaro.io provides fast, professional, and accessible AI-powered therapy, blending advanced AI models with real human expertise for your mental well-being.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        {/* Step 1 */}
        <Card className="transition-all duration-200 hover:scale-105 hover:shadow-lg hover:bg-muted/40">
          <CardHeader>
            <CardTitle className="text-xl mb-2">1. Sign Up & Personalize</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc ml-4 space-y-2 text-[color-foreground] marker:text-secondary-accent">
              <li>Create your secure Solaro.io account in seconds.</li>
              <li>Answer a few questions about your goals and preferences.</li>
              <li>Our system matches you with the best AI therapy model for your needs.</li>
            </ul>
          </CardContent>
        </Card>
        {/* Step 2 */}
        <Card className="transition-all duration-200 hover:scale-105 hover:shadow-lg hover:bg-muted/40">
          <CardHeader>
            <CardTitle className="text-xl mb-2">2. Start Your AI Therapy</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc ml-4 space-y-2 text-[color-foreground] marker:text-secondary-accent">
              <li>Chat instantly with our advanced AI therapist, available 24/7.</li>
              <li>Receive guidance, exercises, and support tailored to you.</li>
              <li>All conversations are private and encrypted for your peace of mind.</li>
            </ul>
          </CardContent>
        </Card>
        {/* Step 3 */}
        <Card className="transition-all duration-200 hover:scale-105 hover:shadow-lg hover:bg-muted/40">
          <CardHeader>
            <CardTitle className="text-xl mb-2">3. Access Human Help When Needed</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc ml-4 space-y-2 text-[color-foreground] marker:text-secondary-accent">
              <li>Request a session with a licensed therapist at any time.</li>
              <li>Seamlessly transition from AI to human support for complex issues.</li>
              <li>Get fast, professional help—no waiting rooms, no hassle.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
      <div className="mt-12 max-w-3xl text-center text-[color-foreground]/90">
        <h2 className="text-2xl font-semibold mb-4">Why Choose Solaro.io?</h2>
        <ul className="space-y-2">
          <li>
            <span className="font-semibold text-[color-primary]">AI Models Tailored for Therapy:</span> Our AI is fine-tuned for mental health support, empathy, and actionable advice.
          </li>
          <li>
            <span className="font-semibold text-[color-primary]">Instant Access:</span> Get help whenever you need it, day or night.
          </li>
          <li>
            <span className="font-semibold text-[color-primary]">Professional Oversight:</span> Licensed therapists are available for escalation and review.
          </li>
          <li>
            <span className="font-semibold text-[color-primary]">Privacy First:</span> Your data is always secure and confidential.
          </li>
          <li>
            <span className="font-semibold text-[color-primary]">Affordable Plans:</span> Choose a plan that fits your needs and budget.
          </li>
        </ul>
      </div>
      <div className="mt-12">
      <Button asChild variant="outline" size="lg">
        <Link href="/pricing">See Plans & Pricing</Link>
      </Button>
      </div>
    </section>
  );
}