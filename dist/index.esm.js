import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function _taggedTemplateLiteral(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }
  return Object.freeze(Object.defineProperties(strings, {
    raw: {
      value: Object.freeze(raw)
    }
  }));
}

var _templateObject$3;
const BaseTableData = styled.td(_templateObject$3 || (_templateObject$3 = _taggedTemplateLiteral(["\n  border-bottom: 1px solid #e0e0e0;\n  text-align: left;\n  padding: 1.6rem;\n  vertical-align: top;\n  user-select: none;\n  border-left: 1px solid white;\n  border-right: 1px solid white;\n  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;\n  font-weight: 400;\n  font-size: 0.875rem;\n  line-height: 1.5rem;\n  letter-spacing: 0.01071em;\n  display: table-cell;\n  color: rgba(0, 0, 0, 0.87);\n  max-width: 20%;\n  min-width: 20%;\n\n  input {\n    box-sizing: border-box;\n    border: none;\n    outline: none;\n    background-color: transparent;\n  }\n\n  &.selected {\n    background-color: #3b82f680;\n    border: 1px solid white;\n  }\n\n  &:first-child {\n    border-top: none;\n  }\n\n  &:not(.selected) {\n    background: #fff;\n  }\n"])));
const TableBody = _ref => {
  let {
    tableData,
    columns,
    isCellBeingSelected,
    isCellBeingEdited,
    handleInputChange,
    cellStyle
  } = _ref;
  return /*#__PURE__*/React.createElement("tbody", null, tableData.map((data, rowIndex) => /*#__PURE__*/React.createElement("tr", {
    key: rowIndex
  }, columns.map((_ref2, columnIndex) => {
    let {
      accessor
    } = _ref2;
    const tData = data[accessor] ? data[accessor] : '——';
    const isEditableCell = isCellBeingEdited(rowIndex, columnIndex);
    return isEditableCell ? /*#__PURE__*/React.createElement(BaseTableData, {
      style: cellStyle,
      key: accessor
    }, /*#__PURE__*/React.createElement("input", {
      type: "text",
      value: tData,
      onChange: e => handleInputChange(e, rowIndex, columnIndex),
      autoFocus: true
    })) : /*#__PURE__*/React.createElement(BaseTableData, {
      className: isCellBeingSelected(rowIndex, columnIndex) ? 'selected' : '',
      "data-row": rowIndex,
      "data-column": columnIndex,
      style: cellStyle,
      key: accessor
    }, /*#__PURE__*/React.createElement("span", null, tData));
  }))));
};
var TableBody$1 = TableBody;
const TableColumnPropTypes$2 = {
  label: PropTypes.string.isRequired,
  accessor: PropTypes.string.isRequired,
  sortable: PropTypes.bool.isRequired,
  sortbyOrder: PropTypes.string
};
({
  tableData: PropTypes.array.isRequired,
  columns: PropTypes.arrayOf(PropTypes.shape(TableColumnPropTypes$2)).isRequired,
  isCellBeingSelected: PropTypes.func.isRequired,
  isCellBeingEdited: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  cellStyle: PropTypes.object.isRequired
});

