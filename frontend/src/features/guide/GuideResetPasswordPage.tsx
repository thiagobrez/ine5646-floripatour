import React, {useState} from "react";

import {FormProvider, useForm} from "react-hook-form";
import styled from "styled-components/macro";

import 'react-toastify/dist/ReactToastify.css';
import "@reach/dialog/styles.css";
import * as yup from 'yup';

import {yupResolver} from "@hookform/resolvers/yup";

import {useGuides} from "../../api/guide";
import Button from "../../components/Button/Button";
import Input, {InputWithForm} from "../../components/Input/Input";
import {useAppContext} from "../../contexts/AppContext";
import {useHistory} from "react-router";
import {Routes} from "../../utils/routes";

const Container = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ResetPasswordCard = styled.div`
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

const resetPasswordSchema = yup.object().shape({
  password: yup.string().required(),
  passwordConfirmation: yup.string()
    .test('passwords-match', 'Passwords must match', function(value){
      return this.parent.password === value;
    })
});

const defaultValues = {
  password: '',
  passwordConfirmation: '',
}

const GuideResetPasswordPage = () => {
  const {state: {loggedUser}} = useAppContext();
  const {resetPasswordMutation} = useGuides();
  const methods = useForm({
    resolver: yupResolver(resetPasswordSchema),
    defaultValues,
  });
  const {handleSubmit} = methods;
  const history = useHistory();

  const onResetPassword = (e) => {
    e.preventDefault();

    if(loggedUser) {
      handleSubmit((finalValues) => {
        resetPasswordMutation.mutateAsync({
          guideId: loggedUser._id,
          password: finalValues.password,
        })

        history.replace(Routes.GUIDE);
        // location.reload();
      })();
    }
  }

  return (
    <Container>
      <ResetPasswordCard>
        <CardTitle>Redefinir senha</CardTitle>
        <FormProvider {...methods}>
          <Form onSubmit={onResetPassword}>
            <InputWithForm name="password" placeholder="Senha" type="password" />
            <InputWithForm name="passwordConfirmation" placeholder="Confirmar senha" type="password" />
            <Button borderColor="sunriseGold"
                    backgroundColor="sunriseGoldBackground"
                    height={40}
                    style={{marginTop: 24}}
                    type="submit">
              <h4>Confirmar</h4>
            </Button>
          </Form>
        </FormProvider>
      </ResetPasswordCard>
    </Container>
  );
};

export default GuideResetPasswordPage;
