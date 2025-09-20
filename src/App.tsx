import React, { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// ---------- 데이터 ----------
const ARTWORKS = [
  {
    id: "a1",
    no: 1,
    title: "종이의 숨결",
    artist: "임의 작가",
    year: "2025",
    image:
      "/작가님.jpg",
    caption: "질감이 말하는 시간의 흔적",
    description:
      "거칠고 불균일한 종이의 표면은 시간의 퇴적을 닮았다. 작가는 인공적으로 매끈하게 다듬는 대신 원재료의 결을 드러내며 감상의 리듬을 천천히 가져가길 유도한다.",
    curator:
      "정제되지 않은 표면은 불완전함 속의 완전함을 드러낸다. 우리는 거친 질감에서 더 많은 이야기를 읽을 수 있다.",
    question: "당신이 간직하고 있는 '거친 기억'은 무엇인가요?",
  },
  {
    id: "a2",
    no: 2,
    title: "분홍의 소음",
    artist: "임의 작가",
    year: "2025",
    image:
     "/백색꽃.png",
    caption: "강렬한 분홍빛에 뒤엉킨 흔적들",
    description:
      "분홍과 자홍의 겹겹이 쌓인 붓질은 소음의 시각화다. 작가는 도시의 소리를 색으로 전환해 혼잡하면서도 매혹적인 화면을 구성한다.",
    curator:
      "화려한 색채는 오히려 불편함을 준다. 그러나 불편함 속에서만 포착되는 또 다른 리듬이 있다.",
    question: "당신에게 소음은 방해인가요, 배경음악인가요?",
  },
  {
    id: "a3",
    no: 3,
    title: "심연의 청",
    artist: "임의 작가",
    year: "2025",
    image:
      "/적색꽃.jpg",
    caption: "푸른 화면에 잠긴 몰입",
    description:
      "깊고 짙은 블루는 감상자의 시선을 화면 속으로 빨아들인다. 단색 평면 같지만 층층이 쌓인 붓질은 심연의 깊이를 암시한다.",
    curator:
      "끝없이 깊어 보이는 푸른 화면은 당신을 멈추게 한다. 이 멈춤 속에서 몰입은 시작된다.",
    question: "어떤 색이 당신을 멈추게 하나요?",
  },
  {
    id: "a4",
    no: 4,
    title: "심연의 청",
    artist: "임의 작가",
    year: "2025",
    image:
      "/토끼 (1).jpg",
    caption: "푸른 화면에 잠긴 몰입",
    description:
      "깊고 짙은 블루는 감상자의 시선을 화면 속으로 빨아들인다. 단색 평면 같지만 층층이 쌓인 붓질은 심연의 깊이를 암시한다.",
    curator:
      "끝없이 깊어 보이는 푸른 화면은 당신을 멈추게 한다. 이 멈춤 속에서 몰입은 시작된다.",
    question: "어떤 색이 당신을 멈추게 하나요?",
  },
  {
    id: "a5",
    no: 5,
    title: "심연의 청",
    artist: "임의 작가",
    year: "2025",
    image:
      "/혼합꽃.jpg",
    caption: "푸른 화면에 잠긴 몰입",
    description:
      "깊고 짙은 블루는 감상자의 시선을 화면 속으로 빨아들인다. 단색 평면 같지만 층층이 쌓인 붓질은 심연의 깊이를 암시한다.",
    curator:
      "끝없이 깊어 보이는 푸른 화면은 당신을 멈추게 한다. 이 멈춤 속에서 몰입은 시작된다.",
    question: "어떤 색이 당신을 멈추게 하나요?",
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
