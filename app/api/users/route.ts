import supabase from '../../supabaseClient';

export async function GET () {

    const {data: users, error} = await supabase.auth.getUser();

    if (error) {
        return new Response(JSON.stringify({error: error.message}), {status: 500});
    }

    const id = users.user?.id;

    const {data: userData, error: userDataError} =  await supabase .from('users').select('user_type').eq('id', id).single();

    if (userDataError) {
        return new Response(JSON.stringify({error: userDataError.message}), {status: 500});
    }

    const {user_type} = userData;

    if (user_type !== 'admin') {
        return new Response(JSON.stringify({error: 'Forbidden'}), {status: 403});
    }

    const {data: fetchUsers, error: fetchUsersError} = await supabase .from('users') .select('username');
    
    if (fetchUsersError) {
        return new Response(JSON.stringify({error: fetchUsersError.message}), {status: 500});
    }


    return new Response(JSON.stringify({users: fetchUsers}), {status: 200});
}