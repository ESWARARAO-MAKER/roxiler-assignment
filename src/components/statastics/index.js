import axios from "axios"
import "./index.css"
import { useEffect, useState } from "react"

export const Statastics = ({selectedMonth}) => {

    const [statistics, setStatastics] = useState([]);
    
    useEffect(()=>{
        const getStatastics = async () => {
            const res = await axios.get(`http://localhost:4000/salesMonth?month=${selectedMonth}`)
            const data = res.data
            setStatastics(data)
        }
        getStatastics()
    },[selectedMonth])
    return(
        <>
            <div className='element'><span>Total Sale</span> <span>{Math.ceil(statistics.sales)}</span></div>
            <div className='element'><span>Total sold item</span> <span>{statistics.soldItems}</span></div>
            <div className='element'><span>Total not sold item</span> <span>{statistics.notSoldItems}</span></div>
        </>
    )
}