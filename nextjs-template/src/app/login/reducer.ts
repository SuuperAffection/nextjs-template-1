
export type ActionType =
    {
        type: 'EDIT_FORM'
        payload: {
            type: string,
            value: any
        }
    } |
    {
        type: 'LOGIN_REQUEST'
    } |
    {
        type: 'LOGIN_SUCCESS'
        payload: {
            nextURL: boolean
        }
    } |
    {
        type: 'LOGIN_FAILURE'
    }

export type State = {
    isWaiting: boolean
    userId: string
    pw: string
    nextURL: boolean
}

export function defaultState(): State {
    return {
        isWaiting: false,
        userId: '',
        pw: '',
        nextURL: false
    }
}

export function reducer(state: State, action: ActionType): State {
    switch (action.type) {
        case 'EDIT_FORM': {
            switch (action.payload.type) {
                case 'userId': return {
                    ...state,
                    userId: action.payload.value
                }
                case 'pw': return {
                    ...state,
                    pw: action.payload.value
                }
            }
        }
        case 'LOGIN_REQUEST': return {
            ...state,
            isWaiting: true
        }
        case 'LOGIN_SUCCESS': return {
            ...state,
            isWaiting: false,
            nextURL: action.payload.nextURL
        }
        case 'LOGIN_FAILURE': return {
            ...state,
            isWaiting: false
        }
    }
    return state
}