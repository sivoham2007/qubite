"use client";

import { Download } from "lucide-react";
import { toast } from "sonner";

interface DownloadReceiptButtonProps {
  transactionId: string;
}

export function DownloadReceiptButton({ transactionId }: DownloadReceiptButtonProps) {
  const handleDownload = () => {
    toast.success(`Receipt for transaction ${transactionId} downloaded.`);
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      className="p-1.5 rounded-xl hover:bg-brand-cream text-zinc-500 hover:text-brand-dark transition-colors"
      title="Download Receipt"
    >
      <Download className="w-4 h-4" />
    </button>
  );
}
