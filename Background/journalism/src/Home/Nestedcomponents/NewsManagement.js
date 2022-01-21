import './css/NewsManagement.css'
import { Table, Modal, Button,notification} from 'antd';
import React, { useEffect, useState } from 'react';
import '../../Apiaxios'
import { apiGet } from '../../Apiaxios';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function NewsManagement() {
  const token = localStorage.getItem('X-Token');
  let [data, Setdata] = useState([])
  let [n,setN]=useState("init");
  useEffect(() => {
    apiGet('/news/list','', r => {
      // console.log(r)
  
      data = r.data.data.list
      console.log(data);
      Setdata(data)
    })
  }, []);
  
  const columns = [
    {
      title: '新闻编号',
      dataIndex: 'newsId',
      width: 150,
    },
    {
      title: '栏目编号',
      dataIndex: 'columnId',
      width: 150,
    },
    {
      title: '新闻标题',
      dataIndex: 'title',
      width: 150,
    },
    {
      title: '作者',
      dataIndex: 'author',
      width: 150,
    },
    {
      title: '创建时间',
      dataIndex: 'date',
      width: 150,
    },
    {
      title: '操作',
      dataIndex: '',
      key: 'x',
      width: 150,
      render: obj =>
        // console.log(obj)
        <div>
          <span style={{ marginRight: '10px',backgroundColor:'#1890FF',padding:'6px 17px'}}><Link to={'/home/xiugai2/'+obj.newsId+'/'+obj.title+'/'+obj.columnId} style={{color:'white'}}>修改</Link></span>
          <a style={{ marginRight: '10px' ,backgroundColor:'#1890FF',padding:'6px 17px',color:'white'}} id={obj.newsId} onClick={demo}>删除</a>
          <>
            <Button type="primary" onClick={showModal} id={obj.newsId}>
              查看
            </Button>
            <Modal title={n.title} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} width="90%">
              {/* <p>{lantian.author,lantian.newsId}</p> */}
              {/* <p>{lantian.data}</p> */}
              {/* <p>{lantian.content}</p> */}
              <p>作者:{n.author} ID:{n.newsId}</p>
              <p>时间:{n.date}</p>
              <p>内容:<p dangerouslySetInnerHTML={{__html:n.content}}></p></p>
            </Modal>
          </>
        </div>
    },
  ]
// 删除新闻
  let demo=(e)=>{
    // console.log(e.target.id);
    axios.get(`/news/delete?newsId=${e.target.id}`,{ headers: { 'X-Token': `${token}` } }).then(resp=>{
      // console.log(resp);
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
  // 查看新闻
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = (e) => {
    setIsModalVisible(true);
    let id=e.target.parentNode.id
    axios.get(`/news/detail?newsId=${id}`,{ headers: { 'X-Token': `${token}` } }).then(a=>{
      console.log(a);
      n=a.data.data
      setN(n)
    })
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div className='lantian'>
      <p>您当前的位置：管理首页 {">"} 新闻管理</p>
      <b>新闻管理</b>
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 50 }} scroll={{ y: 240 }} />
    </div>
  )
}