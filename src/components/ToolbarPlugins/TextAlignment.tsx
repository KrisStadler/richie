import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import React, { useState } from "react";
import { ElementFormatType } from "lexical/nodes/LexicalElementNode";
import { FORMAT_ELEMENT_COMMAND } from "lexical";
import { IconButton, ListItemIcon, Menu, MenuItem } from "@mui/material";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";

const TextAlignment = () => {
  const [editor] = useLexicalComposerContext();

  const [anchorEl, setAnchorEl] = useState<null | HTMLButtonElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const updateEditorTextFormat = (format: ElementFormatType) => {
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, format);
  };

  const handleAlignment = (newFormat: ElementFormatType) => {
    updateEditorTextFormat(newFormat);
    handleClose();
  };

  return (
    <div>
      <IconButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <FormatAlignJustifyIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => handleAlignment("left")}>
          <ListItemIcon>
            <FormatAlignLeftIcon />
          </ListItemIcon>
        </MenuItem>
        <MenuItem onClick={() => handleAlignment("center")}>
          <ListItemIcon>
            <FormatAlignCenterIcon />
          </ListItemIcon>
        </MenuItem>
        <MenuItem onClick={() => handleAlignment("right")}>
          <ListItemIcon>
            <FormatAlignRightIcon />
          </ListItemIcon>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default TextAlignment;
