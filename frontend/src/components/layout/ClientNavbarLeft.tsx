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
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import MessageIcon from '@mui/icons-material/Message';
import ArticleIcon from '@mui/icons-material/Article';

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
            <ListItemButton href="/app/client">
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>

              <ListItemText primary={"Home"} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton href="/app/client/tasks">
              <ListItemIcon>
                <TaskAltIcon />
              </ListItemIcon>

              <ListItemText primary={"Tasks"} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton href="/app/client/messages">
              <ListItemIcon>
                <MessageIcon />
              </ListItemIcon>

              <ListItemText primary={"Messages"} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton href="/app/client/documents">
              <ListItemIcon>
                <ArticleIcon />
              </ListItemIcon>

              <ListItemText primary={"Documents"} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton href="/app/client/account">
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
