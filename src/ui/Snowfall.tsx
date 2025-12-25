import { useEffect, useMemo, useRef, useState } from "react";

type Flake = {
  left: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  drift: number;
};

type TextFlake = {
  id: string;
  left: number;
  duration: number;
  opacity: number;
  drift: number;
  word: string;
  size: number;
};

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

export default function Snowfall({
  count = 50,
}: {
  count?: number;
}) {
  const WORDS = useMemo(
    () => [
      "Merry Christmas",
      "I love you so much!",
      "Piggy!",
      "Timmy Turtle",
      "WATEVER",
      "WATDAHECK",
      "FATYY",
      "BABBLEWABBLE",
      "WAAAAAAATER",
      "GOOFY AHHHH"
    ],
    []
  );

  const flakes = useMemo<Flake[]>(() => {
    return Array.from({ length: count }).map(() => ({
      left: rand(0, 100),
      size: 12,
      duration: rand(7, 16),
      delay: rand(0, 6),
      opacity: rand(0.35, 0.95),
      drift: rand(-35, 35),
    }));
  }, [count]);

  const [textFlakes, setTextFlakes] = useState<TextFlake[]>([]);
  const timeoutsRef = useRef<number[]>([]);

  useEffect(() => {
    let cancelled = false;

    const spawn = () => {
      if (cancelled) return;

      const word = WORDS[Math.floor(rand(0, WORDS.length))];
      const id = crypto.randomUUID();

      const duration = rand(8, 16);
      const flake: TextFlake = {
        id,
        left: rand(0, 100),
        duration,
        opacity: rand(0.35, 0.75),
        drift: rand(-40, 40),
        word,
        size: 24,
      };

      setTextFlakes((prev) => {
        const next = prev.length > 20 ? prev.slice(prev.length - 20) : prev;
        return [...next, flake];
      });

      const removeTimeout = window.setTimeout(() => {
        setTextFlakes((prev) => prev.filter((t) => t.id !== id));
      }, (duration + 1) * 1000);

      timeoutsRef.current.push(removeTimeout);

      const nextInMs = rand(1200, 3500);
      const nextTimeout = window.setTimeout(spawn, nextInMs);
      timeoutsRef.current.push(nextTimeout);
    };

    const startTimeout = window.setTimeout(spawn, rand(500, 1800));
    timeoutsRef.current.push(startTimeout);

    return () => {
      cancelled = true;
      timeoutsRef.current.forEach((t) => window.clearTimeout(t));
      timeoutsRef.current = [];
    };
  }, [WORDS]);

  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
      {/* Snow */}
      {flakes.map((f, i) => (
        <span
          key={`snow-${i}`}
          className="snowflake"
          style={{
            left: `${f.left}%`,
            width: `${f.size}px`,
            height: `${f.size}px`,
            opacity: f.opacity,
            animationDuration: `${f.duration}s`,
            animationDelay: `${f.delay}s`,
            ["--drift" as any]: `${f.drift}px`,
          }}
        />
      ))}

      {/* Rotated falling text */}
      {textFlakes.map((t) => (
        <span
          key={t.id}
          className="textflake"
          style={{
            left: `${t.left}%`,
            opacity: t.opacity,
            fontSize: `${t.size}px`,
            animationDuration: `${t.duration}s`,
            ["--drift" as any]: `${t.drift}px`,
          }}
        >
          {t.word}
        </span>
      ))}

      <style>{`
        @keyframes snow-fall {
          0% { transform: translate3d(var(--drift), -10vh, 0); }
          100% { transform: translate3d(calc(var(--drift) * -1), 110vh, 0); }
        }

        .snowflake {
          position: absolute;
          top: -12vh;
          border-radius: 9999px;
          background: rgba(255,255,255,0.9);
          box-shadow:
            0 0 6px rgba(255,255,255,0.6),
            0 0 14px rgba(255,255,255,0.25);
          animation-name: snow-fall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          will-change: transform;
        }

        @keyframes text-fall {
          0% { transform: translate3d(var(--drift), -15vh, 0) rotate(90deg); }
          100% { transform: translate3d(calc(var(--drift) * -1), 115vh, 0) rotate(90deg); }
        }

        .textflake {
          position: absolute;
          top: -15vh;
          color: rgba(255,255,255,0.9);
          text-shadow: 0 2px 10px rgba(0,0,0,0.25);
          font-weight: 600;
          letter-spacing: 0.02em;
          white-space: nowrap;
          user-select: none;
          animation-name: text-fall;
          animation-timing-function: linear;
          animation-iteration-count: 1; /* each one falls once */
          will-change: transform;
        }
      `}</style>
    </div>
  );
}
