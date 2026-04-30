import { PFPGenerator } from '@/components/PFPGenerator';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-6xl font-bold tracking-tighter text-yellow-600 mb-2">
            🐥 HATCHICK MEME GENERATOR
          </h1>
          <p className="text-xl text-gray-600">
            Generate Hatchick meme...
          </p>
        </div>

        <PFPGenerator />
      </div>
    </main>
  );
}
