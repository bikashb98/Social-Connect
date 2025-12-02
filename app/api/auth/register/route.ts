import * as z from "zod";
import supabase from "@/app/supabaseClient";

const registrationSchema = z.object({
    username: z.string().min(3).max(30), 
    email: z.email(), 
    password: z.string().min(8).max(20),
    first_name: z.string(),
    last_name: z.string(), 
    user_type: z.string().optional(),
    is_active: z.boolean().optional(),
    last_login: z.date().optional(),
    created_at: z.date().optional()


})
export async function POST(req:Request) {
    const body = await req.json();
    const parsedBody = registrationSchema.safeParse(body);

    if(!parsedBody.success) {
        return new Response(JSON.stringify({ error: "Invalid registration data" }), { status: 400 });
    }

    const { username, email, password, first_name, last_name, user_type, is_active, last_login, created_at  } = parsedBody.data;

    const { data: matchdata, error: matcherror } = await supabase
        .from('users')
        .select('id')
        .or(`username.eq.${username},email.eq.${email}`)
        .limit(1);

    if (matcherror) {
        return new Response(JSON.stringify({ error: "Database query error" + matcherror.message }), { status: 500 });
     }
    
    if (matchdata && matchdata.length > 0) {
        return new Response(JSON.stringify({ error: "Username or email already exists" }), { status: 409 });
    }

    const { data : signupData, error: signupError } = await supabase.auth.signUp(
  {
    email: `${email}`,
    password: `${password}`,
    options: {
      data:{ username },
      emailRedirectTo: ' http://localhost:3000/page.tsx'
    }
  }
)

if (signupError) {
    return new Response(JSON.stringify({ error: "Signup error: " + signupError.message }), { status: 500 });
}

 return new Response(JSON.stringify({ success: true, message: "Verification email sent. Please confirm your email to activate your account." }), { status: 200 });
}





