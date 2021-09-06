import React, {useEffect, useState} from "react";

import {FormProvider, useForm} from "react-hook-form";
import { useHistory } from "react-router";
import {toast} from "react-toastify";
import styled from "styled-components/macro";
import * as yup from "yup";
import 'yup-phone';

import {yupResolver} from "@hookform/resolvers/yup";
import Dialog from "@reach/dialog";

import {useGuides} from "../../api/guide";
import {ReactComponent as LogoutSVG} from '../../assets/svg/log-out-outline.svg'
import {ReactComponent as PersonSVG} from '../../assets/svg/person-circle-outline.svg'
import { useAppContext } from "../../contexts/AppContext";
import { Routes } from "../../utils/routes";
import Button from "../Button/Button";
import {InputWithForm} from "../Input/Input";


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

const IconsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
`;

const IconButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const LogoutIcon = styled(LogoutSVG)`
    width: 24px;
`;

const PersonIcon = styled(PersonSVG)`
    width: 24px;
`;

const EditGuideDialog = styled(Dialog)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 12px;
`;

const Form = styled.form``;

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

const editGuideFormSchema = yup.object().shape({
  name: yup.string().required(),
  username: yup.string().required(),
  registryNumber: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string().phone('BR').required(),
})

const defaultValues = {
  name: '',
  username: '',
  registryNumber: '',
  email: '',
  phone: '',
};

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();
  const {state: {loggedUser}, setLoggedUser} = useAppContext();
  const {updateGuideMutation} = useGuides();

  const methods = useForm({
    resolver: yupResolver(editGuideFormSchema),
    defaultValues,
  });
  const {reset, handleSubmit} = methods;

  useEffect(() => {
    if(loggedUser) {
      reset({
        ...loggedUser
      })
    }
  }, [loggedUser])

  const openEditGuideDialog = () => {
    setIsOpen(true)
  };

  const closeEditGuideDialog = () => {
    setIsOpen(false);
  };

  const logout = () => {
    setLoggedUser(undefined);
    localStorage.removeItem('loggedUser');
    history.replace(Routes.LOGIN);
  }

  const onSubmit = (e) => {
    e.preventDefault();

    handleSubmit((finalValues) => {
      updateGuideMutation.mutateAsync({
        guideId: loggedUser?._id,
        update: {
          ...finalValues,
        }
      });

      toast.success('Dados editados com sucesso!');
      closeEditGuideDialog();
    })();
  }

  return (
      <Container>
          <LogoWrapper>
              <h2>Floripa Tour</h2>
          </LogoWrapper>

          <IconsWrapper>
            {loggedUser?.isGuide && (
              <IconButton onClick={openEditGuideDialog}>
                <PersonIcon />
              </IconButton>
            )}

            {!!loggedUser && (
              <IconButton onClick={logout}>
                <LogoutIcon />
              </IconButton>
            )}
          </IconsWrapper>

        <EditGuideDialog isOpen={isOpen} onDismiss={closeEditGuideDialog}>
          <FormTitleWrapper>
            <h2>Editar dados</h2>
          </FormTitleWrapper>

          <FormProvider {...methods}>
            <Form onSubmit={onSubmit}>
              <InputWithForm name="name" placeholder="Nome" />
              <InputWithForm name="username" placeholder="Usuário" />
              <InputWithForm name="registryNumber" placeholder="Número de registro" type="number"/>
              <InputWithForm name="email" placeholder="Email" />
              <InputWithForm name="phone" placeholder="Telefone" format="phone" />

              <ButtonsWrapper>
                <Button borderColor="warningRed" stretch height={20} onClick={closeEditGuideDialog} type="button">
                  <h4>Cancelar</h4>
                </Button>
                <Button borderColor="sunriseGold" backgroundColor="sunriseGoldBackground" stretch height={20} type="submit">
                  <h4>Cadastrar</h4>
                </Button>
              </ButtonsWrapper>
            </Form>
          </FormProvider>
        </EditGuideDialog>
      </Container>
  );
}

export default Header;
