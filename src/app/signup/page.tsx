"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

const SignupPage = () => {
  const router = useRouter();

  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });

  // Removed unused variables: buttonDisabled, loading

  const onSignup = async () => {
    try {
      const response = await axios.post("/api/users/signup", user);
      console.log(response.data);
      router.push("/login");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log("Signup error:", error.message);
        toast.error(error.message);
      }
    }
  };

  // Removed useEffect for buttonDisabled

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
  <h1 className="text-center text-black text-2xl">Signup</h1>
      <br />
      <label htmlFor="username">username</label>
      <input
        className="p-2 text-black order border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        type="text"
        id="username"
        value={user.username}
        placeholder="username"
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />

      <label htmlFor="email">email</label>
      <input
        className="p-2 text-black order border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        type="text"
        id="email"
        value={user.email}
        placeholder="email"
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />

      <label htmlFor="password">password</label>
      <input
        className="p-2 text-black order border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        type="password"
        id="password"
        value={user.password}
        placeholder="password"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />

  <button onClick={onSignup} className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">Signup here</button>
      <Link href="/login">Visit login page</Link>
    </div>
  );
};

export default SignupPage;
