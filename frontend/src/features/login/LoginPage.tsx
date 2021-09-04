import React, {useState} from "react";

import { useMutation } from "react-query";
import { useHistory } from "react-router";
import styled from "styled-components/macro";

import Button from '../../components/Button/Button';
import Input from "../../components/Input/Input";
import { useAppContext } from "../../contexts/AppContext";


const Container = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginCard = styled.div`
  height: 400px;
  width: 350px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 12px;
  box-shadow: var(--shadow);
  border-radius: 12px;
`;

const CardTitle = styled.h3`
  align-self: center;
`;

const DoubleInputWrapper = styled.div`

`;

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('')
  const history = useHistory();
  const {setLoggedUser} = useAppContext();

  const loginMutation = useMutation('LOGIN', async ({username, password}: any) => {
    const res = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        })
    });

    const {user} = await res.json();
    return user;
  });

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  }

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  }

  const onLogin = async () => {
    const user = await loginMutation.mutateAsync({username, password});

    if(user) {
      setLoggedUser(user);
      localStorage.setItem('loggedUser', JSON.stringify(user));
      history.push('/');
    }
  }

  return (
    <Container>
      <LoginCard>
        <CardTitle>Login</CardTitle>
        <DoubleInputWrapper>
        <Input name="username" placeholder="username" onChange={onChangeUsername}/>
        <Input name="password" placeholder="password" type="password" onChange={onChangePassword}/>
        </DoubleInputWrapper>
        <Button borderColor="sunriseGold" backgroundColor="sunriseGoldBackground" height={30} onClick={onLogin}>
          <h4>Entrar</h4>
        </Button>
      </LoginCard>
    </Container>
  );
};

export default LoginPage;
