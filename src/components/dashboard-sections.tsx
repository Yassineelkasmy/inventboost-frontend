import { Apple, Brain, ChevronDown, ChevronLeft, ChevronRight, Eye, Pill, Stethoscope } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { useEffect, useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart"
import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar } from "recharts"
import { ScrollArea } from "./ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

// Sample data for the charts
const temperatureData = [
    { month: "Jun", value: 36.5 },
    { month: "Jul", value: 36.7 },
    { month: "Aug", value: 36.8 },
    { month: "Sep", value: 36.6 },
    { month: "Oct", value: 36.5 },
    { month: "Nov", value: 36.4 },
    { month: "Dec", value: 36.3 },
]

const heartRateData = [
    { month: "Jun", value: 92 },
    { month: "Jul", value: 95 },
    { month: "Aug", value: 98 },
    { month: "Sep", value: 94 },
    { month: "Oct", value: 93 },
    { month: "Nov", value: 90 },
    { month: "Dec", value: 91 },
]

const pulseRateData = [
    { month: "Jun", value: 85 },
    { month: "Jul", value: 88 },
    { month: "Aug", value: 90 },
    { month: "Sep", value: 87 },
    { month: "Oct", value: 86 },
    { month: "Nov", value: 84 },
    { month: "Dec", value: 85 },
]

const bloodPressureData = [
    { month: "Jun", systolic: 120, diastolic: 80 },
    { month: "Jul", systolic: 122, diastolic: 82 },
    { month: "Aug", systolic: 125, diastolic: 83 },
    { month: "Sep", systolic: 121, diastolic: 81 },
    { month: "Oct", systolic: 119, diastolic: 79 },
    { month: "Nov", systolic: 118, diastolic: 78 },
    { month: "Dec", systolic: 120, diastolic: 80 },
]

