import { useEffect, useMemo, useRef, useState } from "react";

type EmojiType = { key: string; emoji: string };
type Drop = {
  id: string;
  key: string;
  emoji: string;
  left: number;
  size: number;
  duration: number;
  opacity: number;
  drift: number;
};

const rand = (a: number, b: number) => a + Math.random() * (b - a);
const pickTwoDistinct = (n: number) => {
  const a = Math.floor(rand(0, n));
  let b = Math.floor(rand(0, n));
  if (n > 1) while (b === a) b = Math.floor(rand(0, n));
  return [a, b];
};

export default function EmojiRain({
  onPick,
  intervalMs = 5000,
}: {
  onPick: (key: string) => void;
  intervalMs?: number;
}) {
  const ICONS: EmojiType[] = useMemo(
    () => [
      { key: "letter", emoji: "💌" },
      { key: "photos", emoji: "📷" },
      { key: "dates", emoji: "📅" },
      { key: "shows", emoji: "📺" },
      { key: "restaurants", emoji: "🍴" },
      { key: "future", emoji: "🔮" },
    ],
    []
  );

  const [drops, setDrops] = useState<Drop[]>([]);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    let dead = false;

    const spawn = (t: EmojiType, extraDelayMs: number) => {
      const id = crypto.randomUUID();
      const d: Drop = {
        id,
        key: t.key,
        emoji: t.emoji,
        left: rand(6, 94),
        size: rand(24, 40),
        duration: rand(14, 22),
        opacity: rand(0.7, 1),
        drift: rand(-25, 25),
      };

      timers.current.push(
        window.setTimeout(() => {
          setDrops((p) => (p.length > 40 ? [...p.slice(-40), d] : [...p, d]));
          timers.current.push(
            window.setTimeout(
              () => setDrops((p) => p.filter((x) => x.id !== id)),
              (d.duration + 1) * 1000
            )
          );
        }, extraDelayMs)
      );
    };

    const tick = () => {
      if (dead) return;

      const [i1, i2] = pickTwoDistinct(ICONS.length);
      const d1 = Math.floor(rand(0, 700));
      const d2 = d1 + Math.floor(rand(300, 1100));

      spawn(ICONS[i1], d1);
      spawn(ICONS[i2], d2);

      timers.current.push(window.setTimeout(tick, intervalMs));
    };

    timers.current.push(window.setTimeout(tick, rand(800, 1600)));

    return () => {
      dead = true;
      timers.current.forEach((t) => clearTimeout(t));
      timers.current = [];
    };
  }, [ICONS, intervalMs]);

  return (
    <div className="absolute inset-0 z-20 overflow-hidden">
      {drops.map((d) => (
        <button
          key={d.id}
          onClick={() => onPick(d.key)}
          className="emoji-drop"
          style={{
            left: `${d.left}%`,
            fontSize: `${d.size}px`,
            opacity: d.opacity,
            animationDuration: `${d.duration}s`,
            ["--drift" as any]: `${d.drift}px`,
          }}
        >
          {d.emoji}
        </button>
      ))}
      <style>{`
        @keyframes emoji-fall {
          0% { transform: translate3d(var(--drift), -12vh, 0); }
          100% { transform: translate3d(calc(var(--drift) * -1), 112vh, 0); }
        }
        .emoji-drop {
          position: absolute;
          top: -12vh;
          background: transparent;
          border: none;
          cursor: pointer;
          animation-name: emoji-fall;
          animation-timing-function: linear;
          animation-iteration-count: 1;
          filter: drop-shadow(0 6px 14px rgba(0,0,0,.25));
        }
      `}</style>
    </div>
  );
}
