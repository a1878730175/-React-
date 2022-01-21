import { apiGet } from "../Apiaxios"
import { Pagination } from 'antd';
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"  
export default function M() {
    let [data, setdata] = useState([])
    let [name, setname] = useState([])
    let [pages,setpage]=useState(0)
    let [currpage,setcurrpage]=useState(1)
    useEffect(() => {
        apiGet(`/newsfront/list?page=${1}`, r => {
            data = r.data.data.list
            console.log(data);
            setdata(data)
            setpage(r.data.data.total)
            setcurrpage(r.data.data.pageNum)
        })
        apiGet(`/newsfront/columns`, r => {
            name = r.data.data
            console.log(name);
            setname(name)
        })
    }, [])
    //分页
    let chang=(page)=>{
        apiGet(`/newsfront/list?page=${page}`,resp=>{
            data=resp.data.data.list
            setdata(data)
            setpage(resp.data.data.total)
            setcurrpage(resp.data.data.pageNum)
        })
    }
    return (
        <div>
            {
                name.map(item => (
                    // console.log(item)
                    <section>
                        <h2>{item.columnName}</h2>
                        {
                            data.map(a => {
                                if (item.columnName == a.column.columnName) {
                                    return (
                                        <datalist>
                                            <div>
                                                <img src={`/${a.pic}`}></img>
                                            </div>
                                            <div>
                                                <h3 id={a.newsId}><Link to={`/details/${a.newsId}`}>{a.title}</Link></h3>
                                                <p>
                                                    <h4>{a.author}</h4>
                                                    <span>发布时间:{a.date}</span>|<span>{a.title}</span>
                                                </p>
                                            </div>
                                        </datalist>
                                    )
                                }
                            })
                        }
                        {/* <datalist>
                            <div>
                                <img src={`/${item.pic}`}></img>
                            </div>
                            <div>
                                <h3 id={item.newsId}><Link to={`/details/${item.newsId}`}>{item.title}</Link></h3>
                                <p>
                                    <h4>{item.author}</h4>
                                    <span>发布时间:{item.date}</span>|<span>{item.title}</span>
                                </p>
                            </div>
                        </datalist> */}
                    </section>
                ))
            }
            <Pagination  total={pages} onChange={chang} current={currpage} style={{textAlign:'center'}}/>

        </div>
    )
}