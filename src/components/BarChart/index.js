import React, { useEffect, useState } from "react";
import "./index.css";
import { Bar, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Legend, BarChart } from "recharts";
import axios from "axios";

export const Barchart = ({ selectedMonth }) => {
  const [barcharData, setBarchartData] = useState([]);

  useEffect(() => {
    const getBarchartData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/barChart/?month=${selectedMonth}`);
        setBarchartData(response.data);
        //console.log(response.data);
      } catch (err) {
        console.error("Error fetching bar chart data:", err);
      }
    };
    getBarchartData();
  }, [selectedMonth]);

  const DataFormatter = (number) => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`;
    }
    return number.toString();
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={barcharData} margin={{ top: 5 }}>
        <XAxis dataKey={0} tick={{ stroke: "gray", strokeWidth: 1 }} />
        <YAxis tickFormatter={DataFormatter} tick={{ stroke: "gray", strokeWidth: 1 }} />
        <Legend wrapperStyle={{ padding: 30 }} />
        <Bar key={1} dataKey={1} name="Number of Items" fill="#37807e" barSize="20%" />
      </BarChart>
    </ResponsiveContainer>
  );
};
