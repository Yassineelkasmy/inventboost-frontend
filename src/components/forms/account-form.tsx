import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "../ui/button"
import { useForm } from "react-hook-form"
import { cn } from "../../lib/utils"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { useAuth } from "../../hooks/useAuth"
import { useEffect } from "react"
import { signInWithEmailAndPassword, signOut } from "firebase/auth"
import { auth } from "../../firebase"
import { useMutation } from "@tanstack/react-query"
import { userApi } from "../../api/userApi"
import { useDispatch } from "react-redux"
import { toast } from "sonner"

export function AccountForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) {


    const { user } = useAuth()

    const dispatch = useDispatch()

    const formSchema = z.object({
        email: z.string().email(),
        firstName: z.string().min(3),
        lastName: z.string().min(3),
        password: z.string().min(8),
        phoneNumber: z.string().min(10),
        accessCode: z.string().min(5),
    })


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    useEffect(() => {
        form.setValue('email', user?.email ?? "")
    }, [user?.email])

    const mutation = useMutation({
        mutationFn: userApi.signup,
        onSuccess: (resp) => {
            const email = form.getValues('email')
            const password = form.getValues('password')
            signInWithEmailAndPassword(auth, email, password).then((creds) => {
                toast.success('Account created ')
            })
        }
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        mutation.mutate({
            ...values,
            uid: user?.uid
        })
    }


    return <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Form {...form}>

            <form className="flex flex-col gap-6" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-col  gap-2">

                    <h1 className="text-xl font-bold">Get Started with Acme AI</h1>
                    <div className="text-sm text-muted-foreground">
                        Your AI-powered healthcare assistant is just a step away! Enter your unique registration code to create your account and unlock personalized medical support from Acme AI.
                    </div>


                </div>
                <div className="flex flex-col gap-6">
                    <div className="flex  row gap-6">
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="First Name" {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Last Name" {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="email"
                        disabled={Boolean(user?.email)}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Email Address" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {!Boolean(user) && <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />}

                    <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                            <FormItem >
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                    <Input placeholder="Your Phone Number" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="accessCode"
                        render={({ field }) => (
                            <FormItem >
                                <FormLabel>Access Code</FormLabel>
                                <FormControl>
                                    <Input placeholder="Your Access Code" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex flex-row gap-2">
                        <Button variant={'secondary'} className="flex-1" onClick={async (e) => {
                            e.preventDefault()
                            signOut(auth)

                        }}>
                            Cancell
                        </Button>
                        <Button type="submit" className="flex-1">
                            Sign Up
                        </Button>
                    </div>
                </div>

            </form>

        </Form>
    </div>
}