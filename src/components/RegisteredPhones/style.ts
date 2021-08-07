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

export const FormStyle = styled.form`
  .select {
    .css-yk16xz-control {
      border: 1px solid #ebeaeb;
    }
  }

  .active {
    .css-yk16xz-control {
      border: 1px solid #ebeaeb;

      .css-1wa3eu0-placeholder {
        color: black;
      }
    }
  }
`;

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

export const Images = styled.div`
  display: flex;
`;

export const PhotoLists = styled.div`
  display: flex;
  max-width: 100%;
  align-items: center;
  margin-left: 20px;
  overflow-x: auto;

  .img_div {
    position: relative;

    .fa-times {
      position: absolute;
      right: 10px;
      top: 0px;
      font-size: 23px;
      z-index: 10;
      color: white;
      cursor: pointer;
    }
  }

  .img_loading {
    width: 80px;
    height: 80px;
    border-radius: 4px;
    background-color: #888888;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  img {
    width: 80px;
    height: 80px;
    border-radius: 4px;
    margin-right: 8px;
  }
`;

export const AddPhoto = styled.label`
  width: 80px;
  height: 80px;
  border-radius: 50px;
  border: 3px solid #ebeaeb;
  display: flex;
  justify-content: center;
  align-items: center;

  i {
    font-size: 30px;
    color: #aaaaaa;
  }

  input {
    display: none;
  }
`;

export const PhoneListStyle = styled.div<{ status?: boolean }>`
  display: grid;
  grid-template-columns: 150px 1fr;
  gap: 10px;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #eeeeee;
  cursor: pointer;

  .image {
    width: 120px;
    height: 120px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h1 {
      margin-bottom: 0;
    }

    .price {
      font-weight: bold;
      font-size: 17px;
      color: green;
    }
  }

  .transaction_type {
    /* width: 25px;
    height: 25px; */
    border-radius: 4px;
    /* background-color: ${({ status }) => (status ? "green" : "red")}; */
    /* color: white; */
    line-height: 25px;
    /* text-align: center; */
  }

  .transaction_amount {
    color: #5e667f;
  }

  .transaction_description {
    color: #3f4868;
  }

  .transaction_date {
    color: #3f4868;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;
