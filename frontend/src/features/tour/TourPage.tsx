import React, {useState} from "react";

import {useParams} from "react-router";
import styled from "styled-components/macro";

import {useTours} from "../../api/tour";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import {useAppContext} from "../../contexts/AppContext";

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-x: auto;
  min-height: 200px;
  gap: 8px;
`;

const Image = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 12px;
`;

const ContentContainer = styled.div``;

const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 64px;
  box-shadow: var(--shadow-soft);
  padding: 0 12px;
`;

const CommentsContainer = styled.div``;

const TourCommment = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  box-shadow: var(--shadow-soft);
  padding: 12px;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 400px;
  margin-top: 20px;
  gap: 8px;
`;

const TourPage = () => {
  const {tourId} = useParams<{tourId: string}>();
  const [comment, setComment] = useState('');
  const {tours, createTourCommentMutation} = useTours();
  const tour = tours.find(tour => tour._id === tourId);
  const {state: {loggedUser}} = useAppContext();

  if(!tour) return null;

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    return `${day}/${month}`;
  }

  const onChangeComment = (e) => {
    setComment(e.target.value);
  }

  const onSendComment = () => {
    createTourCommentMutation.mutateAsync({
      tourId,
      userId: loggedUser?._id,
      text: comment,
    });

    setComment('');
  }

  return (
    <Container>
      <TitleContainer>
        <h2>{tour.title}</h2>
      </TitleContainer>

      <ImageContainer>
        {tour.images.map(image => (
          <Image key={image} src={`https://floripatour.herokuapp.com/v1/tour/${image}`} />
        ))}
      </ImageContainer>

      <ContentContainer>
        <InfoWrapper>
          Descrição: {tour.description}
        </InfoWrapper>
        <InfoWrapper>
          Local de saída: {tour.startLocation}
        </InfoWrapper>
        <InfoWrapper>
          Local de chegada: {tour.endLocation}
        </InfoWrapper>
        <InfoWrapper>
          Horário de saída: {tour.startTime}
        </InfoWrapper>
        <InfoWrapper>
          Horário de chegada: {tour.endTime}
        </InfoWrapper>
        <InfoWrapper>
          Mínimo de turistas: {tour.minTourists}
        </InfoWrapper>
        <InfoWrapper>
          Máximo de turistas: {tour.maxTourists}
        </InfoWrapper>
        <InfoWrapper>
          Datas disponíveis: {formatDate(tour.availableDates[0])} - {formatDate(tour.availableDates[1])}
        </InfoWrapper>
        <InfoWrapper>
          Preço: {tour.price}
        </InfoWrapper>
      </ContentContainer>

      <TitleContainer>
        <h2>Comentários</h2>
      </TitleContainer>

      <CommentsContainer>
        {tour.comments.map(comment => (
          <TourCommment key={comment._id}>
            <b>{(comment.userId as any).name}</b>: {comment.text}
          </TourCommment>
        ))}

        <InputWrapper>
          <Input name="tourComment" placeholder="Insira um comentário..." value={comment} onChange={onChangeComment}/>
          <Button borderColor="sunriseGold" backgroundColor="sunriseGoldBackground" height={64} onClick={onSendComment}>
            <h4>Enviar</h4>
          </Button>
        </InputWrapper>
      </CommentsContainer>
    </Container>
  );
}

export default TourPage;
