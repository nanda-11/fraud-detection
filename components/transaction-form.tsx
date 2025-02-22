"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

export default function TransactionForm() {
  const [accountNumber, setAccountNumber] = useState("")
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")
  const [behavioralData, setBehavioralData] = useState({
    keystrokes: 0,
    mouseMovements: 0,
    mistakes: 0,
  })
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const router = useRouter()

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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    const oldValue = e.target.value
    setter(e.target.value)

    // Check for mistakes (e.g., backspace or delete key usage)
    if (e.target.value.length < oldValue.length) {
      setBehavioralData((prev) => ({ ...prev, mistakes: prev.mistakes + 1 }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const loginData = JSON.parse(localStorage.getItem("loginBehavioralData") || "{}")
    const combinedData = {
      login: loginData,
      transaction: behavioralData,
    }
    localStorage.setItem("combinedBehavioralData", JSON.stringify(combinedData))
    setShowSuccessDialog(true)
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="accountNumber" className="text-white font-medium">
            Recipient's Account Number
          </Label>
          <Input
            id="accountNumber"
            name="accountNumber"
            value={accountNumber}
            onChange={(e) => handleInputChange(e, setAccountNumber)}
            required
            className="bg-transparent border border-white text-white rounded-lg p-3 w-full"
          />
        </div>
        <div>
          <Label htmlFor="amount" className="text-white font-medium">
            Amount (₹)
          </Label>
          <Input
            id="amount"
            name="amount"
            type="number"
            value={amount}
            onChange={(e) => handleInputChange(e, setAmount)}
            required
            className="bg-transparent border border-white text-white rounded-lg p-3 w-full"
          />
        </div>
        <div>
          <Label htmlFor="description" className="text-white font-medium">
            Description
          </Label>
          <Input
            id="description"
            name="description"
            value={description}
            onChange={(e) => handleInputChange(e, setDescription)}
            className="bg-transparent border border-white text-white rounded-lg p-3 w-full"
          />
        </div>
        <Button type="submit" className="w-full bg-white text-red-700 font-bold py-3 rounded-lg hover:bg-gray-200">
          Send Money
        </Button>
      </form>

      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="bg-red-700 text-white">
          <DialogHeader>
            <DialogTitle>Transaction Successful</DialogTitle>
          </DialogHeader>
          <p>Your money has been sent successfully!</p>
          <DialogFooter>
            <Button onClick={() => setShowSuccessDialog(false)} className="bg-white text-red-700 hover:bg-gray-200">
              Close
            </Button>
            <Button
              onClick={() => router.push("/dashboard")}
              variant="outline"
              className="bg-transparent text-white border-white hover:bg-white hover:text-red-700"
            >
              View Dashboard
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

