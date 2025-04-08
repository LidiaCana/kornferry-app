import React, { useEffect, useState } from "react";
import Layout from "../../components/common/layout";
import {
  Button,
  PresenceBadgeStatus,
  Avatar,
  DataGridBody,
  DataGridRow,
  DataGrid,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridCell,
  TableCellLayout,
  TableColumnDefinition,
  createTableColumn,
} from "@fluentui/react-components";
import FilterBar from "../../components/common/filterBar";
// import data from "../../mockAPI/kpi.json";
import Card from "../../components/common/card";
import {
  FolderRegular,
  EditRegular,
  OpenRegular,
  DocumentRegular,
  PeopleRegular,
  DocumentPdfRegular,
  VideoRegular,
  ColorBackgroundFilled,
} from "@fluentui/react-icons";
import "./dashboard.css";
import axios, { AxiosResponse } from "axios";
import { Data } from "../../type/graph";
import { Container, Divider, Grid, Typography } from "@mui/material";
import { Bar, Pie } from "recharts";
import PieChart from "../../components/common/chart/pieChart";
import BarChart from "../../components/common/chart/barChart";
import LineBarAreaComposedChart from "../../components/common/chart/LineBarAreaComposedChart";
import RadarChartComponent from "../../components/common/chart/Radar";
import DataGridDemo from "../../components/common/datagrid/DataGridComponent";

// Data type for the DataGrid
interface DashboardProps {
  items: Data[];
}

// const columns: TableColumnDefinition<Item>[] = [
//   createTableColumn<Item>({
//     columnId: "name",
//     compare: (a, b) => {
//       return a.name.localeCompare(b.name);
//     },
//     renderHeaderCell: () => {
//       return "Name";
//     },
//     renderCell: (item) => {
//       return (
//         <TableCellLayout
//           media={<Avatar aria-label={item.name} name={item.name} />}
//         >
//           {item.name}
//         </TableCellLayout>
//       );
//     },
//   }),
//   createTableColumn<Item>({
//     columnId: "title",
//     renderHeaderCell: () => {
//       return "Title";
//     },

//     renderCell: (item) => {
//       return item.title;
//     },
//   }),
//   createTableColumn<Item>({
//     columnId: "department",
//     renderHeaderCell: () => {
//       return "Department";
//     },
//     renderCell: (item) => {
//       return <TableCellLayout>{item.department}</TableCellLayout>;
//     },
//   }),
//   createTableColumn<Item>({
//     columnId: "details",
//     renderHeaderCell: () => {
//       return "Details";
//     },
//     renderCell: (item) => {
//       return (
//         <TableCellLayout>
//           <a href={item.details} target="_blank">
//             View
//           </a>
//         </TableCellLayout>
//       );
//     },
//   }),
// ];
// Define types for employee data
const columns: TableColumnDefinition<Data>[] = [
  createTableColumn<Data>({
    columnId: "vendorId",
    renderHeaderCell: () => {
      return "Vendor";
    },

    renderCell: (item) => {
      return item.VendorID;
    },
  }),
  createTableColumn<Data>({
    columnId: "tripType",
    renderHeaderCell: () => {
      return "Trip Type";
    },
    renderCell: (item) => {
      return item.trip_type;
    },
  }),
  createTableColumn<Data>({
    columnId: "totalAmount",
    renderHeaderCell: () => {
      return "Total Amount";
    },
    renderCell: (item) => {
      return <TableCellLayout>{item.total_amount}</TableCellLayout>;
    },
  }),
  createTableColumn<Data>({
    columnId: "paymentType",
    renderHeaderCell: () => {
      return "Payment Type";
    },
    renderCell: (item) => {
      return item.payment_type;
    },
  }),
  createTableColumn<Data>({
    columnId: "tipAmount",
    renderHeaderCell: () => {
      return "Tip Amount";
    },
    renderCell: (item) => {
      return <TableCellLayout>{item.tolls_amount}</TableCellLayout>;
    },
  }),
  createTableColumn<Data>({
    columnId: "tollsAmount",
    renderHeaderCell: () => {
      return "Tolls Amount";
    },
    renderCell: (item) => {
      return item.tolls_amount;
    },
  }),
];

