import { FC } from 'react'
import { MyErrors } from '@/utils/types'

const ErrorBox: FC<{ errors: string[]; code?: string }> = ({
  errors,
  code,
}) => {
  return (
    <ul className="error-box">
      {errors.map((err) => (
        <li key={err} className="error-box__item">
          {err}
        </li>
      ))}
      <span className="error-box__item">{code}</span>
    </ul>
  )
}

const ErrorPop: FC<{ errors: MyErrors; cb: () => void }> = ({ errors, cb }) => {
  return (
    <div className="error-pop" onClick={cb}>
      <div>
        {errors.errors && (
          <ErrorBox errors={errors.errors!} code={errors.code} />
        )}
      </div>
    </div>
  )
}
export { ErrorBox, ErrorPop }
