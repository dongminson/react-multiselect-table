import { useState } from 'react';
import PropTypes from 'prop-types';

interface TableColumn {
  label: string;
  accessor: string;
  sortable: boolean;
  sortbyOrder?: string;
}

function getDefaultSorting<T>(
  defaultTableData: T[],
  columns: TableColumn[],
): T[] {
  const sorted = [...defaultTableData].sort((a: any, b: any) => {
    const filterColumn = columns.filter((column) => column.sortbyOrder);
    let { accessor = 'id', sortbyOrder = 'asc' } = Object.assign(
      {},
      ...filterColumn,
    );

    if (a[accessor] === null) return 1;
    if (b[accessor] === null) return -1;
    if (a[accessor] === null && b[accessor] === null) return 0;

    const ascending = String(a[accessor]).localeCompare(
      String(b[accessor]),
      'en',
      {
        numeric: true,
      },
    );

    return sortbyOrder === 'asc' ? ascending : -ascending;
  });
  return sorted;
}

export const useSortableTable = <T extends {}>(
  data: T[],
  columns: TableColumn[],
) => {
  const [tableData, setTableData] = useState<T[]>(
    getDefaultSorting(data, columns),
  );

  const handleSorting = (sortField: string, sortOrder: string) => {
    if (sortField) {
      const sorted = [...tableData].sort((a: any, b: any) => {
        if (a[sortField] === null) return 1;
        if (b[sortField] === null) return -1;
        if (a[sortField] === null && b[sortField] === null) return 0;
        return (
          String(a[sortField]).localeCompare(String(b[sortField]), 'en', {
            numeric: true,
          }) * (sortOrder === 'asc' ? 1 : -1)
        );
      });
      setTableData(sorted);
    }
  };

  return [tableData, handleSorting, setTableData] as const;
};

const TableColumnPropTypes = {
  label: PropTypes.string.isRequired,
  accessor: PropTypes.string.isRequired,
  sortable: PropTypes.bool.isRequired,
  sortbyOrder: PropTypes.string,
};
