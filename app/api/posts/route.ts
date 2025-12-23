import {NextResponse, NextRequest} from "next/server";
import supabase from "@/app/supabaseClient";

export async function POST (req: NextRequest) {
    const body = await req.json();

    const {data:user, error:userError} = await supabase.auth.getUser();

    if (userError || !user.user) {
        return NextResponse.json({error: "Unauthorized"}, {status: 401});
    }

    const id = user.user.id;

    const {error} = await supabase .from("posts").insert({
        content: body.content,
        author_id: id
    });

    if (error) {
        return NextResponse.json({error: error.message}, {status: 500});
    }

    return NextResponse.json({message: "Post created successfully"}, {status: 201});
}