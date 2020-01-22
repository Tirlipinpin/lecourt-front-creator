import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Row, Col, PageHeader } from 'antd';
import {
    ResponsiveContainer,
    PieChart,
    LineChart,
    Pie,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
} from 'recharts';

import './index.css';


export class Dashboard extends Component<{}, {}> {
    margin = {
        top: 20,
        right: 30,
        left: 0,
        bottom: 0
    };

    dataTest1 = [
        {
          "name": "Age moyen",
          "value": 26,
        },
        {
          "name": "Nombre de vues total",
          "value": 30000
        },
        {
          "name": "Nombre de films postés",
          "value": 30
        },
        {
            "name": "Nombre de campagnes",
            "value": 5
        },
    ];

    dataTest2 = [
        {
          "name": "Quantité de revisionnages",
          "value": 2400
        },
        {
          "name": "Note moyenne de vos courts (/5)",
          "value": 4.2
        },
        {
          "name": "Durée moyenne de vos courts (en minutes)",
          "value": 13.75
        },
    ];

    dataTest3 = [
        {
          "name": "Page A",
          "uv": 4000,
          "pv": 2400,
          "amt": 2400
        },
        {
          "name": "Page B",
          "uv": 3000,
          "pv": 1398,
          "amt": 2210
        },
        {
          "name": "Page C",
          "uv": 2000,
          "pv": 9800,
          "amt": 2290
        },
        {
          "name": "Page D",
          "uv": 2780,
          "pv": 3908,
          "amt": 2000
        },
        {
          "name": "Page E",
          "uv": 1890,
          "pv": 4800,
          "amt": 2181
        },
        {
          "name": "Page F",
          "uv": 2390,
          "pv": 3800,
          "amt": 2500
        },
        {
          "name": "Page G",
          "uv": 3490,
          "pv": 4300,
          "amt": 2100
        }
    ]

    getRandomColor = () => "#"+((1<<24)*Math.random()|0).toString(16);

    render() {
        return (
            <Layout className="dashboard-page-container">
                <PageHeader
                    title="Dashboard"
                    subTitle="Voyez toutes vos statistiques du premier coup d'œil"
                    className="dashboard-header"
                />
                <Row type="flex" gutter={32}>
                    <Col span={8}>
                        <ResponsiveContainer
                            height={350}
                            width="100%"
                            className="chart-container"
                        >
                            <PieChart>
                                <Tooltip />
                                <Legend verticalAlign="top" height={36} />
                                <Pie data={this.dataTest1} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill={this.getRandomColor()} label />
                            </PieChart>
                        </ResponsiveContainer>
                    </Col>
                    <Col span={8}>
                        <ResponsiveContainer
                            height={350}
                            width="100%"
                            className="chart-container"
                        >
                            <PieChart>
                                <Tooltip />
                                <Legend verticalAlign="top" height={36} />
                                <Pie data={this.dataTest2} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill={this.getRandomColor()} label />
                            </PieChart>
                        </ResponsiveContainer>
                    </Col>
                    <Col span={8}>
                        <ResponsiveContainer
                            height={350}
                            width="100%"
                            className="chart-container"
                        >
                            <PieChart>
                                <Tooltip />
                                <Legend verticalAlign="top" height={36} />
                                <Pie data={this.dataTest1} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill={this.getRandomColor()} label />
                            </PieChart>
                        </ResponsiveContainer>
                    </Col>
                </Row>
                <Row gutter={32}>
                    <Col span={16}>
                        <ResponsiveContainer
                            height={350}
                            width="100%"
                            className="chart-container"
                        >
                            <LineChart data={this.dataTest3}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="pv" stroke={this.getRandomColor()} />
                                <Line type="monotone" dataKey="uv" stroke={this.getRandomColor()} />
                            </LineChart>
                        </ResponsiveContainer>
                    </Col>
                    <Col span={8}>
                        <ResponsiveContainer
                            height={350}
                            width="100%"
                            className="chart-container"
                        >
                            <PieChart>
                                <Tooltip />
                                <Legend verticalAlign="top" height={36} />
                                <Pie data={this.dataTest2} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill={this.getRandomColor()} label />
                            </PieChart>
                        </ResponsiveContainer>
                    </Col>
                </Row>
                <Row gutter={32}>
                    <Col span={8}>
                        <ResponsiveContainer
                            height={350}
                            width="100%"
                            className="chart-container"
                        >
                            <PieChart>
                                <Tooltip />
                                <Legend verticalAlign="top" height={36} />
                                <Pie data={this.dataTest1} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill={this.getRandomColor()} label />
                            </PieChart>
                        </ResponsiveContainer>
                    </Col>
                    <Col span={16}>
                        <ResponsiveContainer
                            height={350}
                            width="100%"
                            className="chart-container"
                        >
                            <PieChart>
                                <Tooltip />
                                <Legend verticalAlign="top" height={36} />
                                <Pie data={this.dataTest2} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill={this.getRandomColor()} label />
                            </PieChart>
                        </ResponsiveContainer>
                    </Col>
                </Row>
            </Layout>
        );
    }
};

export default connect()(Dashboard);
