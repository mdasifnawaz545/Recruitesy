import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function midleware(request: NextRequest) {

    const secret = process.env.AUTH_SECRET_KEY;
    const token = await getToken({ req: request, secret }); // we also have to pass the secret of the auth along with the token.
    const redirectUrl = request.nextUrl

    if (token && redirectUrl.pathname.startsWith('/signin')) {

        return NextResponse.redirect(new URL("/home", request.url))
    }

    if (token && redirectUrl.pathname.startsWith('/home')) {

        return NextResponse.next();
    }

    if (!token && redirectUrl.pathname.startsWith('/signout') || redirectUrl.pathname.startsWith('/home')) {

        return NextResponse.redirect(new URL('/signin', request.url))
    }
    return NextResponse.next();

}

export const config = {
    matcher: ['/signin', '/home/:path*', '/api/:path*']

}