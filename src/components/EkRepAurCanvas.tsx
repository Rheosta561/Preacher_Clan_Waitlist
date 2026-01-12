import { useEffect, useRef } from "react"

export default function EkRepAurCanvas({ image, workout, onExport }: any) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext("2d")!
    const img = new Image()
    img.src = URL.createObjectURL(image)

    img.onload = () => {
      canvas.width = 1080
      canvas.height = 1920

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

      // Dark overlay
      ctx.fillStyle = "rgba(0,0,0,0.25)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Hashtag
      ctx.fillStyle = "white"
      ctx.font = "bold 64px Inter"
      ctx.fillText("#EkRepAur", 40, canvas.height / 2)

      // Workout text
      ctx.font = "42px Inter"
      workout.forEach((w: any, i: number) => {
        ctx.fillText(
          `${w.name.toUpperCase()} — ${w.sets}×${w.reps}`,
          40,
          canvas.height - 400 + i * 50
        )
      })

      // Branding
      ctx.font = "36px Inter"
      ctx.fillText("MONDAY", canvas.width - 260, canvas.height - 120)
      ctx.fillText("preacherclan.in", canvas.width - 360, canvas.height - 70)

      onExport(canvas.toDataURL("image/png"))
    }
  }, [])

  return <canvas ref={canvasRef} className="hidden" />
}
