import React, { useState, useEffect } from "react";
import { Card, Table } from "antd";

const { Column } = Table;

export default function App() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const db = await import("../../background/db.js");
      const jobs = await db.default.jobs
        .orderBy("timestamp")
        .reverse()
        .toArray();
      setJobs(jobs);
    };

    fetchJobs();
    const interval = setInterval(fetchJobs, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card title="职位监控看板" style={{ margin: "16px" }}>
      <Table dataSource={jobs} rowKey="id" pagination={{ pageSize: 10 }}>
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
