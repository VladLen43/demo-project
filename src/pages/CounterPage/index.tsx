import React, { useState } from 'react'

export const CounterPage = () => {
  const [count, setCount] = useState(0)
  return (
    <div>
      <span>{count}</span>
      <button style={{ cursor: 'pointer' }} onClick={() => setCount((prev) => prev + 1)}>
        +
      </button>
      <button
        style={{ cursor: count === 0 ? '' : 'pointer' }}
        disabled={count === 0 && true}
        onClick={() => setCount((prev) => prev - 1)}
      >
        -
      </button>
    </div>
  )
}
