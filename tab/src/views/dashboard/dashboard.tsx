import React, { useEffect, useState } from "react";
import Layout from "../../components/common/layout";
import {
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
  Spinner
} from "@fluentui/react-components";
import FilterBar from "../../components/common/filterBar";
import axios, { AxiosResponse } from "axios";
import { FilterType } from "../../components/common/filterBar/enum";

type Item = {
  name: string;
  title: string;
  department: string;
  details: string;
};

const columns: TableColumnDefinition<Item>[] = [
  createTableColumn<Item>({
    columnId: "name",
    compare: (a, b) => a.name.localeCompare(b.name),
    renderHeaderCell: () => "Name",
    renderCell: (item) => (
      <TableCellLayout media={<Avatar aria-label={item.name} name={item.name} />}>
        {item.name}
      </TableCellLayout>
    ),
  }),
  createTableColumn<Item>({
    columnId: "title",
    renderHeaderCell: () => "Title",
    renderCell: (item) => item.title,
  }),
  createTableColumn<Item>({
    columnId: "department",
    renderHeaderCell: () => "Department",
    renderCell: (item) => <TableCellLayout>{item.department}</TableCellLayout>,
  }),
  createTableColumn<Item>({
    columnId: "details",
    renderHeaderCell: () => "Details",
    renderCell: (item) => (
      <TableCellLayout>
        <a href={item.details} target="_blank" rel="noopener noreferrer">
          View
        </a>
      </TableCellLayout>
    ),
  }),
];

interface Employee {
  FirstName: string;
  LastName: string;
  Title: string;
  DepartmentName: string;
}

interface ApiResponse {
  data: {
    dimemployees: {
      items: Employee[];
    };
  };
}
// filterType=DepartmentName&value=Engineering
const endpoint = (filterType?: string, value?: string) => `http://localhost:3000/fetch-data${filterType && value ? `?filterType=${filterType}&value=${value}` : ""}`;

const Dashboard = () => {
  const [employees, setEmployees] = useState<Item[]>([]);

  const getData = async (filterType?: string, value?: string) => {
    try {
      const response: AxiosResponse<ApiResponse> = await axios.get(endpoint(filterType, value));
      const employeeData = response.data.data.dimemployees.items.map((employee) => ({
        name: `${employee.FirstName} ${employee.LastName}`,
        title: employee.Title,
        department: employee.DepartmentName,
        details: "https://app.powerbi.com/groups/me/reports/88ad8f7e-4a26-4428-b99c-11a3738968b5/0d38b4cda58c695e796c?ctid=e9d21387-43f1-4e06-a253-f9ed9096dc48&experience=power-bi",
      }));
      setEmployees(employeeData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleOnSearch = (value: any) => {
    getData(value);
  };

  const handleOnFilter = ({ filterType, value }: any) => {

    getData(filterType, value);
  };

  useEffect(() => {
    // getData();
  }, []);

  return (
    <Layout>
      <FilterBar onSearch={handleOnSearch} onFilterChange={handleOnFilter} />
      {/* <Button onClick={() => getData()}>Get Data</Button> */}

      {employees.length == 0 && <Spinner label="Seriously, still loading..." labelPosition="above" />}
      <DataGrid
        items={employees}
        columns={columns}
        selectionMode="single"
        style={{ minWidth: "550px" }}
      >
        <DataGridHeader>
          <DataGridRow>
            {({ renderHeaderCell }) => <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>}
          </DataGridRow>
        </DataGridHeader>
        <DataGridBody<Item>>
          {({ item, rowId }) => (
            <DataGridRow<Item> key={rowId}>
              {({ renderCell }) => <DataGridCell>{renderCell(item)}</DataGridCell>}
            </DataGridRow>
          )}
        </DataGridBody>
      </DataGrid>
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
