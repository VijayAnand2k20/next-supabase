"use client";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Login = () => {
  const [data, setData] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  const router = useRouter();

  const signup = async () => {
    try {
      const { data: response, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          emailRedirectTo: "http://localhost:3000",
        },
      });

      if (error) {
        console.log("error:", error);
      }

      if (response) {
        console.log("data:", response);
      }
    } catch (error) {
      console.log("error:", error);
    }
  };
  const login = async () => {
    try {
      const { data: response, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        console.log("error:", error);
      }

      if (response) {
        router.refresh();
        console.log("data:", response);
      }
    } catch (error) {
      console.log("error:", error);
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    console.log("data:", data);
    setData((prev: any) => ({ ...prev, [name]: value }));
  };

  return (
    <div
      className="
        container
        mx-auto
        w-[400px]
    "
    >
      <div className="grid">
        <label>Email</label>
        <input
          className="text-black"
          type="email"
          name="email"
          id="email"
          value={data?.email}
          onChange={handleChange}
        />
      </div>
      <div className="grid">
        <label>Password</label>
        <input
          className="text-black"
          type="password"
          name="password"
          id="password"
          value={data?.password}
          onChange={handleChange}
        />
      </div>
      <div>
        <button className="border-red-200" onClick={signup}>
          Sign up
        </button>
        <button className="border-blue-100" onClick={login}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
