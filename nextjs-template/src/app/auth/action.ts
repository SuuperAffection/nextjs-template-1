import { ActionType } from "./reducer";

export namespace Action {
    export async function checkLogin(dispatch: React.Dispatch<ActionType>) {
        dispatch({
            type: 'LOGIN_REQUEST'
        })
        try {

            const res = await fetch(
                '/api/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: ''
            }
            )

            if (res.status === 401) {
                throw { status: 401 }
            }

            dispatch({
                type: 'LOGIN_SUCCESS'
            })

        } catch (e) {
            dispatch({
                type: 'LOGIN_FAILURE'
            })
            throw e
        }
    }
}