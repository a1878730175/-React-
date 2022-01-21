import './login.css'
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { apiPost } from '../Apiaxios';
export default function Login() {
    //组件表单
    let navigate = useNavigate()
    const onFinish = (values) => {
        console.log(values);
        apiPost('/cus/login', `account=${values.username}&password=${values.password}`, resp => {
            // localStorage.setItem('X-Token',resp.data.data.token)
            if (resp.data.code == 2) {
                message
                    .loading('登录中...', 1)
                    .then(() => message.success('登录成功', 2.5))
                localStorage.setItem('X-Token', resp.data.data.token)
                b()
            } else {
                message
                    .loading('登陆中...', 1)
                    .then(() => message.info('登陆失败', 1.5))
                    .then(() => message.info('账号或密码错误', 2.5));
            }
        })
    };
    let b = () => navigate('/one')
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
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
                <h1>欢迎登录</h1>
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
                        登录
                    </Button>
                    {/* <Button onClick={success}>Display sequential messages</Button> */}
                    <span style={{ marginLeft: 10 }}><Link to='/register'>立即注册</Link></span>
                </Form.Item>
            </Form>
        </div>
    )
}