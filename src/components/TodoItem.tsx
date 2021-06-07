import React from 'react';

const TodoItem = (props: { value: string; id: number }): JSX.Element => {
  const { value } = props;
  const { id } = props;

  return (
    <div>
      <h1>{id}</h1>
      <p>{value}</p>
    </div>
  );
};

export default TodoItem;
