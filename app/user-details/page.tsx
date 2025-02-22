import UserDetailsForm from "@/components/user-details-form"

export default function UserDetails() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="mb-8 text-4xl font-bold">User Details</h1>
      <UserDetailsForm />
    </main>
  )
}

