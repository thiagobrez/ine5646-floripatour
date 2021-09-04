import React from "react";

import {ReactComponent as LogoutSVG} from '../../assets/svg/log-out-outline.svg'

import styled from "styled-components/macro";
import { useHistory } from "react-router";
import { Routes } from "../../utils/routes";
import { useAppContext } from "../../contexts/AppContext";

const Container = styled.header`
    height: 64px;
    display: flex;
    justify-content: space-between;
    padding: 0 8px;
    background-color: var(--color-white);
    box-shadow: var(--shadow);
`;

const LogoWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const LogoutButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const LogoutIcon = styled(LogoutSVG)`
    width: 24px;
`;

const Header = () => {
    const history = useHistory();
    const {state: {loggedUser}, setLoggedUser} = useAppContext();

    const logout = () => {
        setLoggedUser(undefined);
        localStorage.removeItem('loggedUser');
        history.replace(Routes.LOGIN);
    }

    return (
        <Container>
            <LogoWrapper>
                <h2>Floripa Tour</h2>
            </LogoWrapper>

            {!!loggedUser && (
                <LogoutButton onClick={logout}>
                    <LogoutIcon />
                </LogoutButton>
            )}
        </Container>
    );
}

export default Header;