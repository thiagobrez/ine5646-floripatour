import React, {useState} from "react";

import {FormProvider, useForm} from "react-hook-form";
import { useMutation } from "react-query";
import { useHistory } from "react-router";
import {toast} from "react-toastify";
import styled from "styled-components/macro";
import * as yup from "yup";

import {yupResolver} from "@hookform/resolvers/yup";
import Dialog from "@reach/dialog";

import {useTourists} from "../../api/tourist";
import Button from '../../components/Button/Button';
import Input, {InputWithForm} from "../../components/Input/Input";
import {useAppContext, UserData} from "../../contexts/AppContext";
import {Routes} from "../../utils/routes";



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

const Link = styled.h5`
  align-self: center;
  color: var(--color-sunriseGold);
  cursor: pointer;
`;

const CreateTouristDialog = styled(Dialog)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 12px;
`;

const FormTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonsWrapper = styled.div`
  align-self: center;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  gap: 8px;
  margin-top: 12px;
`;

const createTouristFormSchema = yup.object().shape({
  name: yup.string().required(),
  username: yup.string().required(),
  password: yup.string().required(),
})

const defaultValues = {
  name: '',
  username: '',
  password: '',
};

const LoginPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('')
  const history = useHistory();
  const {setLoggedUser} = useAppContext();
  const {createTouristMutation} = useTourists();

  const methods = useForm({
    resolver: yupResolver(createTouristFormSchema),
    defaultValues,
  });
  const {reset, handleSubmit} = methods;

  const loginMutation = useMutation<
    UserData,
    Error,
    {username: string; password: string}
    >('LOGIN', async ({username, password}: any) => {
    const res = await fetch('https://floripatour.herokuapp.com/login', {
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

  const openCreateTouristDialog = () => {
    setIsOpen(true);
  }

  const closeCreateTouristDialog = () => {
    setIsOpen(false);
  }

  const onSubmitTourist = (e) => {
    e.preventDefault();

    handleSubmit(async (finalValues) => {
      const user = await createTouristMutation.mutateAsync({
        name: finalValues.name,
        username: finalValues.username,
        password: finalValues.password,
      });

      setLoggedUser(user);
      localStorage.setItem('loggedUser', JSON.stringify(user));
      closeCreateTouristDialog();
      reset(defaultValues);
      toast.success('Turista criado com sucesso!');
      history.push(Routes.TOUR);
    })();

  }

  return (
    <Container>
      <LoginCard>
        <CardTitle>Login</CardTitle>
        <Form onSubmit={onLogin} name="login">
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

        <Link onClick={openCreateTouristDialog}>Turista? Cadastre-se aqui</Link>
      </LoginCard>

      <CreateTouristDialog isOpen={isOpen} onDismiss={closeCreateTouristDialog}>
        <FormTitleWrapper>
          <h2>Cadastrar Turista</h2>
        </FormTitleWrapper>

        <FormProvider {...methods}>
          <Form onSubmit={onSubmitTourist} name="createTourist">
            <InputWithForm name="name" placeholder="Nome" />
            <InputWithForm name="username" placeholder="Usuário" />
            <InputWithForm name="password" placeholder="Senha" type="password"/>

            <ButtonsWrapper>
              <Button borderColor="warningRed" stretch height={20} onClick={closeCreateTouristDialog} type="button">
                <h4>Cancelar</h4>
              </Button>
              <Button borderColor="sunriseGold" backgroundColor="sunriseGoldBackground" stretch height={20} type="submit">
                <h4>Cadastrar</h4>
              </Button>
            </ButtonsWrapper>
          </Form>
        </FormProvider>
      </CreateTouristDialog>
    </Container>
  );
};

export default LoginPage;
