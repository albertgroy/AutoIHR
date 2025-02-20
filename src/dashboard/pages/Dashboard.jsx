import React from "react";
import {BrowserRouter as Router, Routes, Route, Link, Navigate} from "react-router-dom";
import { Layout, Menu } from "antd";
import "../assets/dashboard.style.less";
import { Row, Col, Card, Button } from "antd";
import PositionInfo from "./PositionInfo";
import PendingApplications from "./PendingApplications";
import TalentPool from "./TalentPool";

const { Header, Sider, Content } = Layout;

export default function App() {
  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider width={200} theme="light">
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            style={{ height: "100%", borderRight: 0 }}
          >
            <Menu.Item key="1">
              <Link to="/home">控制台</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/position">职位信息</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/pending">待处理投递</Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="/talent">人才库</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Content style={{ padding: 16 }}>
            <Routes>
              <Route path="/home" element={<MainContent />} />
              <Route path="/position" element={<PositionInfo />} />
              <Route path="/pending" element={<PendingApplications />} />
              <Route path="/talent" element={<TalentPool />} />
              <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
}

function MainContent() {
  return (
    <div style={{ padding: 16 }}>
      {/* 任务状态区 */}
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card title="任务状态">
            {/* 本日数据 */}
            <Row gutter={16}>
              <Col span={12}>
                <h3>本日</h3>
                <p>接待人数: 0</p>
                <p>对话数量: 0</p>
                <p>主动筛选简历: 0</p>
                <p>主动沟通: 0</p>
              </Col>
              {/* 总计数据 */}
              <Col span={12}>
                <h3>总计</h3>
                <p>接待人数: 0</p>
                <p>对话数量: 0</p>
                <p>主动筛选简历: 0</p>
                <p>主动沟通: 0</p>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      {/* 任务列表区 */}
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col span={24}>
          <Card title="任务列表">
            <Row gutter={16}>
              <Col span={8}>
                <Button block>自动回答</Button>
              </Col>
              <Col span={8}>
                <Button block>主动沟通</Button>
              </Col>
              <Col span={8}>
                <Button block>简历筛选</Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      {/* 其他按钮区 */}
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col span={24}>
          <Card>
            <Row gutter={16}>
              <Col span={8}>
                <Button block>职位信息</Button>
              </Col>
              <Col span={8}>
                <Button block>人才库</Button>
              </Col>
              <Col span={8}>
                <Button block>任务执行日志</Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
