import { FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFan } from '@fortawesome/free-solid-svg-icons'

interface Btn {
  label: string
  type?: 'flush' | 'white' | 'small' | 'square'
  cb?: () => void
  submit?: boolean
  loader?: boolean
}

const Button: FC<Btn> = ({ label, type, cb, submit, loader }) => {
  return (
    <button
      type={submit ? 'submit' : 'button'}
      className={`btn ${type && 'btn--' + type}`}
      onClick={cb}
    >
      {label}
      {type === 'square' && <FontAwesomeIcon icon={faFan} spin={loader} />}
    </button>
  )
}

export { Button }
