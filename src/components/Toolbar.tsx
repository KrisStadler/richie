import {
    IconButton,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    ToggleButtonGroup,
    ToggleButton,
    SelectChangeEvent
} from '@mui/material'
import { Box } from '@mui/system'
import { makeStyles } from 'tss-react/mui'
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import {
    $patchStyleText,
    $getSelectionStyleValueForProperty
} from '@lexical/selection';
import {
    $getSelection,
    $isRangeSelection,
    COMMAND_PRIORITY_CRITICAL,
    FORMAT_ELEMENT_COMMAND,
    SELECTION_CHANGE_COMMAND
} from "lexical";
import {TextFormatType} from "lexical/nodes/LexicalTextNode";
import React, {useCallback, useEffect, useState} from "react";
import {ElementFormatType} from "lexical/nodes/LexicalElementNode";

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
    const [fontSizeApplied, setFontSizeApplied] = useState('');


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

            setFontSizeApplied(
                $getSelectionStyleValueForProperty(selection, 'font-size', '15px'),
            );
        }
    }, [editor]);

    useEffect(() => {

    },[])

    // Register a listener for selection changes. This listener callback will intercept the selection change before the default handler
    // for the eventand trigger the $updateToolbar function.
    useEffect(() => {
        editor.registerCommand(
            SELECTION_CHANGE_COMMAND,
            (_payload) => {
                $updateToolbar();
                // setActiveEditor(newEditor);
                return false;
            },
            COMMAND_PRIORITY_CRITICAL,
        );

        editor.registerUpdateListener(({editorState}) => {
            editorState.read(() => {
                $updateToolbar();
            });
        })
    }, [editor, $updateToolbar]);

    return (
        <>
            <Box className={classes.toolbarContainer}>
                <IconButton aria-label="back">
                    <ArrowBackIcon />
                </IconButton>
                <HeadingsDropdown />
                <FontFamily />
                <FontSize fontSizeApplied={fontSizeApplied}/>
                <TextAlignment />
                <TextFormatting isBold={isBold} isItalic={isItalic} isUnderline={isUnderline} />
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

const FontSize = ({fontSizeApplied}: {fontSizeApplied: string}) => {
    const [editor] = useLexicalComposerContext();

    const handleFontSizeUpdate = (event: SelectChangeEvent) => {
        const fontSize = event.target.value;
        editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
                $patchStyleText(selection, {
                    ['font-size']: fontSize,
                });
            }

        })
    }

    return (
        <FormControl fullWidth size={'small'}>
            <InputLabel id="font-size-select-label">Font size</InputLabel>
            <Select
                labelId="font-size-select-label"
                id="font-size-select"
                value={fontSizeApplied}
                label="Text Format"
                onChange={handleFontSizeUpdate}
            >
                <MenuItem value={'10px'}>10px</MenuItem>
                <MenuItem value={'11px'}>11px</MenuItem>
                <MenuItem value={'12px'}>12px</MenuItem>
                <MenuItem value={'13px'}>13px</MenuItem>
                <MenuItem value={'14px'}>14px</MenuItem>
                <MenuItem value={'15px'}>15px</MenuItem>
                <MenuItem value={'16px'}>16px</MenuItem>
                <MenuItem value={'17px'}>17px</MenuItem>
                <MenuItem value={'18px'}>18px</MenuItem>
                <MenuItem value={'19px'}>19px</MenuItem>
                <MenuItem value={'20px'}>20px</MenuItem>
            </Select>
        </FormControl>

    )
}

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

const TextFormatting = ({isBold, isItalic, isUnderline}: {isBold: boolean; isItalic: boolean; isUnderline: boolean;}) => {
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