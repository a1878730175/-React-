import './css/Management.css'
import { Table,notification} from 'antd';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../Apiaxios'
// import { apiGet } from '../../Apiaxios';

export default function Management() {

  const token = localStorage.getItem('X-Token');
  let [data, Setdata] = useState([])
  useEffect(() => {
    axios.get('/news/column/all', { headers: { 'X-Token': `${token}` } })
      .then(resp => {
        data = resp.data.data
        // console.log(data);
        Setdata(data)
      })
  }, []);
  let demo=(e)=>{
    axios.get(`/news/column/delete?columnId=${e.target.id}`,{ headers: { 'X-Token': `${token}` } }).then(resp=>{
      console.log(resp.data.code);
      if(resp.data.code==2){
        notification['success']({
          message: '删除成功',
        });
      }else{
        notification['Error']({
          message: '删除失败',
        });
      }
    })
  }
  const columns = [
    {
      title: '栏目编号',
      dataIndex: 'columnId',
      width: 150,
    },
    {
      title: '名称',
      dataIndex: 'columnName',
      width: 150,
    },
    {
      title: '操作',
      dataIndex: '',
      key: 'x',
      width: 150,
      render: (r,obj) => 
      // console.log(r)
      <div>
          <button id={obj.columnId} style={{marginRight:'10px'}}><Link to={'/home/xiugai/'+obj.columnId+'/'+obj.columnName}>修改</Link></button>
          <button id={obj.columnId} onClick={demo}>删除</button>
      </div>
    },

  ];


  return (
    <div className="guan">
      <p>您当前的位置：管理首页 {">"} 栏目管理</p>
      <b>新闻的栏目管理</b>
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 50 }} scroll={{ y: 240 }} />,
    </div>
  )
}