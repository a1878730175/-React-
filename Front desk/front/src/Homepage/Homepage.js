import './Homepage.css'
import { useEffect, useState } from "react"
import { apiGet } from "../Apiaxios"
import { Link,Outlet} from 'react-router-dom';
//antd
import { Input, Button } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
export default function Homepage() {
    let [data, setdata] = useState([])
    useEffect(() => {
        apiGet(`/newsfront/columns`, r => {
            // console.log(r);
            data = r.data.data
            setdata(data)
        })
    }, [])

    //顶部搜索框
    const onSearch = value => console.log(value);
    return (
        <div>
            <div id='header'>
                < img src='/imgs/baidu.png'></img>
                <Input.Group compact style={{ marginTop: 30 }}>
                    <Input style={{ width: 'calc(80% - 100px)' }} defaultValue="" />
                    <Button type="primary">百度一下</Button>
                    <u>帮助</u>
                </Input.Group>
            </div>
            <div id='nav'>
                <p>
                    <Link  to='/one'><HomeOutlined />首页</Link>
                    {
                        data.map(item => {
                            // console.log(item.title);
                            return <Link to={`/two/${item.columnName}`}>{item.columnName}</Link>
                            // /two/${item.column.columnName}
                        })
                    }
                </p>
            </div>
            <Outlet/>
            <footer>
                <img src='/imgs/footer.png'></img>
            </footer>
        </div>
    )
}