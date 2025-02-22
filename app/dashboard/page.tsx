import SessionDetails from "@/components/session-details"

export default function Dashboard() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-red-700">
      <div className="w-full max-w-2xl p-8 bg-transparent shadow-lg rounded-lg border border-white">
        <div className="flex justify-center mb-4">
          <a href="https://www.google.com/" target="_blank" rel="noopener noreferrer">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/IDFC_First_Bank_logo.jpg/640px-IDFC_First_Bank_logo.jpg"
              alt="IDFC FIRST Bank Logo"
              className="h-12"
            />
          </a>
        </div>
        <h2 className="text-2xl font-semibold text-center text-white mb-6">Fraud Detection Dashboard</h2>
        <SessionDetails />
      </div>
    </div>
  )
}

