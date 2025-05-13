import { NextRequest, NextResponse } from "next/server";
import { AuthAPI } from "./type";
import { ErrorInfo } from "react";
import { ServerHandler } from "@/lib/server/util/db_util";
import { StringUtils } from "@/lib/common/util/string_utils";
import { SessionDAO } from "@/lib/server/dao/session";
import { AuthenticationExeption } from "@/lib/server/util/exeption";

export const dynamic = 'force-dynamic'

export async function POST(
    req: NextRequest
): Promise<NextResponse<AuthAPI.POST.Response | ErrorInfo>> {
    return ServerHandler.transaction(async (client) => {
        const token = StringUtils.nvl(req.cookies.get('token')?.value)
        const user = await SessionDAO.checkToken(client, token)

        console.log(token)

        if (user === undefined) {
            throw new AuthenticationExeption()
        }

        return NextResponse.json({})
    })
}