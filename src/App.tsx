import { useCallback, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import './App.css';
import { categoryArrState, todoState } from './atoms';
import TodoList from './component/TodoList';

import Reset from './Reset';

function App() {
  const setTodos = useSetRecoilState(todoState);
  const setCategoriesArr = useSetRecoilState(categoryArrState);
  const getTodos = useCallback(() => {
    const strTodos = localStorage.getItem('todos');
    if (!strTodos) {
      return;
    } else {
      const todos = JSON.parse(strTodos);
      setTodos(todos);
    }
  }, [setTodos]);

  const getCategories = useCallback(() => {
    const strCategories = localStorage.getItem('categories');
    if (!strCategories) {
      return;
    } else {
      const categories = JSON.parse(strCategories);
      setCategoriesArr(categories);
    }
  }, [setCategoriesArr]);

  useEffect(() => {
    getTodos();
    getCategories();
  }, [getCategories, getTodos]);
  return (
    <>
      <Reset />
      <TodoList />
    </>
  );
}

export default App;
