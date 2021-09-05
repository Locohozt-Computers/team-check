import React, { useContext, useMemo, useState } from "react";
import styled from "styled-components";
import moment from "moment";

import Initials from "components/ui/Avatar/Initials";
import CustomTable from "components/ui/CustomTable";
import { AdminContext } from "context/admin/AdminProvider";

const AllUsers = () => {
  const { users, users_total, getUsers } = useContext(AdminContext);

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
      ...users?.map((user: any) => ({
        avatar: <Initials user={user} />,
        username: user?.username,
        email: user?.email,
        date: moment(user?.created_at).fromNow(),
      })),
    ];
  }, [users]);

  const handlePagination = async (page: number) => {
    try {
      await getUsers(page);
    } catch (error) {
      throw error;
    }
  };

  return (
    <Container>
      <CustomTable
        title="All Users"
        data={data}
        columns={columns}
        paginate={true}
        total={users_total}
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

export default AllUsers;
