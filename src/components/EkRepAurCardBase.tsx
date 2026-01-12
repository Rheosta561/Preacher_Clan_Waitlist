"use client"
import logo from "../assets/logo.png"

export default function EkRepAurCardBase({
  bgUrl,
  workout,
  day,
  size = "preview",
}: any) {
  const isExport = size === "export"

  return (
    <div
      className={`relative overflow-hidden text-white ${
        isExport ? "w-[1080px] h-[1920px]" : "w-[360px] h-[640px]"
      }`}
    >
      {/* Background */}
      <img
        src={bgUrl}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Content */}
      <div className="relative z-10 w-full h-full p-16 flex flex-col justify-between">
        {/* Logo */}
        <img
          src={logo}
          className={`${isExport ? "w-64" : "w-36"} -ml-12`}
        />

        {/* Hashtag */}
        <h1
          className={`text-center font-Montserrat tracking-tight ${
            isExport ? "text-7xl" : "text-2xl"
          }`}
        >
          #EkRepAur
        </h1>

        {/* Bottom */}
        <div className="flex justify-between items-end">
          <div
            className={`font-Montserrat ${
              isExport ? "text-3xl" : "text-xs"
            }`}
          >
            {workout.map((w: any, i: number) => (
              <div key={i} className="flex gap-6">
                <span>{w.name}</span>
                <strong>
                  {w.sets}×{w.reps}
                </strong>
              </div>
            ))}
          </div>

          <div
            className={`font-Montserrat ${
              isExport ? "text-4xl" : "text-sm"
            }`}
          >
            <p>{day}</p>
            <p className="underline">preacherclan.in</p>
          </div>
        </div>
      </div>
    </div>
  )
}