export function HealthKeyMetricsSection() {
    const [activeTab, setActiveTab] = useState("temperature")
    const [isMobile, setIsMobile] = useState(false)
    const [chartHeight, setChartHeight] = useState(180)

    useEffect(() => {
        const checkIfMobile = () => {
            const mobile = window.innerWidth < 768
            setIsMobile(mobile)
            setChartHeight(mobile ? 150 : 180)
        }

        checkIfMobile()

        window.addEventListener("resize", checkIfMobile)

        return () => {
            window.removeEventListener("resize", checkIfMobile)
        }
    }, [])

    const renderChart = () => {
        const mobileProps = {
            fontSize: isMobile ? 10 : 12,
            dotRadius: isMobile ? 2 : 3,
            activeDotRadius: isMobile ? 4 : 5,
            strokeWidth: isMobile ? 1.5 : 2,
            margin: isMobile ? { top: 5, right: 10, left: 0, bottom: 5 } : { top: 10, right: 20, left: 10, bottom: 5 },
        }

        switch (activeTab) {
            case "temperature":
                return (
                    <ChartContainer
                        config={{
                            temperature: {
                                label: "Temperature",
                                color: "hsl(142, 76%, 36%)",
                            },
                        }}
                    >
                        <ResponsiveContainer width="100%" height={chartHeight}>
                            <LineChart data={temperatureData} margin={mobileProps.margin}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                                <XAxis
                                    dataKey="month"
                                    stroke="#666"
                                    tick={{ fill: "#666", fontSize: mobileProps.fontSize }}
                                    axisLine={{ stroke: "#333" }}
                                    tickLine={false}
                                    tickFormatter={isMobile ? (value) => value.substring(0, 1) : undefined}
                                />
                                <YAxis
                                    domain={[35, 40]}
                                    stroke="#666"
                                    tick={{ fill: "#666", fontSize: mobileProps.fontSize }}
                                    axisLine={{ stroke: "#333" }}
                                    tickLine={false}
                                    ticks={isMobile ? [35, 37, 39] : [35, 36, 37, 38, 39, 40]}
                                    width={isMobile ? 20 : 30}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "#222",
                                        border: "none",
                                        borderRadius: "4px",
                                        fontSize: mobileProps.fontSize,
                                    }}
                                    labelStyle={{ color: "#ccc" }}
                                    itemStyle={{ color: "#4ade80" }}
                                    formatter={(value) => [`${value}°C`, "Temperature"]}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#4ade80"
                                    strokeWidth={mobileProps.strokeWidth}
                                    dot={{ r: mobileProps.dotRadius, fill: "#4ade80", stroke: "#4ade80" }}
                                    activeDot={{ r: mobileProps.activeDotRadius, fill: "#4ade80", stroke: "#fff" }}
                                    name="temperature"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                )

            case "heartRate":
                return (
                    <ChartContainer
                        config={{
                            heartRate: {
                                label: "Heart Rate",
                                color: "hsl(0, 84%, 60%)",
                            },
                        }}
                    >
                        <ResponsiveContainer width="100%" height={chartHeight}>
                            <LineChart data={heartRateData} margin={mobileProps.margin}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                                <XAxis
                                    dataKey="month"
                                    stroke="#666"
                                    tick={{ fill: "#666", fontSize: mobileProps.fontSize }}
                                    axisLine={{ stroke: "#333" }}
                                    tickLine={false}
                                    tickFormatter={isMobile ? (value) => value.substring(0, 1) : undefined}
                                />
                                <YAxis
                                    domain={[80, 100]}
                                    stroke="#666"
                                    tick={{ fill: "#666", fontSize: mobileProps.fontSize }}
                                    axisLine={{ stroke: "#333" }}
                                    tickLine={false}
                                    width={isMobile ? 20 : 30}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "#222",
                                        border: "none",
                                        borderRadius: "4px",
                                        fontSize: mobileProps.fontSize,
                                    }}
                                    labelStyle={{ color: "#ccc" }}
                                    itemStyle={{ color: "#ef4444" }}
                                    formatter={(value) => [`${value} rpm`, "Heart Rate"]}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#ef4444"
                                    strokeWidth={mobileProps.strokeWidth}
                                    dot={{ r: mobileProps.dotRadius, fill: "#ef4444", stroke: "#ef4444" }}
                                    activeDot={{ r: mobileProps.activeDotRadius, fill: "#ef4444", stroke: "#fff" }}
                                    name="heartRate"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                )

            case "pulseRate":
                return (
                    <ChartContainer
                        config={{
                            pulseRate: {
                                label: "Pulse Rate",
                                color: "hsl(142, 76%, 36%)",
                            },
                        }}
                    >
                        <ResponsiveContainer width="100%" height={chartHeight}>
                            <LineChart data={pulseRateData} margin={mobileProps.margin}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                                <XAxis
                                    dataKey="month"
                                    stroke="#666"
                                    tick={{ fill: "#666", fontSize: mobileProps.fontSize }}
                                    axisLine={{ stroke: "#333" }}
                                    tickLine={false}
                                    tickFormatter={isMobile ? (value) => value.substring(0, 1) : undefined}
                                />
                                <YAxis
                                    domain={[80, 95]}
                                    stroke="#666"
                                    tick={{ fill: "#666", fontSize: mobileProps.fontSize }}
                                    axisLine={{ stroke: "#333" }}
                                    tickLine={false}
                                    width={isMobile ? 20 : 30}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "#222",
                                        border: "none",
                                        borderRadius: "4px",
                                        fontSize: mobileProps.fontSize,
                                    }}
                                    labelStyle={{ color: "#ccc" }}
                                    itemStyle={{ color: "#4ade80" }}
                                    formatter={(value) => [`${value} bpm`, "Pulse Rate"]}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#4ade80"
                                    strokeWidth={mobileProps.strokeWidth}
                                    dot={{ r: mobileProps.dotRadius, fill: "#4ade80", stroke: "#4ade80" }}
                                    activeDot={{ r: mobileProps.activeDotRadius, fill: "#4ade80", stroke: "#fff" }}
                                    name="pulseRate"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                )

            case "bloodPressure":
                return (
                    <ChartContainer
                        config={{
                            systolic: {
                                label: "Systolic",
                                color: "hsl(0, 84%, 60%)",
                            },
                            diastolic: {
                                label: "Diastolic",
                                color: "hsl(220, 84%, 60%)",
                            },
                        }}
                    >
                        <ResponsiveContainer width="100%" height={chartHeight}>
                            <LineChart data={bloodPressureData} margin={mobileProps.margin}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                                <XAxis
                                    dataKey="month"
                                    stroke="#666"
                                    tick={{ fill: "#666", fontSize: mobileProps.fontSize }}
                                    axisLine={{ stroke: "#333" }}
                                    tickLine={false}
                                    tickFormatter={isMobile ? (value) => value.substring(0, 1) : undefined}
                                />
                                <YAxis
                                    domain={[70, 130]}
                                    stroke="#666"
                                    tick={{ fill: "#666", fontSize: mobileProps.fontSize }}
                                    axisLine={{ stroke: "#333" }}
                                    tickLine={false}
                                    width={isMobile ? 20 : 30}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "#222",
                                        border: "none",
                                        borderRadius: "4px",
                                        fontSize: mobileProps.fontSize,
                                    }}
                                    labelStyle={{ color: "#ccc" }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="systolic"
                                    stroke="#ef4444"
                                    strokeWidth={mobileProps.strokeWidth}
                                    dot={{ r: mobileProps.dotRadius, fill: "#ef4444", stroke: "#ef4444" }}
                                    activeDot={{ r: mobileProps.activeDotRadius, fill: "#ef4444", stroke: "#fff" }}
                                    name="systolic"
                                />
                                <Line
                                    type="monotone"
                                    dataKey="diastolic"
                                    stroke="#3b82f6"
                                    strokeWidth={mobileProps.strokeWidth}
                                    dot={{ r: mobileProps.dotRadius, fill: "#3b82f6", stroke: "#3b82f6" }}
                                    activeDot={{ r: mobileProps.activeDotRadius, fill: "#3b82f6", stroke: "#fff" }}
                                    name="diastolic"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                )

            default:
                return null
        }
    }

    return (
        <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-gray-400">Health Key Metrics</CardTitle>
                <Button variant="outline" className="bg-[#2A7A9B] hover:bg-[#236A8A] border-0 text-white">
                    Month <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="temperature" value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <ScrollArea className="w-full">
                        <TabsList className="bg-gray-800/50 mb-6 w-full inline-flex">
                            <TabsTrigger value="temperature" className="data-[state=active]:bg-gray-700 rounded-full">
                                Temperature
                            </TabsTrigger>
                            <TabsTrigger value="heartRate" className="data-[state=active]:bg-gray-700 rounded-full">
                                Heart Rate
                            </TabsTrigger>
                            <TabsTrigger value="pulseRate" className="data-[state=active]:bg-gray-700 rounded-full">
                                Pulse Rate
                            </TabsTrigger>
                            <TabsTrigger value="bloodPressure" className="data-[state=active]:bg-gray-700 rounded-full">
                                Blood Pressure
                            </TabsTrigger>
                        </TabsList>
                    </ScrollArea>

                    {renderChart()}
                </Tabs>
            </CardContent>
        </Card>
    )
}

