import Roadmap from "./componests/Roadmap/Roadmap"

export default function App() {
  return (
    <div className="min-h-screen bg-slate-100">
      <header className="px-6 py-4 border-b bg-white">
        <h1 className="text-xl font-semibold">
          Roadmap de Projetos
        </h1>
      </header>

      <main className="p-6">
        <Roadmap />
      </main>
    </div>
  )
}
