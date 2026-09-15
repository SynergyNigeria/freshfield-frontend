"use client"

import ErrorPage from '@/components/ErrorPage'

export default function LoginPage() {
  return <ErrorPage code={503} title="Service Unavailable" message="The server is currently unable to handle login requests. Please try again later." />
}
