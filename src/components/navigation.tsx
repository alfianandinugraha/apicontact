import {
  AccountCircle,
  AddCircle,
  Favorite,
  Home,
  LocationOn,
} from '@mui/icons-material'
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material'
import { useRouter } from 'next/router'

const Navigation = () => {
  const router = useRouter()

  return (
    <Paper
      sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation showLabels>
        <BottomNavigationAction
          label="Beranda"
          icon={<Home />}
          onClick={() => {
            router.push('/')
          }}
        />
        <BottomNavigationAction
          label="Tambah"
          icon={<AddCircle />}
          onClick={() => {
            router.push('add-contact')
          }}
        />
        <BottomNavigationAction
          label="Akun"
          icon={<AccountCircle />}
          onClick={() => {
            router.push('profile')
          }}
        />
      </BottomNavigation>
    </Paper>
  )
}

export default Navigation
