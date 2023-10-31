import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import React, {useState} from "react";
import {ElementFormatType} from "lexical/nodes/LexicalElementNode";
import {FORMAT_ELEMENT_COMMAND} from "lexical";
import {ToggleButton, ToggleButtonGroup} from "@mui/material";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";

const TextAlignment = () => {
    const [editor] = useLexicalComposerContext();
    const [alignment, setAlignment] = useState<ElementFormatType>('');
    const updateEditorTextFormat = (format: ElementFormatType) => {
        editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, format);
    };
    const handleAlignment = (_: React.MouseEvent, newFormat: ElementFormatType) => {
        setAlignment(newFormat)
        updateEditorTextFormat(newFormat);
    };

    return (
        <ToggleButtonGroup
            value={alignment}
            exclusive
            onChange={handleAlignment}
            aria-label="text alignment"
        >
            <ToggleButton value="left" aria-label="left aligned">
                <FormatAlignLeftIcon />
            </ToggleButton>
            <ToggleButton value="center" aria-label="centered">
                <FormatAlignCenterIcon />
            </ToggleButton>
            <ToggleButton value="right" aria-label="right aligned">
                <FormatAlignRightIcon />
            </ToggleButton>
            <ToggleButton value="justify" aria-label="justified">
                <FormatAlignJustifyIcon />
            </ToggleButton>
        </ToggleButtonGroup>
    );
}

export default TextAlignment;