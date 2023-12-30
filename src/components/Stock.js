import React, { useContext, useState, useEffect } from 'react';
import { Input, Button, Card, Statistic, Row, Col, Divider, Select,Flex  } from 'antd';
import axios from 'axios';
import Chart from 'react-apexcharts';
import NavBar from './Navbar';
import 'antd/dist/reset.css'; // Import Ant Design styles
import { AuthContext } from '../Context/AuthContext';
import { Link } from 'react-router-dom';


const { Option } = Select;

const Stock = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [symbol, setSymbol] = useState('');
  const [stockData, setStockData] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [selectedRange, setSelectedRange] = useState('1d');
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  const fetchStockQuote = async () => {
    try {
      // Fetch stock details
      const response = await axios.get(
        `https://api.iex.cloud/v1/data/core/quote/${symbol}?token=pk_fa0a23a53e6e4c45998e7cd2058234b5`
      );
      setStockData(response.data);

      // Fetch chart data with the selected range
      const chartResponse = await axios.get(
        `https://api.iex.cloud/v1/data/core/intraday_prices/${symbol}?range=${selectedRange}&token=pk_fa0a23a53e6e4c45998e7cd2058234b5`
      );
      setChartData(chartResponse.data);
    } catch (error) {
      console.error('Error fetching stock quote:', error);
    }
  };
  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     navigate('/login');
  //   }
  // }, [isAuthenticated]);

  useEffect(() => {
    if (symbol) {
      fetchStockQuote();
    }
  }, [symbol, selectedRange]);

  const renderChart = () => {
    const labels = chartData.map((entry) => entry.date);
    const prices = chartData.map((entry) => entry.close);

    const chartOptions = {
      xaxis: {
        categories: labels,
      },
      yaxis: {
        title: {
          text: 'Stock Prices',
        },
      },
    };

    const chartSeries = [
      {
        name: 'Stock Prices',
        data: prices,
      },
    ];

    return (
      <div>
        <Select defaultValue="1d" onChange={(value) => setSelectedRange(value)}>
          <Option value="1d">1 Day</Option>
          <Option value="5dm">5 Days</Option>
          <Option value="1mm">1 Month</Option>
          {/* Add more options as needed */}
        </Select>
        <Chart options={chartOptions} series={chartSeries} type="line" height={350} />
      </div>
    );
  };

  return (
    
    <div>
      <NavBar />
      
      <div style={{ maxWidth: '2000px', margin: 'auto', padding: '20px', textAlign: 'center' }}>
        <Card title="Stock Viewer" style={{ marginBottom: '20px' }}>
        <Flex
    vertical
    gap="small"
    style={{
      width: '100%',
    }}
  >
          <Input
            placeholder="Enter stock symbol"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value.toUpperCase())}
          />
          <Button
            type="primary"
            block
            onClick={fetchStockQuote}
            style={{ marginLeft: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            Get Stock Details
          </Button>
          </Flex>
        </Card>

        {stockData && (
          <Card title="Stock Information">
            <Row gutter={16}>
              <Col span={8}>
                <Statistic title="Symbol" value={stockData[0].symbol} />
              </Col>
              <Col span={8}>
                <Statistic title="Company Name" value={stockData[0].companyName} />
              </Col>
              <Col span={8}>
                <Statistic title="Market Cap" value={stockData[0].marketCap} />
              </Col>
            </Row>

            <Divider />

            <Row gutter={16}>
              <Col span={8}>
                <Statistic title="Latest Price" value={stockData[0].latestPrice} precision={2} />
              </Col>
              <Col span={8}>
                <Statistic title="Change" value={stockData[0].change} precision={2} />
              </Col>
              <Col span={8}>
                <Statistic title="Change Percent" value={stockData[0].changePercent} suffix="%" />
              </Col>
            </Row>

            <Divider />

            <Row gutter={16}>
              <Col span={8}>
                <Statistic title="Open" value={stockData[0].iexOpen} precision={2} />
              </Col>
              <Col span={8}>
                <Statistic title="Previous Close" value={stockData[0].previousClose} precision={2} />
              </Col>
              <Col span={8}>
                <Statistic title="Volume" value={stockData[0].iexVolume} />
              </Col>
            </Row>
          </Card>
        )}

        {chartData.length > 0 && (
          <Card title="Stock Price Chart">
            <div style={{ marginTop: '20px' }}>{renderChart()}</div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Stock;