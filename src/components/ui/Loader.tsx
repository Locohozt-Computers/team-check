import React from 'react'
import styled from 'styled-components'
import Spinner from 'react-loader-spinner'

type LProps = {
  size?: number,
  type?: "Circles" | "Rings" | "Oval" | "Hearts" | "TailSpin" | "BallTriangle";
  height?: number;
  width?: number;
  style?: object;
}

const Loader = ({
  size = 150,
  width = 80, 
  height = 80, 
  type = "Oval",
  style,
}: LProps) => {
  return (
    <Loading size={size} style={style}>
      {/* <Spin size={props.size} /> */}
      <Spinner
        type={type}
        color={'red'}
        height={height}
        width={width}
        timeout={200000}
      />
    </Loading>
  )
}

const Loading = styled.div<{size: number}>`
 display: flex;
 justify-content: center;
 align-items: center;
 height: ${({size}) => size && `${size}px`};
 margin-top: 20px;
`

export default Loader
