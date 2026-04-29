import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';

const drawerWidth = 240;

export default function Component() {
  return (
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar>
          STAbill
        </Toolbar>

        <Divider />

        <List>
          <ListItem disablePadding>
            <ListItemButton href="/app/accountant">
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>

              <ListItemText primary={"Home"} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton href="/app/accountant/clients">
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>

              <ListItemText primary={"Clients"} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton href="/app/accountant/account">
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>

              <ListItemText primary={"Account"} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
  );
}
