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

const Dashboard1: React.FC<DashboardProps> = ({ items }) => {
  return (
    <>
      <Container style={{ marginTop: "20px" }}>
        <Divider
          textAlign="center"
          sx={{ marginTop: "60px", marginBottom: "60px" }}
        >
          <Typography variant="h5">Custom Reports</Typography>
        </Divider>
        <Grid container spacing={4} style={{}}>
          <Grid size={3} container direction="column" style={{}}>
            <Card
              topText="Gross Revenue"
              content={{ text: "$3.712,34", color: "green" }}
              bottomText={{ text: "Goal $4500,00 (-1.7%)", color: "red" }}
              link="https://app.fabric.microsoft.com/groups/bea17881-9dd2-40e6-b6e0-4af18715daf0/reports/de71e0d7-d2c2-42a3-8828-b45f41ac6066/ac8f7297fe44603f5a1e?experience=fabric-developer"
            />
            <Card
              topText="Gross Profit Margin"
              content={{ text: "77.47%", color: "green" }}
              bottomText={{ text: "Goal 74.75% (+3.64%)", color: "blue" }}
              link="https://app.fabric.microsoft.com/groups/bea17881-9dd2-40e6-b6e0-4af18715daf0/reports/de71e0d7-d2c2-42a3-8828-b45f41ac6066/ac8f7297fe44603f5a1e?experience=fabric-developer"
            />
            <Card
              topText="Product Revenue"
              content={{ text: "$2.29M", color: "green" }}
              bottomText={{ text: "Goal: $3.2M (-26.37%)", color: "red" }}
              link="https://app.fabric.microsoft.com/groups/bea17881-9dd2-40e6-b6e0-4af18715daf0/reports/de71e0d7-d2c2-42a3-8828-b45f41ac6066/ac8f7297fe44603f5a1e?experience=fabric-developer"
            />
          </Grid>
          <Grid size={9} container direction="row" style={{}}>
            <Grid size={4}>
              <PieChart />
            </Grid>
            <Grid size={8}>
              <BarChart />
            </Grid>
          </Grid>
        </Grid>
        <Divider textAlign="center" sx={{ marginTop: "60px" }}>
          <Typography variant="h5">Power BI Report Embed</Typography>
        </Divider>
        <Grid container sx={{ marginTop: "80px" }}>
          {/* <Grid size={12}>
            <DataGrid
              items={items}
              columns={columns}
              selectionMode="single"
              style={{ minWidth: "550px" }}
            >
              <DataGridHeader>
                <DataGridRow>
                  {({ renderHeaderCell }) => (
                    <DataGridHeaderCell>
                      {renderHeaderCell()}
                    </DataGridHeaderCell>
                  )}
                </DataGridRow>
              </DataGridHeader>
              <DataGridBody<Data>>
                {({ item, rowId }) => (
                  <DataGridRow<Data>
                    key={rowId}
                    selectionCell={{
                      radioIndicator: { "aria-label": "Select row" },
                    }}
                  >
                    {({ renderCell }) => (
                      <DataGridCell>{renderCell(item)}</DataGridCell>
                    )}
                  </DataGridRow>
                )}
              </DataGridBody>
            </DataGrid>
          </Grid> */}
          <embed
            src="https://app.fabric.microsoft.com/reportEmbed?reportId=de71e0d7-d2c2-42a3-8828-b45f41ac6066&autoAuth=true&ctid=b2e33732-f14c-4ff9-8d8a-16ace3d69bd0"
            width="100%"
            height="400px"
          />
        </Grid>
      </Container>
      {/* <FilterBar
        onSearch={(x) => console.log(x)}
        onFilterChange={(y) => console.log(y)}
      /> */}

      {/* <DataGrid
        items={items}
        columns={columns}
        selectionMode="single"
        style={{ minWidth: "550px" }}
      >
        <DataGridHeader>
          <DataGridRow>
            {({ renderHeaderCell }) => (
              <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
            )}
          </DataGridRow>
        </DataGridHeader>
        <DataGridBody<Data>>
          {({ item, rowId }) => (
            <DataGridRow<Data>
              key={rowId}
              selectionCell={{ radioIndicator: { "aria-label": "Select row" } }}
            >
              {({ renderCell }) => (
                <DataGridCell>{renderCell(item)}</DataGridCell>
              )}
            </DataGridRow>
          )}
        </DataGridBody>
      </DataGrid> */}
    </>
  );
};

export default Dashboard1;

{
  /* <div className="card-container-wrapper">
{items.map(({ id, name, url, goal, actual }) => (
<Card title={name} url={url} goal={goal} actual={actual} />
))}
</div> */
}
{
  /* <embed
src="https://app.powerbi.com/groups/me/reports/88ad8f7e-4a26-4428-b99c-11a3738968b5/794723d48e16fd2427ad?ctid=e9d21387-43f1-4e06-a253-f9ed9096dc48&experience=power-bi"
width="50%"
height="50%"
/>
<embed src="https://example.com" width="50%" height="50%" /> */
}
