import React, { useEffect, useState } from "react";
import Layout from "../../components/common/layout";
import { Divider, Title1 } from "@fluentui/react-components";
import FilterBar from "../../components/common/filterBar";
import data from "../../mockAPI/kpi.json";
import Card from "../../components/common/card";
import "./dashboard.css";
const Dashboard = () => {
  const [items, setItems] = useState(data);
  useEffect(() => {
    console.log(items);
  }, []);
  return (
    <Layout>
      <FilterBar
        onSearch={(x) => console.log(x)}
        onFilterChange={(y) => console.log(y)}
      />
      <div className="card-container-wrapper">
        {items.map(({ id, name, url, goal, actual }) => (
          <Card title={name} url={url} goal={goal} actual={actual} />
        ))}
      </div>
    </Layout>
  );
};

export default Dashboard;
