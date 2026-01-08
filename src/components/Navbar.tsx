import  { useEffect, useState } from "react"
import { Button } from "../components/ui/button"
import { Moon, Sun, } from "lucide-react"
import { useTheme } from "next-themes"
import Logo from "../assets/logo.png"

function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

export default function Navbar() {
  const { theme } = useTheme()
  const [hasToken, setHasToken] = useState<boolean>(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    setHasToken(!!token)
  }, [])

  return (
    <div className="w-full fixed top-0 z-30 right-0 left-0 bg-opacity-70  px-4 py-2 border-b border-border  bg-background flex items-center justify-between">

      <div className="text-xl font-bold flex items-center font-Montserrat ">
        <img
          src={Logo}
          alt="Logo"
          className={`h-14 scale-125 rounded-full transition duration-300 ${
            theme === "light" ? "invert" : ""
          }`}
        />
        PreacherClan
      </div>


      <div className="hidden md:flex gap-4 font-sans">
        <a href="#home"><Button variant="ghost">Home</Button></a>
        <a href="#about"><Button variant="ghost">About</Button></a>
        <a href="#features"><Button variant="ghost">Features</Button></a>
        <a href="#waitlist"><Button variant="ghost">Waitlist</Button></a>
      </div>


      <div className="flex items-center gap-2 font-Montserrat">
        <ThemeToggle />

        {hasToken ? (
          <span className="text-xs ">Hi there </span>
        ) : (
          <a href="#waitlist">
            <Button variant="outline">Join</Button>
          </a>
        )}


       
      </div>
    </div>
  )
}