// Talk to Addy Button
export function TalkToAddyButton() {
    return (
        <Button className="bg-[#2A7A9B] hover:bg-[#236A8A] text-white rounded-lg px-6 py-6 h-auto w-full">
            <div className="flex items-center">
                <div className="w-10 h-10 rounded-full overflow-hidden mr-3 border-2 border-white/20">
                    <img src="/shadcn.jpg" alt="Addy avatar" className="w-full h-full object-cover" />
                </div>
                <span className="text-lg">Talk to Addy</span>
            </div>
        </Button>
    )
}
const chartData = [
    { label: "Lorem Ipsum", value: 100, fill: "#264A70" },
    { label: "Lorem Ipsum", value: 40, fill: "#526A90" },
    { label: "Lorem Ipsum", value: 80, fill: "#D3AC67" },
]
const chartConfig = {
    value: {
        label: "Percentage",
    },
    "Lorem Ipsum": {
        label: "Lorem Ipsum",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig

export function MetricsSection() {
    return (
        <Card className="flex flex-col  bg-gray-900/50 border-gray-800 text-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-semibold">Metrics</CardTitle>
                <Select>
                    <SelectTrigger className="w-[150px] bg-[#2A2A2A]">
                        <SelectValue placeholder="Medications" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="medications">Medications</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>

            <div className="flex items-center justify-center gap-2 pb-2 text-sm">
                <ChevronLeft className="h-4 w-4 cursor-pointer" />
                <CardDescription className="font-medium">December</CardDescription>
                <ChevronRight className="h-4 w-4 cursor-pointer" />
            </div>

            <CardContent className="flex-1 pb-2">
                <ChartContainer
                    className="mx-auto aspect-square max-h-[250px]"
                    config={chartConfig}
                >
                    <RadialBarChart data={chartData} innerRadius={40} outerRadius={100}>
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent hideLabel nameKey="label" />
                            }
                        />
                        <RadialBar dataKey="value" background />
                    </RadialBarChart>
                </ChartContainer>
            </CardContent>

            <CardFooter className="flex flex-col gap-2 text-sm">
                {chartData.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 font-medium leading-none">
                        <span
                            className="inline-block h-3 w-3 rounded-full"
                            style={{ backgroundColor: item.fill }}
                        />
                        {item.label} {item.value}%
                    </div>
                ))}
            </CardFooter>
        </Card>
    )
}

// Virtual Care Options Section
export function VirtualCareOptionsSection() {
    return (
        <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-gray-400">Virtual Care Options</CardTitle>
                <Button variant="outline" className="bg-[#2A7A9B] hover:bg-[#236A8A] border-0 text-white">
                    Month <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                    {[
                        { icon: <Apple className="h-8 w-8" />, title: "Nutrition", value: "36.7" },
                        { icon: <Brain className="h-8 w-8" />, title: "Psychology", value: "36.7" },
                        { icon: <Stethoscope className="h-8 w-8" />, title: "Oncology", value: "36.7" },
                        { icon: <Eye className="h-8 w-8" />, title: "Vision", value: "36.7" },
                        { icon: <Pill className="h-8 w-8" />, title: "Medication", value: "36.7" },
                    ].map((item, index) => (
                        <div key={index} className="bg-gray-800/50 rounded-lg p-4 flex flex-col items-center">
                            <div className="text-[#3B9AC6] mb-2">{item.icon}</div>
                            <div className="text-sm text-gray-300">{item.title}</div>
                            <div className="text-lg font-medium">{item.value}</div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

// Appointments Section
export function AppointmentsSection() {
    return (
        <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader className="pb-2">
                <CardTitle>Appointments</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {[1, 2, 3].map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                        <div className="text-gray-400">Prescription</div>
                        <div className="text-[#3B9AC6]">CVS Pharmacy</div>
                        <div className="text-gray-500">2024-11-15</div>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}