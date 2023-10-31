import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import React, {useEffect, useState} from "react";
import {TextFormatType} from "lexical/nodes/LexicalTextNode";
import {$getSelection, $isRangeSelection} from "lexical";
import {ToggleButton, ToggleButtonGroup} from "@mui/material";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatColorFillIcon from "@mui/icons-material/FormatColorFill";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

interface Props {
    isBold: boolean;
    isItalic: boolean;
    isUnderline: boolean;
}

const BlockFormatting = ({isBold, isItalic, isUnderline}: Props) => {
    const [editor] = useLexicalComposerContext();
    const [formats, setFormats] = useState<Array<TextFormatType>>([]);

    useEffect(() => {
        if (isBold && !formats.includes('bold')) {
            setFormats([...formats,'bold']);
        } else if (!isBold && formats.includes('bold')) {
            setFormats(formats.filter((value) => value !== 'bold'));
        }
    }, [isBold, formats])

    useEffect(() => {
        if (isItalic && !formats.includes('italic')) {
            setFormats([...formats,'italic']);
        } else if (!isItalic && formats.includes('italic')) {
            setFormats(formats.filter((value) => value !== 'italic'));
        }
    }, [isItalic, formats])

    useEffect(() => {
        if (isUnderline && !formats.includes('underline')) {
            setFormats([...formats,'underline']);
        } else if (!isUnderline && formats.includes('underline')) {
            setFormats(formats.filter((value) => value !== 'underline'));
        }
    }, [isUnderline, formats])

    const updateEditorTextFormat = (format: TextFormatType) => {
        editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
                selection.formatText(format);
            }
        });
    };
    const handleFormat = (_: React.MouseEvent, newFormats: Array<TextFormatType>) => {
        if (newFormats.length < formats.length) {
            const format = formats.filter((value) => !newFormats.includes(value))[0];
            updateEditorTextFormat(format as TextFormatType);
        } else {
            const format = newFormats.filter((value) => !formats.includes(value))[0];
            updateEditorTextFormat(format as TextFormatType);
        }
    };

    return (
        <ToggleButtonGroup
            value={formats}
            onChange={handleFormat}
            aria-label="text formatting"
        >
            <ToggleButton value="bold" aria-label="bold">
                <FormatBoldIcon />
            </ToggleButton>
            <ToggleButton value="italic" aria-label="italic">
                <FormatItalicIcon />
            </ToggleButton>
            <ToggleButton value="underline" aria-label="underline">
                <FormatUnderlinedIcon />
            </ToggleButton>
            <ToggleButton value="color" aria-label="color">
                <FormatColorFillIcon />
                <ArrowDropDownIcon />
            </ToggleButton>
        </ToggleButtonGroup>
    );
}

export default BlockFormatting