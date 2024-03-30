import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

interface TableColumn {
  label: string;
  accessor: string;
  sortable: boolean;
  sortbyOrder?: string;
}

interface TableHeadProps {
  columns: TableColumn[];
  handleSorting: (accessor: string, sortOrder: string) => void;
  headerCellStyle?: React.CSSProperties;
}

const BaseTableHeader = styled.th`
  text-align: left;
  padding: 1.6rem;
  vertical-align: top;
  user-select: none;
  border-top: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
  border-left: 1px solid white;
  border-right: 1px solid white;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.5rem;
  letter-spacing: 0.01071em;
  display: table-cell;
  color: rgba(0, 0, 0, 0.87);
  cursor: pointer;
  background-repeat: no-repeat;
  background-position: center right;

  &.up {
    background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 16 16'><path fill='gray' d='M8 0l8 12H0z'/></svg>")
      right center no-repeat;
  }

  &.down {
    background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 16 16'><path fill='gray' d='M8 16l-8-12h16z'/></svg>")
      right center no-repeat;
  }

  &.default {
    background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 16 16'><path fill='gray' d='M8 0l8 8-8 8-8-8 8-8z'/></svg>")
      right center no-repeat;
  }
`;

const TableHead: React.FC<TableHeadProps> = ({
  columns,
  handleSorting,
  headerCellStyle,
}) => {
  const [sortField, setSortField] = useState<string>('');
  const [order, setOrder] = useState<string>('asc');

  const handleSortingChange = (accessor: string) => {
    const sortOrder =
      accessor === sortField && order === 'asc' ? 'desc' : 'asc';
    setSortField(accessor);
    setOrder(sortOrder);
    handleSorting(accessor, sortOrder);
  };

  return (
    <thead>
      <tr>
        {columns.map(({ label, accessor, sortable }) => {
          const cl = sortable
            ? sortField === accessor && order === 'asc'
              ? 'up'
              : sortField === accessor && order === 'desc'
                ? 'down'
                : 'default'
            : '';
          return (
            <BaseTableHeader
              className={cl}
              style={headerCellStyle}
              key={accessor}
              onClick={
                sortable ? () => handleSortingChange(accessor) : undefined
              }
            >
              {label}
            </BaseTableHeader>
          );
        })}
      </tr>
    </thead>
  );
};

export default TableHead;

const TableColumnPropTypes = {
  label: PropTypes.string.isRequired,
  accessor: PropTypes.string.isRequired,
  sortable: PropTypes.bool.isRequired,
  sortbyOrder: PropTypes.string,
};

const TableHeadPropsPropTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape(TableColumnPropTypes)).isRequired,
  handleSorting: PropTypes.func.isRequired,
  headerCellStyle: PropTypes.object,
};
