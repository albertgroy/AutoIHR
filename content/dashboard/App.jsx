import React, { useState, useEffect } from "react";
import { Card, Table } from "antd";

const { Column } = Table;

export default function App() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // 从存储中获取职位数据
    chrome.storage.local.get(["bossJobs"], ({ bossJobs }) => {
      if (bossJobs) {
        setJobs([bossJobs]);
      }
    });

    // 监听存储变化
    const listener = (changes) => {
      if (changes.bossJobs) {
        setJobs([changes.bossJobs.newValue]);
      }
    };
    chrome.storage.onChanged.addListener(listener);

    return () => {
      chrome.storage.onChanged.removeListener(listener);
    };
  }, []);

  return (
    <Card title="职位监控看板" style={{ margin: "16px" }}>
      <Table dataSource={jobs} rowKey="timestamp">
        <Column title="职位" dataIndex="position" />
        <Column title="薪资" dataIndex="salary" />
        <Column title="公司" dataIndex="company" />
        <Column
          title="时间"
          dataIndex="timestamp"
          render={(ts) => new Date(ts).toLocaleString()}
        />
      </Table>
    </Card>
  );
}
