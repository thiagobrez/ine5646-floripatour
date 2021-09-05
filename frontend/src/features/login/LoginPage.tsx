import React, {useState} from "react";

import { useMutation } from "react-query";
import { useHistory } from "react-router";
import styled from "styled-components/macro";

import Button from '../../components/Button/Button';
import Input from "../../components/Input/Input";
import {useAppContext, UserData} from "../../contexts/AppContext";


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
  justify-content: center;
  padding: 12px;
  box-shadow: var(--shadow);
  border-radius: 12px;
`;

const CardTitle = styled.h3`
  align-self: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin-top: 24px;
`;

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('')
  const history = useHistory();
  const {setLoggedUser} = useAppContext();

  const loginMutation = useMutation<
    UserData,
    Error,
    {username: string; password: string}
    >('LOGIN', async ({username, password}: any) => {
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

  const onLogin = async (e) => {
    e.preventDefault();

    const user = await loginMutation.mutateAsync({username, password});

    if(user) {
      setLoggedUser(user);
      localStorage.setItem('loggedUser', JSON.stringify(user));
      location.reload();
    }
  }

  return (
    <Container>
      <LoginCard>
        <CardTitle>Login</CardTitle>
        <Form onSubmit={onLogin}>
          <Input name="username" placeholder="username" onChange={onChangeUsername}/>
          <Input name="password" placeholder="password" type="password" onChange={onChangePassword}/>
          <Button borderColor="sunriseGold"
                  backgroundColor="sunriseGoldBackground"
                  height={40}
                  style={{marginTop: 24}}
                  type="submit">
            <h4>Entrar</h4>
          </Button>
        </Form>
      </LoginCard>
    </Container>
  );
};

export default LoginPage;
