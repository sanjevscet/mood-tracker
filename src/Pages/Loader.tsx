import React from "react";
import { GridLoader } from "react-spinners";

export default function Loader() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        // backgroundColor: "rgba(255, 255, 255, 0.8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <GridLoader
        //   height="80"
        //   width="80"
        color="#005151"
        cssOverride={{}}
        //   ariaLabel="grid-loading"
        //   radius="12.5"
        //   wrapperStyle={{}}
        //   wrapperClass=""
        //   visible={true}
      />
    </div>
  );
}
