import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 84vh;
  padding: 2% 5%;
  overflow-y: auto;
  background-color: white;

  .register_title {
    display: flex;
    align-items: center;
  }

  .pr {
    padding-right: 10px;
  }

  .pl {
    padding-left: 10px;
  }

  @media (max-width: 768px) {
    height: 86vh;

    .pr {
      padding-right: 0;
      margin-bottom: 20px;
    }

    .pl {
      padding-left: 0;
    }
  }
`;

export const FormStyle = styled.form``;

export const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;

  button {
    outline: none;
    border: none;
    padding: 10px 20px;
    border-radius: 8px;
    background-color: dodgerblue;
    color: white;
    cursor: pointer;

    span {
      margin-left: 10px;
    }

    @media (max-width: 768px) {
      padding: 5px 10px;

      span {
        display: none;
      }
    }
  }
`;

export const Content = styled.div`
  width: 100%;

  h2 {
    text-align: center;
    padding-top: 15%;
    color: #777777;
  }
`;
