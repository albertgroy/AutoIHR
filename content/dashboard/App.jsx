import React, { useState, useEffect } from "react";
import { Table, Card } from "antd";
import { getJobs } from "../../background/db.js";

const columns = [
  {
    title: "职位",
    dataIndex: "position",
    key: "position",
  },
  {
    title: "薪资",
    dataIndex: "salary",
    key: "salary",
  },
  {
    title: "公司",
    dataIndex: "company",
    key: "company",
  },
];

export default function App() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const loadJobs = async () => {
      const jobs = await getJobs();
      setJobs(jobs);
    };
    loadJobs();
  }, []);

  return (
    <Card title="职位监控看板">
      <Table
        dataSource={jobs}
        columns={columns}
        rowKey="id"
        pagination={false}
      />
    </Card>
  );
}
