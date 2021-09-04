import React, {useState} from "react";

import {FormProvider, useForm} from "react-hook-form";
import styled from "styled-components/macro";
import * as yup from 'yup';
import 'yup-phone';

import {yupResolver} from "@hookform/resolvers/yup";
import { Dialog } from "@reach/dialog";

import {useGuides} from "../../api/guide";
import Button from "../../components/Button/Button";
import {InputWithForm} from "../../components/Input/Input";

import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import "@reach/dialog/styles.css";

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const GuideList = styled.div`
  display: flex;
  flex: 1;
  height: 100%;
  flex-direction: column;
  justify-content: flex-start;
`;

const ListHeader = styled.div`
  display: flex;
  align-items: center;
  box-shadow: var(--shadow-soft);
  height: 44px;
`;

const GuideItem = styled.div<{active: boolean}>`
  display: flex;
  align-items: center;
  box-shadow: var(--shadow-soft);
  height: 44px;
  opacity: ${props => props.active ? 1 : 0.5};
`;

const InfoWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  margin-left: 8px;
  overflow: hidden;
  white-space: nowrap;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
`;

const NewGuideDialog = styled(Dialog)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 12px;
`;

const Form = styled.form``

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

const newGuideFormSchema = yup.object().shape({
  name: yup.string().required(),
  username: yup.string().required(),
  password: yup.string().required(),
  registryNumber: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string().phone('BR').required(),
})

const defaultValues = {
  name: '',
  username: '',
  password: '',
  registryNumber: '',
  email: '',
  phone: '',
};

const AdminPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {guides, toggleGuideActiveMutation, createGuideMutation} = useGuides();

  const methods = useForm({
    resolver: yupResolver(newGuideFormSchema),
    defaultValues,
  });
  const {reset, handleSubmit} = methods;

  const openNewGuideDialog = () => {
    setIsOpen(true)
  };

  const closeNewGuideDialog = () => {
    setIsOpen(false);
    reset(defaultValues);
  };

  const toggleGuideActive = (guideId, active) => {
    toggleGuideActiveMutation.mutateAsync({
      guideId,
      active
    })
  }

  const onSubmit = () => {
    handleSubmit((finalValues) => {
      closeNewGuideDialog();
      createGuideMutation.mutateAsync(finalValues);
      toast.success('Guia criado com sucesso!');
    })();
  };

  return (
    <Container>
      <TitleWrapper>
        <h2>Guias cadastrados</h2>
        <Button borderColor="sunriseGold" backgroundColor="sunriseGoldBackground" height={20} onClick={openNewGuideDialog}>
          <h4>Novo guia</h4>
        </Button>
      </TitleWrapper>

      <GuideList>
        <ListHeader>
          <InfoWrapper>
            <h4>Nome</h4>
          </InfoWrapper>
          <InfoWrapper>
            <h4>Número de Registro</h4>
          </InfoWrapper>
          <InfoWrapper>
            <h4>Email</h4>
          </InfoWrapper>
          <InfoWrapper>
            <h4>Telefone</h4>
          </InfoWrapper>
          <InfoWrapper>
            <h4>Usuário</h4>
          </InfoWrapper>
          <InfoWrapper>
            <h4>Ativo</h4>
          </InfoWrapper>
        </ListHeader>
        {guides.map(guide => {
          return (
            <GuideItem key={guide._id} active={guide.active}>
              <InfoWrapper>
                {guide.name}
              </InfoWrapper>
              <InfoWrapper>
                {guide.registryNumber}
              </InfoWrapper>
              <InfoWrapper>
                {guide.email}
              </InfoWrapper>
              <InfoWrapper>
                {guide.phone}
              </InfoWrapper>
              <InfoWrapper>
                {guide.username}
              </InfoWrapper>
              <InfoWrapper>
                  <input type="checkbox" id="active" name="active" value="true" checked={guide.active} onChange={() => toggleGuideActive(guide._id, guide.active)} />
              </InfoWrapper>
            </GuideItem>
          )
        })}
      </GuideList>

      <NewGuideDialog isOpen={isOpen} onDismiss={closeNewGuideDialog}>
        <FormTitleWrapper>
          <h2>Cadastrar novo Guia</h2>
        </FormTitleWrapper>

        <FormProvider {...methods}>
          <Form>
            <InputWithForm name="name" placeholder="Nome" />
            <InputWithForm name="username" placeholder="Usuário" />
            <InputWithForm name="password" placeholder="Senha" type="password" />
            <InputWithForm name="registryNumber" placeholder="Número de registro" type="number"/>
            <InputWithForm name="email" placeholder="Email" />
            <InputWithForm name="phone" placeholder="Telefone" format="phone" />
          </Form>
        </FormProvider>

        <ButtonsWrapper>
          <Button borderColor="warningRed" stretch height={20} onClick={closeNewGuideDialog}>
            <h4>Cancelar</h4>
          </Button>
          <Button borderColor="sunriseGold" backgroundColor="sunriseGoldBackground" stretch height={20} onClick={onSubmit}>
            <h4>Cadastrar</h4>
          </Button>
        </ButtonsWrapper>
      </NewGuideDialog>
    </Container>
  );
};

export default AdminPage;
