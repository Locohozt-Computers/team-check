import React from "react";
import SearchComponent from "components/SearchComponent";
import { Content, Container } from "components/SearchComponent/style";
import CustomButton from "components/ui/CustomButton";
import InputWithLabel from "components/ui/InputWithLabel";

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
        <InputWithLabel
          showIcon={true}
          noLabel={true}
          onChange={() => {}}
          placeholder="Search for a device..."
          style={{ width: "50%", marginBottom: 20 }}
        />
        <CustomButton
          label="Search Device"
          onClick={() => {}}
          style={{
            width: 200,
            border: "1px solid #dddddd",
            borderRadius: 10,
            overflow: "hidden",
          }}
        />
      </Content>
    </Container>
  );
};

export default SearchPage;
