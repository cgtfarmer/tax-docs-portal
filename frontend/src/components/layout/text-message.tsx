import React from "react";
import { Box } from "@mui/material";

const TextMessage = () => {
  return (
    <Box
        sx={{
        width: "300px",
        display: "flex",
        flexDirection: "column",
        border: "1px solid black",
        p: 1,
        }}
    >
        <Box sx={{alignItems: "flex-start"}}>
            NAME
        </Box>
        <p>message message message</p>
    </Box>
  );
};

export default TextMessage;


