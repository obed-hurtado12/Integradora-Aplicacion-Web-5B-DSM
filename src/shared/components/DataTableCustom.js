import DataTable from "react-data-table-component";
import React, { useEffect, useState } from "react";
import { FilterComponent } from "./FilterComponent";
import { CustomLoader } from "../../shared/components/CustomLoader";

export const DataTableCustom = ({columns, data, isLoading}) => {

    const [filterText, setFilterText] = useState("");

    const filteredItems = data.filter(
        (item) =>
          item.description &&
          item.description.toLowerCase().includes(filterText.toLowerCase())
      );

    const paginationOptions = {
        rowsPerPageText: "Filas por página",
        rangeSeparatorText: "de",
      };
    
      const searchComponent = React.useMemo(() => {
        const clear = () => {
          if (filterText) {
            setFilterText("");
          }
        };
        return (
          <FilterComponent
            filterText={filterText}
            onFilter={(e) => setFilterText(e.target.value)}
            onClear={clear}
          />
        );
      },[filterText]);

  return (
    <DataTable
    title="Listado"
    columns={columns}
    data={filteredItems}
    noDataComponent="No hay registros"
    pagination
    paginationComponentOptions={paginationOptions}
    progressPending={isLoading}
    progressComponent={<CustomLoader />}
    subHeader
    subHeaderComponent={searchComponent}
  />
  )
}
