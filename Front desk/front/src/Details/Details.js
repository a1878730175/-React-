import './Details.css'
import { useParams } from "react-router-dom"
import { apiGet, apiPost } from '../Apiaxios'
import React, { useEffect, createElement } from 'react'
import { useState } from 'react/cjs/react.development'
import { Link } from 'react-router-dom'


import { Comment, Tooltip, Avatar, Form, Input, Button, Checkbox, message } from 'antd';
import moment from 'moment';
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';

export default function Details() {
    let params = useParams()
    let [data, setdata] = useState('')
    useEffect(() => {
        apiGet(`/newsfront/detail?newsId=${params.id}`, r => {
            console.log(r);
            // console.log(r.data.data.notes);
            data = r.data.data;
            setdata(data)
        })
    }, [])

    //评论
    const [likes, setLikes] = useState(0);
    const [action, setAction] = useState(null);

    //点赞
    const like = (e) => {
        // con······sole.log(e.currentTarget.children[1].id);
        // console.log(tt+1);
        let aa = localStorage.getItem('X-Token')
        if (aa == null) {
            message.warning('未登录，请登录');
            // alert('未登录，请登录')
        } else {
            let tt = e.currentTarget.children[1].innerHTML++
            let ttt = tt + 1
            apiGet(`/comment/favor?id=${e.currentTarget.children[1].id}&type=1`, r => {
                console.log(r);
            })
        }
    };
    //评论
    const onFinish = (values) => {
        console.log(values);
        let aa = localStorage.getItem('X-Token')
        if (aa == null) {
            message.warning('未登录，请登录');
        } else {
            apiPost('/comment/add', `newsId=${params.id}&text=${values.username}`, r => {
                // console.log(r.data.code);
                if (r.data.code == 2) {
                    message.success('评论成功');
                    window.location.reload()
                } else {
                    message.error('评论失败');
                }
            })
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    //回复
    let demo = (e) => {
        let t = e.target.parentNode.nextElementSibling.children[0];
        console.log(t);
        if (t.style.display == 'none') {
            t.style.display = 'block'
        } else {
            t.style.display = 'none'
        }
        // let a=prompt("回复")
        // console.log(e.target.id);
        // let aa=localStorage.getItem('X-Token')
        // if(aa==null){
        //     alert('未登录，请登录')
        // }else{
        //     apiPost('/comment/reply',`noteId=${e.target.id}&text=${a}`,rr=>{
        //         console.log(rr);
        //     })
        //     window.location.reload()
        // }
    }
    let dianji = (e) => {
        let id = e.target.id
        let value = e.target.previousElementSibling.value
        // console.log(value);
        let aa = localStorage.getItem('X-Token')
        if (aa == null) {
            message.warning('未登录，请登录');
        } else {
            apiPost('/comment/reply', `noteId=${id}&text=${value}`, rr => {
                console.log(rr);
            })
            window.location.reload()
        }
    }
    let tui = () => {
        apiGet('/cus/logout', resp => {
            console.log(resp);
            if (resp.data.code == 2) {
                message
                    .loading('退出中..', 0.5)
                    .then(() => message.success('成功退出', 2.5))
                localStorage.removeItem('X-Token')
            } else {
                message
                    .loading('退出中..', 0.5)
                    .then(() => message.info('退出失败', 2.5));
            }
        })
    }
    let u = localStorage.getItem('url')
    // console.log(u);
    return (
        // <div>{params.id}</div>
        <div>
            <header className='header'>
                <div>
                    <img src="/imgs/bai.png"></img>
                </div>
                <div>
                    <span>百度首页</span>
                    <Link to='/login'>登录</Link>
                    <span style={{ backgroundColor: '#4E71F3', padding: '5px 10px', color: '#fff', borderRadius: 15 }} onClick={tui}>退出登录</span>
                </div>
            </header>
            {data && <section id='ll'>
                <h1 style={{ textAlign: 'left', padding: '5px 20px' }}>{data.title}</h1>
                <div>
                    <p>
                        <img src='/imgs/biao.png'></img>
                    </p>
                    <p>
                        <h4>{data.author}</h4>
                        <span>发布时间:{data.date}</span>|<span>{data.column.columnName}</span>
                    </p>
                </div>
            </section>}

            {
                data && <div id='con'>
                    <p dangerouslySetInnerHTML={{ __html: data.content }}>
                    </p>
                </div>}
            {/* <div className='tu'>
                <img src={`/${data.pic}`}></img>
            </div> */}
            <div id='comment'>
                <b>发表评论</b>
                <div id='lun'>
                    {
                        <div><img src={`${u}`} style={{ width: 80, height: 80, borderRadius: '50%' }}></img></div>

                    }
                    <Form
                        name="basic"
                        labelCol={{ span: 16 }}
                        wrapperCol={{ span: 16 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            name="username"
                        >
                            <Input.TextArea style={{ width: 800, height: 100 }} />
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit" style={{ marginLeft: 300 }}>
                                发表
                            </Button>
                        </Form.Item>
                    </Form>
                </div>

                {
                    data && data.notes.map(item => {
                        return (
                            // console.log(item.favor)
                            <Comment
                                actions={[
                                    <Tooltip key="comment-basic-like" title="Like">
                                        <span onClick={like} >
                                            {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
                                            <span className="comment-action" id={item.id}>{item.favor}</span>
                                        </span>
                                    </Tooltip>,
                                    <span key="comment-basic-reply-to" onClick={demo} id={item.id}>回复</span>,
                                    <div style={{ display: 'none' }}>
                                        <textarea cols="50" rows="2" style={{ padding: 10, borderRadius: 15 }}></textarea>
                                        <button type='primary' id={item.id} style={{ marginLeft: 10, padding: '5px 10px', border: 'none', backgroundColor: '#1890FF', color: 'white', borderRadius: 10, position: 'relative', top: -10 }} onClick={dianji}>回复</button>
                                    </div>
                                ]}
                                author={<a>{item.avatar.account}</a>}
                                avatar={<Avatar src={`/${item.avatar.portrait}`} alt={item.avatar.account} />}
                                content={
                                    <p>{item.text}</p>
                                }

                                datetime={
                                    <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                                        <span>{moment(item.date).fromNow()}</span>
                                    </Tooltip>
                                }
                            >
                                {
                                    item.replys.map(m => {
                                        return (
                                            <Comment
                                                // actions={[
                                                //     <Tooltip key="comment-basic-like" title="Like">
                                                //         <span onClick={like}>
                                                //             {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
                                                //             <span className="comment-action">{likes}</span>
                                                //         </span>
                                                //     </Tooltip>,
                                                //     // <span key="comment-basic-reply-to">回复</span>,
                                                // ]}
                                                author={<a>{m.avatar.account}</a>}
                                                avatar={<Avatar src={`/${m.avatar.portrait}`} alt={m.avatar.account} />}
                                                content={
                                                    <p>{m.text}</p>
                                                }

                                                datetime={
                                                    <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                                                        <span>{moment(m.date).fromNow()}</span>
                                                    </Tooltip>
                                                }
                                            ></Comment>
                                        )
                                    })
                                }
                            </Comment>
                        )
                    })
                }
            </div>
            <footer>
                <img src='/imgs/footer.png'></img>
            </footer>
        </div>
    )
}