import React from "react";
import { FlexBox, Header } from "../components";
import { useTheme } from "@mui/joy";


export const SignUpLayout = ({ content }) => {
  const theme = useTheme();
  return (
    <>
      <Header />

      <main
        style={{
          backgroundColor: theme.palette.background.level1,
          height: "100vh",
        }}
      >
        <FlexBox
          direction="column"
          align="center"
          sx={{ maxWidth: 800, mx: "auto" }}
        >
          {content}
        </FlexBox>
      </main>
    </>
  );
};
