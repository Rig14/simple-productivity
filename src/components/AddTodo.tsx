import React, { ChangeEvent, FormEvent, useState } from 'react';

interface AddTodoFormProps {
  addTodo: AddTodo;
}

const AddTodo: React.FC<AddTodoFormProps> = ({ addTodo }): JSX.Element => {
  const [newTodo, setNewTodo] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addTodo(newTodo);

    setNewTodo('');
  };

  return (
    <div>
      <input type="text" value={newTodo} onChange={handleChange} />
      <button type="submit" onClick={handleSubmit}>
        Add todo
      </button>
    </div>
  );
};

export default AddTodo;
