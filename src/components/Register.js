import React, { useState, useContext } from 'react';
import { Form, Input, Button, message } from 'antd';
import NavBar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import 'antd/dist/reset.css';

export const Register = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { setIsAuthenticated, setIsRegistered } = useContext(AuthContext);

    const handleSubmit = async () => {
        try {
            // Simulate registration logic (replace with your actual implementation)
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Update authentication state after successful registration
            message.success('Registration successful!');
            setIsAuthenticated(true);
            setIsRegistered(true);

            // Redirect to the login page
            navigate('/login');
        } catch (error) {
            message.error('Registration failed: ' + error.message);
        }
    };


    return (
        <div>
            <NavBar />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <Form form={form} onFinish={handleSubmit} layout="horizontal" name="basic"
                    // labelCol={{ span: 8 }}
                    //  wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    autoComplete="off">
                    {/* Username Field */}
                    <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
                        <Input />
                    </Form.Item>

                    {/* Email Field */}
                    <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email', message: 'Please input a valid email address!' }]}>
                        <Input />
                    </Form.Item>

                    {/* Password Field */}
                    <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                        <Input.Password />
                    </Form.Item>

                    {/* Submit Button */}
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Register
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};
