import React, { ChangeEvent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

interface TableColumn {
  label: string;
  accessor: string;
  sortable: boolean;
  sortbyOrder?: string;
}

interface TableBodyProps {
  tableData: any[];
  columns: TableColumn[];
  isCellBeingSelected: (rowIndex: number, columnIndex: number) => boolean;
  isCellBeingEdited: (rowIndex: number, columnIndex: number) => boolean;
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement>,
    rowIndex: number,
    columnIndex: number,
  ) => void;
  cellStyle: React.CSSProperties;
}

const BaseTableData = styled.td`
  border-bottom: 1px solid #e0e0e0;
  text-align: left;
  padding: 1.6rem;
  vertical-align: top;
  user-select: none;
  border-left: 1px solid white;
  border-right: 1px solid white;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.5rem;
  letter-spacing: 0.01071em;
  display: table-cell;
  color: rgba(0, 0, 0, 0.87);
  max-width: 20%;
  min-width: 20%;

  input {
    box-sizing: border-box;
    border: none;
    outline: none;
    background-color: transparent;
  }

  &.selected {
    background-color: #3b82f680;
    border: 1px solid white;
  }

  &:first-child {
    border-top: none;
  }

  &:not(.selected) {
    background: #fff;
  }
`;

const TableBody: React.FC<TableBodyProps> = ({
  tableData,
  columns,
  isCellBeingSelected,
  isCellBeingEdited,
  handleInputChange,
  cellStyle,
}) => {
  return (
    <tbody>
      {tableData.map((data, rowIndex) => (
        <tr key={rowIndex}>
          {columns.map(({ accessor }, columnIndex) => {
            const tData = data[accessor] ? data[accessor] : '——';
            const isEditableCell = isCellBeingEdited(rowIndex, columnIndex);

            return isEditableCell ? (
              <BaseTableData style={cellStyle} key={accessor}>
                <input
                  type="text"
                  value={tData}
                  onChange={(e) => handleInputChange(e, rowIndex, columnIndex)}
                  autoFocus
                />
              </BaseTableData>
            ) : (
              <BaseTableData
                className={
                  isCellBeingSelected(rowIndex, columnIndex) ? 'selected' : ''
                }
                data-row={rowIndex}
                data-column={columnIndex}
                style={cellStyle}
                key={accessor}
              >
                <span>{tData}</span>
              </BaseTableData>
            );
          })}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;

const TableColumnPropTypes = {
  label: PropTypes.string.isRequired,
  accessor: PropTypes.string.isRequired,
  sortable: PropTypes.bool.isRequired,
  sortbyOrder: PropTypes.string,
};

const TableBodyPropsPropTypes = {
  tableData: PropTypes.array.isRequired,
  columns: PropTypes.arrayOf(PropTypes.shape(TableColumnPropTypes)).isRequired,
  isCellBeingSelected: PropTypes.func.isRequired,
  isCellBeingEdited: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  cellStyle: PropTypes.object.isRequired,
};
