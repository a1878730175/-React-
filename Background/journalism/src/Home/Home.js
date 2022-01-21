import React from 'react';
import { Link,Outlet} from 'react-router-dom';
import { Layout, Menu, Breadcrumb,notification} from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined,BankOutlined} from '@ant-design/icons';
import axios from 'axios';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const token = localStorage.getItem('X-Token');
export default class Home extends React.Component {
    demo=()=>{
        axios.get('/sys/logout',{ headers: { 'X-Token': `${token}` } }).then(resp=>{
            console.log(resp);
            if(resp.data.code==2){
                notification['success']({
                    message: '成功退出',
                  });
                localStorage.removeItem('X-Token')
                window.location.href='/'
            }else{
                notification['Error']({
                    message: '退出失败',
                  });
            }
        })
    }
    render() {
        return (
            <Layout>
                <Header className="header" >
                    <div className="logo" />
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                        <span style={{fontSize:"25px",marginRight:"20px"}}>Login</span>
                        <span style={{fontSize:'20px'}}>新闻管理系统</span>
                        <span style={{marginLeft:'1300px',marginRight:'30px'}}>管理者 您好!</span>
                        <span style={{backgroundColor:'#A5CF4C',padding:'0 20px'}}>管理</span>
                        <span style={{backgroundColor:'#52AFB7',padding:'0 20px',}} onClick={this.demo}>安全退出</span>
                        {/* <Link to='' style={{color:'white'}} onClick={this.demo}>安全退出</Link> */}
                    </Menu>
                </Header>
                <Layout>
                    <Sider width={200} className="site-layout-background">
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{ height: '100%', borderRight: 0 }}
                        >
                            <Menu.Item  key="3" title="首页"><BankOutlined style={{marginRight:'10px'}}/><Link to='/home/shou'>首页</Link></Menu.Item>
                            <SubMenu key="sub1" icon={<UserOutlined />} title="栏目管理" style={{borderTop:'1px solid #cccccc'}}>
                                <Menu.Item key="1"><Link to="/home/one">添加栏目</Link></Menu.Item>
                                <Menu.Item key="2"><Link to='/home/management'>栏目管理</Link></Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2" icon={<LaptopOutlined />} title="新闻管理">
                                <Menu.Item key="5"><Link to='/home/newsadd'>新闻的添加</Link></Menu.Item>
                                <Menu.Item key="6"><Link to='/home/newsManagement'>新闻管理</Link></Menu.Item>
                                <Menu.Item key="7"><Link to='/home/newsquery'>新闻查询</Link></Menu.Item>
                            </SubMenu>

                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        {/* <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>App</Breadcrumb.Item>
                        </Breadcrumb> */}
                        <Content
                            className="site-layout-background"
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                            }}
                        >
                            <Outlet/>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        )
    }
}