import {
    IconButton,
} from '@mui/material'
import { Box } from '@mui/system'
import { makeStyles } from 'tss-react/mui'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import {
    $getSelectionStyleValueForProperty
} from '@lexical/selection';
import {
    $getSelection,
    $isRangeSelection,
    COMMAND_PRIORITY_CRITICAL,
    SELECTION_CHANGE_COMMAND
} from "lexical";
import {useCallback, useEffect, useState} from "react";
import BlockFormatting from "./ToolbarPlugins/BlockFormatting.tsx";
import TextAlignment from "./ToolbarPlugins/TextAlignment.tsx";
import FontSize from "./ToolbarPlugins/FontSize.tsx";
import FontFamily from "./ToolbarPlugins/FontFamily.tsx";
import HeadingsDropdown from "./ToolbarPlugins/HeadingsDropdown.tsx";

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
    // for the event and trigger the $updateToolbar function.
    useEffect(() => {
        editor.registerCommand(
            SELECTION_CHANGE_COMMAND,
            (_payload) => {
                $updateToolbar();
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
                <BlockFormatting isBold={isBold} isItalic={isItalic} isUnderline={isUnderline} />
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






