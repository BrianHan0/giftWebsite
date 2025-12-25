import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { asset } from "../lib/asset";

export default function PhotoSlideshow() {
  const photos = useMemo(
    () => [
      { src: asset("/images/camera/1.jpeg"), desc: "I like this picture cause its us on my BIG day!" },
      { src: asset("/images/camera/2.jpg"), desc: "We look goofy ahhhhh" },
      { src: asset("/images/camera/3.JPG"), desc: "We look made cute together!" },
      { src: asset("/images/camera/4.JPG"), desc: "Mad sophisticated " },
      { src: asset("/images/camera/5.JPG"), desc: "I know I'm not in this. You just look hot" },
    ],
    []
  );

  const [i, setI] = useState(0);

  const prev = () => setI((p) => (p - 1 + photos.length) % photos.length);
  const next = () => setI((p) => (p + 1) % photos.length);

  return (
    <div className="-mx-5 -mb-4 bg-black">
      <div className="px-5 pt-4 pb-3">
        <div className="flex items-centerthe justify-between">
          <div className="text-xs text-white/80">
            {i + 1} / {photos.length}
          </div>
          <div className="text-xs text-white/80">
            Our Top 5 Favorite Pictures 📷
          </div>
        </div>
      </div>

      <div className="relative px-5 pb-4">
        <div className="relative overflow-hidden rounded-2xl bg-black">
          <img
            src={photos[i].src}
            className="h-[52vh] w-full object-contain"
            draggable={false}
          />

          <div className="absolute left-3 top-3 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md ring-1 ring-white/20">
            {i + 1}
          </div>

          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white backdrop-blur-md ring-1 ring-white/20 hover:bg-white/15 active:scale-[0.98]"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white backdrop-blur-md ring-1 ring-white/20 hover:bg-white/15 active:scale-[0.98]"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-3 rounded-xl bg-white/10 p-3 text-xs leading-relaxed text-white backdrop-blur-md ring-1 ring-white/20">
          {photos[i].desc}
        </div>

      </div>
    </div>
  );
}
