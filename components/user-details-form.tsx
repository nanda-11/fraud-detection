"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function UserDetailsForm() {
  const [name, setName] = useState("")
  const [city, setCity] = useState("")
  const [college, setCollege] = useState("")
  const [behavioralData, setBehavioralData] = useState({
    keystrokes: [],
    mouseMovements: [],
  })
  const [submitted, setSubmitted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const captureKeystrokes = (e: KeyboardEvent) => {
      setBehavioralData((prev) => ({
        ...prev,
        keystrokes: [...prev.keystrokes, { key: e.key, timestamp: Date.now() }],
      }))
    }

    const captureMouseMovements = (e: MouseEvent) => {
      setBehavioralData((prev) => ({
        ...prev,
        mouseMovements: [...prev.mouseMovements, { x: e.clientX, y: e.clientY, timestamp: Date.now() }],
      }))
    }

    document.addEventListener("keydown", captureKeystrokes)
    document.addEventListener("mousemove", captureMouseMovements)

    return () => {
      document.removeEventListener("keydown", captureKeystrokes)
      document.removeEventListener("mousemove", captureMouseMovements)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch("/api/user-details", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, city, college, behavioralData }),
    })

    if (response.ok) {
      setSubmitted(true)
    } else {
      alert("Submission failed. Please try again.")
    }
  }

  if (submitted) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Submission Successful</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Thank you for submitting your details.</p>
          <Button onClick={() => router.push("/dashboard")}>View Dashboard</Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="city">City</Label>
        <Input id="city" type="text" value={city} onChange={(e) => setCity(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="college">College</Label>
        <Input id="college" type="text" value={college} onChange={(e) => setCollege(e.target.value)} required />
      </div>
      <Button type="submit" className="w-full">
        Submit
      </Button>
    </form>
  )
}

