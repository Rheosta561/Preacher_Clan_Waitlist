"use client"

import { Button } from "./ui/button"
import {  Send, Twitter, Instagram } from "lucide-react"

export default function ShareActions({ imageUrl }: any) {
  const isMobile = /iPhone|Android/i.test(navigator.userAgent)
const download = async () => {
  const res = await fetch(imageUrl)
  const blob = await res.blob()
  const file = new File([blob], "ekrepaur.png", { type: "image/png" })

  // iOS / Mobile Safari → Share Sheet
  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    await navigator.share({
      files: [file],
      title: "EkRepAur Workout Card",
    })
    return
  }

  // Desktop fallback
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = "ekrepaur.png"
  a.click()
  URL.revokeObjectURL(url)
}


  const shareWhatsApp = () => {
    // WhatsApp does NOT support base64 images directly.
    // We share text + link, image is already downloaded.
   const text = encodeURIComponent(
  "The iron was lifted. The workout was completed.\n\n" +
  "I chose discipline over comfort and finished what I started.\n" +
  "Strength was earned today — the journey continues.\n\n" +
  "#EkRepAur\n\n" +
  "Inspire your clan.\n" +
  "Create your own card at preacherclan.in"
)


    window.open(`https://wa.me/?text=${text}`, "_blank")
  }

  const shareX = () => {
      const text = encodeURIComponent(
  "The iron was lifted. The workout was completed.\n\n" +
  "I chose discipline over comfort and finished what I started.\n" +
  "Strength was earned today — the journey continues.\n\n" +
  "#EkRepAur\n\n" +
  "Inspire your clan.\n" +
  "Create your own card at preacherclan.in"
)
    window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank")
  }

  const shareInstagram = async () => {
    if (isMobile) {
      try {
        const res = await fetch(imageUrl)
        const blob = await res.blob()

        await navigator.clipboard.write([
          new ClipboardItem({ [blob.type]: blob }),
        ])

        window.location.href = "instagram://story-camera"
      } catch {
        alert("Open Instagram app to share the story.")
      }
    } else {
      download()
      window.open("https://www.instagram.com/", "_blank")
      alert(
        "Instagram Stories are supported on mobile only.\n\n" +
        "Your image is downloaded — upload it from the Instagram app 📱"
      )
    }
  }

  return (
    <div className="grid grid-cols-2 gap-2">
      <Button onClick={download}>
        Save Image
      </Button>

      <Button variant="secondary" onClick={shareInstagram}>
        <Instagram size={16} /> Instagram Story
      </Button>

      <Button variant="secondary" onClick={shareWhatsApp}>
        <Send size={16} /> WhatsApp
      </Button>

      <Button variant="secondary" onClick={shareX}>
        <Twitter size={16} /> X
      </Button>
    </div>
  )
}
