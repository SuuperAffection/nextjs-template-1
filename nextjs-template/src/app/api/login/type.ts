export namespace LoginAPI {
    export namespace POST {
        export type Request = {
            userId: string
            pw: string
        }

        export type Response = {
            nextURL: boolean
        }
    }
}