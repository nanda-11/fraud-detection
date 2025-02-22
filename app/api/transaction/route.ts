import { NextResponse } from "next/server"

// This is a simplified in-memory store. In a real application, you'd use a database.
const transactions: any[] = []

export async function POST(request: Request) {
  const body = await request.json()
  const { accountNumber, amount, description, behavioralData } = body

  // In a real application, you'd process the transaction and associate this data with the authenticated user
  transactions.push({
    accountNumber,
    amount,
    description,
    behavioralData,
    riskScore: calculateRiskScore(behavioralData),
  })

  return NextResponse.json({ success: true })
}

function calculateRiskScore(behavioralData: any): "Low" | "Medium" | "High" {
  // This is a simplified risk calculation. In a real application, you'd use more sophisticated algorithms.
  const keystrokeCount = behavioralData.keystrokes.length
  const mouseMovementCount = behavioralData.mouseMovements.length
  const mistakeCount = behavioralData.mistakes.length

  if (keystrokeCount > 100 || mouseMovementCount > 200 || mistakeCount > 5) {
    return "High"
  } else if (keystrokeCount > 50 || mouseMovementCount > 100 || mistakeCount > 2) {
    return "Medium"
  } else {
    return "Low"
  }
}

