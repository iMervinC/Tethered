import { FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faHeart } from '@fortawesome/free-solid-svg-icons'
import { PostHeader } from '@/components/UI'
import { Post } from '@/utils/types'

interface PostT extends Post {
  cb?: (e: any) => void
}

const PostBox: FC<PostT> = ({
  username,
  body,
  createdAt,
  likes,
  comments,
  cb,
}) => {
  return (
    <li className="grid-home__item" onClick={cb}>
      <PostHeader name={username} date={createdAt} />
      <span className="grid-home__item__content scroll">{body}</span>
      <div className="grid-home__item__reactions">
        <span className="heart">
          <FontAwesomeIcon
            icon={faHeart}
            onClick={(e) => e.stopPropagation()}
          />
          {likes.length}
        </span>
        <span className="comment">
          <FontAwesomeIcon icon={faComment} /> {comments.length}
        </span>
      </div>
    </li>
  )
}

export { PostBox }
