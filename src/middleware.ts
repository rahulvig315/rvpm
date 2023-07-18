import { NextRequest, NextResponse } from "next/server";

export { default } from "next-auth/middleware";

export function middleware(request: NextRequest) {
    return NextResponse.redirect(new URL('/', request.url))
}


export const config = {
    matcher: ["/((?!|api).*)"],
};