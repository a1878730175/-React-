import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { notification } from 'antd';

import axios from "axios"
import './css/lanmuxiugai.css'
export default function Xiugai(){
    let navigate=useNavigate()
    let params=useParams()
    const token = localStorage.getItem('X-Token');
    let demo=(e)=>{
        let name=e.target.previousElementSibling.value
        axios.post('/news/column/update',`columnId=${params.id}&columnName=${name}`,{ headers: { 'X-Token': `${token}` } }).then(resp=>{
            console.log(resp);
            if(resp.data.code==2){
                notification['success']({
                    message: '修改成功',
                  });
                b()
            }else{
                notification['Error']({
                    message: '修改失败',
                  });
            }
        })

    }
    let b=()=>navigate("/home/management")
    return(
        <div className="xiu">
            <h1>修改栏目</h1>
            <span>ColumnId:{params.id}</span><br/>
            
            <input type='text' defaultValue={params.name}/>
            
            <button onClick={demo}>修改</button>
        </div>
    )
}