import React, { useState } from "react";
import "./searchBar.css";
import {
  Button,
  SearchBox,
  SearchBoxChangeEvent,
  InputOnChangeData,
} from "@fluentui/react-components";
import { Department, FilterType, Title } from "./enum";

interface FilterBarProps {
  onSearch:
  | ((event: SearchBoxChangeEvent, data: InputOnChangeData) => void)
  | undefined;
  onFilterChange: ({ filterType, value }: { filterType: FilterType, value: string }) => void;
}

const Filters = [
  {
    id: FilterType.DEPARTMENT,
    label: "department",
    values: Object.entries(Department).filter(([key]) => isNaN(Number(key))).map(([key, value]) => ({
      key: value as number,
      text: key.replace(/([A-Z])/g, ' $1').trim(),
    })),
  },
  {
    id: FilterType.TITLE,
    label: "title",
    values: Object.entries(Title).filter(([key]) => isNaN(Number(key))).map(([key, value]) => ({
      key: value as number,
      text: key.replace(/_/g, ' ').replace(/([A-Z])/g, ' $1').trim(),
    })),
  },
];

const FilterBar: React.FC<FilterBarProps> = ({ onSearch, onFilterChange }) => {
  const [filter, setFilter] = useState<{ type: FilterType; value: string }>({
    type: FilterType.DEPARTMENT,
    value: "",
  });

  // Handler to update the filter state when a selection is made
  const handleFilter1Change = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;

    setFilter({ type: Filters[0].id, value: selectedValue });
  };

  const handleFilter2Change = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setFilter({ type: Filters[1].id, value: selectedValue });
  };

  const handleFilterClick = () => {
    // Your logic to apply filters with filter type and value
    console.log(`this is the filter: ${filter.type}`)
    onFilterChange({ filterType: filter.type, value: filter.value });
  };

  return (
    <div className="filter-container">
      <SearchBox onChange={onSearch} />

      <select onChange={handleFilter1Change} value={filter.value}>
        <option value="">Select a department</option>
        {Filters[0].values.map(({ key, text }) => (
          <option key={key} value={text}>
            {text}
          </option>
        ))}
      </select>
      <select onChange={handleFilter2Change} value={filter.value}>
        <option value="">Select a title</option>
        {Filters[1].values.map(({ key, text }) => (
          <option key={key} value={text}>
            {text}
          </option>
        ))}
      </select>

      {/* Apply Button */}
      <Button onClick={handleFilterClick}>Apply</Button>
    </div>
  );
};

export default FilterBar;
