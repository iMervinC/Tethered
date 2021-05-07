import { FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faHeart } from '@fortawesome/free-solid-svg-icons'
import { PostHeader } from '@/components/UI'
import { Post } from '@/utils/types'

const PostBox: FC<Post> = ({
  username,
  body,
  createdAt,
  likes,
  comments,
  id,
}) => {
  return (
    <li className="grid-home__item">
      <PostHeader name={username} date={createdAt} />
      <span className="grid-home__item__content scroll">{body}</span>
      <div className="grid-home__item__reactions">
        <span className="heart">
          <FontAwesomeIcon icon={faHeart} />5
        </span>
        <span className="comment">
          <FontAwesomeIcon icon={faComment} />3
        </span>
      </div>
    </li>
  )
}

export { PostBox }
