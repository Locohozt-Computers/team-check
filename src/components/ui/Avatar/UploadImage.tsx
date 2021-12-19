import React from "react";
import styled from "styled-components";

import avatar from "assets/images/unisex.jpeg";
import Loader from "../Loader";

type Props = {
  imageUrl: string;
  loading: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const UploadImage: React.FC<Props> = ({ onChange, imageUrl, loading }) => {
  return (
    <UploadStyle>
      <Label htmlFor="upload">
        {loading ? (
          <Loader
            type="Oval"
            size={20}
            width={40}
            height={40}
            style={{
              position: "absolute",
              top: "40%",
              left: "45%",
              translateX: "-50%",
              translateY: "-50%",
            }}
          />
        ) : (
          <i className="fas fa-file-upload" />
        )}
        <input type="file" onChange={onChange} id="upload" />
      </Label>
      <div
        style={{
          height: "100%",
          width: "100%",
          overflow: "hidden",
        }}
      >
        {imageUrl ? (
          <img src={imageUrl} alt="avatar" width="70%" />
        ) : (
          <img src={avatar} alt="avatar" width="70%" />
        )}
      </div>
    </UploadStyle>
  );
};

const UploadStyle = styled.div`
  position: relative;
  height: 300px;
`;

const Label = styled.label`
  i {
    font-size: 80px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    cursor: pointer;
  }
  input {
    display: none;
  }
`;

export default UploadImage;
