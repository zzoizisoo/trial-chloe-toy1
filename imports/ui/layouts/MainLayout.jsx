import React from "react";
import { Header } from "../components";

export const MainLayout = ({ content }) => {
  return (
    <>
      <Header />
      <main style={{maxWidth:1230, margin: "auto", marginTop: 20}}>
        {content}
    </main>
    </>
  );
};
