import React from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { categoryState, todoState } from '../atoms';

const Form = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Input = styled.input`
  padding: 0.5em 1.5em;
  text-align: center;
  font-size: 1.2rem;
  width: 100%;
  border-radius: 0.5em 0 0 0.5em;
`;

const Btn = styled.button`
  border-radius: 0 0.5em 0.5em 0;
  background-color: lightgray;
  height: 3rem;
`;

interface IForm {
  todo: string;
}

export default function CreateTodo() {
  const category = useRecoilValue(categoryState);
  const setTodos = useSetRecoilState(todoState);
  const { handleSubmit, register, setValue } = useForm<IForm>();
  const onValid = (data: IForm) => {
    const { todo } = data;
    const newTodo = {
      id: Date.now(),
      text: todo,
      category: category,
    };
    setTodos((prevTodos) => {
      const newTodos = [...prevTodos, newTodo];
      const strTodos = JSON.stringify(newTodos);
      localStorage.setItem('todos', strTodos);
      return newTodos;
    });

    setValue('todo', '');
  };
  return (
    <Form onSubmit={handleSubmit(onValid)}>
      <Input
        {...register('todo')}
        placeholder={'오늘할일을 알려주세요😁'}
      ></Input>
      <Btn>Add</Btn>
    </Form>
  );
}
