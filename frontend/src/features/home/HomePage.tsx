import React, {useState} from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router";
import styled from "styled-components/macro";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";


const Container = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HomePage = () => {
  return (
    <Container>
      <h1>HOME</h1>
    </Container>
  );
};

export default HomePage;
