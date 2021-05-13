import { FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faHeart } from '@fortawesome/free-solid-svg-icons'
import { PostHeader } from '@/components/UI'
import { Post } from '@/utils/types'
import { useLikePost } from '@/hooks/PostHooks'
import useSession from '@/hooks/useSession'

interface PostT extends Post {
  cb?: (e: any) => void
}

const PostBox: FC<PostT> = ({
  id,
  username,
  body,
  createdAt,
  likes,
  comments,
  cb,
}) => {
  const { like, likeRes } = useLikePost()
  const session = useSession()

  const likeExists = likes.find((like) => like.username === session?.username)

  return (
    <li className="grid-home__item" onClick={cb}>
      <PostHeader name={username} date={createdAt} />
      <span className="grid-home__item__content scroll">{body}</span>
      <div className="grid-home__item__reactions">
        <span className="heart">
          <FontAwesomeIcon
            icon={faHeart}
            color={likeExists ? '#ff7a7a' : 'white'}
            onClick={(e) => {
              e.stopPropagation()
              like({
                variables: { postId: id },
                optimisticResponse: {
                  id,
                  username,
                  body,
                  createdAt,
                  likes: likeExists
                    ? likes.filter(
                        (like) => like.username !== session?.username
                      )
                    : [...likes, { username: session?.username }],
                  comments,
                },
              })
            }}
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
