import './css/Newsquery.css'
import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Table, Modal, notification} from 'antd';
import { Link } from 'react-router-dom';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
const { confirm } = Modal;

export default function Newsquery() {
    const token = localStorage.getItem('X-Token');
    let [n, setN] = useState("init");
    const [form] = Form.useForm();
    const [, forceUpdate] = useState({});
    let [data, setdata] = useState([])

    useEffect(() => {
        forceUpdate({});
    }, []);

    const onFinish = (values) => {
        // console.log(values);
        let temp = '';
        if (values.number) {
            temp += 'newsId=' + values.number + '&'
        }
        if (values.tittle) {
            temp += 'title=' + values.tittle + '&'
        }
        if (values.date) {
            temp += 'page=' + values.date + '&'
        }
        // console.log(temp);
        axios.get(`/news/query?${temp}`, { headers: { 'X-Token': `${token}` } }).then(d => {
            // console.log(d);
            if (d.data.code == 2) {
                if (d.data.data.list.length == 0) {
                    notification['warning']({
                        message: '已删除或者未找到'
                    })
                } else {
                    data = d.data.data.list;
                    setdata(data)
                }
            } else {
                notification['Error']({
                    message: '查询失败',
                });
            }
        })
    };

    const columns = [
        {
            title: '新闻编号',
            dataIndex: 'newsId',
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
                <div>
                    <a style={{ marginRight: '10px', backgroundColor: '#1890FF', padding: '6px 17px' }}><Link to={'/home/xiugai3/' + obj.newsId} style={{ color: 'white' }}>修改</Link></a>
                    {/* <a style={{ marginRight: '10px' ,backgroundColor:'#1890FF',padding:'6px 17px',color:'white'}} id={obj.newsId} onClick={demo}>删除</a>
                     */}
                    <Button onClick={demo} type="dashed" id={obj.newsId} style={{ marginRight: '10px' ,backgroundColor:'#1890FF',padding:'6px 17px',color:'white'}}>
                        删除
                    </Button>
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
                            <p>内容:<p dangerouslySetInnerHTML={{ __html: n.content }}></p></p>
                        </Modal>
                    </>
                </div>,
        },
    ]
    //删除新闻
    let demo = (event) => {
        let b=event.currentTarget.id
        confirm({
            title: '是否删除?',
            icon: <ExclamationCircleOutlined />,
            // content: 'Some descriptions',
            okText: '是',
            okType: 'danger',
            cancelText: '否',
            onOk() {
                console.log('OK');
                axios.get(`/news/delete?newsId=${b}`, { headers: { 'X-Token': `${token}` } }).then(resp => {
                    // console.log(resp);
                    console.log(resp.data.code);
                    if (resp.data.code == 2) {
                        notification['success']({
                            message: '删除成功',
                        });
                    } else {
                        notification['Error']({
                            message: '删除失败',
                        });
                    }
                })
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    // 查看新闻
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = (e) => {
        setIsModalVisible(true);
        let id = e.target.parentNode.id
        axios.get(`/news/detail?newsId=${id}`, { headers: { 'X-Token': `${token}` } }).then(a => {
            n = a.data.data
            setN(n)
            console.log(n);
        })
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div className="t">
            <p>您当前的位置：管理首页 {">"} 新闻查询</p>
            <b>新闻查询</b>
            <Form form={form} name="horizontal_login" layout="inline" onFinish={onFinish}>
                <Form.Item
                    name="number"
                    placeholder="编号"
                // rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input placeholder="编号" />
                </Form.Item>
                <Form.Item
                    name="tittle"
                // rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input
                        type="tittle"
                        placeholder="标题"
                    />
                </Form.Item>
                <Form.Item
                    name="date"
                // rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input
                        type="datetext"
                        placeholder="页码"
                    />
                </Form.Item>
                <Form.Item shouldUpdate>
                    {() => (
                        <Button
                            type="primary"
                            htmlType="search"
                        >
                            搜索
                        </Button>
                    )}
                </Form.Item>
            </Form>
            <Table columns={columns} dataSource={data} pagination={{ pageSize: 50 }} scroll={{ y: 240 }} />
        </div>
    )
}