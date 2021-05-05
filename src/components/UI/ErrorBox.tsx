import React, { FC } from 'react'

const ErrorBox: FC<{ errors: string[] }> = ({ errors }) => {
  return (
    <ul className="error-box">
      {errors.map((err) => (
        <li key={err} className="error-box__item">
          {err}
        </li>
      ))}
    </ul>
  )
}

export { ErrorBox }
