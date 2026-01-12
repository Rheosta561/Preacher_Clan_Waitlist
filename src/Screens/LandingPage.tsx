import  { useEffect, useRef, useState, type FormEvent } from "react"
import { motion, AnimatePresence } from "framer-motion"
import axios from 'axios';


import battleforge from '../assets/Mockups/battleforge.png'
import buddy from '../assets/Mockups/buddy.png'
import challenge from '../assets/Mockups/challenge.png'
import clan from '../assets/Mockups/clan.png'
import request from '../assets/Mockups/request.png'
import share from '../assets/Mockups/share.png'
import { Play, Apple } from "lucide-react";


import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "../components/ui/carousel"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Separator } from "../components/ui/separator"
import FeatureSlider from "../components/FeatureSlider";
import EkRepAurDialog from "../components/EkRepAurDialog";

const taglines = [
  "Born to conquer?",
  "Ever dreamed of Valhalla?",
  "This is your rise.",
  "Step into the Clan.",
];


const screenshots = [
  { 
    src: battleforge, 
    caption: "Battleforge — Build your split like a weapon. Craft it. Refine it. Master it."
  },
  { 
    src: buddy, 
    caption: "Repmate — Find your true gym brother. Train together. Grow together. No warrior lifts alone."
  },
  { 
    src: challenge, 
    caption: "Daily Challenge — Face the iron. Conquer the grind. One quest. Every day."
  },
  { 
    src: clan, 
    caption: "Clan HQ — Your gym. Your people. See who’s training — in real time."
  },
  { 
    src: request, 
    caption: "Seek the Preachers — Learn from the elite. Guidance from the strongest in the Clan."
  },
  { 
    src: share, 
    caption: "Share The Journey — Track your progress. Inspire the Clan. Fuel the fire."
  },
];




