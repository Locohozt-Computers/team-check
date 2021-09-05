import React, { useContext, useMemo } from "react";
import styled from "styled-components";
import moment from "moment";

import Initials from "components/ui/Avatar/Initials";
import CustomTable from "components/ui/CustomTable";
import { AdminContext } from "context/admin/AdminProvider";
import { limit } from "./data";

const Users = () => {
  const { users } = useContext(AdminContext);

  const columns = [
    {
      name: "Avatar",
      selector: "avatar",
      sortable: true,
    },
    {
      name: "Username",
      selector: "username",
      sortable: true,
    },
    {
      name: "Email Address",
      selector: "email",
      sortable: true,
    },
    {
      name: "Date Created",
      selector: "date",
      sortable: true,
    },
  ];

  const data = useMemo(() => {
    return [
      ...users?.slice(0, limit)?.map((agent: any) => ({
        avatar: <Initials user={agent} />,
        username: agent?.username,
        email: agent?.email,
        date: moment(agent?.created_at).fromNow(),
      })),
    ];
  }, [users]);

  const showRoute = users?.length > limit;

  return (
    <Container>
      <CustomTable
        title="All Users"
        data={data}
        columns={columns}
        route="/admin/all-users"
        showRoute={showRoute}
      />
    </Container>
  );
};

const Container = styled.div``;

export default Users;
