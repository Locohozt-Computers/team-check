import React, { useContext, useMemo } from "react";
import styled from "styled-components";
import moment from "moment";

import Initials from "components/ui/Avatar/Initials";
import CustomTable from "components/ui/CustomTable";
import { AdminContext } from "context/admin/AdminProvider";

const Agents = () => {
  const { agents } = useContext(AdminContext);

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
      ...agents?.slice(0, 3)?.map((agent: any) => ({
        avatar: <Initials user={agent} />,
        username: agent?.username,
        email: agent?.email,
        date: moment(agent?.created_at).fromNow(),
      })),
    ];
  }, [agents]);

  return (
    <Container>
      <CustomTable title="All Agents" data={data} columns={columns} />
    </Container>
  );
};

const Container = styled.div``;

export default Agents;
