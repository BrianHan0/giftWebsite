import { useEffect, useRef, useState } from "react";
import { Heart } from "lucide-react";
import { asset } from "../lib/asset";

const PASSCODE = "0904";

export default function LockScreen({ onUnlock }: { onUnlock: () => void }) {
  const [code, setCode] = useState("");
  const [shake, setShake] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const onLoaded = () => {
      const dur = v.duration;
      if (isFinite(dur) && dur > 1) {
        v.currentTime = Math.random() * (dur - 1);
      }
      v.play();
    };

    const onEnded = () => {
      v.currentTime = 0;
      v.play();
    };

    v.addEventListener("loadedmetadata", onLoaded);
    v.addEventListener("ended", onEnded);

    return () => {
      v.removeEventListener("loadedmetadata", onLoaded);
      v.removeEventListener("ended", onEnded);
    };
  }, []);

  const enterDigit = (d: string) => {
    if (showHint) setShowHint(false);
    if (code.length >= 4) return;
    const next = code + d;
    setCode(next);
    if (next.length === 4) {
      if (next === PASSCODE) {
        setTimeout(onUnlock, 150);
      } else {
        setShowHint(true);
        setShake(true);
        setTimeout(() => setShake(false), 420);
        setTimeout(() => setCode(""), 460);
      }
    }
  };

  const del = () => setCode((c) => c.slice(0, -1));
  const clear = () => setCode("");

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src={asset("video/background.mp4")}
        autoPlay
        muted
        playsInline
      />
      <div className="absolute inset-0 bg-black/45" />

      <div className="relative z-10 flex min-h-screen items-center justify-center p-6">
        <div
          className={[
            "w-full max-w-sm rounded-3xl border border-white/20 bg-white/10 p-7 shadow-2xl backdrop-blur-xl",
            shake ? "ios-shake" : "",
          ].join(" ")}
        >
          <div className="flex flex-col items-center text-white">
            <div className="mb-2 flex items-center gap-2">
              <Heart className="h-6 w-6" />
              <h1 className="text-xl font-semibold tracking-tight">For My Love</h1>
            </div>

            <p className="mb-6 text-xs text-white/80">Enter Passcode</p>

            <div className="mb-3 flex items-center justify-center gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <span
                  key={i}
                  className={[
                    "ios-bubble",
                    i < code.length ? "ios-bubble--filled" : "ios-bubble--empty",
                  ].join(" ")}
                />
              ))}
            </div>

            <div className="mb-5 h-5">
              {showHint && (
                <p className="text-xs text-white/90">
                  Hint: <span className="font-semibold">our special day!</span>
                </p>
              )}
            </div>

            <div className="grid w-full grid-cols-3 gap-3">
              {["1","2","3","4","5","6","7","8","9"].map((n) => (
                <button
                  key={n}
                  onClick={() => enterDigit(n)}
                  className="h-14 rounded-2xl bg-white/5 backdrop-blur-md text-lg font-semibold text-white ring-1 ring-white/20 transition hover:bg-white/15 active:scale-[0.96]"
                >
                  {n}
                </button>
              ))}
              <div />
              <button
                onClick={() => enterDigit("0")}
                className="h-14 rounded-2xl bg-white/5 backdrop-blur-md text-lg font-semibold text-white ring-1 ring-white/20 transition hover:bg-white/15 active:scale-[0.96]"
              >
                0
              </button>
              <button
                onClick={del}
                className="h-14 rounded-2xl bg-white/5 backdrop-blur-md text-sm font-semibold text-white ring-1 ring-white/20 transition hover:bg-white/15 active:scale-[0.96]"
              >
                Delete
              </button>
            </div>

            <button
              onClick={clear}
              className="mt-5 text-xs text-white/70 hover:text-white"
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .ios-bubble {
          width: 14px;
          height: 14px;
          border-radius: 9999px;
          transition: transform 160ms ease, background 160ms ease;
        }
        .ios-bubble--empty {
          background: rgba(255,255,255,0.15);
          border: 1px solid rgba(255,255,255,0.6);
        }
        .ios-bubble--filled {
          background: rgba(255,255,255,0.95);
          border: 1px solid rgba(255,255,255,0.9);
          transform: scale(1.06);
        }
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          20% { transform: translateX(-10px); }
          40% { transform: translateX(10px); }
          60% { transform: translateX(-7px); }
          80% { transform: translateX(7px); }
        }
        .ios-shake { animation: shake 420ms ease-in-out; }
      `}</style>
    </div>
  );
}
