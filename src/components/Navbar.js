import React, { useContext, useState } from 'react';
import { Layout, Menu, Button } from 'antd';
import { Link, useLocation } from 'react-router-dom'; // Assuming you're using React Router
import { AuthContext } from '../Context/AuthContext';

const { Header } = Layout;

const NavBar = () => {
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
    const [selectedKey, setSelectedKey] = useState('1');
    const location = useLocation();

    const handleLogout = () => {
        setIsAuthenticated(false);
        // Additional logic if needed (e.g., clear localStorage, redirect to login page, etc.)
    };


    const handleMenuClick = (key) => {
        setSelectedKey(key);
    };

    return (
        <Layout>
            <Header>
                <div className="logo" /> {/* Replace with your application logo */}
                <Menu theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={[selectedKey]}
                    selectedKeys={[selectedKey]} >
                    <Menu.Item key="1">
                        <Link to="/" onClick={() => handleMenuClick('1')}>Home</Link>
                    </Menu.Item>

                    <Menu.Item key="2">
                        <Link to="/dashboard" onClick={() => handleMenuClick('2')}>Dashboard</Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Link to="/login" onClick={() => handleMenuClick('3')}>Login</Link>
                    </Menu.Item>
                    <Menu.Item key="4">
                        <Link to="/register" onClick={() => handleMenuClick('4')}>Register</Link>
                    </Menu.Item>

                    {isAuthenticated && (
                        <Menu.Item key="7" style={{ float: 'right' }}>
                            <Button type="link" onClick={handleLogout}>
                                Logout
                            </Button>
                        </Menu.Item>
                    )}
                </Menu>
            </Header>
        </Layout>
    );
};

export default NavBar;
