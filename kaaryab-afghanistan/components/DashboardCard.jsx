"use client";

export default function DashboardCard({ title, value, icon, subtitle, gradient, accent }) {
  const grad = gradient || "from-blue-500 via-blue-600 to-indigo-700";
  const accentCls = accent || "bg-white/15";
  return (
    <div className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${grad} p-6 text-white shadow-xl shadow-slate-900/20 border border-white/10 hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300`}>
      <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/5 blur-3xl" />
      <div className="absolute -left-16 -bottom-16 h-40 w-40 rounded-full bg-white/5 blur-3xl" />
      <div className="relative flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-white/80">{title}</p>
          <p className="mt-2 text-4xl font-extrabold tracking-tight bg-gradient-to-b from-white to-blue-100 bg-clip-text text-transparent">
            {value}
          </p>
          {subtitle && <p className="mt-2 text-sm text-white/80">{subtitle}</p>}
        </div>
        {icon && (
          <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${accentCls} ring-1 ring-white/20 backdrop-blur-sm`}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
