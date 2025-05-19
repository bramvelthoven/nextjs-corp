import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"

const faqs = [
  {
    question: "What is Solaro.io?",
    answer:
      "Solaro.io is an AI-powered therapy platform that provides instant, private, and professional mental health support. Our advanced AI models are tailored for therapy and can connect you to licensed human therapists when needed.",
  },
  {
    question: "Is my data private and secure?",
    answer:
      "Absolutely. All conversations are encrypted and stored securely. We never share your data with third parties, and you can delete your account and data at any time.",
  },
  {
    question: "Can I talk to a real therapist?",
    answer:
      "Yes! While our AI can help with most issues, you can request a session with a licensed therapist at any time. Your conversations with AI can be shared with your therapist for continuity, but only with your explicit consent.",
  },
  {
    question: "What if I have an emergency?",
    answer:
      "Solaro.io is not a crisis service. If you are experiencing a mental health emergency, please contact your local emergency number or a crisis hotline immediately.",
  },
  {
    question: "How do I change or cancel my plan?",
    answer:
      "You can upgrade, downgrade, or cancel your plan anytime from your account dashboard. Changes take effect immediately, and there are no hidden fees.",
  },
  {
    question: "What if I forget my password or can't log in?",
    answer:
      "Use the 'Forgot password?' link on the login page to reset your password. If you still have trouble, contact our support team for assistance.",
  },
  {
    question: "Can I use Solaro.io on my phone?",
    answer:
      "Yes! Solaro.io is fully responsive and works on all modern smartphones, tablets, and desktops.",
  },
  {
    question: "What languages are supported?",
    answer:
      "Currently, Solaro.io supports English. We are working to add more languages soon.",
  },
  {
    question: "How do I report a bug or suggest a feature?",
    answer:
      "We welcome your feedback! Use the 'Contact Support' option in your dashboard or email us at support@solaro.io.",
  },
  {
    question: "What if the AI gives me advice I disagree with?",
    answer:
      "Our AI is designed to provide supportive, evidence-based guidance, but it's not a substitute for professional judgment. If you ever feel uncomfortable or disagree with advice, you can escalate to a human therapist or contact support.",
  },
  // Add more edge-case questions as needed
  {
    question: "Can I use Solaro.io anonymously?",
    answer:
      "Yes, you can use Solaro.io without providing your real name. However, some features may require account verification for your safety.",
  },
  {
    question: "What happens if I lose internet connection during a session?",
    answer:
      "If your connection drops, your conversation will be saved and you can resume where you left off once reconnected.",
  },
  {
    question: "Can I export or delete my conversation history?",
    answer:
      "Yes, you can export your conversation history or permanently delete it from your account dashboard at any time.",
  },
  {
    question: "How does Solaro.io handle inappropriate or harmful content?",
    answer:
      "Our AI is trained to recognize and respond appropriately to harmful content. If necessary, sessions can be escalated to a human therapist or flagged for review.",
  },
  {
    question: "Is there a limit to how much I can use the AI therapist?",
    answer:
      "Usage limits depend on your subscription plan. Free users have limited sessions, while paid plans offer more or unlimited access.",
  },
];

export default function Faq() {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen py-8 px-4">
      <h1 className="text-4xl font-bold mb-8 text-[color-primary]">Frequently Asked Questions</h1>
      <Accordion type="multiple" className="w-full max-w-3xl space-y-2">
        {faqs.map((faq, idx) => (
          <AccordionItem key={faq.question} value={`faq-${idx}`}>
            <AccordionTrigger className="text-lg text-left">{faq.question}</AccordionTrigger>
            <AccordionContent className="text-[color-foreground]/90">{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <div className="mt-10 text-center text-sm text-[color-foreground]/70 max-w-xl">
        <p>
          Didn&apos;t find your answer?{" "}
          <a
            href="mailto:support@solaro.io"
            className="underline text-[color-primary] hover:text-[color-primary]/80"
          >
            Contact our support team
          </a>
          .
        </p>
      </div>
    </div>
  );
}