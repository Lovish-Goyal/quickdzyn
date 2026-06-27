"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

type DesignOrderModalProps = {
  title: string;
  price: string;
  buttonClassName?: string;
};

export default function DesignOrderModal({ title, price, buttonClassName }: DesignOrderModalProps) {
  const [open, setOpen] = useState(false);
  const [portalEl, setPortalEl] = useState<HTMLElement | null>(null);

  // Form states
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string; phone?: string }>({});

  useEffect(() => {
    const el = document.createElement("div");
    document.body.appendChild(el);
    setPortalEl(el);

    return () => {
      document.body.removeChild(el);
    };
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  // Reset form when modal opens/closes
  useEffect(() => {
    if (!open) {
      setStep(1);
      setName("");
      setEmail("");
      setPhone("");
      setErrors({});
    }
  }, [open]);

  // Handle currency conversion
  const formattedPrice = price ? (price.includes("₹") ? price : price.includes("$") ? price.replace("$", "₹") : `₹${price}`) : "₹0";

  // Form validation
  const validateForm = () => {
    const tempErrors: { name?: string; email?: string; phone?: string } = {};
    if (!name.trim()) tempErrors.name = "Full name is required";
    
    if (!email.trim()) {
      tempErrors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = "Please enter a valid email address";
    }

    if (!phone.trim()) {
      tempErrors.phone = "Phone number is required";
    } else if (!/^\+?[0-9\s-]{10,15}$/.test(phone.replace(/\s+/g, ""))) {
      tempErrors.phone = "Please enter a valid phone number (at least 10 digits)";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setStep(2);
    }
  };

  // Generate WhatsApp link with user details
  const message = `Hello QuickDzyn, I'd like to order the template: "${title}". Price: ${formattedPrice}.

My Details:
- Name: ${name}
- Email: ${email}
- Phone: ${phone}

Please confirm my order.`;
  const whatsappUrl = `https://wa.me/919999999999?text=${encodeURIComponent(message)}`;

  const modal = (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="order-modal"
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
        >
          <motion.button
            type="button"
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            aria-label="Close order modal"
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ y: 24, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="relative w-full max-w-3xl max-h-[calc(100vh-3.5rem)] overflow-auto rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-[0_25px_60px_rgba(15,23,42,0.18)] backdrop-blur-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex h-full flex-col gap-6">
              <div className="relative flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-600">
                    Order Checkout
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold text-slate-900">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">
                    {step === 1 
                      ? "Please enter your contact details so we can deliver your files."
                      : "Secure your template instantly and receive the source files in minutes."
                    }
                  </p>
                  <div className="mt-4 flex items-center gap-2 max-w-[200px]">
                    <span className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${step >= 1 ? "bg-primary" : "bg-slate-200"}`} />
                    <span className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${step >= 2 ? "bg-primary" : "bg-slate-200"}`} />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/70 text-slate-700 transition hover:border-primary/50 hover:text-slate-900"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              {step === 1 ? (
                <form onSubmit={handleNext} className="mt-4 space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      className={`w-full rounded-xl border px-4 py-3 text-sm text-slate-900 outline-none transition focus:bg-white focus:ring-2 focus:ring-primary/10 placeholder:text-slate-400 ${
                        errors.name ? "border-red-500 bg-red-50/10 focus:border-red-500 focus:ring-red-500/10" : "border-slate-200 bg-slate-50 focus:border-primary/50"
                      }`}
                      required
                    />
                    {errors.name && (
                      <p className="text-xs text-red-500 font-medium mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Email Address (For File Delivery)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john@example.com"
                      className={`w-full rounded-xl border px-4 py-3 text-sm text-slate-900 outline-none transition focus:bg-white focus:ring-2 focus:ring-primary/10 placeholder:text-slate-400 ${
                        errors.email ? "border-red-500 bg-red-50/10 focus:border-red-500 focus:ring-red-500/10" : "border-slate-200 bg-slate-50 focus:border-primary/50"
                      }`}
                      required
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500 font-medium mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Phone Number (WhatsApp Preferred)
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className={`w-full rounded-xl border px-4 py-3 text-sm text-slate-900 outline-none transition focus:bg-white focus:ring-2 focus:ring-primary/10 placeholder:text-slate-400 ${
                        errors.phone ? "border-red-500 bg-red-50/10 focus:border-red-500 focus:ring-red-500/10" : "border-slate-200 bg-slate-50 focus:border-primary/50"
                      }`}
                      required
                    />
                    {errors.phone && (
                      <p className="text-xs text-red-500 font-medium mt-1">{errors.phone}</p>
                    )}
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-[0_0_30px_rgba(99,91,255,0.25)] transition hover:bg-primary/90"
                  >
                    Proceed to Payment
                  </motion.button>
                </form>
              ) : (
                <div className="relative mt-4 grid gap-6 lg:grid-cols-[240px_1fr] lg:items-start animate-fadeIn">
                  <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 flex flex-col items-center">
                    <div className="aspect-square w-full max-w-[160px] overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
                      <svg viewBox="0 0 100 100" className="h-full w-full object-contain">
                        <rect x="0" y="0" width="100" height="100" fill="white" />
                        <rect x="10" y="10" width="30" height="30" fill="none" stroke="#0F172A" strokeWidth="6" />
                        <rect x="18" y="18" width="14" height="14" fill="#0F172A" />
                        <rect x="60" y="10" width="30" height="30" fill="none" stroke="#0F172A" strokeWidth="6" />
                        <rect x="68" y="18" width="14" height="14" fill="#0F172A" />
                        <rect x="10" y="60" width="30" height="30" fill="none" stroke="#0F172A" strokeWidth="6" />
                        <rect x="18" y="68" width="14" height="14" fill="#0F172A" />
                        <rect x="45" y="10" width="6" height="6" fill="#0F172A" />
                        <rect x="50" y="22" width="6" height="6" fill="#0F172A" />
                        <rect x="45" y="34" width="6" height="6" fill="#0F172A" />
                        <rect x="10" y="45" width="6" height="6" fill="#0F172A" />
                        <rect x="22" y="50" width="6" height="6" fill="#0F172A" />
                        <rect x="34" y="45" width="6" height="6" fill="#0F172A" />
                        <rect x="45" y="45" width="10" height="10" fill="#0F172A" />
                        <rect x="60" y="45" width="6" height="12" fill="#0F172A" />
                        <rect x="70" y="60" width="12" height="6" fill="#0F172A" />
                        <rect x="45" y="65" width="8" height="8" fill="#0F172A" />
                        <rect x="58" y="70" width="12" height="12" fill="#0F172A" />
                        <rect x="75" y="75" width="15" height="15" fill="#0F172A" />
                        <rect x="85" y="45" width="6" height="15" fill="#0F172A" />
                      </svg>
                    </div>
                    <p className="mt-3 text-center text-xs font-semibold text-slate-600">
                      Scan to pay
                    </p>
                  </div>

                  <div className="space-y-4 text-sm text-slate-600">
                    <div className="rounded-2xl border border-slate-200 bg-white/70 p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                        Amount
                      </p>
                      <p className="mt-2 text-lg font-semibold text-slate-900">
                        {formattedPrice}
                      </p>
                      <p className="mt-2 text-xs text-slate-500">
                        UPI ID: quickdzyn@upi
                      </p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white/70 p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                        Instructions
                      </p>
                      <p className="mt-2">
                        Pay via UPI/QR and share the payment screenshot on WhatsApp to confirm your order.
                      </p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white/70 p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                        WhatsApp Confirmation
                      </p>
                      <p className="mt-2">
                        We deliver files instantly to your email after verification.
                      </p>
                      <motion.a
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex w-full items-center justify-center rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-xs font-semibold text-slate-900 transition hover:border-accent/60 hover:text-slate-900 hover:shadow-[0_0_20px_rgba(34,197,94,0.35)] sm:w-auto"
                      >
                        Message on WhatsApp
                      </motion.a>
                    </div>

                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-primary transition"
                    >
                      ← Back to details
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        className={buttonClassName || "inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-[0_0_35px_rgba(99,91,255,0.4)] transition hover:bg-primary/90 sm:w-auto"}
      >
        Order Now
      </motion.button>

      {portalEl ? createPortal(modal, portalEl) : null}
    </>
  );
}

