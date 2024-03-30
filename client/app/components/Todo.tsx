import React, { useState } from 'react';
import { TTodo } from '../types';
import useSWR from 'swr';

const API_BASE_URL = 'http://localhost:8080';

type TTodoProps = {
  todo: TTodo;
};

async function fetcher(key: string) {
  return fetch(key).then((res) => res.json());
}

function Todo({ todo }: TTodoProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedTitle, setEditedTitle] = useState<string>(todo.title);

  const { data, isLoading, error, mutate } = useSWR(
    `${API_BASE_URL}/allTodos`,
    fetcher
  );

  const handleEdit = async () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      const res = await fetch(`${API_BASE_URL}/editTodo/${todo.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: editedTitle,
        }),
      });

      if (res.ok) {
        const editedTodo = await res.json();
        mutate([...data, editedTodo]);
        setEditedTitle('');
      }
    }
  };

  return (
    <div>
      <li className="py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="todo1"
              name="todo1"
              type="checkbox"
              className="h-4 w-4 text-teal-600 focus:ring-teal-500
          border-gray-300 rounded"
            />
            <label className="ml-3 block text-gray-900">
              {isEditing ? (
                <input
                  type="text"
                  className="border rounded py-1 px-2"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
              ) : (
                <span className="text-lg font-medium mr-2">{todo.title}</span>
              )}
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <button
              className="duration-150 bg-green-600 hover:bg-green-700 text-white font-medium py-1 px-2 rounded"
              onClick={handleEdit}
            >
              {isEditing ? 'Save' : '✒'}
            </button>
            <button className="bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-2 rounded">
              ✖
            </button>
          </div>
        </div>
      </li>
    </div>
  );
}

export default Todo;
