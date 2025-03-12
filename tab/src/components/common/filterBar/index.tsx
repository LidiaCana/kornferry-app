import React, { useState } from "react";
import "./searchBar.css";
import {
  Button,
  SearchBox,
  SearchBoxChangeEvent,
  InputOnChangeData,
} from "@fluentui/react-components";

interface FilterBarProps {
  onSearch:
    | ((event: SearchBoxChangeEvent, data: InputOnChangeData) => void)
    | undefined;
  onFilterChange: (filterType: number, value: string) => void;
}

const Filters = [
  {
    id: 1,
    label: "KPI",
    values: [
      { key: 1, text: "sales" },
      { key: 2, text: "pipeline" },
      { key: 3, text: "utilization" },
    ],
  },
  {
    id: 2,
    label: "Group",
    values: [
      { key: 1, text: "IPD" },
      { key: 2, text: "Global Account leader" },
    ],
  },
];

const FilterBar: React.FC<FilterBarProps> = ({ onSearch, onFilterChange }) => {
  const [filter, setFilter] = useState<{ type: number; value: string }>({
    type: 1,
    value: "",
  });

  // Handler to update the filter state when a selection is made
  const handleKPIChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setFilter({ type: Filters[0].id, value: selectedValue });
  };

  const handleGroupChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setFilter({ type: Filters[1].id, value: selectedValue });
  };

  const handleFilterClick = () => {
    // Your logic to apply filters with filter type and value
    onFilterChange(filter.type, filter.value);
  };

  return (
    <div className="filter-container">
      <SearchBox onChange={onSearch} />
      {/* KPI Filter (using HTML select) */}
      <select onChange={handleKPIChange} value={filter.value}>
        <option value="">Select a KPI</option>
        {Filters[0].values.map(({ key, text }) => (
          <option key={key} value={text}>
            {text}
          </option>
        ))}
      </select>

      {/* Group Filter (using HTML select) */}
      <select onChange={handleGroupChange} value={filter.value}>
        <option value="">Select a Group</option>
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