export default function LandingPage() {
  const [visible, setVisible] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [email, setEmail] = useState<string>('')
  const [responseMessage, setResponseMessage] = useState<string | null>(null)
  const [isJoined, setIsJoined] = useState<boolean>(false)
  const [count, setCount] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  const formRef = useRef<HTMLFormElement>(null)



  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) setIsJoined(true)

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % taglines.length)
    }, 2500)

    const timeout = setTimeout(() => {
      setVisible(false)
      clearInterval(interval)
    }, 10500)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [])

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await axios.get('https://raven-waitlist.onrender.com/count')
        if (response) setCount(response.data.count || 0)
      } catch (error: any) {
        console.error(error.message)
      }
    }
    fetchCount()
  }, [count])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await axios.post(`https://raven-waitlist.onrender.com/signup`, { email })
      setCount(prev => prev + 1)
      localStorage.setItem("token", response.data.token)
      setResponseMessage(response.data.message)
      setIsJoined(true)
    } catch (error) {
      console.error(error)
      setResponseMessage("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="min-h-[95vh] flex items-center justify-center px-4">
        <AnimatePresence mode="wait">
          {visible ? (
            <motion.div
              key={taglines[currentIndex]}
              className="text-3xl sm:text-5xl font-medium text-center max-w-3xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              {taglines[currentIndex]}
            </motion.div>
          ) : (
            <motion.div
              key="raven-content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className="w-full"
            >
              {/* What is PreacherClan */}
              <section className="pt-20 text-center max-w-4xl mx-auto px-4 space-y-2" id='home'>
                <h2 className="text-lg font-semibold font-Montserrat">PreacherClan</h2>
                <p className="text-muted-foreground text-sm leading-relaxed ">
                  <span className="text-primary font-medium font-Montserrat" id='about'>#EkRepAur</span>
                  <br />
                  PreacherClan is a modern fitness tribe where lifters unite, grow stronger, and hold each other accountable.
From sharing training splits to finding gym partners, every member becomes part of a living, breathing clan — built on iron, discipline, and loyalty.
                </p>
              </section>

              {/* Carousel */}
              <section className="py-8 px-4 max-w-5xl mx-auto text-center" id='features'>
                <h2 className="text-lg font-semibold mb-4">How it works</h2>
                <Carousel className="w-full relative ">
                  <CarouselContent>
                    {screenshots.map((shot, idx) => (
                      <CarouselItem key={idx} className="md:basis-1/2  lg:basis-1/3">
                        <Card className="overflow-hidden">
                          <CardContent className="flex flex-col p-0">
                            <img
                              src={shot.src}
                              alt={`Screenshot ${idx + 1}`}
                              className="h-[50vh] md:h-[80vh] w-full object-cover"
                            />
                            <div className="p-4 text-muted-foreground text-sm">
                              {shot.caption}
                            </div>
                          </CardContent>
                        </Card>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="absolute left-[-16px] top-1/2 -translate-y-1/2 z-10" />
                  <CarouselNext className="absolute right-[-16px] top-1/2 -translate-y-1/2 z-10" />
                </Carousel>
              </section>
              {/*Ek rep aur movement*/}

<section className="py-8 -mt-8 px-4 max-w-3xl mx-auto text-center space-y-4">
  <h2 className="text-3xl tracking-tight  font-semibold font-Montserrat">
    #EkRepAur
  </h2>

  <p className="text-sm text-muted-foreground leading-relaxed">
    A movement for lifters who show up.
    <br />
    Upload your workout. Share your effort. Inspire the Clan.
    <br />
    This is how discipline spreads.
  </p>



</section>
<div className="flex w-full justify-center -mt-2">
  <EkRepAurDialog/>

</div>





              {/* Crime Stats */}
             <FeatureSlider/>

              <Separator className="my max-w-md mx-auto mb-8 mt-8" />


<div className="flex flex-col sm:flex-row justify-center items-center text-center text-sm text-muted-foreground mb-4 gap-2 px-4">
 {/* <a
    href="/assets/raven_saves_01.apk"
    download={true}

    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center text-primary underline hover:text-primary/80 transition"
  >
    <Globe className="w-4 h-4 mr-1" /> Download APK
  </a> */}
  {/* <span className="hidden sm:inline mx-1">|</span> */}

  {/* Google Play - disabled */}
  <span className="flex items-center text-muted-foreground cursor-not-allowed">
    <Play className="w-4 h-4 mr-1" /> Google Play (Coming soon)
  </span>

  <span className="hidden sm:inline mx-1">|</span>

  {/* iOS - coming soon */}
  <span className="flex items-center text-muted-foreground cursor-not-allowed">
    <Apple className="w-4 h-4 mr-1" /> iOS (Coming soon)
  </span>



  {/* Website APK download - enabled */}
 
</div>

              {/* Waitlist */}
              <section className="py-4 px-4 max-w-xl mx-auto text-center" id="waitlist">
                <h2 className="text-md font-semibold mb-2">Get Early Access</h2>
                <p className="text-muted-foreground text-xs mb-3">
                  Be the first to get updates, beta invites, and exclusive features.
                </p>

                {/* Progress Indicator */}
                <div className="mb-4 text-xs text-primary font-medium">
                  {count} / 10,000 Preachers signed up — <span className="underline">Be one now!</span>
                </div>

                {isJoined ? (
                  <p className="text-sm mt-2">
                    You're already on the waitlist. We'll keep you posted!
                  </p>
                ) : (
                  <>
                    <form
                      className="flex flex-col sm:flex-row gap-2 justify-center"
                      ref={formRef}
                      onSubmit={handleSubmit}
                    >
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        className="w-full sm:w-auto"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                      />
                      <Button type="submit" disabled={loading}>
                        {loading ? (
                          <svg
                            className="animate-spin h-4 w-4 text-primary"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                            />
                          </svg>
                        ) : (
                          "Sign Up"
                        )}
                      </Button>
                    </form>
                    {responseMessage && (
                      <p className="mt-2 text-sm ">
                        {responseMessage}
                      </p>
                    )}
                  </>
                )}
              </section>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
