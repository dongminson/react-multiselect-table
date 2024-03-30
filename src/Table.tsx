import React, { useState, useRef, CSSProperties } from 'react';
import PropTypes from 'prop-types';
import TableBody from './TableBody';
import TableHead from './TableHead';
import ContextMenu from './ContextMenu';
import { useSortableTable } from './useSortableTable';
import styled from 'styled-components';

interface TableColumn {
  label: string;
  accessor: string;
  sortable: boolean;
  sortbyOrder?: string;
}

export interface TableProps {
  data: object[];
  columns: TableColumn[];
  cellStyle: CSSProperties;
  headerCellStyle: CSSProperties;
}

interface CellLocation {
  row: number;
  column: number;
}

const BaseTable = styled.table`
  width: 100%;
  border-spacing: 0;
  border-radius: 2px;
  background-color: #fff;
  box-shadow:
    0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 3px 1px -2px rgba(0, 0, 0, 0.2),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
`;

const SelectionRectangle = styled.div`
  position: absolute;
  background-color: rgba(
    0,
    123,
    255,
    0.3
  ); /* Change color and opacity as needed */
  pointer-events: none;
`;

const eventToCellLocation = (event: any): CellLocation | null => {
  let target;
  if (event.touches) {
    const touch = event.touches[0];
    target = document.elementFromPoint(touch.clientX, touch.clientY);
  } else {
    target = event.target as HTMLElement;
    while (target && target.tagName !== 'TD') {
      target = target.parentNode as HTMLElement;
    }
  }
  if (!target) {
    return null;
  }

  return {
    row: Number(target.getAttribute('data-row')),
    column: Number(target.getAttribute('data-column')),
  };
};

