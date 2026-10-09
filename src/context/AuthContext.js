'use client';

import React, { createContext, useContext } from 'react';
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const { data: session, isPending, refetch } = authClient.useSession();
  const user = session?.user || null;

  const logout = async () => {
    try {
      await authClient.signOut();
      toast.success('সফলভাবে সাইন আউট করা হয়েছে!');
    } catch {
      toast.error('সাইন আউট করতে সমস্যা হয়েছে');
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading: isPending, logout, refetch }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}