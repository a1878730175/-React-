import { Form, Input, Button, Select, Upload, message,notification} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import E from 'wangeditor'
import { useEffect, useState } from 'react';
import axios from 'axios';
import './css/Newsadd.css'
const { Option } = Select;
const token = localStorage.getItem('X-Token');
let editor;
let pic=''
let a=''
export default function Newsadd() {
    let [data, Setdata] = useState([])
    useEffect(() => {
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

        axios.get('/news/column/all', { headers: { 'X-Token': `${token}` } }).then(r => {
            // console.log(r.data.data);
            data = r.data.data
            Setdata(data)
            console.log(data);
        })

    }, [])
    const layout = {
        labelCol: { span: 2 },
        wrapperCol: { span: 8 },
    };
    const tailLayout = {
        wrapperCol: { offset: 2, span: 8 },
    };


    const [form] = Form.useForm();

    const onGenderChange = (value) => {
        switch (value) {
            case 'male':
                form.setFieldsValue({ note: 'Hi, man!' });
                return;
            case 'female':
                form.setFieldsValue({ note: 'Hi, lady!' });
                return;
            case 'other':
                form.setFieldsValue({ note: 'Hi there!' });
        }
    };

    const onFinish = (values) => {

        let text = editor.txt.html()
        console.log(text);
        values.text = text
        // console.log(values.text);
        // console.log(data);
        const fd=new FormData();
        fd.append('title',values.title)
        fd.append('content',values.text)
        fd.append('columnId',values.classify)
        fd.append('pic',a)
        console.log(pic);
        axios.post('/news/add', fd, { headers: { 'X-Token': `${token}` } }).then(resp => {
            console.log(resp);
            if (resp.data.code == 2) {
                notification['success']({
                    message: '提交成功',
                  });
            } else {
                notification['Error']({
                    message: '提交失败',
                  });
            }
        })

    };

    const onReset = () => {
        form.resetFields();
    };

    const onFill = () => {
        form.setFieldsValue({
            note: 'Hello world!',
            gender: 'male',
        });
    };

    //上传文件图片
    const props = {
        name: 'file',
        action: '/news/upload',
        headers: {
            'X-Token':`${token}`
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                a=JSON.parse(info.file.xhr.responseText).data[0].url;
                console.log(a);
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };
    return (
        <div className='jia'>
            <p>您当前的位置：管理首页 {">"} 新闻添加</p>
            <b>新闻的栏目管理</b>
            <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
                <Form.Item name="title" label="新闻标题" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="admin" label="新闻作者" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="classify" label="栏目编号" rules={[{ required: true }]}>
                    <Select
                        placeholder="选择"
                        onChange={onGenderChange}
                        allowClear
                    >
                        {/* 遍历新闻分类 */}
                        {
                            data.map(item => <Option key={item.columnId} value={item.columnId}>{item.columnName}</Option>)
                        }
                        {/* <Option value="male">male</Option>
                        <Option value="female">female</Option>
                        <Option value="other">other</Option> */}
                    </Select>
                </Form.Item>
                {/* <Form.Item
                    noStyle
                    shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
                >
                    {({ getFieldValue }) =>
                        getFieldValue('gender') === 'other' ? (
                            <Form.Item name="customizeGender" label="Customize Gender" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                        ) : null
                    }
                </Form.Item> */}
                <Upload {...props}>
                    <Button icon={<UploadOutlined />} style={{marginTop:'47px'}}>上传图片或文件</Button>
                </Upload>,
                {/* <Upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76" directory>
                    <Button style={{margin:'10px 70px'}} icon={<UploadOutlined />}>上传文件</Button>
                </Upload> */}
                <div id="div1" style={{ marginTop: '118px' }}></div>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="提交">
                        提交
                    </Button>
                    <Button htmlType="重置" onClick={onReset}>
                        重置
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}