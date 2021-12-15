import { Close, Delete, MoreVert } from '@mui/icons-material'
import {
  AppBar,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material'
import useAuth from '@src/stores/user'
import { useRouter } from 'next/router'
import React, { useMemo, useState } from 'react'

type ContactAppBarProps = {
  variant: 'ADD' | 'EDIT'
  onClickDelete?: () => void
}

const ContactAppBar = (props: ContactAppBarProps) => {
  const user = useAuth((state) => state.user)
  const [anchorEl, setAnchorEl] = useState(null)
  const router = useRouter()

  const open = useMemo(() => {
    return !!anchorEl
  }, [anchorEl])

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const clickDelete = () => {
    handleClose()
    props.onClickDelete && props.onClickDelete()
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Close
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => {
              router.back()
            }}
          />
          <Typography sx={{ flexGrow: 1 }}>
            {props.variant === 'ADD' ? 'Tambah Contact' : 'Edit Contact'}
          </Typography>
          {props.variant !== 'ADD' ? <MoreVert onClick={handleClick} /> : null}
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={clickDelete}>
              <ListItemIcon>
                <Delete fontSize="small" color="error" />
              </ListItemIcon>
              <ListItemText>
                <Typography color="error">Hapus</Typography>
              </ListItemText>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Typography
        sx={{
          textTransform: 'uppercase',
          backgroundColor: '#1F232A',
          color: '#808080',
          fontSize: '10px',
          px: '16px',
          py: '8px',
        }}
      >
        Kontak {user?.email ?? ''}
      </Typography>
    </>
  )
}

export default ContactAppBar
