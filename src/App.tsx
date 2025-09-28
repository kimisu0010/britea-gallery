import React, { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// ---------- 데이터 ----------
const ARTWORKS = [
  {
    id: "a1",
    no: 1,
    title: "작가 프로필",
    artist: "김태희",
    year: "2025",
    image:
      "/작가님.jpg",
    caption: "",
    description:
      "",
    curator:
      "",
    question: "",
  },
  {
    id: "a2",
    no: 2,
    title: "현대 민화",
    artist: "김태희작가",
    year: "2025",
    image:
      "/적색꽃.jpg",
    caption: "",
    description:
      "",
    curator:
      "",
    question: "",
  },
  {
    id: "a3",
    no: 3,
    title: "현대 민화",
    artist: "김태희 작가",
    year: "2025",
    image:
      "/토끼 (1).jpg",
    caption: "",
    description:
      "",
    curator:
      "",
    question: "",
  },
  {
    id: "a4",
    no: 4,
    title: "현대 민화",
    artist: "김태희 작가",
    year: "2025",
    image:
      "/혼합꽃.jpg",
    caption: "",
    description:
      "",
    curator:
      "",
    question: "",
  },
];

// 순서 제한 함수
export const clampIndex = (n: number, length: number) =>
  Math.max(0, Math.min(length - 1, n));

export default function App() {
  const [idx, setIdx] = useState(0);
  const count = ARTWORKS.length;
  const [previousIdx, setPreviousIdx] = useState(0);

  const go = (to: number) => {
    const clamped = clampIndex(to, count);
    setPreviousIdx(idx);
    setIdx(clamped);
  };
  const next = () => go(idx + 1);
  const goPrev = () => go(idx - 1);

  const startX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (startX.current == null) return;
    const delta = e.changedTouches[0].clientX - startX.current;
    if (Math.abs(delta) > 40) {
      if (delta < 0) next();
      else goPrev();
    }
    startX.current = null;
  };

  const current = ARTWORKS[idx];
  const previous = ARTWORKS[previousIdx];
  const progress = ((idx + 1) / count) * 100;

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-neutral-200">
        <div className="px-4 py-3">
          <h1 className="text-base font-semibold">Britea Gallery</h1>
          <p className="text-xs text-neutral-500"></p>
        </div>
        <div className="px-3 pb-3">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {ARTWORKS.map((a, i) => (
              <button
                key={a.id}
                onClick={() => go(i)}
                className={`shrink-0 px-3 py-1.5 rounded-full border text-sm ${
                  i === idx
                    ? "bg-black text-white border-black"
                    : "bg-white border-neutral-300 text-neutral-700"
                }`}
              >
                {a.no}
              </button>
            ))}
          </div>
          <div className="mt-2 h-1 rounded-full bg-neutral-200">
            <div
              className="h-1 rounded-full bg-neutral-900 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </header>

      <main className="px-4 pb-16" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <div className="flex items-center justify-between py-3">
          <button
            onClick={goPrev}
            className="p-2 rounded-lg border border-neutral-300 disabled:opacity-40"
            disabled={idx === 0}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="text-center">
            <div className="text-xs text-neutral-500">{current.artist} · {current.year}</div>
            <h2 className="text-lg font-semibold leading-tight">{current.title}</h2>
          </div>
          <button
            onClick={next}
            className="p-2 rounded-lg border border-neutral-300 disabled:opacity-40"
            disabled={idx === count - 1}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="relative overflow-hidden rounded-xl border border-neutral-200">
          <img
            key={previous?.id + "-prev"}
            src={previous?.image}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500"
          />
          <img
            key={current.id}
            src={current.image}
            alt={current.title}
            className="relative w-full aspect-[4/3] object-cover transition-transform duration-500"
          />
        </div>

        <section className="mt-4 space-y-3 select-text">
          <p className="text-sm text-neutral-700">{current.caption}</p>
          <div>
            <h3 className="text-sm font-semibold">작품 해설</h3>
            <p className="text-sm text-neutral-800 leading-relaxed">{current.description}</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold">큐레이터 노트</h3>
            <p className="text-sm text-neutral-800 leading-relaxed">{current.curator}</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold">질문</h3>
            <p className="text-sm text-neutral-800">{current.question}</p>
          </div>
        </section>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur border-t border-neutral-200 select-text">
        <div className="px-4 py-3 text-center text-xs text-neutral-500">
          {idx + 1} / {count} · 스와이프 또는 번호 탭으로 이동
        </div>
      </footer>
    </div>
  );
}
