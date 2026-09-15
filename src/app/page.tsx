"use client"

import ErrorPage from '@/components/ErrorPage'

export default function Page() {
  return <ErrorPage code={503} title="Service Unavailable" />
}