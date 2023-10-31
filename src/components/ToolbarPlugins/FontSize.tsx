import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {$getSelection, $isRangeSelection} from "lexical";
import {
    $patchStyleText,
} from '@lexical/selection';

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

export default FontSize;