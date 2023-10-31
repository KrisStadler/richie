import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

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

export default FontFamily