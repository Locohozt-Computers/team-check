import React from "react";
import DataTable, { createTheme } from "react-data-table-component";
import { useHistory } from "react-router";
import styled from "styled-components";
import CustomPagination from "./CustomPagination";

type Props = {
  columns: any;
  data: any;
  title?: string;
  route?: string;
  showRoute?: boolean;
  paginate?: boolean;
  total?: number;
  current?: number;
  setCurrent?: any;
  onClick?: any;
};

const CustomTable: React.FC<Props> = ({
  columns,
  data,
  title,
  route = "",
  showRoute = false,
  paginate = false,
  total = 5,
  current,
  setCurrent,
  onClick,
}: any) => {
  const history = useHistory();

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
    <Container>
      <div className="header">
        <h3>{title}</h3>
        {route && showRoute && (
          <span className="see_all" onClick={() => history.push(route)}>
            See All
          </span>
        )}
      </div>
      <DataTable
        data={data}
        columns={columns}
        theme="solarized"
        style={{ marginBottom: 20 }}
      />
      {paginate && (
        <Pagination>
          <CustomPagination
            total={total}
            current={current}
            setCurrent={setCurrent}
            onClick={onClick}
          />
        </Pagination>
      )}
    </Container>
  );
};

export const Container = styled.div`
  .rdt_TableHeader {
    min-height: 0;
    width: 100%;
  }
  .header {
    width: 100%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 50px;
    padding: 0 16px;

    h3 {
      margin: 0;
    }

    .see_all {
      color: dodgerblue;
      cursor: pointer;
    }
  }
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
`;

export default CustomTable;
