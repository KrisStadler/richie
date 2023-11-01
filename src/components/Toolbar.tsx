import { IconButton } from "@mui/material";
import { Box } from "@mui/system";
import { makeStyles } from "tss-react/mui";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TextFormatIcon from "@mui/icons-material/TextFormat";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getSelectionStyleValueForProperty } from "@lexical/selection";
import {
  $getSelection,
  $isRangeSelection,
  $isRootOrShadowRoot,
  COMMAND_PRIORITY_CRITICAL,
  SELECTION_CHANGE_COMMAND,
} from "lexical";
import { $isListNode, ListNode } from "@lexical/list";
import { useCallback, useEffect, useState } from "react";
import BlockFormatting from "./ToolbarPlugins/BlockFormatting.tsx";
import TextAlignment from "./ToolbarPlugins/TextAlignment.tsx";
import FontSize from "./ToolbarPlugins/FontSize.tsx";
import FontFamily from "./ToolbarPlugins/FontFamily.tsx";
import HeadingsDropdown from "./ToolbarPlugins/HeadingsDropdown.tsx";
import { $findMatchingParent, $getNearestNodeOfType } from "@lexical/utils";
import { $isHeadingNode } from "@lexical/rich-text";
import { useSpring, animated } from "@react-spring/web";

const useStyles = makeStyles()(() => ({
  toolbarContainer: {
    textAlign: "left",
    padding: "10px 24px",
    borderTop: `1px solid #2F323720`,
    backgroundColor: "#fff",
    color: "#000",
    display: "flex",
  },
  animatedContainer: {
    display: "flex",
    justifyContent: "flex-start",
    overflow: "hidden",
    padding: "6px 0px",
  },
}));

const blockTypeToBlockName = {
  bullet: "Bulleted List",
  check: "Check List",
  code: "Code Block",
  h1: "Heading 1",
  h2: "Heading 2",
  h3: "Heading 3",
  h4: "Heading 4",
  h5: "Heading 5",
  h6: "Heading 6",
  number: "Numbered List",
  paragraph: "Normal",
  quote: "Quote",
};

const Toolbar = () => {
  const [editor] = useLexicalComposerContext();
  const { classes } = useStyles();

  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [fontSizeApplied, setFontSizeApplied] = useState("");
  const [fontFamilyApplied, setFontFamilyApplied] = useState("");
  const [blockType, setBlockType] =
    useState<keyof typeof blockTypeToBlockName>("paragraph");
  const [open, toggle] = useState(false);
  const props = useSpring({ width: open ? "580px" : "0px" });

  /**
   * This function is in charge of syncing the UI of the toolbar to match what's in the editor.
   * ie: if a selection as bold state applied the bold button on the toolbar should indicate that.
   * */
  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();
      let element =
        anchorNode.getKey() === "root"
          ? anchorNode
          : $findMatchingParent(anchorNode, (e) => {
              const parent = e.getParent();
              return parent !== null && $isRootOrShadowRoot(parent);
            });

      if (element === null) {
        element = anchorNode.getTopLevelElementOrThrow();
      }

      const elementKey = element.getKey();
      const elementDOM = editor.getElementByKey(elementKey);

      // console.log({ element, elementKey, elementDOM, anchorNode, selection });

      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));

      setFontSizeApplied(
        $getSelectionStyleValueForProperty(selection, "font-size", "15px"),
      );
      setFontFamilyApplied(
        $getSelectionStyleValueForProperty(selection, "font-family", "Arial"),
      );

      if (elementDOM !== null) {
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType<ListNode>(
            anchorNode,
            ListNode,
          );
          const type = parentList
            ? parentList.getListType()
            : element.getListType();
          setBlockType(type);
        } else {
          const type = $isHeadingNode(element)
            ? element.getTag()
            : element.getType();
          if (type in blockTypeToBlockName) {
            setBlockType(type as keyof typeof blockTypeToBlockName);
          }
        }
      }
    }
  }, [editor]);

  useEffect(() => {}, []);

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

    editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        $updateToolbar();
      });
    });
  }, [editor, $updateToolbar]);

  return (
    <>
      {/*<IconButton aria-label="back" sx={{ marginRight: "10px" }}>*/}
      {/*  <ArrowBackIcon />*/}
      {/*</IconButton>*/}
      <Box className={classes.toolbarContainer}>
        <IconButton sx={{ marginRight: "10px" }} onClick={() => toggle(!open)}>
          <TextFormatIcon />
        </IconButton>
        <animated.div className={classes.animatedContainer} style={props}>
          <HeadingsDropdown blockType={blockType} />
          <FontFamily fontFamilyApplied={fontFamilyApplied} />
          <FontSize fontSizeApplied={fontSizeApplied} />
          <TextAlignment />
          <BlockFormatting
            isBold={isBold}
            isItalic={isItalic}
            isUnderline={isUnderline}
          />
        </animated.div>
      </Box>
    </>
  );
};

export default Toolbar;
