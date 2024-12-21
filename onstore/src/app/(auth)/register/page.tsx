"use client"; 
import { useState } from "react";
import Layout from "../../components/Layout";
import router from "next/router";

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [subscribe, setSubscribe] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3002/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            console.log('Login successful:', data.accessToken);
            setLoginStatus("Login successful");

            // Store the access token in localStorage
            localStorage.setItem('accessToken', data.accessToken);
            setTimeout(() => {
                router.push('/');
            }, 1500);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('An unexpected error occurred');
            }
        }
        console.log({ username, email, password, subscribe });
    };

    return (
        <Layout>
            <div className="flex justify-center items-center h-screen">
                <div className="flex flex-col w-full max-w-lg p-6 border rounded-lg shadow-md ">
                    <h1 className="text-2xl font-bold text-center mb-4">Create an Account</h1>
                    <form className="mt-4" onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-sm font-medium ">Username</label>
                            <input 
                                type="text" 
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)} 
                                required 
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium ">Email</label>
                            <input 
                                type="email" 
                                id="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} 
                                required 
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium ">Password</label>
                            <input 
                                type="password" 
                                id="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} 
                                required 
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex items-center mb-4">
                            <input 
                                type="checkbox" 
                                id="subscribe" 
                                checked={subscribe}
                                onChange={() => setSubscribe(!subscribe)}
                                className="mr-2"
                            />
                            <label htmlFor="subscribe" className="text-sm">Subscribe to stay updated with new products and offers!</label>
                        </div>
                        <button 
                            type="submit" 
                            className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
                        >
                            SUBMIT
                        </button>
                    </form>
                </div>
            </div>
        </Layout>
    );
}