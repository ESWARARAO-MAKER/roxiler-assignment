import axios from "axios"
import "./index.css"
import { useEffect, useState } from "react"
import { Loading } from "../loading";

export const Statastics = ({selectedMonth}) => {

    const [statistics, setStatastics] = useState([]);
    const [loading, setLoading] = useState(true)
    
    useEffect(()=>{
        const getStatastics = async () => {
            const res = await axios.get(`https://roxiler-assignment-x8s5.onrender.com/salesMonth?month=${selectedMonth}`)
            const data = res.data
            setStatastics(data)
            setLoading(false)
        }
        getStatastics()
    },[selectedMonth])
    return(
        <>
            {
                loading ? (<Loading/>) : (
                <>
                    <div className='element'><span>Total Sale</span> <span>{Math.ceil(statistics.sales)}</span></div>
                    <div className='element'><span>Total sold item</span> <span>{statistics.soldItems}</span></div>
                    <div className='element'><span>Total not sold item</span> <span>{statistics.notSoldItems}</span></div>
                </>
                )
            }
        </>
    )
}