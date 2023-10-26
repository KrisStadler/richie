import { LexicalComposer } from '@lexical/react/LexicalComposer'
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { Box } from '@mui/system'
import { makeStyles } from 'tss-react/mui'

import EditorContentEditable from './ContentEditable.tsx'
import Toolbar from './Toolbar.tsx'

const useStyles = makeStyles()(() => ({
    editorContainer: {
        height: '100%',
        textAlign: 'left',
    },
    contentEditableRoot: {
        outline: 'none',
        width: '100%',
        height: '90%',
        padding: '24px',
        border: '1px solid #fff',
        borderRadius: '4px',
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
        </LexicalComposer>
    )
}

export default RichTextEditor