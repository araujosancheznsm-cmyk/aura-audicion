import { MessageCircle } from "lucide-react";
import { SITE } from "@/lib/site";

export function WhatsAppFloat() {
  return (
    <a
      href={SITE.whatsapp}
      target="_blank"
      rel="noopener"
      aria-label="Contáctanos por WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-[#25D366] text-white px-5 py-3 shadow-card hover:scale-105 transition-transform"
    >
      <MessageCircle className="size-5" />
      <span className="hidden sm:inline font-medium text-sm">WhatsApp</span>
    </a>
  );
}
