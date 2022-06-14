import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaTimes } from 'react-icons/fa';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { categoryArrState } from '../atoms';

const Container = styled.div`
  background-color: rgba(0, 0, 0, 0.8);
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  background-color: rgb(244, 191, 191);
  max-width: 30rem;
  padding: 1em;
  border-radius: 1em;
  width: 100%;
  height: 30vh;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: white;
`;

const Input = styled.input`
  font-size: 1.5rem;
  padding: 0.25em 0.5em;
  text-align: center;
`;

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1em;
  position: relative;
`;

const Form = styled.form`
  margin-bottom: 1em;
`;

const Btn = styled.button`
  position: absolute;
  right: 0;
  width: rem;
  height: 2rem;
  color: white;
  svg {
    width: 100%;
    height: 100%;
  }
`;

const Btns = styled.ul`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const CategoryBtn = styled.button`
  color: white;
  border: 1px solid white;
  display: flex;
  align-items: center;
  margin-right: 1em;
`;

const Message = styled.div`
  color: white;
  margin-bottom: 1em;
`;

interface IAddForm {
  category: string;
}

interface IAddformProps {
  onClick: () => void;
}

export default function AddCategory({ onClick }: IAddformProps) {
  const { register, handleSubmit, setValue } = useForm<IAddForm>();
  const [errorMessage, setErrorMessage] = useState('');
  const [categories, setCategories] = useRecoilState(categoryArrState);

  const onValid = (data: IAddForm) => {
    const { category } = data;
    setCategories((prevCategories) => {
      if (prevCategories.length === 6) {
        setErrorMessage('카테고리가 이미 많습니다 😅');
        return [...prevCategories];
      }
      if (prevCategories.includes(category)) {
        setErrorMessage('같은 카테고리가 이미 존재합니다 😅');
        return [...prevCategories];
      }
      const newCategories = [...prevCategories, category];
      localStorage.setItem('categories', JSON.stringify(newCategories));
      return newCategories;
    });
    setValue('category', '');
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.currentTarget !== event.target) {
      return;
    }
    console.log(event.currentTarget);
  };

  const onCategoryBtnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: {
        dataset: { value },
      },
    } = event;
    setCategories((prevCategories) => {
      return [...prevCategories].filter((item) => item !== value);
    });
  };

  return (
    <Container onClick={handleClick}>
      <Wrapper>
        <Header>
          <Title>카테고리 추가/삭제</Title>
          <Btn onClick={onClick}>
            <FaTimes></FaTimes>
          </Btn>
        </Header>

        <Form onSubmit={handleSubmit(onValid)}>
          <Input
            {...register('category')}
            type='text'
            placeholder='카테고리를 추가해보세요'
          />
        </Form>
        {errorMessage !== '' && <Message>{errorMessage}</Message>}
        <Btns>
          {categories.map((category) => (
            <CategoryBtn
              key={category}
              data-value={category}
              onClick={onCategoryBtnClick}
            >
              {category} <FaTimes></FaTimes>
            </CategoryBtn>
          ))}
        </Btns>
      </Wrapper>
    </Container>
  );
}
