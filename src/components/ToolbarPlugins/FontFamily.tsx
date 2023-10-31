import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {$getSelection, $isRangeSelection} from "lexical";
import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import {
    $patchStyleText,
} from '@lexical/selection';

const FONT_FAMILY_OPTIONS: [string, string][] = [
    ['Arial', 'Arial'],
    ['Courier New', 'Courier New'],
    ['Georgia', 'Georgia'],
    ['Times New Roman', 'Times New Roman'],
    ['Trebuchet MS', 'Trebuchet MS'],
    ['Verdana', 'Verdana'],
];

interface Props {
    fontFamilyApplied: string
}
const FontFamily = ({fontFamilyApplied}: Props) => {
    const [editor] = useLexicalComposerContext();
    const handleFontFamilyUpdate = (event: SelectChangeEvent) => {
        const fontFamily = event.target.value;
        editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
                $patchStyleText(selection, {
                    ['font-family']: fontFamily,
                });
            }

        })
    }

    return (
        <FormControl fullWidth size={'small'}>
            <InputLabel id="font-family-select-label">Font family</InputLabel>
            <Select
                labelId="font-family-select-label"
                id="font-family-select"
                value={fontFamilyApplied}
                label="Text Format"
                onChange={handleFontFamilyUpdate}
            >
                {FONT_FAMILY_OPTIONS.map(([value, label]) => (<MenuItem key={value} value={value}>{label}</MenuItem>))}
            </Select>
        </FormControl>

    )
}

export default FontFamily