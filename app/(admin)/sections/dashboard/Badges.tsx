/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetAllStats } from "@/app/services/adminServices/adminHooks";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import AppSpinner from "../../components/AppSpinner";

const getCountries = (data: any[]) => {
  const countries = data.map((item) => item.country);
  return Array.from(new Set(countries));
};
function Badges() {
  const [data, setData] = useState<any>([]);

  const { mutate, isPending } = useGetAllStats();

  useEffect(() => {
    mutate(undefined, {
      onSuccess: (response) => {
        setData(response || { visitorData: [], stats: [], user: {} });
      },
      onError: (error) => {
        console.error("Error fetching stats:", error);
      },
    });
  }, [mutate]);

  const groupedData = (data?.visitorData || []).reduce(
    (acc: any, { date, country, visitCount }: any) => {
      const existing = acc.find((item: any) => item.date === date);
      if (existing) {
        existing[country] = (existing[country] || 0) + visitCount;
      } else {
        acc.push({ date, [country]: visitCount });
      }
      return acc;
    },
    [] as any[]
  );

  const uniqueCountries = getCountries(data?.visitorData || []);
  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#a4de6c"];

  if (isPending) {
    return <AppSpinner />;
  }

  return (
    <div>
      <div className="p-2 flex justify-between items-center">
        {data?.stats?.map((stat: any, index: number) => (
          <div
            key={index}
            className="flex-col bg-secondary min-w-[12vw] items-center justify-center flex min-h-[7vh] text-white font-semibold text-center rounded-lg"
          >
            <span className="text-lg">{stat?.value}</span>
            <p className="text-sm">{stat?.name}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center p-2">
        <div className="border-2 border-black min-w-[30vw] min-h-[10vh] rounded-lg">
          <div className="flex justify-between p-2">
            <span className="text-md font-semibold">Name</span>
            <span className="text-md font-semibold">
              {data?.user?.username || "N/A"}
            </span>
          </div>
          <div className="flex justify-between p-2">
            <span className="text-md font-semibold">Email</span>
            <span className="text-md font-semibold">
              {data?.user?.email || "N/A"}
            </span>
          </div>
          <div className="flex justify-between p-2">
            <span className="text-md font-semibold">Phone</span>
            <span className="text-md font-semibold">
              {data?.user?.phone || "N/A"}
            </span>
          </div>
        </div>
      </div>

      <div className="p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">
          Visitor Statistics by Date and Country
        </h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={groupedData}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            {uniqueCountries.map((country, index) => (
              <Bar
                key={country}
                dataKey={country}
                stackId="a"
                fill={colors[index % colors.length]}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Badges;
