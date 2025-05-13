import { Pool, PoolClient } from 'pg'
import { NextResponse } from 'next/server'
import {
    AuthenticationExeption,
    ConsistencyExeption,
    ForbiddenException,
    NotSupportedException,
    ServerExeption,
    SystemExeption
} from './exeption'

const pool = new Pool({
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB || 'next_db',
    port: parseInt(process.env.POSTGRES_PORT || '5432'),
})

export namespace ServerHandler {
    export async function createConnection(): Promise<PoolClient> {
        try {
            return await pool.connect()
        } catch (e) {
            throw new SystemExeption()
        }
    }

    export async function transaction<T>(
        callback: (client: PoolClient) => Promise<NextResponse<T>>
    ): Promise<NextResponse<T>> {
        const client = await createConnection()
        try {
            await client.query('BEGIN')

            const result = await callback(client)

            await client.query('COMMIT')
            return result
        } catch (e) {
            await client.query('ROLLBACK')
            return await errorHandler(e)
        } finally {
            client.release()
        }
    }

    async function errorHandler(e: any): Promise<NextResponse<any>> {
        console.error(e)

        if (e instanceof AuthenticationExeption) {
            return NextResponse.json({}, {
                status: 401,
                headers: {
                    'Set-Cookie': 'token=; Path=/; SameSite=Lax; HttpOnly; Secure;'
                }
            })
        } else if (e instanceof ConsistencyExeption) {
            return NextResponse.json({}, { status: 409 })
        } else if (e instanceof ForbiddenException) {
            return NextResponse.json({}, { status: 403 })
        } else if (e instanceof SystemExeption || e instanceof ServerExeption || e instanceof NotSupportedException) {
            return NextResponse.json({}, { status: 500 })
        }

        return NextResponse.json({}, { status: 500 })
    }
}
