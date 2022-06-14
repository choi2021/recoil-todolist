import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { categoryArrState, ITodo, todoState } from '../atoms';

const Btn = styled.button`
  cursor: pointer;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: rgba(0, 0, 0, 0.3) solid 1.5px;
  padding: 0 0.8em;
`;

const DeleteBtn = styled(Btn)`
  border: none;
`;

const Item = styled.li`
  width: 100%;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.listColor};
  color: black;
  border-radius: 0.5em;
  margin-bottom: 1em;
  &:hover {
    color: white;
    background-color: ${(props) => props.theme.accentColor};
    ${Btn} {
      color: white;
      border: none;
      border-left: white solid 1.5px;
    }
    ${DeleteBtn} {
      border: none;
    }
  }
  span {
    flex: 1 1 50%;
    font-size: 1.2rem;
  }

  ${Btn}:last-child {
    border-radius: 0 0.5em 0.5em 0;
  }
`;

export default function Todo({ text, id, category }: ITodo) {
  const categories = useRecoilValue(categoryArrState);
  const setTodos = useSetRecoilState(todoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;

    if (name === 'DELETE') {
      setTodos((prevTodos) => {
        const newTodos = [...prevTodos].filter((todo) => todo.id !== id);
        localStorage.setItem('todos', JSON.stringify(newTodos));
        return newTodos;
      });

      return;
    }
    setTodos((prevTodos) => {
      const newTodos = [...prevTodos].map((todo) => {
        if (todo.id === id) {
          return { ...todo, category: name as any };
        } else {
          return todo;
        }
      });
      localStorage.setItem('todos', JSON.stringify(newTodos));
      return newTodos;
    });
  };
  return (
    <Item>
      <span>{text}</span>
      <DeleteBtn name='DELETE' onClick={onClick}>
        <FaTrash></FaTrash>
      </DeleteBtn>
      {categories
        .filter((item) => item !== category)
        .map((category) => (
          <Btn name={category} onClick={onClick} key={category}>
            {category}
          </Btn>
        ))}
    </Item>
  );
}
