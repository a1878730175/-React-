import { useParams,useNavigate} from "react-router-dom"
import { notification } from 'antd';

import { useState } from "react";
import axios from "axios"

const token = localStorage.getItem('X-Token');
export default function XiugaiA(){
    let navigate=useNavigate()
    let [m,Setm]=useState('')
    let params=useParams()
    axios.get(`/news/detail?newsId=${params.newid}`,{ headers: { 'X-Token': `${token}` } }).then(resp=>{
        // console.log(resp.data.data.content);
        m=resp.data.data.content
        Setm(m)
    })
    let gai=(e)=>{
        let title=document.getElementById('tit').value;
        let text=document.getElementById('txt').value;
        console.log(title,'**********',text);
        const fd=new FormData();
        fd.append('newsId',params.newid)
        fd.append('title',title)
        fd.append('content',text)
        fd.append('columnId',params.columnid)
        axios.post('/news/update',fd,{ headers: { 'X-Token': `${token}` } }).then(resp=>{
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
    let b=()=>navigate("/home/newsManagement")
    return(
        // <div>{params.newid}/{params.title}</div>
        <div>
            <b>您当前的位置:新闻管理{">"}新闻修改</b>
            <h1>新闻修改:</h1>
            新闻ID:<input disabled value={params.newid}/>
            栏目编号:<input disabled value={params.columnid}/>
            标题:<input defaultValue={params.title} id="tit"/>
            {/* 内容:<input defaultValue={m} id="txt"/> */}
            内容:<textarea cols="200" rows="10" defaultValue={m} id="txt"/>

            <button onClick={gai}>修改新闻</button>
        </div>
    )
}