import { LexicalComposer } from "@lexical/react/LexicalComposer";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { TabIndentationPlugin } from "@lexical/react/LexicalTabIndentationPlugin";
import { ListItemNode, ListNode } from "@lexical/list";
import { HeadingNode } from "@lexical/rich-text";
import { Box } from "@mui/system";
import { makeStyles } from "tss-react/mui";

import EditorContentEditable from "./ContentEditable.tsx";
import Toolbar from "./Toolbar.tsx";
import TreeViewPlugin from "./TreeViewPlugin.tsx";
import { ImageNode } from "./nodes/ImageNode/ImageNode.tsx";
import ImagesPlugin from "./ImagesPlugin.tsx";
import DragDropPaste from "./DragDropPaste.tsx";

const useStyles = makeStyles()(() => ({
  editorContainer: {
    textAlign: "left",
  },
  contentEditableRoot: {
    outline: "none",
    height: "100%",
    minHeight: "300px",
    padding: "24px",
    border: "1px solid #fff",
    borderRadius: "4px",
    backgroundColor: "white",
    color: "#000",
  },
  editorItalic: {
    fontStyle: "italic",
  },
  editorUnderline: {
    textDecoration: "underline",
  },
  dropzone: {
    height: "350px",
    position: "absolute",
    top: "9px",
    width: "100%",
    maxWidth: "1152px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  dropzoneInnerContent: {
    width: "97%",
    height: "90%",
    border: "1px dashed #000",
    borderRadius: "4px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#000",
  },
  editorImage: {
    cursor: "default",
    display: "inline-block",
    position: "relative",
    userSelect: "none",
  },
}));

const RichTextEditor = () => {
  const { classes } = useStyles();

  const onError = (error: Error) => {
    console.error(error);
  };

  const initialConfig = {
    namespace: "EmailRichTextEditor",
    onError,
    theme: {
      text: {
        italic: classes.editorItalic,
        underline: classes.editorUnderline,
      },
      image: classes.editorImage,
    },
    nodes: [HeadingNode, ListNode, ListItemNode, ImageNode],
  };

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
        {/*<Box {...getRootProps({ className: classes.dropzone })}>*/}
        {/*  {isFocused && (*/}
        {/*    <Box className={classes.dropzoneInnerContent}>*/}
        {/*      <Typography variant={"h5"}>Drop files here</Typography>*/}
        {/*    </Box>*/}
        {/*  )}*/}
        {/*  <input {...getInputProps()} />*/}
        {/*</Box>*/}
        <DragDropPaste />
        <ImagesPlugin />
        <HistoryPlugin />
        <ListPlugin />
        <TabIndentationPlugin />
      </Box>
      <Toolbar />
      <TreeViewPlugin />
    </LexicalComposer>
  );
};

export default RichTextEditor;
