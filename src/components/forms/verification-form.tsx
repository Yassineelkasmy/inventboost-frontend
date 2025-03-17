import { Button } from "../ui/button"
import { cn } from "../../lib/utils"
import { useState } from "react"
import { Mic, Volume2 } from "lucide-react"
import { Slider } from "../ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Link } from "@tanstack/react-router"

export function VerificationForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) {

    const [volume, setVolume] = useState(70)


    return <div className={cn("flex flex-col gap-6", className)} {...props}>

        <div className="flex flex-col gap-2 text-center">

            <h1 className="text-xl font-bold">Verifying Your EHR Details…</h1>
            <div className="text-sm text-muted-foreground">
                Addy is securely reviewing your information. Please stay on this screen—we’ll notify you once the process is complete. For security reasons, do not refresh or close this window.
            </div>

        </div>
        <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center w-full p-6 bg-accent text-gray-200 rounded-lg ">
                <div className="relative">
                    <div className="w-24 h-24 rounded-full overflow-hidden">
                        <img
                            src="/shadcn.jpg"
                            alt="Profile avatar"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="w-full bg-accent rounded-md p-3">
                    <p className="text-sm text-gray-300 flex-1">
                        Addy is securely reviewing your information. This may take a moment as our system verifies your documents
                        and details. Please wait...
                    </p>
                </div>

                <Button variant="outline" className="h-15 w-15 border-gray-700">
                    <Mic />
                </Button>
            </div>

            <div className="w-full flex items-center justify-end space-x-4">
                <div className="flex items-center space-x-2">
                    <Volume2 className="h-5 w-5 text-gray-400" />
                    <Slider
                        value={[volume]}
                        max={100}
                        step={1}
                        className="w-32"
                        onValueChange={(value) => setVolume(value[0])}
                    />
                    <span className="text-sm text-gray-400 w-6">{volume}</span>
                </div>

                <Select defaultValue="english">
                    <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Language" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="arabiv">Arabic</SelectItem>
                        <SelectItem value="french">French</SelectItem>

                    </SelectContent>
                </Select>
            </div>
            <div className="flex flex-row gap-2">

                <Button className="flex-1">
                    <Link to="/dashboard">Proceed to Dashboard</Link>
                </Button>
            </div>
        </div>


    </div>
}