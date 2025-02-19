import React from "react";
import "../assets/dashboard.style.css";
import {Row, Col, Card, Button} from "antd";

export default function App() {
  return (
    <div style={{padding: 16}}>
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
      <Row gutter={[16, 16]} style={{marginTop: 16}}>
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
      <Row gutter={[16, 16]} style={{marginTop: 16}}>
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
