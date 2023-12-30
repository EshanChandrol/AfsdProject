import React, { useState, useContext } from 'react';
import { Form, Input, Button, message } from 'antd';
import NavBar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import 'antd/dist/reset.css';

export const Login = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { setIsAuthenticated, setIsRegistered } = useContext(AuthContext);

    const handleSubmit = async () => {
        try {
            // Simulate login logic (replace with your actual implementation)
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Update authentication state after successful login
            message.success('Login successful!');
            setIsAuthenticated(true);

            // Redirect to the home page
            navigate('/');
        } catch (error) {
            message.error('Login failed: ' + error.message);
        }
    };

    return (
        
            <div>
                <NavBar />
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <Form form={form} onFinish={handleSubmit}>
                    {/* Username Field */}
                    <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
                        <Input />
                    </Form.Item>

                    {/* Password Field */}
                    <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                        <Input.Password />
                    </Form.Item>

                    {/* Submit Button */}
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Login
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};
