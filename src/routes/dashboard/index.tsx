import { createFileRoute, redirect } from '@tanstack/react-router'
import { SidebarNav } from '../../components/sidebar-nav'
import { DashboardHeader } from '../../components/dashboard-header'
import { AppointmentsSection, HealthKeyMetricsSection, MetricsSection, TalkToAddyButton, VirtualCareOptionsSection } from '../../components/dashboard-sections'

export const Route = createFileRoute('/dashboard/')({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    if (context.isSignedIn == false) {
      throw redirect({
        to: '/login',
      })
    }
  }
})

function RouteComponent() {
  return (
    <div className="flex min-h-screen">
      <SidebarNav />

      <div className="flex-1 md:ml-64 p-6">
        <div className=" mx-auto">
          <DashboardHeader />

          <div className="mt-8 grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-9">
              <HealthKeyMetricsSection />

            </div>
            <div className="col-span-12 lg:col-span-3 flex flex-col gap-4">
              <TalkToAddyButton />
              <MetricsSection />
              <AppointmentsSection />

            </div>

            <div className="col-span-12 lg:col-span-9">
              <VirtualCareOptionsSection />
            </div>


          </div>
        </div>
      </div>
    </div>
  )
}
