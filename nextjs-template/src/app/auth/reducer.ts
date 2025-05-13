
export type ActionType =
    {
        type: 'LOGIN_REQUEST'
    } |
    {
        type: 'LOGIN_SUCCESS'
    } |
    {
        type: 'LOGIN_FAILURE'
    }

export type State = {
    isWaiting: boolean
}

export function defaultState(): State {
    return {
        isWaiting: false
    }
}

export function reducer(state: State, action: ActionType): State {
    switch (action.type) {

        case 'LOGIN_REQUEST': return {
            ...state,
            isWaiting: true
        }
        case 'LOGIN_SUCCESS': return {
            ...state,
            isWaiting: false
        }
        case 'LOGIN_FAILURE': return {
            ...state,
            isWaiting: false
        }
    }
}