"use client"

import { useEffect, useRef, useState } from "react"
import { toPng } from "html-to-image"
import WorkoutForm from "./WorkoutForm"
import EkRepAurCard from "./EkRepAurCard"
import ShareActions from "./ShareActions"
import { fileToBase64 } from "../lib/utils"

export default function EkRepAurDialog() {
  const [image, setImage] = useState<File | null>(null)
  const [workout, setWorkout] = useState<any[]>([])
  const [bgBase64, setBgBase64] = useState<string>("")

  const [hasGenerated, setHasGenerated] = useState(false)
  const [readyToExport, setReadyToExport] = useState(false)
  const [imageUrl, setImageUrl] = useState("")
  const shareRef = useRef<HTMLDivElement>(null)


  const exportRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
  if (!imageUrl) return

  shareRef.current?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  })
}, [imageUrl])


  const day = new Date()
    .toLocaleDateString("en-US", { weekday: "long" })
    .toUpperCase()

  /* Convert image → base64 once */
  useEffect(() => {
    if (!image) return
    fileToBase64(image).then(setBgBase64)
  }, [image])

  /* Reset when user edits inputs */
  useEffect(() => {
    setHasGenerated(false)
    setImageUrl("")
  }, [image, workout])

  /* Generate button */
  const generate = () => {
    setHasGenerated(true)
    setReadyToExport(true)
  }

  /* Export effect */
  useEffect(() => {
    if (!readyToExport) return
    if (!exportRef.current) return

    const run = async () => {
      await document.fonts.ready

      const images = exportRef.current!.querySelectorAll("img")
      await Promise.all(
        Array.from(images).map(img =>
          img.complete && img.naturalWidth !== 0
            ? Promise.resolve()
            : new Promise(res => {
                img.onload = img.onerror = () => res(true)
              })
        )
      )

      const SCALE = 2 // increase to 4–6 if device allows

      const png = await toPng(exportRef.current!, {
        cacheBust: true,
        backgroundColor: "#000",
        pixelRatio: SCALE,
        width: 360 * SCALE,
        height: 640 * SCALE,
        style: {
          transform: `scale(${SCALE})`,
          transformOrigin: "top left",
          width: "360px",
          height: "640px",
        },
      })

      setImageUrl(png)
      setReadyToExport(false)
    }

    run()
  }, [readyToExport])

  return (
    <div className="space-y-6">
      <WorkoutForm
        image={image}
        setImage={setImage}
        workout={workout}
        setWorkout={setWorkout}
        onGenerate={generate}
      />

      {/* ✅ VISIBLE PREVIEW — ONLY AFTER GENERATE */}
      {hasGenerated && bgBase64 && workout.length > 0 && (
        <div className="flex justify-center">
          <EkRepAurCard
            bgBase64={bgBase64}
            workout={workout}
            day={day}
          />
        </div>
      )}

      {/* ✅ OFFSCREEN EXPORT CARD */}
      {hasGenerated && bgBase64 && workout.length > 0 && (
        <div className="fixed -left-[9999px] top-0">
          <EkRepAurCard
            bgBase64={bgBase64}
            workout={workout}
            day={day}
            cardRef={exportRef}
          />
        </div>
      )}


      {imageUrl && (
  <div ref={shareRef}>
    <ShareActions imageUrl={imageUrl} />
  </div>
)}

    </div>
  )
}
