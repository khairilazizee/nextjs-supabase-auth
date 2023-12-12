"use client"
import React, { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation';

const LoginPage = () => {

    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)

    useEffect(() => {
        async function fetchUser() {
            const { data: { user } } = await supabase.auth.getUser()
            setUser(user)
            setLoading(false)
        }

        fetchUser();
    }, []);

    const supabase = createClientComponentClient();

    const handleSignUp = async () => {
        const res = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${location.origin}/auth/callback`
            }
        })
        setUser(res.data.user)
        router.refresh();
        setEmail('')
        setPassword('')
    }

    const handleSignIn = async () => {
        const res = await supabase.auth.signInWithPassword({
            email,
            password
        })
        setUser(res.data.user)
        router.refresh()
        setEmail('')
        setPassword('')
    }

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.refresh();
        setUser(null)
    }

    // console.log({ loading, user })

    if (loading) {
        return <h1>loading...</h1>
    }

    if (user) {
        return (
            <div>
                <div>
                    <h1>You are already logged in</h1>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className="flex flex-col justify-center items-center bg-black">
                <main className="h-screen flex flex-col items-center justify-center bg-black p-6">
                    <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mb-4 w-full p-3 rounded-md border border-gray-7-- bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500" autoComplete="off" placeholder="email@domain.com" />
                    <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mb-4 w-full p-3 rounded-md border border-gray-7-- bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500" />
                    <div className="gap-5 justify-between flex">
                        <button onClick={handleSignUp} className="hover:border-b-2">Sign Up</button>
                        <button onClick={handleSignIn} className="hover:border-b-2">Sign In</button>
                    </div>
                </main>
            </div>
        </>
    )
}

export default LoginPage