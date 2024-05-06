import { useEffect, useState } from "react";
import axios from "axios";
import { months } from "../../data"
import "./index.css"
import { IoMdSearch } from "react-icons/io";
import { Statastics } from "../statastics";
import { Barchart } from "../BarChart";
import { Piechart } from "../PieChart";


export const Transactions = () => {
    const [transactionsList, setTransactionsList] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState(months[2].name);
    const [searchInput, setSearchInput] = useState("");
    const [page, setPage] = useState(1);

    const onPrevious = () => {
        if (page === 1){
            setPage(1);
        }
        else{
            setPage(page - 1)
        }
    }

    const onNext = () => {
        if (page === 110){
            setPage(110);
        }
        else{
            setPage(page + 1)
        }
    }

    useEffect(() => {
        const getTransactions = async () => {
            const transactions = await axios.get(`http://localhost:4000/products?month=${selectedMonth}&page=${page}&search=${searchInput}&perPage=10`);
            //console.log(transactions.data);
            setTransactionsList(transactions.data)   
        }
        getTransactions()
;    }, [page, searchInput, selectedMonth])
    return(
        <div className = "transactions-container">
            <h1>Transactions DashBoard</h1>
            <div className = "search-bar">
                <div className = "input">
                    <input type = "text" placeholder = "Search Transaction" onChange={(e) => setSearchInput(e.target.value)}/>
                    <IoMdSearch className="search-icon"/>
                </div>
                <select onChange={(e) => setSelectedMonth(e.target.value)}>
                    {months.map((each, i) => (
                        <option key={i} value = {each.name}>{each.name}</option>
                    ))}
                </select>
            </div>
            <div className="table">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Sold</th>
                            <th>Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactionsList.map((each, i) => (
                            <tr key={i}>
                                <td>{each.id}</td>
                                <td className="tr2">{each.title}</td>
                                <td className="tr3">{each.description}</td>
                                <td className="tr4">{each.price}</td>
                                <td className="tr1">{each.category}</td>
                                <td className="tr1">{each.solid}</td>
                                <td><img src={each.image} alt = "img"/></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="left-right-buttons">
                <button className="btn" onClick={onPrevious}>Previous</button>
                <span>{page}</span>
                <button className="btn" onClick={onNext}>Next</button>
            </div>
            <div className="statastics">
                <h2>Statastics {selectedMonth}</h2>
                <Statastics selectedMonth={selectedMonth}/>
            </div>
            <div className="barcharts">
                <h2>Barchart status - {selectedMonth}</h2>
                <Barchart selectedMonth = {selectedMonth}/>
            </div>
            <div className="barcharts">
                <h2>PieChart status - {selectedMonth}</h2>
                <Piechart selectedMonth = {selectedMonth}/>
            </div>
        </div>
    )
}