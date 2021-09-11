import React, { useContext, useMemo, useState } from "react";
import styled from "styled-components";
import moment from "moment";

import Initials from "components/ui/Avatar/Initials";
import CustomTable from "components/ui/CustomTable";
import { AdminContext } from "context/admin/AdminProvider";
import { Badge } from "reactstrap";
import CustomModalUI from "components/ui/CustomModal";
import CustomButton from "components/ui/CustomButton";
import { errorNotify } from "utils/errorMessage";

const AllUsers = () => {
  const { users, users_total, getUsers, deactivateUser } =
    useContext(AdminContext);

  const [userId, setUserId] = useState("");
  const [current, setCurrent] = useState(1);
  const [modal, setModal] = useState(false);

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
    {
      name: "Action",
      selector: "action",
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
        action: (
          <Badge
            style={{
              color: "#01b64c",
              background: "#03bd5049",
              cursor: "pointer",
            }}
            onClick={() => {
              setModal(true);
              setUserId(user?.profile?.id ? user?.profile?.id : "");
            }}
          >
            Deactivate
          </Badge>
        ),
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

  const handleDeativate = async (id: string) => {
    try {
      await deactivateUser(id);
      setModal(false);
    } catch (error) {
      errorNotify("Something went wrong, try again");
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

      <CustomModalUI
        component={() => (
          <div style={{ backgroundColor: "white", padding: 25 }}>
            <h4>Deactivate User</h4>
            <p>Are you sure you want to deactivate user?</p>
            <Action>
              <CustomButton
                label="No"
                onClick={() => setModal(false)}
                background="grey"
                style={{ width: 50, marginRight: 10 }}
              />
              <CustomButton
                label="Yes"
                onClick={() => {
                  if (userId) {
                    handleDeativate(userId);
                  }
                }}
                background="green"
                style={{ width: 50 }}
              />
            </Action>
          </div>
        )}
        visible={modal}
        closable={true}
        handleCancel={() => setModal(false)}
      />
    </Container>
  );
};

const Container = styled.div`
  height: 90vh;
  overflow-y: auto;
  padding-bottom: 40px;

  .modal {
    background-color: white;
  }
`;

const Action = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export default AllUsers;
