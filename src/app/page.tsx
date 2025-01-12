import QAAssistant from '@/components/QAAssistant'
import Schema from './schema'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-12 lg:p-24">
      <Schema />
      <div className="container mx-auto max-w-4xl">
        <QAAssistant />
      </div>
    </main>
  )
}
