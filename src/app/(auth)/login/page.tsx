"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import { setAuthToken } from "@/app/serverActions/setAuthToken"
import { toast } from "sonner"

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
})

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  })

interface LoginFormInputs {
    email: string;
    password: string;
}

const onSubmit = async (data: LoginFormInputs): Promise<void> => {
    setError(null)
    setSuccess(null)

    try {
     const res= await fetch(`${process.env.NEXT_BACKEND_URL}auth/login`, {
          headers:{
          "Content-Type": "application/json",
        }, method: "POST",
        body: JSON.stringify(data),
     })
      const json = await res.json()
      await setAuthToken(json.data.token);
      toast("Login successful!")
        setSuccess("Login successful!")
    } catch (err) {
      setError("Failed to login. Please check your credentials.")
      console.log(err, "error")
      toast("Failed to login. Please check your credentials.")
    }
}

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form  onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input  id="email" type="email" {...register("email")} />
                {errors.email?.message && <p className="text-sm text-red-500 mt-1">{String(errors.email.message)}</p>}
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input  id="password" type="password" {...register("password")} />
                {errors.password && <p className="text-sm text-red-500 mt-1">{String(errors.password.message)}</p>}
              </div>
            </div>
            {error && (
              <Alert variant="destructive" className="mt-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {success && (
              <Alert className="mt-4">
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}
            <Button type="submit" className="w-full mt-4" disabled={isSubmitting}>
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="justify-center">
        <p className="text-sm text-gray-600">
  Don&apos;t have an account?{" "}
  <Link href="/register" className="text-blue-600 hover:underline">
    Register here
  </Link>
</p>

        </CardFooter>
      </Card>
    </div>
  )
}

