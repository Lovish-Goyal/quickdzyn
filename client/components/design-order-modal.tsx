"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

type DesignOrderModalProps = {
  title: string;
  price: string;
};

export default function DesignOrderModal({ title, price }: DesignOrderModalProps) {
  const [open, setOpen] = useState(false);
  const [portalEl, setPortalEl] = useState<HTMLElement | null>(null);

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
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-600">
                    Order
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold text-slate-900">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">
                    Secure your template instantly and receive the source files
                    in minutes.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/70 text-slate-700 transition hover:border-primary/50 hover:text-slate-900"
                  aria-label="Close"
                >
                  x
                </button>
              </div>

              <div className="relative mt-8 grid gap-6 lg:grid-cols-[240px_1fr] lg:items-start">
                <div className="rounded-2xl border border-slate-200 bg-white/70 p-4">
                  <div className="aspect-square rounded-2xl border border-dashed border-white/20 bg-white/70 p-4">
                    <div className="flex h-full w-full items-center justify-center rounded-xl text-center text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
                      QR Code
                    </div>
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
                      {price}
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
                      Pay via UPI/QR and share the payment screenshot with the
                      template name to confirm your order.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white/70 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                      WhatsApp Confirmation
                    </p>
                    <p className="mt-2">
                      We deliver files instantly after verification.
                    </p>
                    <motion.a
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      href="https://wa.me/919999999999"
                      className="mt-3 inline-flex w-full items-center justify-center rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-xs font-semibold text-slate-900 transition hover:border-accent/60 hover:text-slate-900 hover:shadow-[0_0_20px_rgba(34,197,94,0.35)] sm:w-auto"
                    >
                      Message on WhatsApp
                    </motion.a>
                  </div>
                </div>
              </div>
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
        className="inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-[0_0_35px_rgba(99,91,255,0.4)] transition hover:bg-primary/90 sm:w-auto"
      >
        Order Now
      </motion.button>

      {portalEl ? createPortal(modal, portalEl) : null}
    </>
  );
}

