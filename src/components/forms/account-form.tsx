import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "../ui/button"
import { useForm } from "react-hook-form"
import { cn } from "../../lib/utils"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"

export function AccountForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) {

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

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        alert(values)
        console.log(values)
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
                    <FormField
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
                    />

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

                    <Button type="submit" className="w-full">
                        Sign Up
                    </Button>
                </div>

            </form>

        </Form>
    </div>
}