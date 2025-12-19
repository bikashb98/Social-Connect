import {NextResponse} from 'next/server';
import supabase from '../../../../supabaseClient';
import {cookies} from 'next/headers';

export async function POST() {
    console.log('Received request to refresh token');
    const cookieStore = await cookies();
    const refresh_token = cookieStore.get('refresh_token');
    console.log('Refresh Token from Cookies:', refresh_token);
}