import { LexicalComposer } from '@lexical/react/LexicalComposer'
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { Box } from '@mui/system'
import { makeStyles } from 'tss-react/mui'

import EditorContentEditable from './ContentEditable.tsx'
import Toolbar from './Toolbar.tsx'
import TreeViewPlugin from "./TreeViewPlugin.tsx";

const useStyles = makeStyles()(() => ({
    editorContainer: {
        textAlign: 'left',
    },
    contentEditableRoot: {
        outline: 'none',
        height: '100%',
        minHeight: '200px',
        padding: '24px',
        border: '1px solid #fff',
        borderRadius: '4px',
        backgroundColor: 'white',
        color: '#000',
    },
    editorItalic: {
        fontStyle: 'italic',
    },
    editorUnderline: {
        textDecoration: 'underline',
    },
}))

const RichTextEditor = () => {
    const { classes } = useStyles()

    const onError = (error: Error) => {
        console.error(error)
    }

    const initialConfig = {
        namespace: 'EmailRichTextEditor',
        onError,
        theme: {
            text: {
                italic: classes.editorItalic,
                underline: classes.editorUnderline,
            }
        }
    }

    return (
        <LexicalComposer initialConfig={initialConfig}>
            <Box className={classes.editorContainer}>
                <RichTextPlugin
                    contentEditable={
                        <EditorContentEditable className={classes.contentEditableRoot} />
                    }
                    placeholder={null}
                    ErrorBoundary={LexicalErrorBoundary}
                />
                <HistoryPlugin />
            </Box>
            <Toolbar />
            <TreeViewPlugin/>
        </LexicalComposer>
    )
}

export default RichTextEditor