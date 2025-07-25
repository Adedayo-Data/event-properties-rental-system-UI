"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password.trim()) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // Submit form or handle success
      alert("Logged in successfully!");
      setFormData({ email: "", password: "" });
      setErrors({});
    }
  };

  return (
    <div className="bg-gray-50 pb-30">
      <p className="text-4xl font-bold mb-4 text-center pt-8">Login</p>
      <form
        onSubmit={handleSubmit}
        className="space-y-10 max-w-md mx-auto p-6 mt-8 border border-gray-300 rounded-md shadow-md bg-white"
      >
        <p className="text-4xl font-bold mb-4 text-center pt-8 pb-5">KV</p>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            aria-invalid={!!errors.email}
            aria-describedby="email-error"
            className="w-full mt-1"
          />
          {errors.email && (
            <p id="email-error" className="text-red-600 text-sm mt-1">
              {errors.email}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            aria-invalid={!!errors.password}
            aria-describedby="password-error"
            className="w-full mt-1"
          />
          {errors.password && (
            <p id="password-error" className="text-red-600 text-sm mt-1">
              {errors.password}
            </p>
          )}
        </div>
        <Button
          type="submit"
          disabled={Object.keys(errors).length > 0}
          className="w-full"
        >
          Log In
        </Button>
        <p className="text-center text-sm">
          Already have an account ?{" "}
          <Link href="/signup" className="text-blue-500">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
