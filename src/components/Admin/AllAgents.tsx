import React, { useContext, useMemo, useState } from "react";
import styled from "styled-components";
import moment from "moment";

import Initials from "components/ui/Avatar/Initials";
import CustomTable from "components/ui/CustomTable";
import { AdminContext } from "context/admin/AdminProvider";

const AllAgents = () => {
  const { agents, agents_total, getAgents } = useContext(AdminContext);

  const [current, setCurrent] = useState(1);

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
      ...agents?.map((agent: any) => ({
        avatar: <Initials user={agent} />,
        username: agent?.username,
        email: agent?.email,
        date: moment(agent?.created_at).fromNow(),
      })),
    ];
  }, [agents]);

  const handlePagination = async (page: number) => {
    try {
      await getAgents(page);
    } catch (error) {
      throw error;
    }
  };

  return (
    <Container>
      <CustomTable
        title="All Agents"
        data={data}
        columns={columns}
        paginate={true}
        total={agents_total}
        current={current}
        setCurrent={setCurrent}
        onClick={handlePagination}
      />
    </Container>
  );
};

const Container = styled.div`
  height: 90vh;
  overflow-y: auto;
  padding-bottom: 40px;
`;

export default AllAgents;
