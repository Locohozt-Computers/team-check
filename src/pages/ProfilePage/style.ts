import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  height: 84vh;

  @media(max-width: 768px) {
    grid-template-columns: 1fr;
    height: 88vh;
    overflow-y: auto;
  }
`;
export const Left = styled.div`
  background-color: white;
  display: grid;
  grid-template-rows: 50% 50%;
  gap: 10px;
  height: 83vh;
  overflow-y: auto;

  @media(max-width: 768px) {
    grid-template-columns: 1fr;
    height: 70vh;
    overflow-y: hidden;
  }
`;
export const Right = styled.div`
  display: grid;
  grid-template-rows: 40% 60%;
  gap: 10px;
  height: 84vh;
  overflow-y: auto;

  @media(max-width: 768px) {
    grid-template-columns: 1fr;
    height: 80vh;
    overflow-y: hidden;
  }

  @media(max-width: 400px) {
    grid-template-columns: 1fr;
    height: 100vh;
    overflow-y: hidden;
  }
`;
export const First = styled.div`
  background-color: white;
  border-radius: 8px;
`;
export const Second = styled.div``;
export const Image = styled.div`
  height: 300px;
  text-align: center;
`;
export const Profile = styled.div`
  padding: 40px;

  h1 {
    margin-bottom: 30px;
  }

  p{
    padding: 10px 0;
  }
`;