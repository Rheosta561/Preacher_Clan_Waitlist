import { useEffect, useRef } from "react";

const features = [
  {
    logo: "/logos/logo.png",
    title: "Battleforge",
    desc: "Forge your training split or choose from 1000+ presets — built for real warriors.",
  },
  {
    logo: "/logos/repmate.png",
    title: "Repmate",
    desc: "Find your true gym buddy. Train together. Stay accountable. Become unstoppable.",
  },
  {
    logo: "/logos/ravenSpeak.png",
    title: "RavenSpeak",
    desc: "Chat with your clan, send pokes, and rally your crew for battle-ready workouts.",
  },
  {
    logo: "/logos/logo.png",
    title: "Valhalla Pay",
    desc: "A Viking-style fee system. Simple. Secure. Pay your gym dues like a warrior.",
  },
  {
    logo: "/logos/logo.png",
    title: "PreacherClan Pass",
    desc: "One pass. 100+ gyms across NCR. Train anywhere. Stay clan-connected.",
  },
];


export default function FeatureSlider() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const slider = containerRef.current;
    if (!slider) return;

    let scrollAmount = 0;

    const interval = setInterval(() => {
      if (!slider) return;

      scrollAmount += 260;

      if (scrollAmount >= slider.scrollWidth / 2) {
        scrollAmount = 0;
      }

      slider.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className=" py-2 px-4  mx-auto text-sm mb-4">
      <h2 className="text-md font-semibold mb-3">Forge Your Strength</h2>

      <div
        ref={containerRef}
        className="flex gap-3 overflow-x-hidden scroll-smooth"
      >
        {[...features, ...features].map((item, idx) => (
          <div
            key={idx}
            className="relative shrink-0 w-60 p-6 rounded- bg-foreground-50 border shadow-sm"
          >
            {/* Faded background logo */}
            <img
              src={item.logo}
              alt=""
              className="absolute right-2 -top-1 h-14 w-14 opacity-20 invert object-contain select-none pointer-events-none"
            />

            <h3 className="font-semibold mb-1">{item.title}</h3>
            <p className="text-xs text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
