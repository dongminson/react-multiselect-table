import { FC } from 'react';
interface ContextMenuProps {
    onCopyClick: () => void;
    onPasteClick: () => void;
    onEditClick: () => void;
    position: {
        x: number;
        y: number;
    };
}
declare const ContextMenu: FC<ContextMenuProps>;
export default ContextMenu;
