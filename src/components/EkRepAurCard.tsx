"use client"

export default function EkRepAurCard({
  bgBase64,
  workout,
  day,
  cardRef,
}: any) {
  if (!bgBase64) return null

  const dayFromDate =
    day ??
    new Date().toLocaleDateString("en-US", {
      weekday: "long",
    }).toUpperCase()

  return (
    <div className="flex justify-center  ">
      <div
        ref={cardRef}
        className="relative w-[360px] h-[640px] bg-zinc-950 overflow-hidden  text-white"
      >
        <img
          src={bgBase64}
          alt="Workout background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/55" />

        <div className="relative z-10 w-full h-full p-10 flex flex-col justify-between">
          <div className="w-36 -ml-12 h-20">
            <img
              src="/logo.png"   
              alt="PreacherClan"
              className="scale-125 h-full w-full"
            />
          </div>

          <h1 className="text-2xl text-center font-Montserrat tracking-tighter">
            #EkRepAur
          </h1>

          <div className="w-full flex font-Montserrat justify-between items-end">
            <div className="flex flex-col text-xs gap-1">
              {workout.map((item: any, i: number) => (
                <div key={i} className="flex justify-between gap-2">
                  <p>{item.name}</p>
                  <p className="font-bold">
                    {item.sets}X{item.reps}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-sm font-Montserrat">
              <p className="tracking-tighter">{dayFromDate}</p>
              <p className="underline text-xs">preacherclan.in</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
