import { atom, selector } from 'recoil';

export interface ITodo {
  category: string;
  id: number;
  text: string;
}

export const categoryArrState = atom({
  key: 'categoryArr',
  default: ['TODO', 'DOING', 'DONE'],
});
export const categoryState = atom({
  key: 'category',
  default: 'TODO',
});

export const todoState = atom<ITodo[]>({
  key: 'todos',
  default: [],
});

export const todoSelctor = selector({
  key: 'todoSelector',
  get: ({ get }) => {
    const todos = get(todoState);
    const category = get(categoryState);
    return todos.filter((todo) => todo.category === category);
  },
});
