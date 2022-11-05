import React from 'react';
import { TodoListItem } from '../TodoListItem/TodoListItem';
import { TodoState } from '../../../redux/slices/todos/slice';

export const TodoListItems = ({ todos }: { todos: TodoState[] }) => {
    return (
        <>
            {todos.map((todo) => (
                <TodoListItem key={todo.id} todo={todo} />
            ))}
        </>
    );
};
