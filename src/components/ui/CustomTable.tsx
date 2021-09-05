import React from "react";
import DataTable, { createTheme } from "react-data-table-component";

const CustomTable = ({ columns, data, title }: any) => {
  createTheme("solarized", {
    text: {
      primary: "#333333",
      secondary: "#2aa198",
    },
    background: {
      default: "white",
    },
    context: {
      background: "#cb4b16",
      text: "#FFFFFF",
    },
    divider: {
      default: "#eeeeee",
    },
    action: {
      button: "rgba(0,0,0,.54)",
      hover: "rgba(0,0,0,.08)",
      disabled: "rgba(0,0,0,.12)",
    },
  });

  return (
    <DataTable
      title={title}
      data={data}
      columns={columns}
      theme="solarized"
      style={{ marginBottom: 20 }}
    />
  );
};

export default CustomTable;
