export namespace User_AccountVO {

    export type Type = {
        id?: number
        displayName: string
        userId: string
        pw: string
        deleteFlag: boolean
        createUser?: number
        updateUser?: number
        creation: string
        modification: string
        version: number
    }

    export function create(): User_AccountVO.Type {
        return {
            displayName: '',
            userId: '',
            pw: '',
            deleteFlag: false,
            creation: '',
            modification: '',
            version: 0
        }
    }
}