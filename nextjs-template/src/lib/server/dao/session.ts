import { randomUUID } from "crypto"
import { ClientBase } from "pg"
import SQL, { SQLStatement } from "sql-template-strings"
import { Session } from "../entity/session"

export namespace SessionDAO {
    export function baseSQL(): SQLStatement {
        return SQL`
        SELECT 
            session.fkUser AS fkUser,
            session.token AS token,
            session.expiration AS expiration,
            session.createUser AS createUser,
            session.updateUser AS updateUser,
            session.creation AS creation,
            session.modification AS modificatin,
            session.version AS version
        FROM
            session
        `
    }

    export async function checkToken(client: ClientBase, token: string): Promise<Session.Type | undefined> {
        const result = await client.query(baseSQL().append(SQL`
            WHERE
                session.token = ${token}
            ORDER BY Session.creation DESC
            `))
        return result.rowCount ? result.rows[0] : undefined
    }

    export async function insert(client: ClientBase, id: number): Promise<string> {
        const token = randomUUID(); // UUID形式でtoken生成
        const expiration = new Date(Date.now() + 10 * 60 * 60 * 1000); // 10時間後

        await client.query(SQL`
            INSERT INTO Session (
                fkUser,
                token,
                expiration,
                createUser,
                updateUser,
                creation,
                modification,
                version
            ) VALUES (
                ${id}, 
                ${token},
                ${expiration},
                ${id}, 
                ${id},
                NOW(), 
                NOW(), 
                0
            )
        `)

        console.log(token)

        return token;
    }

    export async function deleteExpiredSession(client: ClientBase): Promise<number> {
        const result = await client.query(SQL`
            DELETE
            FROM
                Session
            WHERE
                Session.expiration < NOW()
        `)
        return result.rowCount ? result.rowCount : 0
    }
}