const Table: React.FC<TableProps> = ({
  data,
  columns,
  cellStyle,
  headerCellStyle,
}) => {
  const tableRef = useRef<HTMLTableElement>(null);
  const [tableData, handleSorting, setTableData] = useSortableTable(
    data,
    columns,
  );
  const [isSelecting, setIsSelecting] = useState(false);
  const [isEditing, setIsEditing] = useState({ x: -1, y: -1 });
  const [startPastePosition, setStartPastePosition] = useState({
    x: -1,
    y: -1,
  });
  const [startPosition, setStartPosition] = useState({ x: -1, y: -1 });
  const [endPosition, setEndPosition] = useState({ x: -1, y: -1 });
  const [firstCellPosition, setFirstCellPosition] = useState({ x: -1, y: -1 });
  const [lastCellPosition, setLastCellPosition] = useState({ x: -1, y: -1 });
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: -1,
    y: -1,
  });

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    setContextMenuVisible(true);
    setContextMenuPosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseDown = (event: React.MouseEvent) => {
    event.preventDefault();
    const result = eventToCellLocation(event) as CellLocation | null;

    if (event.button === 2) {
      if (result) {
        const { row, column } = result;
        setStartPastePosition({ x: row, y: column });
      }
      return;
    }
    setFirstCellPosition({ x: -1, y: -1 });
    setLastCellPosition({ x: -1, y: -1 });
    const { clientX, clientY } = event;
    setIsEditing({ x: -1, y: -1 });
    setStartPosition({ x: clientX, y: clientY });
    setEndPosition({ x: clientX, y: clientY });
    setIsSelecting(true);
    setContextMenuVisible(false);

    if (result) {
      const { row, column } = result;
      setFirstCellPosition({ x: row, y: column });
      setLastCellPosition({ x: row, y: column });
    }
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (isSelecting) {
      event.preventDefault();
      const { clientX, clientY } = event;
      setEndPosition({ x: clientX, y: clientY });
      const result = eventToCellLocation(event) as CellLocation | null;
      if (result) {
        const { row, column } = result;
        setLastCellPosition({ x: row, y: column });
      }
    }
  };

  const handleMouseUp = (event: React.MouseEvent) => {
    event.preventDefault();
    setIsSelecting(false);
  };

  const handleCopy = () => {
    setContextMenuVisible(false);
    const startRow = firstCellPosition.x;
    const endRow = lastCellPosition.x;
    const startCol = firstCellPosition.y;
    const endCol = lastCellPosition.y;

    const selectedValues = [];

    for (let i = startRow; i <= endRow; i++) {
      let rowValues = [];
      for (let j = startCol; j <= endCol; j++) {
        if (tableData[i] !== undefined) {
          const valuesArray = Object.values(tableData[i]);
          const value = valuesArray[j];
          if (value !== undefined) {
            rowValues.push(value);
          }
        }
      }
      if (rowValues.length > 0) {
        selectedValues.push(rowValues);
      }
    }

    const clipboardData = selectedValues
      .map((row) => row.join('\t'))
      .join('\n');
    navigator.clipboard.writeText(clipboardData);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    row: number,
    column: number,
  ) => {
    const updatedTableData = tableData.map((obj: any, rowIndex: number) => {
      const newObj = { ...obj };
      Object.keys(obj).forEach((prop, columnIndex) => {
        if (columnIndex === column && rowIndex === row) {
          newObj[prop] = event.target.value;
        }
      });
      return newObj;
    });

    setTableData(updatedTableData);
  };

  const handlePaste = async () => {
    setContextMenuVisible(false);
    const clipboardText = await navigator.clipboard.readText();

    const rows = clipboardText.split('\n');
    const parsedArray = rows.map((row) => row.split('\t'));

    const maxColumn = Object.keys(tableData[0]).length
      ? Object.keys(tableData[0]).length
      : 0;
    const maxRow = tableData.length ? tableData.length : 0;

    const minColumn = Number(startPastePosition.y);
    const minRow = Number(startPastePosition.x);
    let parsedRowIndex = 0;
    let parsedColumnIndex = 0;

    const updatedTableData = tableData.map((obj: any, rowIndex: number) => {
      const newObj = { ...obj };
      Object.keys(obj).forEach((prop, columnIndex) => {
        if (
          minColumn <= columnIndex &&
          minRow <= rowIndex &&
          maxColumn >= parsedColumnIndex + minColumn &&
          maxRow >= parsedRowIndex + minRow
        ) {
          if (
            parsedArray[parsedRowIndex] &&
            parsedArray[parsedRowIndex][parsedColumnIndex]
          ) {
            newObj[prop] = parsedArray[parsedRowIndex][parsedColumnIndex];
            parsedColumnIndex++;
          }
        }
      });

      if (parsedColumnIndex > 0) {
        parsedRowIndex++;
        parsedColumnIndex = 0;
      }

      return newObj;
    });

    setTableData(updatedTableData);
  };

  const handleEdit = () => {
    setContextMenuVisible(false);
    const column = Number(startPastePosition.y);
    const row = Number(startPastePosition.x);

    setIsEditing({ x: row, y: column });
  };

  const isCellBeingSelected = (row: number, column: number) => {
    const minRow = Math.min(firstCellPosition.x, lastCellPosition.x);
    const maxRow = Math.max(firstCellPosition.x, lastCellPosition.x);
    const minColumn = Math.min(firstCellPosition.y, lastCellPosition.y);
    const maxColumn = Math.max(firstCellPosition.y, lastCellPosition.y);

    return (
      row >= minRow &&
      row <= maxRow &&
      column >= minColumn &&
      column <= maxColumn
    );
  };

  const isCellBeingEdited = (row: number, column: number) => {
    const editedRow = isEditing.x;
    const editedColumn = isEditing.y;

    return editedRow === row && editedColumn === column;
  };

  return (
    <>
      {contextMenuVisible && (
        <ContextMenu
          onCopyClick={() => {
            handleCopy();
          }}
          onPasteClick={() => {
            handlePaste();
          }}
          onEditClick={() => {
            handleEdit();
          }}
          position={contextMenuPosition}
        />
      )}
      {isSelecting && (
        <SelectionRectangle
          style={{
            top: Math.min(startPosition.y, endPosition.y),
            left: Math.min(startPosition.x, endPosition.x),
            width: Math.abs(endPosition.x - startPosition.x),
            height: Math.abs(endPosition.y - startPosition.y),
          }}
        />
      )}
      <BaseTable
        ref={tableRef}
        className="table"
        onContextMenu={handleContextMenu}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <TableHead {...{ columns, handleSorting, headerCellStyle }} />
        <TableBody
          {...{
            columns,
            tableData,
            isCellBeingSelected,
            isCellBeingEdited,
            handleInputChange,
            cellStyle,
          }}
        />
      </BaseTable>
    </>
  );
};

export default Table;

const TableColumnPropTypes = {
  label: PropTypes.string.isRequired,
  accessor: PropTypes.string.isRequired,
  sortable: PropTypes.bool.isRequired,
  sortbyOrder: PropTypes.string,
};

const TablePropsPropTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(PropTypes.shape(TableColumnPropTypes)).isRequired,
  cellStyle: PropTypes.object.isRequired,
  headerCellStyle: PropTypes.object.isRequired,
};

const CellLocationPropTypes = {
  row: PropTypes.number.isRequired,
  column: PropTypes.number.isRequired,
};
