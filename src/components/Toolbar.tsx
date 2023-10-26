import React from 'react'
import {FormControl, InputLabel, MenuItem, Select} from '@mui/material'
import Popover from '@mui/material/Popover'
import { Box } from '@mui/system'
import { makeStyles } from 'tss-react/mui'

import Typography from '@mui/material/Typography'

const useStyles = makeStyles()(() => ({
    toolbarContainer: {
        textAlign: 'left',
        padding: '16px 24px',
        borderTop: `1px solid #2F323720`,
        backgroundColor: '#fff',
        width: '100%',
        color: '#000',
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
    const { classes } = useStyles()
    const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null)

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const open = Boolean(anchorEl)
    const id = open ? 'simple-popover' : undefined

    return (
        <>
            <Box className={classes.toolbarContainer}>
                <Box className={classes.ghostButton} onClick={(e) => {
                    e.preventDefault()
                    handleClick(e)
                }}>
                    <Typography  fontWeight={500}>
                        Aa
                    </Typography>
                </Box>
            </Box>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
            >
                <Box sx={{ width: '800px'}}>
                    <Box sx={{width: '100px', padding: 2, borderRight: '1px solid red'}}>
                        <HeadingsDropdown />
                    </Box>
                </Box>
            </Popover>
        </>
    )
}

export default Toolbar

const HeadingsDropdown = () => {
    return (
            <FormControl fullWidth size={'small'}>
                <InputLabel id="demo-simple-select-label">Text Format</InputLabel>
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