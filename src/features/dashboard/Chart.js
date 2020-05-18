import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { CustomToolTip } from './CustomToolTip';
import { useSelector } from "react-redux";
import { selectBills } from "./dashboardSlice";
import { buildChartData } from "../../utility";


export const Chart = () => {
  const bills = useSelector(selectBills);
  const chartData = buildChartData(bills);  
  return (
      <LineChart  width={700} height={300} data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <XAxis dataKey="xAxis" />
        <YAxis  />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip content={<CustomToolTip/>}/>
        <Legend />
        <Line type="monotone" dataKey="amount" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
  );
};
