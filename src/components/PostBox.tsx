import { FC, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faComment,
  faHeart,
  faTrash,
  faTimes,
} from '@fortawesome/free-solid-svg-icons'
import { PostHeader, ErrorPop } from '@/components/UI'
import { Post } from '@/utils/types'
import { useLikePost, useDeletePost } from '@/hooks/PostHooks'
import useSession from '@/hooks/useSession'

interface PostT extends Post {
  cb?: (e: any) => void
  close?: (e: any) => void
  highlight?: boolean
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
    __typename,
    close,
    highlight,
  } = props
  const [errToggle, setErrToggle] = useState(false)
  const { like, likeErr } = useLikePost()
  const { deletePost, deletePostErr } = useDeletePost()
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
      optimisticResponse: { deletePost: { postId: id } },
    })
  }

  return (
    <>
      {errToggle && (
        <ErrorPop
          errors={likeErr! || deletePostErr!}
          cb={() => setErrToggle(false)}
        />
      )}
      <li
        className={`grid-home__item ${
          highlight && 'grid-home__item--highlight'
        }`}
        onClick={cb}
      >
        <div className="grid-home__item__head">
          <PostHeader name={username} date={createdAt} />
          {highlight && (
            <FontAwesomeIcon icon={faTimes} onClick={close} size="lg" />
          )}
        </div>
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
          {session?.username === username && (
            <span className="trash">
              <FontAwesomeIcon icon={faTrash} onClick={trashHandler} />
            </span>
          )}
        </div>
      </li>
    </>
  )
}
export { PostBox }
