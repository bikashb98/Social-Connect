import {NextResponse} from 'next/server';
import supabase from '../../../../supabaseClient';
import {cookies} from 'next/headers';

export async function POST() {
    const cookieStore = await cookies();
    const refresh_token = cookieStore.get('refresh_token')?.value;

    if (!refresh_token) {
        return NextResponse.json({ error: 'No refresh token found' }, { status: 401 });
    }

    const {data, error} = await supabase.auth.refreshSession({refresh_token});

    if (error || !data.session) {
        return NextResponse.json({ error: error?.message || 'Failed to refresh token' }, { status: 400 });
    }

    const session = data?.session;

    const res = NextResponse.json ({ message: 'Token refreshed' }, { status: 200 });

    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'development',
        sameSite: 'lax' as const,
        path: '/',
        maxAge: 60 * 60 * 24,
    };

    res.cookies.set ('access_token', session.access_token, cookieOptions);
    res.cookies.set ('refresh_token', session.refresh_token, cookieOptions);

    return res;


}