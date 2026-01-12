"use client"
import EkRepAurCardBase from "./EkRepAurCardBase"

export default function EkRepAurPreview({
  bgUrl,
  workout,
  day,
}: any) {
  if (!bgUrl) return null

  return (
    <EkRepAurCardBase
      bgUrl={bgUrl}
      workout={workout}
      day={day}
    />
  )
}