var _templateObject$2;
const BaseTableHeader = styled.th(_templateObject$2 || (_templateObject$2 = _taggedTemplateLiteral(["\n  text-align: left;\n  padding: 1.6rem;\n  vertical-align: top;\n  user-select: none;\n  border-top: 1px solid #e0e0e0;\n  border-bottom: 1px solid #e0e0e0;\n  border-left: 1px solid white;\n  border-right: 1px solid white;\n  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;\n  font-weight: 600;\n  font-size: 0.875rem;\n  line-height: 1.5rem;\n  letter-spacing: 0.01071em;\n  display: table-cell;\n  color: rgba(0, 0, 0, 0.87);\n  cursor: pointer;\n  background-repeat: no-repeat;\n  background-position: center right;\n\n  &.up {\n    background: url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 16 16'><path fill='gray' d='M8 0l8 12H0z'/></svg>\")\n      right center no-repeat;\n  }\n\n  &.down {\n    background: url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 16 16'><path fill='gray' d='M8 16l-8-12h16z'/></svg>\")\n      right center no-repeat;\n  }\n\n  &.default {\n    background: url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 16 16'><path fill='gray' d='M8 0l8 8-8 8-8-8 8-8z'/></svg>\")\n      right center no-repeat;\n  }\n"])));
const TableHead = _ref => {
  let {
    columns,
    handleSorting,
    headerCellStyle
  } = _ref;
  const [sortField, setSortField] = useState('');
  const [order, setOrder] = useState('asc');
  const handleSortingChange = accessor => {
    const sortOrder = accessor === sortField && order === 'asc' ? 'desc' : 'asc';
    setSortField(accessor);
    setOrder(sortOrder);
    handleSorting(accessor, sortOrder);
  };
  return /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, columns.map(_ref2 => {
    let {
      label,
      accessor,
      sortable
    } = _ref2;
    const cl = sortable ? sortField === accessor && order === 'asc' ? 'up' : sortField === accessor && order === 'desc' ? 'down' : 'default' : '';
    return /*#__PURE__*/React.createElement(BaseTableHeader, {
      className: cl,
      style: headerCellStyle,
      key: accessor,
      onClick: sortable ? () => handleSortingChange(accessor) : undefined
    }, label);
  })));
};
var TableHead$1 = TableHead;
const TableColumnPropTypes$1 = {
  label: PropTypes.string.isRequired,
  accessor: PropTypes.string.isRequired,
  sortable: PropTypes.bool.isRequired,
  sortbyOrder: PropTypes.string
};
({
  columns: PropTypes.arrayOf(PropTypes.shape(TableColumnPropTypes$1)).isRequired,
  handleSorting: PropTypes.func.isRequired,
  headerCellStyle: PropTypes.object
});

var _templateObject$1, _templateObject2$1, _templateObject3;
const BaseContextMenu = styled.div(_templateObject$1 || (_templateObject$1 = _taggedTemplateLiteral(["\n  border-bottom-left-radius: 2px;\n  border-bottom-right-radius: 2px;\n  border-top-left-radius: 2px;\n  border-top-right-radius: 2px;\n  box-shadow:\n    rgba(0, 0, 0, 0.2) 0px 2px 4px -1px,\n    rgba(0, 0, 0, 0.14) 0px 4px 5px 0px,\n    rgba(0, 0, 0, 0.12) 0px 1px 10px 0px;\n  color: rgba(0, 0, 0, 0.87);\n  font-family: 'Roboto', 'Helvetica Neue', sans-serif;\n  left: 9px;\n  opacity: 1;\n  padding: 0px;\n  position: fixed;\n  top: 8px;\n  transform-origin: 0px 0px;\n  transition-delay: 0s;\n  transition-duration: 0.2s;\n  transition-property: all;\n  transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);\n  z-index: 100;\n"])));
const MenuItemWrapper = styled.div(_templateObject2$1 || (_templateObject2$1 = _taggedTemplateLiteral(["\n  background-color: rgb(255, 255, 255);\n  color: rgba(0, 0, 0, 0.87);\n  display: flex;\n  flex-direction: column;\n  font-family: 'Roboto', 'Helvetica Neue', sans-serif;\n  max-height: 304px;\n  min-width: 96px;\n  overflow-y: auto;\n  padding-bottom: 8px;\n  padding-left: 0px;\n  padding-right: 0px;\n  padding-top: 8px;\n  -moz-box-direction: normal;\n  -moz-box-orient: vertical;\n"])));
const MenuItem = styled.div(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  cursor: pointer;\n  font-size: 15px;\n  text-transform: none;\n  font-weight: 400;\n  display: flex;\n  align-items: center;\n  flex-direction: row;\n  min-height: 48px;\n  height: 48px;\n  text-align: left;\n  border-radius: 0;\n  margin: auto 0;\n  padding-left: 16px;\n  padding-right: 16px;\n\n  &:hover {\n    background-color: rgba(158, 158, 158, 0.2);\n  }\n"])));
const handleContextMenu = event => {
  event.preventDefault();
};
const ContextMenu = _ref => {
  let {
    onCopyClick,
    onPasteClick,
    onEditClick,
    position
  } = _ref;
  return /*#__PURE__*/React.createElement(BaseContextMenu, {
    onContextMenu: handleContextMenu,
    style: {
      top: position.y,
      left: position.x
    }
  }, /*#__PURE__*/React.createElement(MenuItemWrapper, null, /*#__PURE__*/React.createElement(MenuItem, {
    onClick: onEditClick
  }, "Edit"), /*#__PURE__*/React.createElement(MenuItem, {
    onClick: onCopyClick
  }, "Copy"), /*#__PURE__*/React.createElement(MenuItem, {
    onClick: onPasteClick
  }, "Paste")));
};
var ContextMenu$1 = ContextMenu;
({
  onCopyClick: PropTypes.func.isRequired,
  onPasteClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }).isRequired
});

