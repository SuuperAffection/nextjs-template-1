import { use } from "react";
import { LoginAPI } from "../api/login/type";
import { ActionType } from "./reducer";

export namespace Action {
    export async function editForm(dispatch: React.Dispatch<ActionType>, type: string, value: any) {
        dispatch({
            type: 'EDIT_FORM',
            payload: {
                type,
                value
            }
        })
    }

    export async function login(dispatch: React.Dispatch<ActionType>, userId: string, pw: string) {
        dispatch({
            type: 'LOGIN_REQUEST'
        })

        try {

            const json: LoginAPI.POST.Request = {
                userId,
                pw
            }

            const res = await fetch(
                '/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(json)
            }
            )

            const result: LoginAPI.POST.Response = await res.json()

            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: {
                    nextURL: result.nextURL
                }
            })

        } catch (e) {
            dispatch({
                type: 'LOGIN_FAILURE'
            })
            throw e
        }
    }
}