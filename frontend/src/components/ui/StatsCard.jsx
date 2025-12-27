const StatsCard = ({ title, value, icon, color = "blue", trend }) => {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600 border-blue-200",
    green: "bg-green-50 text-green-600 border-green-200",
    red: "bg-red-50 text-red-600 border-red-200",
    yellow: "bg-yellow-50 text-yellow-600 border-yellow-200",
    purple: "bg-purple-50 text-purple-600 border-purple-200",
  }

  return (
    <div className={`rounded-lg border-2 ${colorClasses[color]} p-6 transition-all hover:shadow-lg`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium opacity-80">{title}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
          {trend && (
            <p className="text-xs mt-2 opacity-70">
              {trend > 0 ? `+${trend}%` : `${trend}%`} vs mes anterior
            </p>
          )}
        </div>
        {icon && (
          <div className="text-4xl opacity-50">
            {icon}
          </div>
        )}
      </div>
    </div>
  )
}

export default StatsCard
