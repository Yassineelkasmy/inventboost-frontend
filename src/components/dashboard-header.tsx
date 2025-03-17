import { Thermometer, Heart, Activity, Droplet } from "lucide-react"
import { HealthMetricCard } from "./health-metric-card"

export function DashboardHeader() {
    return (
        <div className="w-full text-white">
            <div className="mb-4">
                <h1 className="text-2xl font-bold">Welcome, Kim!</h1>
                <p className="text-sm text-gray-400">Get your latest appointments and goals.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                <HealthMetricCard
                    title="Temperature"
                    value="36.7 C"
                    icon={<Thermometer className="h-5 w-5" />}
                    iconColor="text-amber-400"
                />

                <HealthMetricCard
                    title="Heart Rate"
                    value="95 rpm"
                    icon={<Heart className="h-5 w-5 fill-current" />}
                    iconColor="text-red-500"
                />

                <HealthMetricCard
                    title="Pulse Rate"
                    value="88 bpm"
                    icon={<Activity className="h-5 w-5" />}
                    iconColor="text-green-500"
                />

                <HealthMetricCard
                    title="Blood Pressure"
                    value="120/80 mm Hg"
                    icon={<Droplet className="h-5 w-5 fill-current" />}
                    iconColor="text-red-500"
                />

                <HealthMetricCard
                    title="CGM"
                    value="85 mg/dL"
                    icon={
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-5 w-5"
                        >
                            <path d="M12 2v6M12 22v-6M4.93 10.93l4.24 4.24M14.83 8.83l4.24 4.24M2 12h6M16 12h6M10.93 19.07l4.24-4.24M8.83 9.17l4.24-4.24" />
                        </svg>
                    }
                    iconColor="text-red-500"
                />
            </div>
        </div>
    )
}