import { FormEvent, FC, useState } from 'react'
import { PostBox } from '@/components'
import { Post } from '@/utils/types'
import { Button, PostHeader } from './UI'
import { useCommentPost } from '@/hooks/PostHooks'
import useSession from '@/hooks/useSession'

const PostHighlight: FC<{ posts: Post; cb: () => void }> = ({ posts, cb }) => {
  const [post, setPost] = useState('')
  const { comment, commentRes } = useCommentPost()
  const session = useSession()

  const submitHandler = (e: FormEvent) => {
    e.preventDefault()
    comment({
      variables: { postId: posts.id, body: post },
      optimisticResponse: {
        createComment: {
          ...posts,
          comments: [
            {
              id: 'TEMP_ID',
              username: session!.username,
              body: post,
              createdAt: new Date().toISOString(),
            },
            ...posts.comments,
          ],
        },
      },
    })
    setPost('')
  }

  return (
    <div className="post-highlight" onClick={cb}>
      <PostBox {...posts!} cb={(e) => e.stopPropagation()} />
      <div className="post-highlight__box" onClick={(e) => e.stopPropagation()}>
        <div className="post-highlight__box__comments scroll--2">
          {posts.comments.length > 0 ? (
            posts.comments.map((comment) => (
              <span key={comment.id} className="post-highlight__box__comment">
                <PostHeader name={comment.username} />
                <p>{comment.body}</p>
              </span>
            ))
          ) : (
            <span className="post-highlight__box__no-comment">No Comments</span>
          )}
        </div>
        <form className="post-highlight__box__post" onSubmit={submitHandler}>
          <textarea
            name="Post"
            value={post}
            placeholder="Hey"
            onChange={(e) => {
              setPost(e.target.value)
            }}
          />
          <Button label="Post" submit type="square" />
        </form>
      </div>
    </div>
  )
}

export { PostHighlight }
