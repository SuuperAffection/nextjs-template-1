'use client'

import { Suspense } from "react"
import Form from "./form"
import Auth from "./auth/auth"


export default function Page() {

  return (
    <>
      <Suspense>
        <Auth />
        <Form />
      </Suspense>
    </>
  )
}