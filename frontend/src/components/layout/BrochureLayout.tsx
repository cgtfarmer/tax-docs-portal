import { Outlet } from "react-router";
import { Box} from "@mui/material";
import ModularNav from "./modular-navbar";

export default function Component() {
  return (
    <Box sx={{ display: "flex"}}>
        <ModularNav variant="brochure" />

        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
        >
          <Outlet />
        </Box>

    </Box>
  );
}
