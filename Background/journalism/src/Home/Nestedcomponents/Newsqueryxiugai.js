import { useParams,useNavigate} from "react-router-dom"
import { notification } from 'antd';
import { useEffect } from "react";
import E from 'wangeditor'
import { useState } from "react";
import axios from "axios"

const token = localStorage.getItem('X-Token');
let editor;
let pic=''
export default function XiugaiB(){
    let navigate=useNavigate()
    let [m,Setm]=useState('')
    let params=useParams()
    useEffect(()=>{
        editor = new E('#div1')
        editor.config.uploadFileName = 'file'
        editor.config.uploadImgServer = '/news/upload'
        editor.config.uploadImgAccept = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp']
        editor.config.uploadImgMaxSize = 50 * 1024 * 1024
        
        // editor.config.uploadImgParams = {
        //     "X-Token": localStorage.getItem("X-Token"),
        // }
        editor.config.uploadImgHeaders = {
            "X-Token": localStorage.getItem("X-Token"),
        }
        editor.config.uploadImgHooks = {
            success: function (xhr) {
                pic=JSON.parse(xhr.responseText).data[0].url;
                console.log('success', xhr)
            },
            // 图片上传并返回了结果，但图片插入时出错了
            fail: function (xhr, editor, resData) {
                console.log('fail', resData)
            },
            // 上传图片出错，一般为 http 请求的错误
            error: function (xhr, editor, resData) {
                console.log('error', xhr, resData)
            }
        }
        editor.create()



        axios.get(`/news/detail?newsId=${params.newid}`,{ headers: { 'X-Token': `${token}` } }).then(resp=>{
            // console.log(resp.data.data);
            m=resp.data.data
            Setm(m)
        })
    },[])
    let gai=(e)=>{
        let text = editor.txt.html()
        console.log(text);

        let title=document.getElementById('tit').value;
        // let text=document.getElementById('txt').value;
        // console.log(title,text);
        // console.log(params.newid,params.columnid);
        const fd=new FormData();
        fd.append('newsId',params.newid)
        fd.append('title',title)
        fd.append('content',text)
        fd.append('columnId',m.columnId)
        axios.post('/news/update',fd,{ headers: { 'X-Token': `${token}` } }).then(resp=>{
            console.log(resp.data.code);
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
    let b=()=>navigate("/home/newsquery")
    return(
        // <div>{params.newid}/{params.title}</div>
        <div>
            <b>您当前的位置:新闻管理{">"}新闻修改</b>
            <h1>新闻修改:</h1>
            新闻ID:<input disabled value={params.newid}/>
            栏目编号:<input disabled value={m.columnId}/>
            标题:<input defaultValue={m.title} id="tit"/>
            {/* 内容:<input defaultValue={m.content} id="txt"/> */}
            {/* 内容:<textarea cols="200" rows="10" defaultValue={m.content} id="txt"/> */}
            <div id="div1" style={{ marginTop: '118px' }}>
                <p dangerouslySetInnerHTML={{__html:m.content}}></p>
            </div>
            <button onClick={gai}>修改新闻</button>
        </div>
    )
}