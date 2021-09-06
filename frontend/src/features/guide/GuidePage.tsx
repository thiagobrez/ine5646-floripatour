import React, {useState} from "react";

import DatePicker from 'react-datepicker';
import {FormProvider, useForm} from "react-hook-form";
import {useHistory} from "react-router";
import { toast } from 'react-toastify';
import styled from "styled-components/macro";
import * as yup from 'yup';
import 'yup-phone';

import {yupResolver} from "@hookform/resolvers/yup";
import { Dialog } from "@reach/dialog";

import {useTours} from "../../api/tour";
import Button from "../../components/Button/Button";
import {InputWithForm} from "../../components/Input/Input";

import "react-datepicker/dist/react-datepicker.css";
import 'react-toastify/dist/ReactToastify.css';
import "@reach/dialog/styles.css";

import {Routes} from "../../utils/routes";

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

const TourItem = styled.div<{active: boolean}>`
  display: flex;
  align-items: center;
  box-shadow: var(--shadow-soft);
  height: 44px;
  opacity: ${props => props.active ? 1 : 0.5};

  &:hover {
    background-color: var(--color-sunriseGoldBackground);
    transition: background-color 0.2s;
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  margin-left: 8px;
  overflow: hidden;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
`;

const NewTourDialog = styled(Dialog)`
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

const newTourFormSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  images: yup.array().of(yup.string()),
  startLocation: yup.string().required(),
  endLocation: yup.string().required(),
  startTime: yup.string().required(),
  endTime: yup.string().required(),
  minTourists: yup.number().required(),
  maxTourists: yup.number().required(),
  availableDates: yup.array().of(yup.number()),
  price: yup.number().required(),
})

const defaultValues = {
  title: '',
  description: '',
  images: [],
  startLocation: '',
  endLocation: '',
  startTime: '',
  endTime: '',
  minTourists: 0,
  maxTourists: 0,
  availableDates: [],
  price: 0,
};

const GuidePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const {tours, toggleTourActiveMutation, createTourMutation} = useTours();
  const history = useHistory();

  const methods = useForm({
    resolver: yupResolver(newTourFormSchema),
    defaultValues,
  });
  const {reset, handleSubmit, setValue, register} = methods;

  register('availableDates');

  const openNewTourDialog = () => {
    setIsOpen(true)
  };

  const closeNewTourDialog = () => {
    setIsOpen(false);
    reset(defaultValues);
  };

  const toggleTourActive = (tourId, active) => {
    toggleTourActiveMutation.mutateAsync({
      tourId,
      active
    })
  }

  const onChangeAvailableDates = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    setValue('availableDates', [start?.getTime() ?? 0, end?.getTime() ?? 0]);
  };

  const openTour = (tourId: string) => {
    history.push(`${Routes.TOUR}/${tourId}`);
  }

  const onSubmit = (e) => {
    e.preventDefault();

    handleSubmit((finalValues) => {
      const formData = new FormData();

      for(const key in finalValues) {
        if(Array.isArray(finalValues[key])) {
          finalValues[key].forEach(value => formData.append(key + '[]', value));
        } else {
          formData.append(key, finalValues[key]);
        }
      }

      const files = document.getElementById("files") as any;
      if(files) {
        for(let i=0; i < files.files.length; i++) {
          formData.append("files", files.files[i]);
        }
      }

      closeNewTourDialog();
      createTourMutation.mutateAsync(formData);
      toast.success('Passeio criado com sucesso!');
    })();
  };

  return (
    <Container>
      <TitleWrapper>
        <h2>Passeios cadastrados</h2>
        <Button borderColor="sunriseGold" backgroundColor="sunriseGoldBackground" height={20} onClick={openNewTourDialog}>
          <h4>Novo passeio</h4>
        </Button>
      </TitleWrapper>

      <GuideList>
        <ListHeader>
          <InfoWrapper>
            <h4>Título</h4>
          </InfoWrapper>
          <InfoWrapper>
            <h4>Local de saída</h4>
          </InfoWrapper>
          <InfoWrapper>
            <h4>Local de chegada</h4>
          </InfoWrapper>
          <InfoWrapper>
            <h4>Horário</h4>
          </InfoWrapper>
          <InfoWrapper>
            <h4>Min / Max Turistas</h4>
          </InfoWrapper>
          <InfoWrapper>
            <h4>Datas</h4>
          </InfoWrapper>
          <InfoWrapper>
            <h4>Preço</h4>
          </InfoWrapper>
          <InfoWrapper>
            <h4>Ativo</h4>
          </InfoWrapper>
        </ListHeader>
        {tours.map(tour => {
          return (
            <TourItem key={tour._id} active={tour.active} onClick={() => openTour(tour._id)}>
              <InfoWrapper>
                {tour.title}
              </InfoWrapper>
              <InfoWrapper>
                {tour.startLocation}
              </InfoWrapper>
              <InfoWrapper>
                {tour.endLocation}
              </InfoWrapper>
              <InfoWrapper>
                {tour.startTime} - {tour.endTime}
              </InfoWrapper>
              <InfoWrapper>
                {tour.minTourists} / {tour.maxTourists}
              </InfoWrapper>
              <InfoWrapper>
                {tour.availableDates.map((timestamp, index, array) => {
                  const date = new Date(timestamp);
                  const day = date.getDate();
                  const month = date.getMonth() + 1;
                  let formatted = `${day}/${month}`;
                  if(index !== array.length - 1) {
                    formatted = `${formatted}, `;
                  }

                  return formatted;
                })}
              </InfoWrapper>
              <InfoWrapper>
                R${tour.price}
              </InfoWrapper>
              <InfoWrapper>
                <input type="checkbox" id="active" name="active" value="true" checked={tour.active} onChange={() => toggleTourActive(tour._id, tour.active)} />
              </InfoWrapper>
            </TourItem>
          )
        })}
      </GuideList>

      <NewTourDialog isOpen={isOpen} onDismiss={closeNewTourDialog}>
        <FormTitleWrapper>
          <h2>Cadastrar novo Passeio</h2>
        </FormTitleWrapper>

        <FormProvider {...methods}>
          <Form onSubmit={onSubmit} encType='multipart/form-data'>
            <input type="file" id="files" name="files" multiple accept="image/png, image/jpeg"/>

            <InputWithForm name="title" placeholder="Título" />
            <InputWithForm name="description" placeholder="Descrição" />
            <InputWithForm name="startLocation" placeholder="Local de saída" />
            <InputWithForm name="endLocation" placeholder="Local de chegada" />
            <InputWithForm name="startTime" placeholder="Horário de saída" />
            <InputWithForm name="endTime" placeholder="Horário de chegada" />
            <InputWithForm name="minTourists" placeholder="Mínimo de turistas" />
            <InputWithForm name="maxTourists" placeholder="Máximo de turistas" />
            <InputWithForm name="price" placeholder="Preço" />

            <DatePicker
              selected={startDate}
              onChange={onChangeAvailableDates}
              startDate={startDate}
              endDate={endDate}
              selectsRange
              inline
            />

            <ButtonsWrapper>
              <Button borderColor="warningRed" stretch height={20} onClick={closeNewTourDialog} type="button">
                <h4>Cancelar</h4>
              </Button>
              <Button borderColor="sunriseGold" backgroundColor="sunriseGoldBackground" stretch height={20} type="submit">
                <h4>Cadastrar</h4>
              </Button>
            </ButtonsWrapper>
          </Form>
        </FormProvider>
      </NewTourDialog>
    </Container>
  );
};

export default GuidePage;
