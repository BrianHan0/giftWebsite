import { useState } from "react";
import Snowfall from "../ui/Snowfall";
import EmojiRain from "../ui/EmojiRain";
import Modal from "../ui/Modal";
import LoveLetter from "../ui/LoveLetter";
import PhotoSlideshow from "../ui/PhotoSlideshow";
import {
  DatesSlideshow,
  ShowsSlideshow,
  RestaurantsSlideshow,
  FuturePlansSlideshow,
} from "../ui/SlideshowSections";



const TITLES: Record<string, string> = {
  letter: "Love Letter",
  photos: "My top 5 favorite pictures together",
  dates: "S tier dates!",
  shows: "Favorite shows/movies!",
  meals: "Favorite foods we've cooked!",
  restaurants: "Favorite restaurants we've been to!",
  future: "Things I want to do with you! ",
};

export default function HomeScreen() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/images/snoopy-background.jpg)" }}
      />
      <div className="absolute inset-0 bg-black/10" />
      <Snowfall count={50} />
      <EmojiRain onPick={setActive} intervalMs={5000} />

      {active && (
        <Modal title={TITLES[active] ?? active} onClose={() => setActive(null)}>
        {active === "letter" ? (
          <LoveLetter />
        ) : active === "photos" ? (
          <PhotoSlideshow />
        ) : active === "dates" ? (
          <DatesSlideshow />
        ) : active === "shows" ? (
          <ShowsSlideshow />
        ) : active === "restaurants" ? (
          <RestaurantsSlideshow />
        ) : active === "future" ? (
          <FuturePlansSlideshow />
        ) : (
          <div className="text-sm text-zinc-700">Placeholder</div>
        )}



        </Modal>
      )}
    </div>
  );
}
