import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

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

export default HeadingsDropdown