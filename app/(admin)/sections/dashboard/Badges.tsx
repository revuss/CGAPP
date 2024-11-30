/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { useGetAllStats } from "@/app/services/adminServices/adminHooks";
// import { useEffect, useState } from "react";
// import AppSpinner from "../../components/AppSpinner";

// function Badges() {
//   const [data, setData] = useState<any>([]);

//   const { mutate, isPending } = useGetAllStats();

//   useEffect(() => {
//     mutate(undefined, {
//       onSuccess: (response) => {
//         setData(response || { visitorData: [], stats: [], user: {} });
//       },
//       onError: (error) => {
//         console.error("Error fetching stats:", error);
//       },
//     });
//   }, [mutate]);

//   if (isPending) {
//     return <AppSpinner />;
//   }

//   return (
//     <div>
//       <div className="p-2 flex justify-between items-center">
//         {data?.stats?.map((stat: any, index: number) => (
//           <div
//             key={index}
//             className="flex-col bg-secondary min-w-[12vw] items-center justify-center flex min-h-[7vh] text-white font-semibold text-center rounded-lg"
//           >
//             <span className="text-lg">{stat?.value}</span>
//             <p className="text-sm">{stat?.name}</p>
//           </div>
//         ))}
//       </div>
//       <div className="flex justify-between items-center p-2">
//         <div className="border-2 border-black min-w-[30vw] min-h-[10vh] rounded-lg">
//           <div className="flex justify-between p-2">
//             <span className="text-md font-semibold">Name</span>
//             <span className="text-md font-semibold">
//               {data?.user?.username || "N/A"}
//             </span>
//           </div>
//           <div className="flex justify-between p-2">
//             <span className="text-md font-semibold">Email</span>
//             <span className="text-md font-semibold">
//               {data?.user?.email || "N/A"}
//             </span>
//           </div>
//           <div className="flex justify-between p-2">
//             <span className="text-md font-semibold">Phone</span>
//             <span className="text-md font-semibold">
//               {data?.user?.phone || "N/A"}
//             </span>
//           </div>
//         </div>
//       </div>
//       {/*
//       <div className="p-4 bg-white rounded-lg shadow-md">
//         <h2 className="text-xl font-bold mb-4">
//           Visitor Statistics by Date and Country
//         </h2>
//         <ResponsiveContainer width="100%" height={400}>
//           <BarChart
//             data={groupedData}
//             margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="date" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             {uniqueCountries.map((country, index) => (
//               <Bar
//                 key={country}
//                 dataKey={country}
//                 stackId="a"
//                 fill={colors[index % colors.length]}
//               />
//             ))}
//           </BarChart>
//         </ResponsiveContainer>
//       </div> */}
//     </div>
//   );
// }

// export default Badges;

"use client";

import { useGetAllStats } from "@/app/services/adminServices/adminHooks";
import { useEffect, useState } from "react";
import AppSpinner from "../../components/AppSpinner";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Tooltip,
  CartesianGrid,
  XAxis,
  ResponsiveContainer,
  Cell,
} from "recharts";

function Badges() {
  const [data, setData] = useState<any>({
    visitorData: [],
    careerStats: [],
    contactStats: [],
    stats: [],
    user: {},
  });

  const { mutate, isPending } = useGetAllStats();

  useEffect(() => {
    mutate(undefined, {
      onSuccess: (response) => {
        setData(
          response || {
            visitorData: [],
            careerStats: [],
            contactStats: [],
            stats: [],
            user: {},
          }
        );
      },
      onError: (error) => {
        console.error("Error fetching stats:", error);
      },
    });
  }, [mutate]);

  if (isPending) {
    return <AppSpinner />;
  }

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088FE"];

  console.log(data?.visitorData);
  console.log("data", data);

  return (
    <div>
      {/* Stats Cards */}
      <div className="p-2 flex justify-between items-center overflow-y-auto">
        {data?.stats?.map((stat: any, index: number) => (
          <div
            key={`stat-card-${index}`}
            className="flex-col bg-secondary min-w-[12vw] items-center justify-center flex min-h-[7vh] text-white font-semibold text-center rounded-lg"
          >
            <span className="text-lg">{stat?.value}</span>
            <p className="text-sm">{stat?.name}</p>
          </div>
        ))}
      </div>

      {/* User Info */}
      <div className="grid grid-cols-2 gap-4 my-4">
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

        <div className="p-4 bg-white rounded-lg shadow-xl border-2 border-gray-200 hover:cursor-pointer">
          <h2 className="text-xl font-bold mb-4">Contact Statistics</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data?.contactStats || []}
                dataKey="count"
                nameKey="date"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#333"
              >
                {(data?.contactStats || []).map((stat: any, index: number) => (
                  <Cell
                    key={`cell-${stat.date}-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: any, name: any, props: any) => {
                  return [`${value} contacts`, `Date: ${props.payload.date}`];
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid md:grid-cols-2 grid-cols-1 gap-4 ">
        {/* Visitors Data */}
        <div className="p-4 bg-white rounded-lg shadow-xl border-2 border-gray-200 hover:cursor-pointer">
          {" "}
          <h2 className="text-xl font-bold mb-4">Visitor Statistics</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data?.visitorData || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="visitCount"
                stroke="#8884d8"
                strokeWidth={2}
                key="visitor-line"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Career Data */}

        <div className="p-4 bg-white rounded-lg shadow-xl border-2 border-gray-200 hover:cursor-pointer">
          <h2 className="text-xl font-bold mb-4">Career Statistics</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data?.careerStats || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
              <XAxis dataKey="date" stroke="#333" />
              <Tooltip />
              <Bar
                dataKey="count"
                fill="#4A90E2"
                radius={[10, 10, 0, 0]}
                key="career-bar"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Badges;
