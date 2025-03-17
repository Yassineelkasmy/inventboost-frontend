import { Button } from "../ui/button"
import { cn } from "../../lib/utils"
import { useAuth } from "../../hooks/useAuth"
import { useDispatch } from "react-redux"

export function UploadDocumentForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) {

    const { user } = useAuth()

    const dispatch = useDispatch()

    return <div className={cn("flex flex-col gap-6", className)} {...props}>

        <div className="flex flex-col gap-2 text-center">

            <h1 className="text-xl font-bold">Please Upload the Image of Your Benefit Card</h1>
            <div className="text-sm text-muted-foreground">
                By securely integrating your benefits information, Addy can provide personalized recommendations and enhance your healthcare experience.
            </div>

        </div>
        <div className="flex flex-col gap-6">

            <div className="flex flex-row gap-2">
                <Button variant={'secondary'} className="flex-1">
                    Skip for now
                </Button>
                <Button type="submit" className="flex-1">
                    Sync Now
                </Button>
            </div>
        </div>


    </div>
}