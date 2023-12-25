import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import React from 'react'

export default async function page() {

    const cookieStore = cookies();
    const supabase = createServerComponentClient({ cookies: () => cookieStore });

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return (

            <main className="flex min-h-screen flex-col items-center p-24">
                <div className="z-10 max-w-5xl w-full items-center font-mono text-sm lg:flex">
                    Your are not logged in. <Link href="/login" className="underline">Login</Link>.
                </div>
            </main>
        )
    }

    return (
        <>
            Dashboard
        </>
    )
}
