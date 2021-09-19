import React, { useState } from "react";
import styled, { CSSProperties } from "styled-components";

type Props = {
  label?: string;
  tags: string[];
  setTags: any;
  style?: CSSProperties;
  key?: number;
};

const CustomInputTag = ({ label, tags, setTags, style, key }: Props) => {
  const [overlay, setOverLay] = useState<any>(false);
  const [input, setInput] = useState<any>("");
  const [isKeyReleased, setIsKeyReleased] = useState(false);

  const onKeyDown = (e: any) => {
    const { key } = e;
    const trimmedInput = input.trim();

    if (key === "," && trimmedInput.length && !tags.includes(trimmedInput)) {
      e.preventDefault();
      setTags((prevState: string[]) => [...prevState, trimmedInput]);
      setInput("");
    }

    if (key === "Backspace" && !input.length && tags.length && isKeyReleased) {
      const tagsCopy = [...tags];
      const poppedTag = tagsCopy.pop();
      e.preventDefault();
      setTags(tagsCopy);
      setInput(poppedTag);
    }

    setIsKeyReleased(false);
  };

  const onKeyUp = () => {
    setIsKeyReleased(true);
  };

  const deleteTag = (index: number) => {
    setTags((prevState: any) =>
      prevState.filter((tag: string, i: number) => i !== index)
    );
  };

  const onChange = (e: any) => {
    const { value } = e.target;
    setInput(value);
  };

  return (
    <Wrapper style={style}>
      <div className="label_div">
        <span>{label ? label : ""}</span>
        <div className="label_div_icon">
          <div
            className="label_div_inner_icon"
            onMouseOver={() => setOverLay(true)}
            onMouseOut={() => setOverLay(false)}
          >
            <i className="fas fa-info"></i>
          </div>
          {overlay && (
            <div className="overlay">
              click the comma to enter multiple text!
            </div>
          )}
        </div>
      </div>
      <Container className="container">
        {tags.map((tag, index) => (
          <div className="tag">
            {tag}
            <button onClick={() => deleteTag(index)}>x</button>
          </div>
        ))}
        <input
          value={input}
          placeholder="Enter a tag"
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          onChange={onChange}
        />
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .label_div {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .label_div_icon {
      position: relative;

      .label_div_inner_icon {
        border: 1px solid #cccccc;
        width: 20px;
        height: 20px;
        border-radius: 50px;
        text-align: center;
        line-height: 20px;
        cursor: pointer;

        i {
          color: #777777;
        }
      }

      .overlay {
        position: absolute;
        top: 0;
        right: 25px;
        width: 200px;
        background-color: rgba(0, 0, 0, 0.5);
        color: white;
        padding: 15px;
        border-radius: 8px;
      }
    }
  }
`;
const Container = styled.div`
  display: flex;
  overflow: scroll;
  width: 100%;
  max-width: 100%;
  border: 1px solid #dddddd;
  border-radius: 5px;
  color: black;
  padding: 0;

  input {
    width: 100%;
    min-width: 50%;
    border: none;
    border-radius: 5px;
    padding: 14px;
    padding-left: 14px;
  }

  .tag {
    display: flex;
    align-items: center;
    margin: 7px 0;
    margin-right: 10px;
    padding: 0 5px;
    border: 1px solid orange;
    border-radius: 5px;
    background-color: orange;
    white-space: nowrap;
    color: white;

    button {
      display: flex;
      padding: 6px;
      border: none;
      background-color: unset;
      cursor: pointer;
      color: white;
    }
  }
`;

export default CustomInputTag;
