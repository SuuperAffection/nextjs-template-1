export namespace User_Account {
    export type Type = {
        id?: number
        displayName: string
        userId: string
        pw: string
        deleteFlag: boolean
        createUser?: number
        updateUser?: number
        creation?: Date
        modification?: Date
        version: number
    }

    export function create(): User_Account.Type {
        return {
            displayName: '',
            userId: '',
            pw: '',
            deleteFlag: false,
            version: 0
        }
    }
}
