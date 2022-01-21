import './css/add.css'
import axios from 'axios';
import { notification } from 'antd';

export default function One(){
    let demo=(e)=>{
        let values=e.target.previousElementSibling.value
        const token = localStorage.getItem('X-Token');
        // console.log(token);
        axios.post('/news/column/add',`columnName=${values}`,{headers: {'X-Token': `${token}`}}).then(resp=>{
            // console.log(resp.data.code);
            if(resp.data.code==2){
                notification['success']({
                    message: '添加成功',
                    // description:
                    //   "添加成功"
                  });
            }else if(resp.data.code==3){
                notification['warning']({
                    message: '已有此新闻栏目，请勿重复添加',
                    // description:
                    //   'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
                  });
            }
        })
    }
    return(
        <div className='tian'>
            <p>您当前的位置：添加栏目</p>
            <b>添加栏目</b>
            <span>栏目名称</span><input/>
            <input type='button' value='提交' onClick={demo}/>
        </div>
    )
}