"use client";

import { AnimatePresence, motion } from "framer-motion";

type ToastType = "success" | "error";

export function Toast({
  open,
  message,
  type = "success",
  onClose,
}: {
  open: boolean;
  message: string;
  type?: ToastType;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.25 }}
          className="pointer-events-auto fixed bottom-6 right-6 z-50 w-[320px] rounded-2xl border border-slate-200 bg-white p-4 shadow-xl"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <p className="text-sm font-semibold text-slate-900">{type === "error" ? "Error" : "Success"}</p>
              <p className="mt-1 text-sm text-slate-600">{message}</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-md px-2 py-1 text-xs font-semibold text-slate-500 hover:bg-slate-100"
            >
              Close
            </button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
