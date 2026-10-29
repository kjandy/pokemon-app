'use client';

import { Button } from '@/components/ui/button';
import useCounterStore from '@/store/counterStore';
// import React, { useState } from 'react';

export const Counter = () => {
  // const [count, setCount] = useState(0);
  // const increment = () => {
  //   setCount(count + 1);
  // };
  const { count, increment, decrement, reset } = useCounterStore();
  return (
    <>
      <h1>Counter</h1>
      <h2 className="mt-4">{count}</h2>
      <Button onClick={increment}>+</Button>
      <Button onClick={decrement}>-</Button>
      <Button onClick={reset}>Reset</Button>
    </>
  );
};