const Dashboard2: React.FC<DashboardProps> = ({ items }) => {
  return (
    <>
      <Container style={{ marginTop: "20px" }}>
        <Divider
          textAlign="center"
          sx={{ marginTop: "60px", marginBottom: "60px" }}
        >
          <Typography variant="h5">Custom Reports 2</Typography>
        </Divider>

        <Grid key="cards-container" container spacing={2} style={{}}>
          <Grid
            size={12}
            container
            direction="row"
            style={{ justifyContent: "space-between" }}
          >
            <Card
              style={{ width: "25%" }}
              topText="Gross Revenue"
              content={{ text: "$3.712,34", color: "green" }}
              bottomText={{ text: "Goal $4500,00 (-1.7%)", color: "red" }}
              link="https://app.fabric.microsoft.com/groups/bea17881-9dd2-40e6-b6e0-4af18715daf0/reports/de71e0d7-d2c2-42a3-8828-b45f41ac6066/ac8f7297fe44603f5a1e?experience=fabric-developer"
            />
            <Card
              style={{ width: "25%" }}
              topText="Gross Profit Margin"
              content={{ text: "77.47%", color: "green" }}
              bottomText={{ text: "Goal 74.75% (+3.64%)", color: "blue" }}
              link="https://app.fabric.microsoft.com/groups/bea17881-9dd2-40e6-b6e0-4af18715daf0/reports/de71e0d7-d2c2-42a3-8828-b45f41ac6066/ac8f7297fe44603f5a1e?experience=fabric-developer"
            />
            <Card
              style={{ width: "25%" }}
              topText="Product Revenue"
              content={{ text: "$2.29M", color: "green" }}
              bottomText={{ text: "Goal: $3.2M (-26.37%)", color: "red" }}
              link="https://app.fabric.microsoft.com/groups/bea17881-9dd2-40e6-b6e0-4af18715daf0/reports/de71e0d7-d2c2-42a3-8828-b45f41ac6066/ac8f7297fe44603f5a1e?experience=fabric-developer"
            />
          </Grid>
          <Grid size={12} container direction="row" style={{}}>
            <Grid size={4}>
              <PieChart />
            </Grid>
            <Grid size={8}>
              <BarChart />
            </Grid>
          </Grid>
        </Grid>
        <Divider sx={{ marginTop: "5px", marginBottom: "5px" }} />
        <Grid key="charts-container" container spacing={2} style={{}}>
          <Grid sx={{ width: "400px", height: "400px" }}>
            <LineBarAreaComposedChart />
          </Grid>
          <Grid sx={{ width: "400px", height: "400px" }}>
            <RadarChartComponent />
          </Grid>
        </Grid>
        <Divider textAlign="center" sx={{ marginTop: "60px" }}>
          <Typography variant="h5">Employees </Typography>
        </Divider>
        <Grid key="table-container" style={{ marginTop: "20px" }}>
          {/* <FilterBar
            onSearch={(x) => console.log(x)}
            onFilterChange={(y) => console.log(y)}
          /> */}

          <DataGridDemo />
        </Grid>
        <Divider textAlign="center" sx={{ marginTop: "60px" }}>
          <Typography variant="h5">Power BI Report Embed</Typography>
        </Divider>
        <Grid container sx={{ marginTop: "80px" }}>
          <embed
            src="https://app.fabric.microsoft.com/reportEmbed?reportId=de71e0d7-d2c2-42a3-8828-b45f41ac6066&autoAuth=true&ctid=b2e33732-f14c-4ff9-8d8a-16ace3d69bd0"
            width="100%"
            height="400px"
          />
        </Grid>
      </Container>
    </>
  );
};

export default Dashboard2;
