import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FC } from 'react'

const PostHeader: FC<{ name: string; date?: string }> = ({ name, date }) => {
  return (
    <div className="post-head">
      <span className="post-head__icon">
        <FontAwesomeIcon icon={faUser} />
      </span>
      <span className="post-head__name">{name}</span>
      <span className="post-head__date">{date && '• ' + date}</span>
    </div>
  )
}

export { PostHeader }
