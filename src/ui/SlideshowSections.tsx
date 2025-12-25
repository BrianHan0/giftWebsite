import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Slide = { src: string; title: string; desc: string; meta?: string };

function Slideshow({ header, slides }: { header: string; slides: Slide[] }) {
  const [i, setI] = useState(0);
  const prev = () => setI((p) => (p - 1 + slides.length) % slides.length);
  const next = () => setI((p) => (p + 1) % slides.length);

  return (
    <div className="-mx-5 -mb-4 bg-black">
      <div className="px-5 pt-4 pb-3">
        <div className="flex items-center justify-between">
          <div className="text-xs text-white/80">
            {i + 1} / {slides.length}
          </div>
          <div className="text-xs text-white/80">{header}</div>
        </div>
      </div>

      <div className="relative px-5 pb-4">
        <div className="relative overflow-hidden rounded-2xl bg-black">
          <img
            src={slides[i].src}
            className="h-[52vh] w-full object-contain"
            draggable={false}
          />

          <div className="absolute left-3 top-3 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md ring-1 ring-white/20">
            {i + 1}
          </div>

          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white backdrop-blur-md ring-1 ring-white/20 hover:bg-white/15"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white backdrop-blur-md ring-1 ring-white/20 hover:bg-white/15"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-3 rounded-xl bg-white/10 p-3 text-xs text-white backdrop-blur-md ring-1 ring-white/20">
          <div className="text-sm font-semibold">{slides[i].title}</div>
          {slides[i].meta && (
            <div className="text-xs text-white/80">{slides[i].meta}</div>
          )}
          <div className="mt-2">{slides[i].desc}</div>
        </div>
      </div>
    </div>
  );
}

export function ShowsSlideshow() {
  return (
    <Slideshow
      header="Favorites shows/movies we've watched!"
      slides={[
        { src: "/images/shows/1.jpg", title: "Friends!", desc: "I love watching friends with you!" },
        { src: "/images/shows/2.jpg", title: "Love Island", desc: "Stupid ahhhhh show." },
        { src: "/images/shows/3.avif", title: "Captain America and the winter soldier", desc: "Good movie ig." },
        { src: "/images/shows/5.jpg", title: "Culinary class wars", desc: "Goated ahhh show." },
        { src: "/images/shows/4.jpg", title: "Gossip Girl", desc: "Classic." },
      ]}
    />
  );
}

export function RestaurantsSlideshow() {
  return (
    <Slideshow
      header="Favorite restaurants we've been to!"
      slides={[
        { src: "/images/restaurants/1.avif", title: "Thirteen waaaaater ", desc: "Starting off strong. So freaking yummy!" },
        { src: "/images/restaurants/2.png", title: "Limits", desc: "What a classic." },
        { src: "/images/restaurants/3.jpg", title: "DAILO", desc: "I NEED DA LEAF NOW." },
        { src: "/images/restaurants/4.jpeg", title: "Shake Shack", desc: "Just another classic." },
        { src: "/images/restaurants/5.webp", title: "Midami Sushi", desc: "HALL OF FAME." },
      ]}
    />
  );
}

export function FuturePlansSlideshow() {
  return (
    <Slideshow
      header="Things I want to do with you!"
      slides={[
        { src: "/images/future/1.webp", title: "Italy", desc: "I want to go to Italy with you!" },
        { src: "/images/future/2.jpg", title: "Richmond, VA", desc: "I can't wait til you come visit my apartment and make me yummy food!" },
        { src: "/images/future/3.webp", title: "Iceland", desc: "Like come on now. We have to go to Iceland" },
        { src: "/images/future/4.jpg", title: "Cruise", desc: "I WANT TO GO ON A CRUISE WITH YOU." },
        { src: "/images/future/5.gif", title: "You know what.", desc: "mu heh heh heh" },
      ]}
    />
  );
}

export function DatesSlideshow() {
  return (
    <Slideshow
      header=""
      slides={[
        {
          src: "/images/dates/1.JPG",
          title: "Chicago Date",
          desc: "I loved taking you around da city. I was da TOUR GUIDE. ",
        },
        {
          src: "/images/dates/2.JPG",
          title: "Up North",
          desc: "So fun! We were one with nature.",
        },
        {
          src: "/images/dates/3.JPG",
          title: "ZooZooZoo",
          desc: "I liked watching Penguins with you!",
        },
        {
          src: "/images/dates/4.JPG",
          title: "First North Coast",
          desc: "Our festival together!",
        },
        {
          src: "/images/dates/5.JPG",
          title: "Fred Again!",
          desc: "Seeing one of my favorite artist with my favorite girl!",
        },
      ]}
    />
  );
}
