import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  DEPRECATED_$isGridSelection,
} from "lexical";
import { $setBlocksType } from "@lexical/selection";
import { $createHeadingNode, HeadingTagType } from "@lexical/rich-text";
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
} from "@lexical/list";

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
interface Props {
  blockType: keyof typeof blockTypeToBlockName;
}
const HeadingsDropdown = ({ blockType }: Props) => {
  console.log({ blockType });
  const [editor] = useLexicalComposerContext();
  const formatParagraph = () => {
    editor.update(() => {
      const selection = $getSelection();
      if (
        $isRangeSelection(selection) ||
        DEPRECATED_$isGridSelection(selection)
      ) {
        $setBlocksType(selection, () => $createParagraphNode());
      }
    });
  };

  const formatHeading = (headingSize: HeadingTagType) => {
    if (blockType !== headingSize) {
      editor.update(() => {
        const selection = $getSelection();
        if (
          $isRangeSelection(selection) ||
          DEPRECATED_$isGridSelection(selection)
        ) {
          $setBlocksType(selection, () => $createHeadingNode(headingSize));
        }
      });
    }
  };

  const formatBulletList = () => {
    console.log("we are here");
    editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    if (blockType !== "bullet") {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
  };

  const formatNumberedList = () => {
    if (blockType !== "number") {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
  };

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value as keyof typeof blockTypeToBlockName;

    switch (value) {
      case "h1":
        formatHeading("h1");
        break;
      case "h2":
        formatHeading("h2");
        break;
      case "h3":
        formatHeading("h3");
        break;
      case "paragraph":
        formatParagraph();
        break;
      case "bullet":
        formatBulletList();
        break;
      case "number":
        formatNumberedList();
        break;
      default:
        break;
    }
  };

  return (
    <FormControl fullWidth size={"small"}>
      <InputLabel id="demo-simple-select-label" size={"small"}>
        Text Format
      </InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={blockType}
        label="Text Format"
        onChange={handleChange}
      >
        <MenuItem value={"paragraph"}>Normal</MenuItem>
        <MenuItem value={"h1"}>Heading 1</MenuItem>
        <MenuItem value={"h2"}>Heading 2</MenuItem>
        <MenuItem value={"h3"}>Heading 3</MenuItem>
        <MenuItem value={"bullet"}>Bullet list</MenuItem>
        <MenuItem value={"number"}>Numbered list</MenuItem>
      </Select>
    </FormControl>
  );
};

export default HeadingsDropdown;
