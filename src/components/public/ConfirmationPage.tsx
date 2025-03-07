
import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const ConfirmationPage = () => {
  return (
    <Container>
      <Icon>📄</Icon>
      <Title>Thank You</Title>
      <Message>
        Your information was submitted to our team of immigration attorneys. Expect an email from hello@tryalma.ai.
      </Message>
      <Button href="/">Go Back to Homepage</Button>
    </Container>
  );
};

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
  background-color: #fff;
`;

const Icon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const Message = styled.p`
  margin-bottom: 2rem;
`;

const Button = styled(Link)`
  display: inline-block;
  background-color: #000;
  color: #fff;
  padding: 0.75rem 2rem;
  border-radius: 4px;
  text-decoration: none;
`;

export default ConfirmationPage;
