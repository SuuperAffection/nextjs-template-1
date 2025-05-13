'use client'

import { useEffect, useReducer } from "react"
import { defaultState, reducer } from "./reducer"
import { Action } from "./action"
import { useRouter } from "next/navigation"

export default function Auth() {
    const [state, dispatch] = useReducer(reducer, undefined, defaultState)
    const router = useRouter()

    useEffect(() => {
        Action.checkLogin(dispatch).catch((e: any) => {
            if (e.status === 401) {
                router.push('/')
            }
        })
    }, [])

    return undefined
}