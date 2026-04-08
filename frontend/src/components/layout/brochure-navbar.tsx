import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Link } from "react-router";

interface NavPage {
  readonly name: string;

  readonly path: string;
}

const pages: NavPage[] = [
  { name: 'About', path: '/' },
  { name: 'Contact', path: '/contact-us' },
  { name: 'Services', path: '/services' }
];

export default function BrochureNav() {
  //const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    //null
  //);

  // const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
  //   setAnchorElNav(event.currentTarget);
  // };

  //const handleCloseNavMenu = () => {
  //  setAnchorElNav(null);
  //};

  return (
    // <AppBar position="static" color="primary" enableColorOnDark>
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}

          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            color="primary"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              // color: 'inherit',
              textDecoration: "none"
            }}
          >
            Tax Strategists of America
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            {/* <IconButton
              size="large"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton> */}

          </Box>

          {/*TODO NEED AN ICON*/}

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                sx={{ my: 2, color: "white", display: "block" }}
                component={Link}
                to={page.path}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
                sx={{ my: 2, color: "black", display: "block",
                    borderRadius: 2, border: 2, borderColor: "black" }}
                component={Link}
                to={"/app/login"}
                >
                Login
            </Button>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
                sx={{ my: 2, color: "white", display: "block",
                    borderRadius: 2, border: 2, borderColor: "black" }}
                component={Link}
                to={"/app/register"}
                >
                Sign Up
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
