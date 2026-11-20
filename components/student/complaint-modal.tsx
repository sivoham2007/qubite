"use client";

import { useState } from "react";
import { AlertCircle, ArrowRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { submitComplaintAction } from "@/app/actions/complaint-actions";
import { toast } from "sonner";

interface ComplaintModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ComplaintModal({ open, onOpenChange }: ComplaintModalProps) {
  const [category, setCategory] = useState<any>("Food Quality");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [urgency, setUrgency] = useState<any>("Normal");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      toast.error("Please fill in both title and description");
      return;
    }

    setLoading(true);
    const res = await submitComplaintAction({
      category,
      title,
      description,
      urgency,
    });
    setLoading(false);

    if (res.success) {
      toast.success(`Complaint #${res.complaint?.id} submitted successfully!`);
      setTitle("");
      setDescription("");
      onOpenChange(false);
    } else {
      toast.error(res.error || "Failed to submit complaint");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg bg-white rounded-3xl border border-brand-border p-6 shadow-floating">
        <form onSubmit={handleSubmit}>
          <DialogHeader className="space-y-1">
            <div className="flex items-center gap-2 text-brand-dark">
              <div className="h-9 w-9 rounded-xl bg-brand-softPurple flex items-center justify-center text-purple-800">
                <AlertCircle className="w-5 h-5" />
              </div>
              <DialogTitle className="text-lg font-bold">Raise a Hostel Mess Complaint</DialogTitle>
            </div>
            <DialogDescription className="text-xs text-zinc-500">
              Submit an issue directly to the hostel catering committee and mess contractor.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3.5 py-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-700">Complaint Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full h-10 rounded-xl border border-brand-border bg-white px-3 text-xs font-medium text-brand-dark"
                >
                  <option value="Food Quality">Food Quality</option>
                  <option value="Hygiene">Hygiene & Cleanliness</option>
                  <option value="Food Quantity">Food Quantity / Shortage</option>
                  <option value="Late Serving">Late Serving Timings</option>
                  <option value="Menu Issues">Menu Non-Adherence</option>
                  <option value="Other">Other Issues</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-700">Urgency Level</label>
                <select
                  value={urgency}
                  onChange={(e) => setUrgency(e.target.value as any)}
                  className="w-full h-10 rounded-xl border border-brand-border bg-white px-3 text-xs font-medium text-brand-dark"
                >
                  <option value="Normal">Normal</option>
                  <option value="High">High</option>
                  <option value="Urgent">Urgent</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-zinc-700">Subject / Title</label>
              <input
                type="text"
                placeholder="Brief summary of the issue..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full h-10 px-3 rounded-xl border border-brand-border bg-white text-xs text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-yellow"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-zinc-700">Description</label>
              <textarea
                rows={3}
                placeholder="Provide specific details (meal time, table, dish name, or observation)..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="w-full p-3 rounded-xl border border-brand-border bg-white text-xs text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-yellow"
              />
            </div>
          </div>

          <DialogFooter className="gap-2">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="px-4 py-2.5 rounded-xl border border-brand-border text-xs font-bold text-zinc-700 hover:bg-zinc-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 rounded-xl bg-brand-yellow hover:bg-brand-yellowHover text-brand-black text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-colors"
            >
              {loading ? "Submitting..." : "Submit Complaint"}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
