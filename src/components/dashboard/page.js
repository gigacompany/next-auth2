"use client";
import Card from "@/components/card";
import CiMail from 'react-icons/ci'
import CurvyLineChart from "@/components/charts/curvelinechart";
import PieChart from "@/components/charts/piechart";
import ThreeColorBarGraph from "@/components/charts/tcbarchart";

import DTable from "../Table/dashboardtable";
import { useEffect, useState } from 'react';
export default function DashboardLayout() {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/transaction'); // Adjust the path to your JSON file
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setData(jsonData[0]?.hits?.hits || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
// export default function DashboardLayout() {
//   // console.log(allProducts, allVisitors);
  return (
    <div className="h-screen  p-4 md:p-6 2xl:p-10 bg-default dark:bg-black dark:text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6 gap-4 md:gap-6 xl:gap-7">
        {Array.from(new Set(data.map((item) => item._source.rcptDomain)))
          .slice(0, 6)
          .map((rcptDomain, dlvSize, index) => (
            <Card
              key={index}
              data={`${data.find((item) => item._source.rcptDomain === rcptDomain)._source.dlvSize}`}
              label={rcptDomain}
              icon = '✉️'
            />
          ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:mt-6 2xl:mt-7 2xl:gap-7 ">
        <CurvyLineChart />
        <ThreeColorBarGraph />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:mt-6 2xl:mt-7 2xl:gap-7">
        <DTable />
        <PieChart />
      </div>
    </div>
  );
}