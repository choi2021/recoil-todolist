import React, { useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import {
  categoryArrState,
  categoryState,
  ITodo,
  todoSelctor,
  todoState,
} from '../atoms';
import CreateTodo from './CreateTodo';
import Todo from './Todo';
import { FaPlus } from 'react-icons/fa';
import AddCategory from './AddCategory';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  text-align: center;
`;

const Wrapper = styled.div`
  max-width: 40rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1em;
  position: relative;
`;

const AddBtn = styled(FaPlus)`
  position: absolute;
  left: 0;
  width: 3rem;
  height: 3rem;
  cursor: pointer;
  transform: rotateZ(45deg);
  transition: ease-in 0.3s transform;
  &:hover {
    transform: rotateZ(0);
  }
`;

const Select = styled.select`
  position: absolute;
  height: 2rem;
  font-size: 1rem;
  right: 0;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
`;

const List = styled.ul`
  width: 100%;
  padding-top: 1em;
`;

export default function TodoList() {
  const todos = useRecoilValue(todoSelctor);
  const setCategory = useSetRecoilState(categoryState);
  const categroies = useRecoilValue(categoryArrState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setCategory(value as any);
  };
  const [clicked, setClicked] = useState(false);
  const onClick = () => {
    setClicked(!clicked);
  };

  return (
    <Container>
      <Wrapper>
        <Header>
          <AddBtn onClick={onClick}></AddBtn>
          <Title>TODOS</Title>
          <Select onInput={onInput} defaultValue=''>
            {categroies.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Select>
        </Header>
        <CreateTodo></CreateTodo>
        <List>
          {todos.map((todo) => (
            <Todo key={todo.id} {...todo}></Todo>
          ))}
        </List>
      </Wrapper>
      {clicked && <AddCategory onClick={onClick} />}
    </Container>
  );
}
