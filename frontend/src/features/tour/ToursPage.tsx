import React, {useState} from "react";

import {useHistory, useParams} from "react-router";
import styled from "styled-components/macro";

import {useTours} from "../../api/tour";
import Input from "../../components/Input/Input";
import {Routes} from "../../utils/routes";

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 20px;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TourCard = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
  border-radius: 12px;
  filter: grayscale(0.5);
  box-shadow: var(--shadow);

  &:hover {
    filter: grayscale(0);
    transition: filter 0.2s;
  }
`;

const TourTitle = styled.div`
  z-index: 999;
  padding: 4px 8px;
  border: 1px solid var(--color-sunriseGold);
  background-color: var(--color-sunriseGoldBackground);
  border-radius: 12px;
  font-weight: bold;
`;

const Image = styled.img`
  position: absolute;
  border-radius: 12px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 200px;
  height: 200px;
`;

const NoImage = styled.div`
  position: absolute;
  border-radius: 12px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 200px;
  height: 200px;
`;

const ToursWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const SearchWrapper = styled.div`
  max-width: 200px;
  margin-bottom: 20px;
`;

const ToursPage = () => {
  const [search, setSearch] = useState('');
  const {tours} = useTours();
  const history = useHistory();
  const filteredTours = tours.filter(tour => tour.title.toLowerCase().includes(search.toLowerCase()));

  const openTour = (tourId: string) => {
    history.push(`${Routes.TOUR}/${tourId}`)
  }

  const onSearchTour = (e) => {
    setSearch(e.target.value);
  }

  return (
    <Container>
      <TitleContainer>
        <h2>Passeios</h2>
      </TitleContainer>

      <SearchWrapper>
        <Input name="search" placeholder="Pesquise um passeio..." onChange={onSearchTour} />
      </SearchWrapper>

      <ToursWrapper>
        {filteredTours.map(tour => {
          const image = tour.images[0];

          return (
            <TourCard key={tour._id} onClick={() => openTour(tour._id)}>
              {image ? <Image src={`https://floripatour.herokuapp.com/v1/tour/${image}`} /> : <NoImage />}
              <TourTitle>{tour.title}</TourTitle>
            </TourCard>
          )
        })}
      </ToursWrapper>
    </Container>
  );
}

export default ToursPage;
