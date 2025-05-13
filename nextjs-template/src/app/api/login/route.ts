import { NextRequest, NextResponse } from "next/server"
import { LoginAPI } from "./type"
import { ErrorInfo } from "react"
import { ServerHandler } from "@/lib/server/util/db_util"
import { StringUtils } from "@/lib/common/util/string_utils";
import { SessionDAO } from "@/lib/server/dao/session";
import { UserAccountDAO } from "@/lib/server/dao/user_account";
import { AuthenticationExeption } from "@/lib/server/util/exeption";

export const dynamic = 'force-dynamic'

export async function POST(
    req: NextRequest
): Promise<NextResponse<LoginAPI.POST.Response | ErrorInfo>> {
    return ServerHandler.transaction(async (client) => {
        const token = StringUtils.nvl(req.cookies.get('token')?.value)
        const user = await SessionDAO.checkToken(client, token)

        const nextURL = true

        if (user !== undefined) {
            return NextResponse.json({
                nextURL
            })
        }

        let newToken: string = ''

        const request: LoginAPI.POST.Request = await req.json()

        const u = await UserAccountDAO.getByUserIdAndPass(client, request.userId, request.pw)

        if (u === undefined) {
            throw new AuthenticationExeption()
        }

        newToken = await SessionDAO.insert(client, u.id as number)

        await SessionDAO.deleteExpiredSession(client)

        return NextResponse.json({
            nextURL
        }, {
            headers: {
                'Set-Cookie': `token=${newToken}; Path=/; SameSite=Lax; HttpOnly; Secure;`
            }
        })
    })
}