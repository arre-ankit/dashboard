import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Navigation */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">CIVIL ENGINEERING</h1>
          <nav className="hidden md:flex space-x-6">
            <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
            <a href="#about" className="text-gray-600 hover:text-gray-900">About</a>
            <a href="#contact" className="text-gray-600 hover:text-gray-900">Contact</a>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-5xl font-bold mb-6">Streamline Your Civil Engineering Projects</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Efficiently manage tasks, track progress, and collaborate with your team using our comprehensive project management solution.
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              <Link href="/tasks">Get Started</Link>
            </button>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-center mb-12">Key Features</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="text-4xl mb-4">📋</div>
                <h4 className="text-xl font-semibold mb-2">Task Management</h4>
                <p className="text-gray-600">Organize and prioritize project tasks with ease</p>
              </div>
              <div className="text-center p-6">
                <div className="text-4xl mb-4">📊</div>
                <h4 className="text-xl font-semibold mb-2">Real-time Analytics</h4>
                <p className="text-gray-600">Track progress with comprehensive dashboards</p>
              </div>
              <div className="text-center p-6">
                <div className="text-4xl mb-4">🤝</div>
                <h4 className="text-xl font-semibold mb-2">Team Collaboration</h4>
                <p className="text-gray-600">Work together seamlessly on projects</p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="container mx-auto px-4 text-center">
            <p className="mb-4">© 2024 Civil Engineering Task Management. All rights reserved.</p>
            <div className="flex justify-center space-x-6">
              <a href="#" className="hover:text-blue-400">Terms</a>
              <a href="#" className="hover:text-blue-400">Privacy</a>
              <a href="#" className="hover:text-blue-400">Contact</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}