function getDefaultSorting(defaultTableData, columns) {
  const sorted = [...defaultTableData].sort((a, b) => {
    const filterColumn = columns.filter(column => column.sortbyOrder);
    let {
      accessor = 'id',
      sortbyOrder = 'asc'
    } = Object.assign({}, ...filterColumn);
    if (a[accessor] === null) return 1;
    if (b[accessor] === null) return -1;
    if (a[accessor] === null && b[accessor] === null) return 0;
    const ascending = String(a[accessor]).localeCompare(String(b[accessor]), 'en', {
      numeric: true
    });
    return sortbyOrder === 'asc' ? ascending : -ascending;
  });
  return sorted;
}
const useSortableTable = (data, columns) => {
  const [tableData, setTableData] = useState(getDefaultSorting(data, columns));
  const handleSorting = (sortField, sortOrder) => {
    if (sortField) {
      const sorted = [...tableData].sort((a, b) => {
        if (a[sortField] === null) return 1;
        if (b[sortField] === null) return -1;
        if (a[sortField] === null && b[sortField] === null) return 0;
        return String(a[sortField]).localeCompare(String(b[sortField]), 'en', {
          numeric: true
        }) * (sortOrder === 'asc' ? 1 : -1);
      });
      setTableData(sorted);
    }
  };
  return [tableData, handleSorting, setTableData];
};
({
  label: PropTypes.string.isRequired,
  accessor: PropTypes.string.isRequired,
  sortable: PropTypes.bool.isRequired,
  sortbyOrder: PropTypes.string
});

