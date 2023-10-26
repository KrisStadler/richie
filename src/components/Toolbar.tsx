import React from 'react'
import { MenuItem } from '@mui/material'
import Menu from '@mui/material/Menu'
import Popover from '@mui/material/Popover'
import { Box } from '@mui/system'
import { makeStyles } from 'tss-react/mui'

import Typography from '@mui/material/Typography'

const useStyles = makeStyles()(() => ({
    toolbarContainer: {
        textAlign: 'left',
        padding: '16px 24px',
        borderTop: `1px solid #2F323720`,
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
                <Box className={classes.ghostButton} onClick={handleClick}>
                    <Typography  fontWeight={500}>
                        Text formatting
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
                <Box>
                    <HeadingsDropdown />
                </Box>
            </Popover>
        </>
    )
}

export default Toolbar

const HeadingsDropdown = () => {
    const { classes } = useStyles()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLDivElement>(null)
    const open = Boolean(anchorEl)
    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <>
            <Box className={classes.ghostButton} onClick={handleClick}>
                <Typography color="onSurface.medium" fontWeight={500}>
                    Text formatting
                </Typography>
            </Box>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
        </>
    )
}