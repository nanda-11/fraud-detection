import { NextResponse } from "next/server"

// This is a simplified in-memory store. In a real application, you'd use a database.
const users: any[] = []

export async function POST(request: Request) {
  const body = await request.json()
  const { name, city, college, behavioralData } = body

  // In a real application, you'd associate this data with the authenticated user
  users.push({ name, city, college, behavioralData, riskScore: calculateRiskScore(behavioralData) })

  return NextResponse.json({ success: true })
}

function calculateRiskScore(behavioralData: any): "Low" | "Medium" | "High" {
  // This is a simplified risk calculation. In a real application, you'd use more sophisticated algorithms.
  const keystrokeCount = behavioralData.keystrokes.length
  const mouseMovementCount = behavioralData.mouseMovements.length

  if (keystrokeCount > 100 || mouseMovementCount > 200) {
    return "High"
  } else if (keystrokeCount > 50 || mouseMovementCount > 100) {
    return "Medium"
  } else {
    return "Low"
  }
}

