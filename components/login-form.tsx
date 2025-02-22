"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export default function LoginForm() {
  const [customerId, setCustomerId] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const [behavioralData, setBehavioralData] = useState({
    keystrokes: 0,
    mouseMovements: 0,
  })

  useEffect(() => {
    const handleKeyDown = () => {
      setBehavioralData((prev) => ({ ...prev, keystrokes: prev.keystrokes + 1 }))
    }
    const handleMouseMove = () => {
      setBehavioralData((prev) => ({ ...prev, mouseMovements: prev.mouseMovements + 1 }))
    }

    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("mousemove", handleMouseMove)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, you would validate credentials here
    localStorage.setItem("loginBehavioralData", JSON.stringify(behavioralData))
    router.push("/transaction")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="customerId" className="text-white font-medium">
          Customer ID
        </Label>
        <Input
          id="customerId"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
          required
          className="bg-transparent border border-white text-white rounded-lg p-3 w-full"
        />
      </div>
      <div>
        <Label htmlFor="password" className="text-white font-medium">
          Password
        </Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="bg-transparent border border-white text-white rounded-lg p-3 w-full"
        />
      </div>
      <Button type="submit" className="w-full bg-white text-red-700 font-bold py-3 rounded-lg hover:bg-gray-200">
        Login
      </Button>
    </form>
  )
}

