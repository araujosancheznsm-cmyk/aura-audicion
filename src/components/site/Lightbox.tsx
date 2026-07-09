import { useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export function Lightbox({
  images,
  index,
  onClose,
  onIndex,
  alt,
}: {
  images: string[];
  index: number;
  onClose: () => void;
  onIndex: (i: number) => void;
  alt: string;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onIndex((index + 1) % images.length);
      if (e.key === "ArrowLeft") onIndex((index - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, images.length, onIndex, onClose]);

  if (!images.length) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-ink/95 backdrop-blur-2xl animate-fade-in-slow flex flex-col">
      <div className="flex items-center justify-between px-6 py-5 text-white/80">
        <div className="text-xs tracking-[0.28em] uppercase">
          {index + 1} / {images.length}
        </div>
        <button
          onClick={onClose}
          className="size-11 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 transition"
          aria-label="Cerrar"
        >
          <X className="size-5" />
        </button>
      </div>

      <div className="relative flex-1 flex items-center justify-center px-6 pb-8">
        <button
          onClick={() => onIndex((index - 1 + images.length) % images.length)}
          className="absolute left-4 md:left-8 size-12 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 text-white transition"
          aria-label="Anterior"
        >
          <ChevronLeft className="size-6" />
        </button>
        <img
          key={index}
          src={images[index]}
          alt={alt}
          className="max-h-[75vh] max-w-full object-contain animate-zoom-fade"
        />
        <button
          onClick={() => onIndex((index + 1) % images.length)}
          className="absolute right-4 md:right-8 size-12 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 text-white transition"
          aria-label="Siguiente"
        >
          <ChevronRight className="size-6" />
        </button>
      </div>

      <div className="px-6 pb-6 flex justify-center gap-2 overflow-x-auto">
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => onIndex(i)}
            className={`shrink-0 size-16 rounded-lg overflow-hidden border-2 transition ${
              i === index ? "border-white" : "border-transparent opacity-50 hover:opacity-100"
            }`}
          >
            <img src={src} alt="" className="size-full object-contain bg-white p-1" />
          </button>
        ))}
      </div>
    </div>
  );
}
