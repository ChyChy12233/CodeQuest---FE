function App() {
  return (
    <div className="min-h-screen bg-[#050816] text-white">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-5 border-b border-gray-800">

        <h1 className="text-2xl font-bold text-blue-400">
          CodeQuest
        </h1>

        <div className="flex gap-4">
          <button className="px-4 py-2 rounded-lg hover:bg-gray-800">
            Login
          </button>

          <button className="bg-blue-500 hover:bg-blue-600 px-5 py-2 rounded-lg">
            Sign Up
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center mt-28 px-6">

        <h1 className="text-6xl font-bold text-blue-400 mb-5">
          CodeQuest
        </h1>

        <h2 className="text-4xl font-semibold mb-4">
          I Code, I Think, I Conquer
        </h2>

        <p className="text-gray-400 max-w-2xl mb-10">
          Think like a Problem Solver, Not a Copy-Paster
        </p>

        <button className="bg-green-500 hover:bg-green-600 px-8 py-4 rounded-2xl text-lg font-semibold transition">
          Start Assessment
        </button>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-8 px-10 mt-28 pb-20">

        <div className="bg-[#111827] p-8 rounded-2xl border border-gray-800 hover:border-blue-500 transition">
          <h3 className="text-2xl font-bold text-blue-400 mb-4">
            AI Thinking Mirror
          </h3>

          <p className="text-gray-400">
            Get personalized feedback on your coding mindset and problem-solving approach.
          </p>
        </div>

        <div className="bg-[#111827] p-8 rounded-2xl border border-gray-800 hover:border-blue-500 transition">
          <h3 className="text-2xl font-bold text-blue-400 mb-4">
            Dynamic Roadmap
          </h3>

          <p className="text-gray-400">
            Adaptive roadmap tailored to your level and learning speed.
          </p>
        </div>

        <div className="bg-[#111827] p-8 rounded-2xl border border-gray-800 hover:border-blue-500 transition">
          <h3 className="text-2xl font-bold text-blue-400 mb-4">
            Practice Engine
          </h3>

          <p className="text-gray-400">
            Reinforce weak areas with smart targeted exercises.
          </p>
        </div>

      </section>

    </div>
  )
}

export default App