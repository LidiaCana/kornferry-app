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
// import Card from "../../components/common/card";
import {
  FolderRegular,
  EditRegular,
  OpenRegular,
  DocumentRegular,
  PeopleRegular,
  DocumentPdfRegular,
  VideoRegular,
} from "@fluentui/react-icons";
import "./dashboard.css";
import axios, { AxiosResponse } from "axios";

// Data type for the DataGrid

type Item = {
  name: string;
  title: string;
  department: string;
  details: string;
};

const columns: TableColumnDefinition<Item>[] = [
  createTableColumn<Item>({
    columnId: "name",
    compare: (a, b) => {
      return a.name.localeCompare(b.name);
    },
    renderHeaderCell: () => {
      return "Name";
    },
    renderCell: (item) => {
      return (
        <TableCellLayout
          media={<Avatar aria-label={item.name} name={item.name} />}
        >
          {item.name}
        </TableCellLayout>
      );
    },
  }),
  createTableColumn<Item>({
    columnId: "title",
    renderHeaderCell: () => {
      return "Title";
    },

    renderCell: (item) => {
      return item.title;
    },
  }),
  createTableColumn<Item>({
    columnId: "department",
    renderHeaderCell: () => {
      return "Department";
    },
    renderCell: (item) => {
      return <TableCellLayout>{item.department}</TableCellLayout>;
    },
  }),
  createTableColumn<Item>({
    columnId: "details",
    renderHeaderCell: () => {
      return "Details";
    },
    renderCell: (item) => {
      return (
        <TableCellLayout>
          <a href={item.details} target="_blank">
            View
          </a>
        </TableCellLayout>
      );
    },
  }),
];
// Define types for employee data
interface Employee {
  FirstName: string;
  LastName: string;
  Title: string;
  DepartmentName: string;
}

// Define types for the API response
interface ApiResponse {
  data: {
    dimemployees: {
      items: Employee[];
    };
  };
}

const endpoint = {
  getEmployee: "http://localhost:3000/fetch-data",
};

const Dashboard = () => {
  const [employees, setEmployees] = useState<Item[]>([]); // State to store employee data
  // const [items, setItems] = useState<Employee[]>([]); // Optional state for handling items to render
  const defaultSelectedItems = React.useMemo(() => new Set([1]), []);
  // Fetch data from API
  const getData = async () => {
    try {
      const response: AxiosResponse<ApiResponse> = await axios.get(
        endpoint.getEmployee
      );

      const employeeData = response.data.data.dimemployees.items.map(
        (employee) => {
          return {
            name: employee.FirstName + " " + employee.LastName,
            title: employee.Title,
            department: employee.DepartmentName,
            details:
              "https://app.powerbi.com/groups/me/reports/88ad8f7e-4a26-4428-b99c-11a3738968b5/0d38b4cda58c695e796c?ctid=e9d21387-43f1-4e06-a253-f9ed9096dc48&experience=power-bi",
          };
        }
      ); // Extract employee data
      setEmployees(employeeData); // Update state with employee data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // getData(); // Fetch data when the component mounts
  }, []); // Empty dependency array ensures this runs only once

  return (
    <Layout>
      <FilterBar
        onSearch={(x) => console.log(x)}
        onFilterChange={(y) => console.log(y)}
      />
      <Button
        onClick={() => {
          getData();
        }}
      >
        Get Data
      </Button>
      <DataGrid
        items={employees}
        columns={columns}
        selectionMode="single"
        defaultSelectedItems={defaultSelectedItems}
        style={{ minWidth: "550px" }}
      >
        <DataGridHeader>
          <DataGridRow>
            {({ renderHeaderCell }) => (
              <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
            )}
          </DataGridRow>
        </DataGridHeader>
        <DataGridBody<Item>>
          {({ item, rowId }) => (
            <DataGridRow<Item>
              key={rowId}
              selectionCell={{ radioIndicator: { "aria-label": "Select row" } }}
            >
              {({ renderCell }) => (
                <DataGridCell>{renderCell(item)}</DataGridCell>
              )}
            </DataGridRow>
          )}
        </DataGridBody>
      </DataGrid>
      {/* <div className="card-container-wrapper">
        {items.map(({ FirstName, Phone, EmailAddress }, index) => (
          <Card key={index} title={FirstName} url={EmailAddress} goal={Phone} />
        ))}
      </div> */}
    </Layout>
  );
};

export default Dashboard;

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
