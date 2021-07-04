import styled from "styled-components";

export const Section = styled.div`
  padding: 40px 0;
  background: #fff;
  font-family: "Arvo", serif;
  width: 70%;
  height: 100vh;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;

  .four_zero_four_bg {
    padding: 10%;
    background-image: url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif);
    height: 400px;
    background-position: center;
  }

  .four_zero_four_bg h1 {
    font-size: 80px;
  }

  .four_zero_four_bg h3 {
    font-size: 80px;
  }

  .link_404 {
    color: #fff !important;
    padding: 10px 20px;
    background: #39ac31;
    margin: 20px 0;
    display: inline-block;
  }
  .contant_box_404 {
    margin-top: -50px;
  }
`;
