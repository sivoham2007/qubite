"use client";

import { useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from "recharts";
import { getWeeklyAttendanceChartData } from "@/lib/data/mess-store";
import { ChevronDown, BarChart2 } from "lucide-react";

export function MealAttendanceChart() {
  const [range, setRange] = useState<"This Week" | "Last Week" | "This Month">("This Week");
  const data = getWeeklyAttendanceChartData(range);

  return (
    <div className="bg-white rounded-3xl p-6 border border-brand-border shadow-subtle flex flex-col justify-between">
      {/* Header with Title and Range Dropdown */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-brand-yellow/30 text-brand-dark flex items-center justify-center">
            <BarChart2 className="w-4 h-4 text-amber-700" />
          </div>
          <div>
            <h3 className="font-extrabold text-base text-brand-dark tracking-tight">
              Meal Attendance
            </h3>
            <p className="text-[11px] text-zinc-400">Weekly student turnout rate</p>
          </div>
        </div>

        {/* Range Dropdown */}
        <div className="relative">
          <select
            value={range}
            onChange={(e) => setRange(e.target.value as any)}
            className="appearance-none bg-brand-cream border border-brand-border rounded-xl px-3 py-1.5 pr-7 text-xs font-bold text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-yellow cursor-pointer"
          >
            <option value="This Week">This Week</option>
            <option value="Last Week">Last Week</option>
            <option value="This Month">This Month</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-zinc-400 absolute right-2.5 top-2.5 pointer-events-none" />
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="h-56 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F5EFE6" />
            <XAxis
              dataKey="day"
              tick={{ fontSize: 11, fill: "#777777", fontWeight: 600 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={[0, 100]}
              ticks={[0, 25, 50, 75, 100]}
              unit="%"
              tick={{ fontSize: 10, fill: "#999999" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const item = payload[0].payload;
                  return (
                    <div className="bg-brand-black text-white px-3 py-2 rounded-xl text-xs shadow-floating border border-zinc-800">
                      <p className="font-bold text-brand-yellow">{item.day}</p>
                      <p className="text-[11px] text-zinc-300">
                        Attendance: <span className="font-bold text-white">{item.attendance}%</span>
                      </p>
                      {item.isToday && (
                        <span className="text-[9px] uppercase tracking-wider font-extrabold text-brand-yellow mt-0.5 block">
                          ● Today
                        </span>
                      )}
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="attendance" radius={[8, 8, 0, 0]} maxBarSize={36}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.isToday ? "#FFC83D" : "#FFD66B"}
                  stroke={entry.isToday ? "#151515" : "none"}
                  strokeWidth={entry.isToday ? 2 : 0}
                  className="hover:opacity-90 transition-opacity"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend & Summary Footer */}
      <div className="pt-3 border-t border-brand-border flex items-center justify-between text-[11px] text-zinc-500 font-medium">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-brand-yellow border border-brand-black" />
          <span>Highlighted: Today</span>
        </div>
        <span className="font-bold text-brand-dark">Avg: 84% turn-out</span>
      </div>
    </div>
  );
}
