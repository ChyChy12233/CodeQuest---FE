import { Button } from "./components/common/Button";
import { Route, Routes } from "react-router";
import { Login } from "./features/auth/components/Login";
import { SignUp } from "./features/auth/components/SignUp";
function App() {
  return (
    <Routes>
      <Route path="/" element={
        <div className="min-h-screen bg-[#050816] text-white">
          {/* Navbar */}
          <nav className="flex justify-between items-center px-10 py-5 border-b border-gray-800">
            <h1 className="text-2xl font-bold text-blue-400">CodeQuest</h1>

            <div className="flex gap-4">
              <Button
                variant="primary"
                size="lg"
                to="/src/features/auth/components/Login.tsx"
              >
                Đăng nhập
              </Button>

              <Button
                variant="normal"
                size="lg"
                to="/src/features/auth/components/SignUp.tsx"
              >
                Đăng ký
              </Button>
            </div>
          </nav>

          {/* Hero Section */}
          <section className="flex flex-col items-center justify-center text-center mt-28 px-6">
            <h1 className="text-6xl font-bold text-blue-400 mb-5">CodeQuest</h1>

            <h2 className="text-4xl font-semibold mb-4">
              I Code, I Think, I Conquer
            </h2>

            <p className="text-gray-400 max-w-2xl mb-10">
              Think like a Problem Solver, Not a Copy-Paster
            </p>

            <Button
              variant="primary"
              size="xlg"
              to="/src/features/editor/components/CodeEditor.tsx"
            >
              Bắt đầu kiểm tra
            </Button>
          </section>

          {/* Features */}
          <section className="grid md:grid-cols-3 gap-8 px-10 mt-28 pb-20">
            <div className="bg-[#111827] p-8 rounded-2xl border border-gray-800 hover:border-blue-500 transition">
              <h3 className="text-2xl font-bold text-blue-400 mb-4">
                AI Thinking Mirror
              </h3>

              <p className="text-gray-400">
                Get personalized feedback on your coding mindset and problem-solving
                approach.
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
      }>
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/editor" element={<CodeEditor />} />
    </Routes>
  );
}

export default App;
