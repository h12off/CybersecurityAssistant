import QAAssistant from '@/components/QAAssistant'
import Schema from './schema'
import { AiChat } from '@/components/AiChat';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8 text-center">Cybersecurity Assistant</h1>
        <AiChat />
      </div>
      <Schema />
      <div className="container mx-auto max-w-4xl">
        <QAAssistant />
      </div>
    </main>
  )
}
