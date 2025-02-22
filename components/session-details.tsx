"use client"

import { useEffect, useState } from "react"

interface BehavioralData {
  login: {
    keystrokes: number
    mouseMovements: number
  }
  transaction: {
    keystrokes: number
    mouseMovements: number
    mistakes: number
  }
}

export default function SessionDetails() {
  const [ipAddress, setIpAddress] = useState("Fetching...")
  const [behavioralData, setBehavioralData] = useState<BehavioralData | null>(null)

  // Fetch Device IP Address
  useEffect(() => {
    const fetchIP = async () => {
      try {
        const response = await fetch("https://api.ipify.org?format=json")
        const data = await response.json()
        setIpAddress(data.ip)
      } catch (error) {
        setIpAddress("Error fetching IP")
      }
    }
    fetchIP()
  }, [])

  // Fetch behavioral data from localStorage
  useEffect(() => {
    const storedData = localStorage.getItem("combinedBehavioralData")
    if (storedData) {
      setBehavioralData(JSON.parse(storedData))
    }
  }, [])

  const calculateRiskScore = (data: BehavioralData): "Low" | "Medium" | "High" => {
    const totalKeystrokes = data.login.keystrokes + data.transaction.keystrokes
    const totalMouseMovements = data.login.mouseMovements + data.transaction.mouseMovements
    const mistakes = data.transaction.mistakes

    if (totalKeystrokes > 200 || totalMouseMovements > 400 || mistakes > 5) {
      return "High"
    } else if (totalKeystrokes > 100 || totalMouseMovements > 200 || mistakes > 2) {
      return "Medium"
    } else {
      return "Low"
    }
  }

  return (
    <div className="p-4 bg-transparent border border-white rounded-md text-white">
      <h2 className="text-lg font-bold mb-4">Session Details</h2>
      <p className="mb-2">
        <strong>Device IP:</strong> {ipAddress}
      </p>
      {behavioralData && (
        <>
          <h3 className="text-md font-semibold mt-4 mb-2">Login Page Activity:</h3>
          <p className="mb-2">
            <strong>Keystrokes:</strong> {behavioralData.login.keystrokes}
          </p>
          <p className="mb-2">
            <strong>Mouse Movements:</strong> {behavioralData.login.mouseMovements}
          </p>
          <h3 className="text-md font-semibold mt-4 mb-2">Transaction Page Activity:</h3>
          <p className="mb-2">
            <strong>Keystrokes:</strong> {behavioralData.transaction.keystrokes}
          </p>
          <p className="mb-2">
            <strong>Mouse Movements:</strong> {behavioralData.transaction.mouseMovements}
          </p>
          <p className="mb-2">
            <strong>Mistakes:</strong> {behavioralData.transaction.mistakes}
          </p>
          <h3 className="text-md font-semibold mt-4 mb-2">Risk Assessment:</h3>
          <p className="mb-2">
            <strong>Risk Score:</strong>{" "}
            <span
              className={`font-bold ${
                calculateRiskScore(behavioralData) === "Low"
                  ? "text-green-400"
                  : calculateRiskScore(behavioralData) === "Medium"
                    ? "text-yellow-400"
                    : "text-red-400"
              }`}
            >
              {calculateRiskScore(behavioralData)}
            </span>
          </p>
        </>
      )}
    </div>
  )
}

