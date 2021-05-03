import type { FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import type { TextBox as TextBoxType } from '@/utils/types'

const TextBox: FC<TextBoxType> = ({ placeholder, type, value, onChange }) => {
  const icon = (_type: typeof type) => {
    switch (_type) {
      case 'user':
        return faUser
      case 'password':
        return faLock
      case 'email':
        return faEnvelope
      default:
        return faUser
    }
  }

  return (
    <span className="textbox">
      <FontAwesomeIcon className="icon" icon={icon(type)} />
      <input
        type={type === 'user' ? 'text' : type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <span />
    </span>
  )
}

export { TextBox }
