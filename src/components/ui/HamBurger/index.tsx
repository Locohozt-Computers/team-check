import React, { Dispatch, SetStateAction } from 'react'

import { Bar } from './style'

type Props = {
    isCollapse: boolean;
    setIsCollapse: Dispatch<SetStateAction<boolean>>
}

const HamBurger: React.FC<Props> = ({isCollapse, setIsCollapse}) => {
    return (
        <Bar onClick={() => setIsCollapse(!isCollapse)}>
            <div className={isCollapse ? "bar_close" : "bar_open"}></div>
            <div className={isCollapse ? "bar_close" : "bar_open"}></div>
            <div className={isCollapse ? "bar_close" : "bar_open"}></div>
        </Bar>
    )
}

export default HamBurger
