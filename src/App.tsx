import React from 'react';

import { Header, TodoPanel, TodoList } from './components';

import styles from './App.module.css';

const DEFAULT_TODO_LIST = [
  { id: 1, name: 'Task 1', description: 'Сделать простой дизайн', checked: false },
  { id: 2, name: 'Task 2', description: 'Сделать функционал', checked: false },
  {
    id: 3,
    name: 'Task 3',
    description: 'Сделать пуш проекта',
    checked: true
  }
];

export const App = () => {
  const [todoIdForEdit, setTodoIdForEdit] = React.useState<number | null>(null);
  const [todos, setTodos] = React.useState(DEFAULT_TODO_LIST);

  const selectTodoIdForEdit = (id: Todo['id']) => {
    setTodoIdForEdit(id);
  };

  const deleteTodo = (id: Todo['id']) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const addTodo = ({ name, description }: Omit<Todo, 'id' | 'checked'>) => {
    setTodos([...todos, { id: todos[todos.length - 1].id + 1, description, name, checked: false }]);
  };

  const checkTodo = (id: Todo['id']) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, checked: !todo.checked };
        }
        return todo;
      })
    );
  };

  const changeTodo = ({ name, description }: Omit<Todo, 'id' | 'checked'>) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === todoIdForEdit) {
          return { ...todo, name, description };
        }
        return todo;
      })
    );
    setTodoIdForEdit(null);
  };

  return (
    <div className={styles.app_container}>
      <div className={styles.container}>
        <Header todoCount={todos.length} />
        <TodoPanel mode='add' addTodo={addTodo} />
        <TodoList
          todoIdForEdit={todoIdForEdit}
          todos={todos}
          deleteTodo={deleteTodo}
          checkTodo={checkTodo}
          selectTodoIdForEdit={selectTodoIdForEdit}
          changeTodo={changeTodo}
        />
      </div>
    </div>
  );
};
