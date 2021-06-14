import React from "react";
import AuthNavbar from "components/layouts/AuthNavbar";
import CustomButton from "components/ui/CustomButton";
import InputWithLabel from "components/ui/InputWithLabel";
import { Container, Content } from "./style";

const SearchComponent = () => {
  return (
    <Container>
      <AuthNavbar />
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
          style={{ maxWidth: 600, width: "100%", marginBottom: 20 }}
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

export default SearchComponent;
