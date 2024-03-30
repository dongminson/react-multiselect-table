import React, { FC } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

interface ContextMenuProps {
  onCopyClick: () => void;
  onPasteClick: () => void;
  onEditClick: () => void;
  position: { x: number; y: number };
}

const BaseContextMenu = styled.div`
  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px;
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
  box-shadow:
    rgba(0, 0, 0, 0.2) 0px 2px 4px -1px,
    rgba(0, 0, 0, 0.14) 0px 4px 5px 0px,
    rgba(0, 0, 0, 0.12) 0px 1px 10px 0px;
  color: rgba(0, 0, 0, 0.87);
  font-family: 'Roboto', 'Helvetica Neue', sans-serif;
  left: 9px;
  opacity: 1;
  padding: 0px;
  position: fixed;
  top: 8px;
  transform-origin: 0px 0px;
  transition-delay: 0s;
  transition-duration: 0.2s;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
  z-index: 100;
`;

const MenuItemWrapper = styled.div`
  background-color: rgb(255, 255, 255);
  color: rgba(0, 0, 0, 0.87);
  display: flex;
  flex-direction: column;
  font-family: 'Roboto', 'Helvetica Neue', sans-serif;
  max-height: 304px;
  min-width: 96px;
  overflow-y: auto;
  padding-bottom: 8px;
  padding-left: 0px;
  padding-right: 0px;
  padding-top: 8px;
  -moz-box-direction: normal;
  -moz-box-orient: vertical;
`;

const MenuItem = styled.div`
  cursor: pointer;
  font-size: 15px;
  text-transform: none;
  font-weight: 400;
  display: flex;
  align-items: center;
  flex-direction: row;
  min-height: 48px;
  height: 48px;
  text-align: left;
  border-radius: 0;
  margin: auto 0;
  padding-left: 16px;
  padding-right: 16px;

  &:hover {
    background-color: rgba(158, 158, 158, 0.2);
  }
`;

const handleContextMenu = (event: any) => {
  event.preventDefault();
};

const ContextMenu: FC<ContextMenuProps> = ({
  onCopyClick,
  onPasteClick,
  onEditClick,
  position,
}) => {
  return (
    <BaseContextMenu
      onContextMenu={handleContextMenu}
      style={{
        top: position.y,
        left: position.x,
      }}
    >
      <MenuItemWrapper>
        <MenuItem onClick={onEditClick}>Edit</MenuItem>
        <MenuItem onClick={onCopyClick}>Copy</MenuItem>
        <MenuItem onClick={onPasteClick}>Paste</MenuItem>
      </MenuItemWrapper>
    </BaseContextMenu>
  );
};

export default ContextMenu;

const ContextMenuPropsPropTypes = {
  onCopyClick: PropTypes.func.isRequired,
  onPasteClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
};
