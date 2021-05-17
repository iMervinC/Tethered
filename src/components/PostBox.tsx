import { FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faHeart, faTrash } from '@fortawesome/free-solid-svg-icons'
import { PostHeader } from '@/components/UI'
import { Post } from '@/utils/types'
import { useLikePost } from '@/hooks/PostHooks'
import useSession from '@/hooks/useSession'

interface PostT extends Post {
  cb?: (e: any) => void
}

const PostBox: FC<PostT> = (props) => {
  const { id, username, body, createdAt, likes, comments, cb, _deleted } = props

  const { like, likeRes } = useLikePost()
  const session = useSession()

  const likeExists = likes.find((_like) => _like.username === session?.username)

  const clickHandler = (e: any) => {
    e.stopPropagation()
    like({
      variables: { postId: id },
      optimisticResponse: {
        id,
        username,
        body,
        createdAt,
        likes: likeExists
          ? likes.filter((like) => like.username !== session?.username)
          : [...likes, { username: session?.username }],
        comments,
      },
    })
  }

  return (
    <li className="grid-home__item" onClick={cb}>
      <PostHeader name={username} date={createdAt} />
      <span className="grid-home__item__content scroll">{body}</span>
      <div className="grid-home__item__reactions">
        <span className="heart">
          <FontAwesomeIcon
            icon={faHeart}
            color={likeExists ? '#ff7a7a' : 'white'}
            onClick={clickHandler}
          />
          {likes.length}
        </span>
        <span className="comment">
          <FontAwesomeIcon icon={faComment} /> {comments.length}
        </span>
        <span className="trash">
          <FontAwesomeIcon icon={faTrash} />
        </span>
      </div>
    </li>
  )
}
export { PostBox }
