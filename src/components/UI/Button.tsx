import { FC } from 'react'

interface Btn {
  label: string
  type?: 'flush' | 'white' | 'small'
  cb?: () => void
  submit?: boolean
}

const Button: FC<Btn> = ({ label, type, cb, submit }) => {
  return (
    <button
      type={submit ? 'submit' : 'button'}
      className={`btn ${type && 'btn--' + type}`}
      onClick={cb}
    >
      {label}
    </button>
  )
}

export { Button }
