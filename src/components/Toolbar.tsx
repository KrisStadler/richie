import {IconButton, FormControl, InputLabel, MenuItem, Select, ToggleButtonGroup, ToggleButton} from '@mui/material'
import { Box } from '@mui/system'
import { makeStyles } from 'tss-react/mui'
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import {$getSelection, $isRangeSelection, COMMAND_PRIORITY_CRITICAL, SELECTION_CHANGE_COMMAND} from "lexical";
import {TextFormatType} from "lexical/nodes/LexicalTextNode";
import React, {useCallback, useEffect, useState} from "react";

const useStyles = makeStyles()(() => ({
    toolbarContainer: {
        textAlign: 'left',
        padding: '16px 24px',
        borderTop: `1px solid #2F323720`,
        backgroundColor: '#fff',
        width: '100%',
        color: '#000',
        display: 'flex',
        justifyContent: 'space-between',
    },
    ghostButton: {
        cursor: 'pointer',
        padding: '8px 16px',
        borderRadius: '4px',
        width: 'fit-content',
        '&:hover': {
            backgroundColor: '#2F323720',
        },
    },
}))

const Toolbar = () => {
    const [editor] = useLexicalComposerContext();
    const { classes } = useStyles()

    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isUnderline, setIsUnderline] = useState(false);


    /**
     * This function is in charge of syncing the UI of the toolbar to match what's in the editor.
     * ie: if a selection as bold state applied the bold button on the toolbar should indicate that.
     * */
    const $updateToolbar = useCallback(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
            setIsBold(selection.hasFormat('bold'));
            setIsItalic(selection.hasFormat('italic'));
            setIsUnderline(selection.hasFormat('underline'));
        }
    }, [editor]);

    useEffect(() => {

    },[])

    // Register a listener for selection changes. This listener callback will intercept the selection change before the default handler
    // for the eventand trigger the $updateToolbar function.
    useEffect(() => {
        return editor.registerCommand(
            SELECTION_CHANGE_COMMAND,
            (_payload) => {
                $updateToolbar();
                // setActiveEditor(newEditor);
                return false;
            },
            COMMAND_PRIORITY_CRITICAL,
        );
    }, [editor, $updateToolbar]);

    return (
        <>
            <Box className={classes.toolbarContainer}>
                <IconButton aria-label="back">
                    <ArrowBackIcon />
                </IconButton>
                <HeadingsDropdown />
                <FontFamily />
                <FontSize />
                <TextAlignment />
                <TextFormatting isBold={isBold} />
                {/*<Button className={classes.ghostButton} onClick={handleClick}>*/}
                {/*    <Typography  fontWeight={500}>*/}
                {/*        Aa*/}
                {/*    </Typography>*/}
                {/*</Button>*/}
            </Box>
        </>
    )
}

export default Toolbar

const HeadingsDropdown = () => {
    return (
            <FormControl fullWidth size={'small'}>
                <InputLabel id="demo-simple-select-label" size={'small'}>Text Format</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={''}
                    label="Text Format"
                    // onChange={handleChange}
                >
                    <MenuItem value={10}>Normal</MenuItem>
                    <MenuItem value={20}>Heading 1</MenuItem>
                    <MenuItem value={30}>Heading 2</MenuItem>
                    <MenuItem value={30}>Heading 3</MenuItem>
                    <MenuItem value={30}>Bullet list</MenuItem>
                    <MenuItem value={30}>Numbered list</MenuItem>
                </Select>
            </FormControl>

    )
}

const FontFamily = () => {
    return (
        <FormControl fullWidth size={'small'}>
            <InputLabel id="font-family-select-label">Font family</InputLabel>
            <Select
                labelId="font-family-select-label"
                id="font-family-select"
                value={''}
                label="Text Format"
                // onChange={handleChange}
            >
                <MenuItem value={10}>Normal</MenuItem>
                <MenuItem value={20}>Heading 1</MenuItem>
                <MenuItem value={30}>Heading 2</MenuItem>
                <MenuItem value={30}>Heading 3</MenuItem>
                <MenuItem value={30}>Bullet list</MenuItem>
                <MenuItem value={30}>Numbered list</MenuItem>
            </Select>
        </FormControl>

    )
}

const FontSize = () => {
    return (
        <FormControl fullWidth size={'small'}>
            <InputLabel id="font-size-select-label">Font size</InputLabel>
            <Select
                labelId="font-size-select-label"
                id="font-size-select"
                value={''}
                label="Text Format"
                // onChange={handleChange}
            >
                <MenuItem value={10}>Normal</MenuItem>
                <MenuItem value={20}>Heading 1</MenuItem>
                <MenuItem value={30}>Heading 2</MenuItem>
                <MenuItem value={30}>Heading 3</MenuItem>
                <MenuItem value={30}>Bullet list</MenuItem>
                <MenuItem value={30}>Numbered list</MenuItem>
            </Select>
        </FormControl>

    )
}

const TextAlignment = () => {
    return (
        <FormControl fullWidth size={'small'}>
            <InputLabel id="text-alignment-select-label">Text Alignment</InputLabel>
            <Select
                labelId="text-alignment-select-label"
                id="text-alignment-select"
                value={''}
                label="Text Alignment"
                // onChange={handleChange}
            >
                <MenuItem value={10}>Normal</MenuItem>
                <MenuItem value={20}>Heading 1</MenuItem>
                <MenuItem value={30}>Heading 2</MenuItem>
                <MenuItem value={30}>Heading 3</MenuItem>
                <MenuItem value={30}>Bullet list</MenuItem>
                <MenuItem value={30}>Numbered list</MenuItem>
            </Select>
        </FormControl>

    )
}

const TextFormatting = ({isBold}: {isBold: boolean}) => {
    const [editor] = useLexicalComposerContext();
    const [formats, setFormats] = useState(['']);

    useEffect(() => {
        if (isBold && !formats.includes('bold')) {
            setFormats([...formats,'bold']);
        } else if (!isBold && formats.includes('bold')) {
            setFormats(formats.filter((value) => value !== 'bold'));
        }
    }, [isBold, formats])

    const updateEditorTextFormat = (format: TextFormatType) => {
        editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
                selection.formatText(format);
            }
        });
    };
    const handleFormat = (_: React.MouseEvent, newFormats: Array<string>) => {
        if (newFormats.length < formats.length) {
            const format = formats.filter((value) => !newFormats.includes(value))[0];
            updateEditorTextFormat(format as TextFormatType);
        } else {
            const format = newFormats.filter((value) => !formats.includes(value))[0];
            updateEditorTextFormat(format as TextFormatType);
        }

        // setFormats(newFormats);
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
            <ToggleButton value="underlined" aria-label="underlined">
                <FormatUnderlinedIcon />
            </ToggleButton>
            <ToggleButton value="color" aria-label="color" disabled>
                <FormatColorFillIcon />
                <ArrowDropDownIcon />
            </ToggleButton>
        </ToggleButtonGroup>
    );
}