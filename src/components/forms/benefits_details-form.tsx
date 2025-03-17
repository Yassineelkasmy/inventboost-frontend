import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "../ui/button"
import { useForm } from "react-hook-form"
import { cn } from "../../lib/utils"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { useAuth } from "../../hooks/useAuth"
import { useMutation } from "@tanstack/react-query"
import { useProviders, userApi } from "../../api/userApi"
import { useDispatch } from "react-redux"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { toast } from "sonner"
import { queryClient } from "../../main"
import { useCallback } from "react"

export function BenefitsDetailsForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) {


    const { user } = useAuth()

    const dispatch = useDispatch()

    const { data: providers, isLoading: loadingProviders } = useProviders()

    const formSchema = z.object({
        provider: z.string().min(5),
        memberId: z.string().min(5),
        groupNumber: z.string().min(5),
    })


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    const mutation = useMutation({
        mutationFn: userApi.syncBenefits,
        onSuccess: () => {
            toast.success('Sycned Successfully')
            queryClient.refetchQueries({ queryKey: ['user'] })
        }
    })


    const onSubmit = (values: z.infer<typeof formSchema>) => {
        mutation.mutate(values)
    }



    if (!providers || loadingProviders) return null


    return <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Form {...form}>

            <form className="flex flex-col gap-6" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-2 text-center">

                    <h1 className="text-xl font-bold">Verifying Your Benefits Details…</h1>
                    <div className="text-sm text-muted-foreground">
                        By securely integrating your insurance information, Addy can provide personalized recommendations and enhance your healthcare experience.
                    </div>


                </div>
                <div className="flex flex-col gap-6">
                    <FormField
                        control={form.control}
                        name="provider"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Find your insurance provider</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder='Select a provider' />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {providers.map((provider) => <SelectItem id={provider.id} value={provider.id}>{provider.name}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="memberId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Member ID</FormLabel>
                                <FormControl>
                                    <Input placeholder="Your Member ID" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />


                    <FormField
                        control={form.control}
                        name="groupNumber"
                        render={({ field }) => (
                            <FormItem >
                                <FormLabel>Group Number</FormLabel>
                                <FormControl>
                                    <Input placeholder="Your Group Number" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />


                    <div className="flex flex-row gap-2">

                        <Button type="submit" className="flex-1">
                            Sync Now
                        </Button>
                    </div>
                </div>

            </form>

        </Form>
    </div>
}