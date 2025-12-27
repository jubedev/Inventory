import DashboardHero from '../components/DashboardHero'
import RecentMovementsTable from '../components/RecentMovementsTable'
import NotificationsTable from '../components/NotificationsTable'

const DashboardPage = () => {
  return (
    <main>
      <DashboardHero />
      
      {/* Sección de tablas */}
      <div className="max-w-7xl mx-auto px-8 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RecentMovementsTable />
          </div>
          <div>
            <NotificationsTable />
          </div>
        </div>
      </div>
    </main>
  )
}

export default DashboardPage