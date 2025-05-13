import { ClientBase } from "pg"
import { use } from "react"
import SQL, { SQLStatement } from "sql-template-strings"
import { User_Account } from "../entity/user_account"

export namespace UserAccountDAO {
    export function baseSQL(): SQLStatement {
        return SQL`
            SELECT
            user_account.id AS id,
            user_account.displayName AS displayName,
            user_account.userId AS userId,
            user_account.pw AS pw,
            user_account.deleteFlag AS deleteFlag,
            user_account.createUser AS createUser,
            user_account.updateUser AS updateUser,
            user_account.creation AS creation,
            user_account.modification AS modification,
            user_account.version AS version
        FROM
            User_Account
            `
    }


    export async function getByID(client: ClientBase, id: number): Promise<User_Account.Type | undefined> {
        const result = await client.query(baseSQL().append(SQL`
            WHERE 
                user_account.id = ${id} AND
                user_account.deleteFlag = FALSE
            `))

        return result.rows[0]
    }


    export async function getByUserIdAndPass(client: ClientBase, userId: string, pw: string): Promise<User_Account.Type | undefined> {
        const result = await client.query(baseSQL().append(SQL`
            WHERE
                user_account.userId = ${userId} AND
                user_account.pw = ${pw} AND
                user_account.deleteFlag = FALSE
            `))

        return result.rows[0]

    }

}