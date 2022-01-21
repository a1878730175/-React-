import './register.css'
import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Checkbox, Select, message, Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import '../Apiaxios'
import { apiPost } from '../Apiaxios.js'
let url = ''
export default function Register() {
    //组件表单
    const { Option } = Select;
    const onFinish = (values) => {
        // console.log(url);
        console.log(values);
        // localStorage.setItem('url',url.name)
        let flag = /^1[3578][0-9]{9}$/.test(values.phone);
        if (flag) {
            const fd = new FormData()
            fd.append('account', values.username)
            fd.append('password', values.password)
            fd.append('tel', values.phone)
            fd.append('file', url)
            apiPost('/cus/registe', fd, r => {
                console.log(r);
                if (r.data.code == 2) {
                    message
                        .loading('注册中..', 0.5)
                        .then(() => message.success('注册成功', 2.5))
                } else {
                    message
                        .loading('注册中...', 0.5)
                        .then(() => message.info('注册失败', 2.5));
                }
            })
        } else {
            message
                .loading('注册中...', 0.5)
                .then(() => message.info('手机号格式错误', 2.5));
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select style={{ width: 70 }}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        </Form.Item>
    );
    return (
        <div className='div'>
            <Form
                id='from'
                name="basic"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <h1>欢迎注册</h1>
                <Avatar />
                <Form.Item
                    style={{ marginBottom: 60 }}
                    label="用户名"
                    name="username"
                    rules={[{ required: true, message: '请输入用户名!' }]}
                >
                    <Input style={{ height: 40 }} />
                </Form.Item>
                {/* <Form.Item
                style={{marginBottom:60}}
                    label="电话"
                    name="Tel"
                    rules={[{ required: true, message: '请输入注册电话!' }]}
                >
                    <Input style={{height:40}}/>
                </Form.Item> */}
                <Form.Item
                    style={{ marginBottom: 60 }}
                    name="phone"
                    label="电话"
                    rules={[{ required: true, message: 'Please input your phone number!' }]}
                >
                    <Input addonBefore={prefixSelector} style={{ width: '100%', height: '42px' }} />
                </Form.Item>
                <Form.Item
                    style={{ marginBottom: 60 }}
                    label="密码"
                    name="password"
                    rules={[{ required: true, message: '请输入密码!' }]}
                >
                    <Input.Password style={{ height: 40 }} />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                    <Checkbox style={{ marginLeft: -80 }}>阅读并接受《百度用户协议》及《百度隐私权保护声明》</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit" style={{ padding: '0 60px', marginLeft: '20px' }}>
                        注册
                    </Button>
                    <span style={{ marginLeft: 10 }}>已有账号？<Link to='/login'>登录</Link></span>
                </Form.Item>
            </Form>
        </div>
    )
}

//上传组件
function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  
  function beforeUpload(file) {
     url=file
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }
  
  class Avatar extends React.Component {
    state = {
      loading: false,
    };
  
    handleChange = info => {
      if (info.file.status === 'uploading') {
        this.setState({ loading: true });
        return;
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, imageUrl =>{
            console.log(imageUrl);
            localStorage.setItem('url',imageUrl)
            return  this.setState({
              imageUrl,
              loading: false,
            })
        }
        );
      }
    };
  
    render() {
      const { loading, imageUrl } = this.state;
      const uploadButton = (
        <div>
          {loading ? <LoadingOutlined /> : <PlusOutlined />}
          <div style={{ marginTop: 8 }}>Upload</div>
        </div>
      );
      return (
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action="/cus/registe"
          beforeUpload={beforeUpload}
          onChange={this.handleChange}
        >
          {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
        </Upload>
      );
    }
  }