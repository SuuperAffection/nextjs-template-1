export namespace Session {
    export type Type = {
        fkUser?: number
        token: string
        expiration?: Date

        createUser?: number
        updateUser?: number
        creation?: Date
        modification?: Date
        version: number
    }

    export function create(): Session.Type {
        return {
            token: '',

            version: 0
        }
    }
}