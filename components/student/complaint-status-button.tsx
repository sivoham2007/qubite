"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { ComplaintModal } from "@/components/student/complaint-modal";

export function ComplaintStatusButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2.5 rounded-2xl bg-brand-yellow hover:bg-brand-yellowHover text-brand-black text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors shrink-0"
      >
        <Plus className="w-4 h-4" />
        <span>New Complaint</span>
      </button>

      <ComplaintModal open={open} onOpenChange={setOpen} />
    </>
  );
}
