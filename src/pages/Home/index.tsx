import React from "react";

import HomeComponent from "components/Home";

const HomePage = () => {
  const userFromLocalStorage: any = localStorage.getItem("techCheckPoint");
  const user = JSON.parse(userFromLocalStorage);

  return (
    <div>
      <HomeComponent user={user} />
    </div>
  );
};

export default HomePage;
