import styled from "styled-components";

export const Bar = styled.div`
    cursor: pointer;

    .bar_close {
        width: 25px;
        height: 3px;
        border-radius: 6px;
        background-color: #333333;
        margin: 4px 0;

        :nth-child(2) {
            width: 18px;
        }
    }
    .bar_open {
        width: 25px;
        height: 3px;
        border-radius: 6px;
        background-color: #333333;
        margin: 4px 0;

        :nth-child(2) {
            width: 18px;
            margin-left: 7px;
        }
    }
`;