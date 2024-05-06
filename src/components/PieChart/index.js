import "./index.css"
import {useEffect, useState} from 'react'
import axios from 'axios'
import { ResponsiveContainer, PieChart, Pie, Legend, Cell } from "recharts";

export const Piechart = ({selectedMonth}) => {
    const [piechartData, setPieChartData] = useState([])

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

    useEffect(()=>{
        const fetchData = async () => {
            const res = await axios.get(`https://roxiler-assignment-x8s5.onrender.com/piechart?month=${selectedMonth}`)
            const data = res.data;
            console.log(data);
            setPieChartData(data)
        }
        fetchData()
    }, [selectedMonth])

    return(
        <>
            <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                    <Pie
                    data={piechartData}
                    dataKey={1} 
                    nameKey={0} 
                    cx="50%" 
                    cy="50%"
                    outerRadius={150} 
                    fill="#8884d8" 
                    label 
                    >
                    {piechartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                    </Pie>
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </>
    )
}