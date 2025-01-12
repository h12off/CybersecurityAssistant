import QAAssistant from '@/components/QAAssistant'
import ImageAnalysis from '@/components/ImageAnalysis'
import Schema from './schema'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24">
      <Schema />
      <div className="z-10 max-w-5xl w-full space-y-8">
        <QAAssistant />
        <ImageAnalysis />
      </div>
    </main>
  )
}
