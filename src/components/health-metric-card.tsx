import type React from "react"
import { cn } from "../lib/utils"

interface HealthMetricCardProps {
    title: string
    value: string
    icon: React.ReactNode
    iconColor?: string
    className?: string
}

export function HealthMetricCard({ title, value, icon, iconColor, className }: HealthMetricCardProps) {
    return (
        <div className={cn("flex items-center gap-3 bg-gray-800/50 rounded-md px-4 py-3", className)}>
            <div className={cn("flex-shrink-0", iconColor)}>{icon}</div>
            <div className="flex flex-col">
                <span className="text-sm text-gray-400">{title}</span>
                <span className="text-white font-medium">{value}</span>
            </div>
        </div>
    )
}

