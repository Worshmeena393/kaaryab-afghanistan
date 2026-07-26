"use client";

export default function DashboardCard({ title, value, icon, subtitle, gradient, accent }) {
  const grad = gradient || "from-blue-500 via-blue-600 to-indigo-700";
  const accentCls = accent || "bg-white/15";
  return (
    <div className={`group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br ${grad} p-4 sm:p-5 md:p-6 text-white shadow-xl shadow-slate-900/20 border border-white/10 hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300`}>
      <div className="absolute -right-10 sm:-right-16 -top-10 sm:-top-16 h-28 sm:h-40 w-28 sm:w-40 rounded-full bg-white/5 blur-3xl" />
      <div className="absolute -left-10 sm:-left-16 -bottom-10 sm:-bottom-16 h-28 sm:h-40 w-28 sm:w-40 rounded-full bg-white/5 blur-3xl" />
      <div className="relative flex items-start justify-between gap-3 sm:gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-white/80">{title}</p>
          <p className="mt-1 sm:mt-2 text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-b from-white to-blue-100 bg-clip-text text-transparent">
            {value}
          </p>
          {subtitle && <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-white/80">{subtitle}</p>}
        </div>
        {icon && (
          <div className={`flex h-11 w-11 sm:h-12 sm:w-12 md:h-14 md:w-14 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl ${accentCls} ring-1 ring-white/20 backdrop-blur-sm text-base sm:text-xl`}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
