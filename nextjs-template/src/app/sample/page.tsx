'use client'

import { Suspense } from "react"
import Form from "./form"
import Auth from "@/app/auth/auth"


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