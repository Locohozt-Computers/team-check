import HamBurger from 'components/ui/HamBurger';
import React, { Dispatch, SetStateAction } from 'react'
import { useHistory } from 'react-router'
import { Container } from './style'

type Props = {
    isCollapse: boolean;
    setIsCollapse: Dispatch<SetStateAction<boolean>>
}

const Navbar: React.FC<Props> = ({isCollapse, setIsCollapse}) => {
    const history = useHistory();

    return (
        <Container>
            <HamBurger isCollapse={isCollapse} setIsCollapse={setIsCollapse} />
            <div className="menu">
                <p>John Doe</p>
                <p onClick={() => {
                    localStorage.removeItem("techCheckPoint")
                    history.push('/auth/signin')
                }}>Logout</p>
            </div>
        </Container>
    )
}

export default Navbar
