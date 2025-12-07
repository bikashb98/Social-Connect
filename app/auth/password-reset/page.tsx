'use client';

import {useEffect, useState} from "react";

export default function AuthPasswordReset () {
    const [password, setPassword] = useState("");

    useEffect (() => { 
        const hash = window.location.hash.substring(1);
        const params = new URLSearchParams (hash);
        const accessToken = params.get ("access_token");
       
        if (!accessToken) {
            console.error("No access token found in URL");
            return;
        }
    }, [])
    
    return (
        <div>
            <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
            />
            <button onClick={() => console.log('Password:', password)}>
                Reset Password
            </button>
        </div>
    )
}