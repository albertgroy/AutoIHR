import React, { useState, useEffect } from "react";
import { Card, Table } from "antd";

export default function App() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    chrome.storage.local.get(["bossJobs"], ({ bossJobs }) => {
      setJobs(bossJobs);
    });
  }, []);

  return (
    <Card title="职位监控看板">
      <Table dataSource={jobs}>
        <Column title="职位" dataIndex="position" />
        <Column title="薪资" dataIndex="salary" />
        <Column title="公司" dataIndex="company" />
      </Table>
    </Card>
  );
}
