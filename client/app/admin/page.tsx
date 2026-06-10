"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { adminLogin } from "@/lib/api";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    try {
      const { token } = await adminLogin({ email, password });
      localStorage.setItem("admin_token", token);
      router.push("/admin/dashboard");
    } catch {
      setError("Invalid credentials. Please try again.");
    }
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="w-full px-6 py-12 sm:py-16">
        <div className="mx-auto w-full max-w-[1100px]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_30px_80px_rgba(15,23,42,0.12)] lg:grid-cols-[1.05fr_0.95fr]"
          >
            <div className="p-8 sm:p-10">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs">QD</span>
                QuickDzyn
              </div>

              <h1 className="mt-8 text-2xl font-semibold text-slate-900 sm:text-3xl">
                Welcome back
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                Please enter your details to access your creative studio.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                <label className="space-y-2 text-xs font-semibold text-slate-600">
                  Email Address
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="name@company.com"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
                  />
                </label>

                <label className="space-y-2 text-xs font-semibold text-slate-600">
                  Password
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="********"
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pr-12 text-sm text-slate-900 outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </label>

                {error ? <p className="text-sm text-red-500">{error}</p> : null}

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-primary to-[#7c83ff] px-6 py-3 text-sm font-semibold text-white shadow-[0_0_30px_rgba(99,91,255,0.25)]"
                >
                  Log In
                </motion.button>
              </form>
            </div>

            <div className="relative hidden items-end justify-end bg-gradient-to-br from-primary via-[#6b62ff] to-[#7c83ff] p-8 text-white lg:flex">
              <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.35),_transparent_55%)]" />
              <div className="relative grid w-full max-w-[460px] gap-5">
                <div className="w-[92%] self-start rounded-2xl border border-white/30 bg-white/20 p-6 backdrop-blur">
                  <div className="flex items-center gap-1 text-xs">
                    <span className="text-yellow-200">*</span>
                    <span className="text-yellow-200">*</span>
                    <span className="text-yellow-200">*</span>
                    <span className="text-yellow-200">*</span>
                    <span className="text-yellow-200">*</span>
                  </div>
                  <p className="mt-3 text-sm text-white/90">
                    "QuickDzyn has completely transformed how our creative team collaborates. It&#39;s the engine behind our design process."
                  </p>
                  <p className="mt-3 text-xs text-white/80">
                    Stay consistent across every template and launch faster.
                  </p>
                  <p className="mt-2 text-xs text-white/75">
                    Launch new collections in minutes with zero layout churn.
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/30 text-xs">SJ</span>
                    <div>
                      <p className="text-sm font-semibold">Sarah Jenkins</p>
                      <p className="text-xs text-white/70">Lead Designer at CreativeFlow</p>
                    </div>
                  </div>
                </div>

                <div className="w-[92%] self-end rounded-2xl border border-white/30 bg-white/20 p-6 backdrop-blur">
                  <div className="flex items-center gap-1 text-xs">
                    <span className="text-yellow-200">*</span>
                    <span className="text-yellow-200">*</span>
                    <span className="text-yellow-200">*</span>
                    <span className="text-yellow-200">*</span>
                    <span className="text-yellow-200">*</span>
                  </div>
                  <p className="mt-3 text-sm text-white/90">
                    "We shipped a full marketplace refresh in days. The templates were clean, structured, and client-ready."
                  </p>
                  <p className="mt-3 text-xs text-white/80">
                    Faster launches, zero design debt.
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/30 text-xs">AK</span>
                    <div>
                      <p className="text-sm font-semibold">Aarav Kapoor</p>
                      <p className="text-xs text-white/70">Product Lead at NovaLabs</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
