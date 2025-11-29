import React, { useEffect, useMemo, useState } from "react";

const statsInitial = [
  { id: "students", label: "Students", value: 62, icon: "👩‍🎓" },
  { id: "avg", label: "Average Mark", value: 6.8, icon: "📊" },
  { id: "under", label: "Underperforming", value: 9, extra: "(14%)", icon: "⚠️" },
  { id: "hw", label: "Finished Homework", value: 83, isPercent: true, icon: "✅" },
];

const monthlyData = [5, 9, 12, 8, 15, 10, 18, 14, 11, 16, 20, 13];

// Animated Number
const AnimatedNumber = ({ value, isPercent = false, duration = 800 }) => {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const range = end - start;
    if (range === 0) return setDisplay(end);

    const stepTime = Math.max(Math.floor(duration / Math.abs(range)), 10);
    let current = start;
    const inc = range > 0 ? 1 : -1;

    const timer = setInterval(() => {
      current += inc;
      setDisplay(Number.isInteger(end) ? current : Math.round(current * 10) / 10);
      if ((inc > 0 && current >= end) || (inc < 0 && current <= end)) {
        clearInterval(timer);
        setDisplay(end);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <>{isPercent ? `${display}%` : display}</>;
};

// Circle meter
const ProgressCircle = ({ percent = 0, size = 72, stroke = 8 }) => {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <defs>
        <linearGradient id="grad" x1="0%" x2="100%">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
      <g transform={`translate(${size / 2}, ${size / 2})`}>
        <circle
          r={radius}
          stroke="#e6edf6"
          strokeWidth={stroke}
          fill="transparent"
        />
        <circle
          r={radius}
          stroke="url(#grad)"
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="transparent"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1s ease" }}
          transform="rotate(-90)"
        />
      </g>
    </svg>
  );
};

export default function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const [stats, setStats] = useState(statsInitial);
  const [chartAnimated, setChartAnimated] = useState(false);

  const avgPercent = useMemo(() => Math.round((stats[1].value / 10) * 100), [stats]);

  useEffect(() => {
    setTimeout(() => setChartAnimated(true), 250);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setStats(s =>
        s.map(st => (st.id === "students" ? { ...st, value: st.value + 3 } : st))
      );
    }, 1200);
  }, []);

  // clean progress logic
  const getProgressWidth = (s) => {
    if (s.isPercent) return s.value;
    if (s.id === "avg") return (s.value / 10) * 100;
    return Math.min(100, s.value);
  };

  return (
    <div className="flex min-h-screen bg-gray-50 text-slate-800 antialiased">

      {/* SIDEBAR */}
      <aside
        className={`flex flex-col transition-all duration-300 bg-gray-800 from-slate-900 to-slate-800 text-white ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        <div className="flex items-center gap-3 p-4">
          <button
            onClick={() => setCollapsed(c => !c)}
            className="p-2 rounded-md bg-white/10 hover:bg-white/20 transition"
          >
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none">
              <path
                d={collapsed ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>

          {!collapsed && (
            <>
              <div className="flex-1">
                <h1 className="text-lg font-semibold">My Dashboard</h1>
                <p className="text-xs text-slate-300">Course analytics</p>
              </div>

              <img
                src="/dashboard-preview.png"
                alt="preview"
                className="w-10 h-10 rounded-md object-cover border border-white/10 shadow-sm"
              />
            </>
          )}
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {[
            { key: "overview", label: "Overview", icon: "🏠" },
            { key: "users", label: "Users", icon: "👥" },
            { key: "reports", label: "Reports", icon: "📑" },
            { key: "settings", label: "Settings", icon: "⚙️" },
          ].map(item => (
            <a
              key={item.key}
              href="#"
              className={`group flex items-center gap-3 p-2 rounded-md transition ${
                collapsed ? "justify-center" : "hover:translate-x-1 hover:bg-slate-700"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
            </a>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          {!collapsed ? (
            <div className="flex items-center gap-3">
              <img src="https://i.pravatar.cc/40" alt="user" className="w-9 h-9 rounded-full" />
              <div className="flex-1">
                <div className="text-sm font-medium">Grace Simmons</div>
                <div className="text-xs text-slate-300">Lecturer</div>
              </div>
              <button className="p-2 rounded bg-slate-700 hover:bg-slate-600">⋯</button>
            </div>
          ) : (
            <div className="flex justify-center">
              <img src="https://i.pravatar.cc/40" alt="user" className="w-9 h-9 rounded-full" />
            </div>
          )}
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6 lg:p-10">

        {/* TOP BAR */}
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="search"
                placeholder="Search..."
                className="w-72 px-4 py-2 rounded-lg border border-slate-200 shadow-sm focus:ring-2 focus:ring-indigo-400"
              />
              <span className="absolute right-3 top-2 text-slate-400">🔍</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right mr-2">
              <div className="text-sm font-semibold">Grace Simmons</div>
              <div className="text-xs text-slate-500">Lecturer</div>
            </div>
            <img src="https://i.pravatar.cc/48" alt="user" className="w-11 h-11 rounded-full" />
          </div>
        </header>

        {/* STATS */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {stats.map(s => (
            <div key={s.id} className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs text-slate-400">{s.label}</div>
                  <div className="flex items-baseline gap-2">
                    <div className="text-3xl font-bold">
                      <AnimatedNumber value={s.value} isPercent={s.isPercent} />
                    </div>
                    {s.extra && <div className="text-sm text-slate-500">{s.extra}</div>}
                  </div>
                </div>
                <div className="text-2xl">{s.icon}</div>
              </div>

              <div className="mt-4">
                <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gray-800 from-purple-600 to-cyan-400 transition-all duration-1000"
                    style={{ width: `${getProgressWidth(s)}%` }}
                  />
                </div>
                <div className="mt-2 text-xs text-slate-400">Updated just now</div>
              </div>
            </div>
          ))}
        </section>

        {/* CHART & METERS */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Bar Chart */}
          <div className="col-span-2 bg-white p-6 rounded-2xl shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-700">Students Per Month</h3>
              <div className="text-xs text-slate-400">Last 12 months</div>
            </div>

            <div className="w-full h-48 flex items-end gap-3">
              {monthlyData.map((v, i) => {
                const height = chartAnimated
                  ? `${(v / Math.max(...monthlyData)) * 100}%`
                  : "4%";
                return (
                  <div key={i} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full bg-gray-800 from-indigo-600 to-cyan-400 rounded-t transition-all duration-700"
                      style={{ height }}
                    />
                    <div className="text-xs text-slate-400 mt-2">{`M${i + 1}`}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Circle meters */}
          <div className="bg-white p-6 rounded-2xl shadow flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-slate-700">Homework Completion</h3>
                <div className="text-xs text-slate-400">Overall course progress</div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <ProgressCircle percent={83} size={88} stroke={10} />

              <div className="flex-1">
                <div className="text-sm text-slate-500">Finished</div>
                <div className="text-2xl font-bold">
                  <AnimatedNumber value={83} isPercent={true} />
                </div>

                <div className="mt-3 text-xs text-slate-400">
                  Great — keep encouraging students to finish assignments.
                </div>

                <div className="mt-4">
                  <div className="text-xs text-slate-500 mb-2">Underperforming students</div>
                  <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gray-800 from-rose-500 to-orange-400"
                      style={{ width: `${(9 / 62) * 100}%` }}
                    />
                  </div>
                  <div className="mt-2 text-xs text-slate-400">9 students (approx 14%)</div>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 text-xs text-slate-500">
              <div className="flex justify-between">
                <span>Avg Mark</span>
                <strong>{stats[1].value}</strong>
              </div>
              <div className="mt-2 text-xs text-slate-400">Target: 7.5</div>
            </div>
          </div>
        </section>

        {/* Student List */}
        <section className="mt-6">
          <div className="bg-white p-6 rounded-2xl shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-700">Top students</h3>
              <div className="text-xs text-slate-400">Sorted by avg mark</div>
            </div>

            <ul className="space-y-3">
              {[
                { name: "Annette Watson", mark: 9.3 },
                { name: "Calvin Steward", mark: 8.9 },
                { name: "Ralph Richards", mark: 8.7 },
                { name: "Bernard Murphy", mark: 8.2 },
              ].map((u) => (
                <li key={u.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                      {u.name.split(" ").map(n => n[0]).slice(0, 2).join("")}
                    </div>
                    <div>
                      <div className="text-sm font-medium">{u.name}</div>
                      <div className="text-xs text-slate-400">Student</div>
                    </div>
                  </div>
                  <div className="text-sm font-semibold">{u.mark}</div>
                </li>
              ))}
            </ul>
          </div>
        </section>

      </main>
    </div>
  );
}
