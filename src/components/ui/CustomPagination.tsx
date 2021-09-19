import React, { useState } from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

type Props = {
  total: number;
  current?: number;
  setCurrent?: any;
  onClick?: any;
  offset?: any;
  limit?: any;
};

const CustomPagination = ({
  total,
  current = 1,
  setCurrent,
  onClick,
  limit = 10,
}: Props) => {
  const pages = Math.ceil(total / limit);
  const totalNumArray = Array(pages)
    .fill("")
    .map((tot: string, i: number) => i + 1);

  const [offset, setOffset] = useState<number>(1);

  return (
    <Pagination aria-label="Page navigation example">
      {offset > 1 && (
        <PaginationItem
          onClick={() => {
            setOffset((prev) => (prev -= 1));
          }}
        >
          <PaginationLink previous href="#" />
        </PaginationItem>
      )}
      {/* <PaginationItem>
        <PaginationLink previous href="#" />
      </PaginationItem> */}

      {totalNumArray
        ?.slice((offset - 1) * limit, limit * offset)
        ?.map((num: number) => (
          <PaginationItem
            active={num === current}
            onClick={() => {
              if (onClick) {
                onClick(num);
              }
              setCurrent(num);
            }}
          >
            <PaginationLink>{num}</PaginationLink>
          </PaginationItem>
        ))}

      {pages >= offset * limit + 1 && (
        <PaginationItem
          onClick={() => {
            setOffset((prev) => (prev += 1));
          }}
        >
          <PaginationLink next href="#" />
        </PaginationItem>
      )}
      {/* <PaginationItem>
        <PaginationLink next href="#" />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink last href="#" />
      </PaginationItem> */}
    </Pagination>
  );
};

export default CustomPagination;
