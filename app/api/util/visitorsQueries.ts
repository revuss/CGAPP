/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from "@/app/lib/prisma";

const allDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export async function getWeeklyVisitors() {
  const visitors = await prisma.$queryRawUnsafe<
    {
      day: number;
      uniqueVisitors: number;
    }[]
  >(`
    SELECT DAYOFWEEK(createdAt) AS day, COUNT(DISTINCT ipAddress) AS uniqueVisitors
    FROM Visitor
    GROUP BY day
  `);

  const result = allDays.map((dayName, index) => {
    const match = visitors.find((v) => v.day === index + 1);
    return {
      day: dayName,
      uniqueVisitors: match ? match.uniqueVisitors.toString() : "0",
    };
  });

  return result;
}

const allMonths = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export async function getMonthlyVisitors() {
  // Fetch raw data with month extracted from `createdAt`
  const visitors = await prisma.$queryRawUnsafe<
    {
      month: number;
      uniqueVisitors: number;
    }[]
  >(`
    SELECT MONTH(createdAt) AS month, COUNT(DISTINCT ipAddress) AS uniqueVisitors
    FROM Visitor
    GROUP BY month
  `);

  // Map to include all months with zero visitors if missing
  const result = allMonths.map((monthName, index) => {
    const match = visitors.find((v) => v.month === index + 1);
    return {
      month: monthName,
      uniqueVisitors: match ? match.uniqueVisitors.toString() : "0",
    };
  });

  return result;
}

export async function getCountryVisitors() {
  const countryData: any = await prisma.$queryRaw`
    SELECT
      country AS country,
      COUNT(DISTINCT ipAddress) AS uniqueVisitors
    FROM Visitor
    GROUP BY country
    ORDER BY uniqueVisitors DESC`;

  return countryData.map((row: any) => ({
    ...row,
    uniqueVisitors: row.uniqueVisitors.toString(),
  }));
}
