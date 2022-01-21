import { useParams } from "react-router-dom"
import { apiGet } from "../Apiaxios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Pagination } from 'antd';
export default function Two() {
    let params = useParams()
    let [data, setdata] = useState([])
    let [pages, setpage] = useState(0)
    let [currpage, setcurrpage] = useState(1)
    useEffect(() => {
        // console.log(window.location.href);
        // console.log(`/newsfront/list?columnName=${params.columnName}`);
        apiGet(`/newsfront/list?columnName=${params.columnName}`, r => {
            // console.log(r);
            data = r.data.data.list
            setdata(data)
            setpage(r.data.data.total)
            setcurrpage(r.data.data.pageNum)
            // console.log(data);
        })
    }, [params.columnName])

    let chang = (page) => {
        // console.log(page);
        apiGet(`/newsfront/list?page=${page}&columnName=${params.columnName}`,resp=>{
            data=resp.data.data.list
            setdata(data)
            setpage(resp.data.data.total)
            setcurrpage(resp.data.data.pageNum)
        })
    }
    return (
        <div>
            {/* {params.columnName} */}
            {
                data.map(item => {
                    if (params.columnName == item.column.columnName) {

                        return (
                            <section>
                                {/* <h2>{item.column.columnName}</h2> */}
                                <datalist>
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
                                </datalist>
                            </section>
                        )
                    }

                })
            }
            {/* {
                <section>
                    <h2>{data.title}</h2>
                    <datalist>
                        <div>
                            <img src={`/${data.pic}`}></img>
                        </div>
                        <div>
                            <h3 id={data.newsId}><Link to=''>{data.column.columnName}</Link></h3>
                            <p>
                                <h4>{data.author}</h4>
                                <span>发布时间:{data.date}</span>|<span>{data.title}</span>
                            </p>
                        </div>
                    </datalist>
                </section>
            } */}
            <Pagination total={pages} onChange={chang} current={currpage} style={{ textAlign: 'center' }} />
        </div>
    )
}