var _templateObject, _templateObject2;
const BaseTable = styled.table(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  width: 100%;\n  border-spacing: 0;\n  border-radius: 2px;\n  background-color: #fff;\n  box-shadow:\n    0 2px 2px 0 rgba(0, 0, 0, 0.14),\n    0 3px 1px -2px rgba(0, 0, 0, 0.2),\n    0 1px 5px 0 rgba(0, 0, 0, 0.12);\n"])));
const SelectionRectangle = styled.div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  position: absolute;\n  background-color: rgba(\n    0,\n    123,\n    255,\n    0.3\n  ); /* Change color and opacity as needed */\n  pointer-events: none;\n"])));
const eventToCellLocation = event => {
  let target;
  if (event.touches) {
    const touch = event.touches[0];
    target = document.elementFromPoint(touch.clientX, touch.clientY);
  } else {
    target = event.target;
    while (target && target.tagName !== 'TD') {
      target = target.parentNode;
    }
  }
  if (!target) {
    return null;
  }
  return {
    row: Number(target.getAttribute('data-row')),
    column: Number(target.getAttribute('data-column'))
  };
};
const Table = _ref => {
  let {
    data,
    columns,
    cellStyle,
    headerCellStyle
  } = _ref;
  const tableRef = useRef(null);
  const [tableData, handleSorting, setTableData] = useSortableTable(data, columns);
  const [isSelecting, setIsSelecting] = useState(false);
  const [isEditing, setIsEditing] = useState({
    x: -1,
    y: -1
  });
  const [startPastePosition, setStartPastePosition] = useState({
    x: -1,
    y: -1
  });
  const [startPosition, setStartPosition] = useState({
    x: -1,
    y: -1
  });
  const [endPosition, setEndPosition] = useState({
    x: -1,
    y: -1
  });
  const [firstCellPosition, setFirstCellPosition] = useState({
    x: -1,
    y: -1
  });
  const [lastCellPosition, setLastCellPosition] = useState({
    x: -1,
    y: -1
  });
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: -1,
    y: -1
  });
  const handleContextMenu = event => {
    event.preventDefault();
    setContextMenuVisible(true);
    setContextMenuPosition({
      x: event.clientX,
      y: event.clientY
    });
  };
  const handleMouseDown = event => {
    event.preventDefault();
    const result = eventToCellLocation(event);
    if (event.button === 2) {
      if (result) {
        const {
          row,
          column
        } = result;
        setStartPastePosition({
          x: row,
          y: column
        });
      }
      return;
    }
    setFirstCellPosition({
      x: -1,
      y: -1
    });
    setLastCellPosition({
      x: -1,
      y: -1
    });
    const {
      clientX,
      clientY
    } = event;
    setIsEditing({
      x: -1,
      y: -1
    });
    setStartPosition({
      x: clientX,
      y: clientY
    });
    setEndPosition({
      x: clientX,
      y: clientY
    });
    setIsSelecting(true);
    setContextMenuVisible(false);
    if (result) {
      const {
        row,
        column
      } = result;
      setFirstCellPosition({
        x: row,
        y: column
      });
      setLastCellPosition({
        x: row,
        y: column
      });
    }
  };
  const handleMouseMove = event => {
    if (isSelecting) {
      event.preventDefault();
      const {
        clientX,
        clientY
      } = event;
      setEndPosition({
        x: clientX,
        y: clientY
      });
      const result = eventToCellLocation(event);
      if (result) {
        const {
          row,
          column
        } = result;
        setLastCellPosition({
          x: row,
          y: column
        });
      }
    }
  };
  const handleMouseUp = event => {
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
    const clipboardData = selectedValues.map(row => row.join('\t')).join('\n');
    navigator.clipboard.writeText(clipboardData);
  };
  const handleInputChange = (event, row, column) => {
    const updatedTableData = tableData.map((obj, rowIndex) => {
      const newObj = {
        ...obj
      };
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
    const parsedArray = rows.map(row => row.split('\t'));
    const maxColumn = Object.keys(tableData[0]).length ? Object.keys(tableData[0]).length : 0;
    const maxRow = tableData.length ? tableData.length : 0;
    const minColumn = Number(startPastePosition.y);
    const minRow = Number(startPastePosition.x);
    let parsedRowIndex = 0;
    let parsedColumnIndex = 0;
    const updatedTableData = tableData.map((obj, rowIndex) => {
      const newObj = {
        ...obj
      };
      Object.keys(obj).forEach((prop, columnIndex) => {
        if (minColumn <= columnIndex && minRow <= rowIndex && maxColumn >= parsedColumnIndex + minColumn && maxRow >= parsedRowIndex + minRow) {
          if (parsedArray[parsedRowIndex] && parsedArray[parsedRowIndex][parsedColumnIndex]) {
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
    setIsEditing({
      x: row,
      y: column
    });
  };
  const isCellBeingSelected = (row, column) => {
    const minRow = Math.min(firstCellPosition.x, lastCellPosition.x);
    const maxRow = Math.max(firstCellPosition.x, lastCellPosition.x);
    const minColumn = Math.min(firstCellPosition.y, lastCellPosition.y);
    const maxColumn = Math.max(firstCellPosition.y, lastCellPosition.y);
    return row >= minRow && row <= maxRow && column >= minColumn && column <= maxColumn;
  };
  const isCellBeingEdited = (row, column) => {
    const editedRow = isEditing.x;
    const editedColumn = isEditing.y;
    return editedRow === row && editedColumn === column;
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, contextMenuVisible && /*#__PURE__*/React.createElement(ContextMenu$1, {
    onCopyClick: () => {
      handleCopy();
    },
    onPasteClick: () => {
      handlePaste();
    },
    onEditClick: () => {
      handleEdit();
    },
    position: contextMenuPosition
  }), isSelecting && /*#__PURE__*/React.createElement(SelectionRectangle, {
    style: {
      top: Math.min(startPosition.y, endPosition.y),
      left: Math.min(startPosition.x, endPosition.x),
      width: Math.abs(endPosition.x - startPosition.x),
      height: Math.abs(endPosition.y - startPosition.y)
    }
  }), /*#__PURE__*/React.createElement(BaseTable, {
    ref: tableRef,
    className: "table",
    onContextMenu: handleContextMenu,
    onMouseDown: handleMouseDown,
    onMouseMove: handleMouseMove,
    onMouseUp: handleMouseUp
  }, /*#__PURE__*/React.createElement(TableHead$1, {
    columns,
    handleSorting,
    headerCellStyle
  }), /*#__PURE__*/React.createElement(TableBody$1, {
    columns,
    tableData,
    isCellBeingSelected,
    isCellBeingEdited,
    handleInputChange,
    cellStyle
  })));
};
var Table$1 = Table;
const TableColumnPropTypes = {
  label: PropTypes.string.isRequired,
  accessor: PropTypes.string.isRequired,
  sortable: PropTypes.bool.isRequired,
  sortbyOrder: PropTypes.string
};
({
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(PropTypes.shape(TableColumnPropTypes)).isRequired,
  cellStyle: PropTypes.object.isRequired,
  headerCellStyle: PropTypes.object.isRequired
});
({
  row: PropTypes.number.isRequired,
  column: PropTypes.number.isRequired
});

export { Table$1 as Table };
