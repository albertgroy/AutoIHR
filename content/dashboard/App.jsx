import React, { useState, useEffect } from "react";
import { Table, Card } from "antd";
import { jobDB } from "../../background/db";

const { Column } = Table;

export default function App() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const loadJobs = async () => {
      const jobs = await jobDB.getJobs();
      setJobs(jobs);
    };

    loadJobs();

    // Refresh jobs every 5 seconds
    const interval = setInterval(loadJobs, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card title="职位监控看板" style={{ margin: 16 }}>
      <Table
        dataSource={jobs}
        rowKey="id"
        pagination={false}
        scroll={{ y: 400 }}
      >
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
