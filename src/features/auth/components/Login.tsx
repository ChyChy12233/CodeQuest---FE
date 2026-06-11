import { Link } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
export function Login() {
  return (
    <div className="min-h-screen bg-[#050816] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#111827] border border-gray-800 rounded-2xl p-8 shadow-lg">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-400">CodeQuest</h1>
          <p className="text-gray-400 mt-2">I Code, I Think, I Conquer</p>
        </div>

        {/* Tab */}
        <div className="flex mb-6 bg-[#1f2937] rounded-lg p-1">
          <button className="flex-1 bg-green-500 text-white py-2 rounded-md">
            Đăng nhập
          </button>
          <Link to="/signup" className="flex-1 text-center py-2 text-gray-400">
            Đăng ký
          </Link>
        </div>
        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm mb-2">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-500" />
            <input
              type="email"
              placeholder="email@example.com"
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#0b1220] border border-gray-700 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
        {/* Password */}
        <div className="mb-2">
          <label className="block text-sm mb-2">Mật khẩu</label>
          <div className="relative">
            <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-500" />

            <input
              type="password"
              placeholder="••••••••"
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#0b1220] border border-gray-700 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
        {/* Remember */}
        <div className="flex justify-between items-center text-sm mb-6">
          <label className="flex items-center gap-2">
            <input type="checkbox" />
            <span className="text-gray-400">Ghi nhớ đăng nhập</span>
          </label>
          <button className="text-blue-400 hover:underline">
            Quên mật khẩu?
          </button>
        </div>
        {/* Login Button */}
        <button className="w-full bg-green-500 hover:bg-green-600 py-3 rounded-lg font-semibold transition">
          Đăng nhập
        </button>
        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="flex-1 border-t border-gray-700"></div>
          <span className="px-3 text-sm text-gray-500">Hoặc tiếp tục với</span>
          <div className="flex-1 border-t border-gray-700"></div>
        </div>
        {/* Social Login */}
        <div className="space-y-3">
          <button className="w-full border border-gray-700 py-3 rounded-lg hover:bg-[#1f2937] flex items-center justify-center gap-2">
  <FaGithub size={18} />
  GitHub
</button>
         <button className="w-full border border-gray-700 py-3 rounded-lg hover:bg-[#1f2937] flex items-center justify-center gap-2">
  <FcGoogle size={18} />
  Google
</button>
        </div>
        {/* Register */}
        <p className="text-center text-sm text-gray-400 mt-6">
          Chưa có tài khoản?{" "}
          <Link to="/signup" className="text-blue-400 hover:underline">
            Đăng ký ngay
          </Link>
        </p>
      </div>
    </div>
  );
}
