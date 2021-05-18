import { FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faHeart, faTrash } from '@fortawesome/free-solid-svg-icons'
import { PostHeader } from '@/components/UI'
import { Post } from '@/utils/types'
import { useLikePost, useDeletePost } from '@/hooks/PostHooks'
import useSession from '@/hooks/useSession'

interface PostT extends Post {
  cb?: (e: any) => void
}

const PostBox: FC<PostT> = (props) => {
  const {
    id,
    username,
    body,
    createdAt,
    likes,
    comments,
    cb,
    _deleted,
    __typename,
  } = props

  const { like } = useLikePost()
  const { deletePost } = useDeletePost()
  const session = useSession()

  const likeExists = likes.find((_like) => _like.username === session?.username)

  const likeHandler = (e: any) => {
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
        __typename,
      },
    })
  }

  const trashHandler = (e: any) => {
    e.stopPropagation()
    deletePost({
      variables: { postId: id },
      optimisticResponse: { postId: id },
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
            onClick={likeHandler}
          />
          {likes.length}
        </span>
        <span className="comment">
          <FontAwesomeIcon icon={faComment} /> {comments.length}
        </span>
        <span className="trash">
          <FontAwesomeIcon icon={faTrash} onClick={trashHandler} />
        </span>
      </div>
    </li>
  )
}
export { PostBox }
