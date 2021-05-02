import { FC } from 'react'

interface Btn {
  label: string
  type?: 'flush' | 'white'
  cb?: () => null
}

const Button: FC<Btn> = ({ label, type, cb }) => {
  return <button className={`btn ${type && 'btn--' + type}`}>{label}</button>
}

export { Button }
