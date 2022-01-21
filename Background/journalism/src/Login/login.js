import { Form, Input, Button, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from "axios"
export default function Login(){  
  let navigate=useNavigate();
    const onFinish = (values) => {
        console.log('Success:', values);
        axios.post('/sys/login',`username=${values.username}&password=${values.password}`).then(resp=>{
            if(resp.data.code==2){
                // alert(resp.data.message)success
                localStorage.setItem("X-Token",resp.data.data.token)
                notification['success']({
                  message: '登陆成功',
                  description:
                    "登陆成功"
                });
                demo()
            }else{
                notification['error']({
                    message: '注意',
                    description:
                      "账号或者密码错误"
                  }); 
            }
        })
    };
    let demo=()=>navigate("/home")

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

  return (
    <Form
      name="basic"
      labelCol={{ span: 7 }}
      wrapperCol={{ span: 10 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
        <h1 align="center">新闻管理系统</h1>
      <Form.Item
        label="账号"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="密码"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit"> 
          登录
        </Button>
      </Form.Item>
    </Form>
  )
}