import { useState } from "react";
import {
  Image,
  TabList,
  Tab,
  SelectTabEvent,
  SelectTabData,
  TabValue,
} from "@fluentui/react-components";
import "./Welcome.css";
import { EditCode } from "./EditCode";
import { Deploy } from "./Deploy";
import { Publish } from "./Publish";
import { AddSSO } from "./AddSSO";

export function Welcome(props: { environment?: string }) {
  const { environment } = {
    environment: window.location.hostname === "localhost" ? "local" : "azure",
    ...props,
  };
  const friendlyEnvironmentName =
    {
      local: "local environment",
      azure: "Azure environment",
    }[environment] || "local environment";

  const [selectedValue, setSelectedValue] = useState<TabValue>("local");

  const onTabSelect = (event: SelectTabEvent, data: SelectTabData) => {
    setSelectedValue(data.value);
  };

  return (
    <div className="welcome page">
      <div className="narrow page-padding">
        {/* Search Bar with filters Departments, KPI, group */}
        {/*  KPI cards*/}
        <h1 className="center">PBI Test!</h1>

        {/* <div className="tabList">
          <a
            href="https://app.powerbi.com/links/pndjIwekF0?ctid=e9d21387-43f1-4e06-a253-f9ed9096dc48&pbi_source=linkShare"
            target="_blank"
          >
            IPD Report{" "}
          </a>
          <a
            href="https://korn-ferry.us10.sapanalytics.cloud/sap/fpa/ui/tenants/2cb23/bo/story/CBC81783DF542AD0E1A727E4BB20B5EB"
            target="_blank"
          >
            SAC IPD Consulting Report{" "}
          </a> */}
      </div>
    </div>
  );
}
