import { NextResponse } from "next/server"

export async function GET() {
  // In a real application, you'd fetch this data from your database based on the user's session
  const sessionData = {
    ip: "192.168.1.1",
    location: "Mumbai, India",
    keystrokeAnomalies: 3,
    mouseAnomalies: 2,
    mistakeAnomalies: 1,
    riskScore: "Medium" as const,
  }

  return NextResponse.json(sessionData)
}

