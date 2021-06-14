import styled from "styled-components";

export const DropdownContainer = styled.div`
    background-color: white;
    position: absolute;
    top: 30px;
    right: 0;
    z-index: 3;
    border: 1px solid #eeeeee;

    p {
        margin: 0;
        padding: 10px;
        text-align: left;
        cursor: pointer;

        :hover {
            background-color: #f1f1f7;
        }
    }
`;