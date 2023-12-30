import React, { useState, useEffect } from 'react';
import { Card, Spin, Typography } from 'antd';
import NavBar from './Navbar';
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext';

const { Meta } = Card;
const { Title } = Typography;

const Main = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://api.iex.cloud/v1/data/core/news?last=12&token=pk_fa0a23a53e6e4c45998e7cd2058234b5');
                setData(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <NavBar />
            <div style={{ maxWidth: '2000px', margin: 'auto', padding: '20px', textAlign: 'center' }}>
                <Title level={2}>Stock News</Title>
                {loading && <Spin size="large" />}
                {error && <p>Error: {error.message}</p>}
                {data && (
                    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
                        {data.map((article) => (
                            <Card
                                key={article.uuid}
                                hoverable
                                style={{ width: 300, marginBottom: '20px' }}
                                cover={<img alt={article.headline} src={article.imageUrl} />}
                            >
                                <Meta title={article.headline} description={article.summary} />
                                <a href={article.url} target="_blank" rel="noopener noreferrer">Read More</a>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Main;
