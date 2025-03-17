import { Button } from "../ui/button"
import { cn } from "../../lib/utils"
import { useAuth } from "../../hooks/useAuth"
import { useDispatch } from "react-redux"
import { useState } from "react"
import { Check, Upload } from "lucide-react"

export function UploadDocumentForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) {


    const [isDragging, setIsDragging] = useState(false)
    const [file, setFile] = useState<File | null>(null)

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = () => {
        setIsDragging(false)
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            setFile(e.dataTransfer.files[0])
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0])
        }
    }

    return <div className={cn("flex flex-col gap-6", className)} {...props}>

        <div className="flex flex-col gap-2 text-center">

            <h1 className="text-xl font-bold">Please Upload the Image of Your Benefit Card</h1>
            <div className="text-sm text-muted-foreground">
                By securely integrating your benefits information, Addy can provide personalized recommendations and enhance your healthcare experience.
            </div>

        </div>
        <div className="flex flex-col gap-6">

            <div className="w-full max-w-xl p-6 bg-[#121212] text-gray-200 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Connection Options</h2>

                <div className="mb-6">
                    <p className="mb-2">Upload Document</p>
                    <label
                        htmlFor="file-upload"
                        className={`relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${isDragging ? "border-teal-400 bg-[#1a1a1a]" : "border-gray-600 hover:border-teal-400"
                            }`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            {file ? (
                                <>
                                    <Check className="w-10 h-10 mb-3 text-teal-400" />
                                    <p className="mb-2 text-sm text-center">
                                        <span className="font-semibold text-teal-400">{file.name}</span>
                                    </p>
                                    <p className="text-xs text-gray-400">{(file.size / 1024).toFixed(2)} KB</p>
                                </>
                            ) : (
                                <>
                                    <Upload className="w-10 h-10 mb-3 text-gray-400" />
                                    <p className="mb-2 text-sm text-center">
                                        <span className="font-semibold text-teal-400">Click to Upload</span> or drag and drop
                                    </p>
                                    <p className="text-xs text-gray-400 text-center">
                                        Images & Graphics Types: PDF or XML
                                        <br />
                                        or other document formats
                                    </p>
                                </>
                            )}
                        </div>
                        <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} />
                    </label>
                </div>

                <div className="text-sm text-gray-400">
                    By clicking "Sync Now," I agree that I consent to securely share my medical records with Acme in accordance with
                    our{" "}
                    <a href="#" className="text-teal-400 hover:underline">
                        Terms of Use
                    </a>
                    , and{" "}
                    <a href="#" className="text-teal-400 hover:underline">
                        Privacy Policy
                    </a>
                    .
                </div>
            </div>

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