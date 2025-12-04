"use client";

import { useEffect } from "react";

export default function AuthCallback(){
        useEffect(() => {
            const hash = window.location.hash.substring(1);
            const params = new URLSearchParams(hash);
            const accessToken = params.get("access_token");
            

        }, []);

        
    return (
        <div></div>
    )
}