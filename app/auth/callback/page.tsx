'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../lib/supabase';

export default function AuthCallbackPage() {
    const router = useRouter();

    useEffect(() => {
        // Handling the auth callback
        // The Supabase client automatically parses the URL (hash or query params)
        // and recovers the session. We just need to listen for the sign-in event.
        const handleAuth = async () => {
            const { error } = await supabase.auth.getSession();
            if (error) {
                console.error('Auth check error in callback:', error);
                router.push('/'); // Fallback
            }
        };

        handleAuth();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN' || session) {
                // Successful login
                router.push('/');
                router.refresh();
            }
        });

        return () => subscription.unsubscribe();
    }, [router]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="text-center animate-pulse">
                <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full mx-auto mb-4 animate-spin"></div>
                <h2 className="text-xl font-bold text-gray-900">Authenticating...</h2>
                <p className="text-gray-500">Please wait while we log you in.</p>
            </div>
        </div>
    );
}
