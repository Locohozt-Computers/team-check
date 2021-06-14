import React from "react";
import SearchComponent from "components/SearchComponent";
import { Content, Container } from "components/SearchComponent/style";
import CustomButton from "components/ui/CustomButton";

const SearchPage = () => {
  return (
    <Container>
      <SearchComponent />
      <Content>
        <h2>
          <span className="blue">Tech</span>
          <span className="red">Check</span>
          <span className="yellow">Point</span>
        </h2>
        <CustomButton
          label="Search Device"
          onClick={() => {}}
          style={{ width: 200, border: "1px solid #dddddd", borderRadius: 10, overflow: 'hidden' }}
        />
      </Content>
    </Container>
  );
};

export default SearchPage;
