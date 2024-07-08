import { createContext, ReactNode, useState, useEffect } from 'react';

import { api } from '../services/apiClient';

import { destroyCookie, setCookie, parseCookies } from 'nookies';
import Router from 'next/router';

import { toast } from 'react-toastify';

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    signOut: () => void;
    signUp: (credentials: SignUpProps) => Promise<void>;
}

type UserProps = {
    id: string;
    name: string;
    email: string;
}

type SignInProps = {
    email: string;
    password: string;
}

type AuthProviderProps = {
    children: ReactNode;
}

type SignUpProps = {
    name: string;
    email: string;
    password: string;
}

export const AuthContext = createContext({} as AuthContextData);

export function signOut(){
    try{
        destroyCookie(undefined, '@leblanc.token');
        Router.push('/');
    }catch(e){
        console.log('error logout');
    }
}

export function AuthProvider({ children }: AuthProviderProps){
    const [user, setUser] = useState<UserProps>();
    const isAuthenticated = !!user; // transform to boolean

    useEffect(() => {
        const { '@leblanc.token': token } = parseCookies();
        if(token){
            api.get('userinfo').then(response => {
                const { id, name, email}  = response.data;
                setUser({
                    id,
                    name,
                    email
                });
            }).catch(() => {
                signOut();
            }); 
        }
    }, []);

    async function signIn({ email, password }: SignInProps){
        try{
            const response = await api.post('/session', {
                email,
                password
            })
            
            const { id, name, token } = response.data;
            setCookie(undefined, '@leblanc.token', token, {
                maxAge: 60*60*24*30,
                path: '/'
            });

            setUser({
                id,
                name,
                email
            });

            api.defaults.headers['Authorization'] = `Bearer ${token}`;

            toast.success('Successful login');

            Router.push('/dashboard');

        }catch(err){
            toast.error('Login error'); 
            console.log('error', err);
        }   
    }

    async function signUp({ name, email, password }: SignUpProps){
        try{
            const response = await api.post('/users', {
                name,
                email,
                password
            })

            toast.success('Signed up successfully')

            Router.push('/');
        }catch(err){
            toast.error('error at signup');
            console.log('error at signup', err);
        }
    }


    return(
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut, signUp }}>
            {children}
        </AuthContext.Provider>
    )
}