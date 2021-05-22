import { FormEvent, FC, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

import { PostBox } from '@/components'
import { Post } from '@/utils/types'
import { Button, PostHeader } from './UI'
import { useCommentPost, useDeleteComment } from '@/hooks/PostHooks'
import useSession from '@/hooks/useSession'

const PostHighlight: FC<{ posts: Post; cb: () => void; close?: () => void }> =
  ({ posts, cb, close }) => {
    const [post, setPost] = useState('')
    const { comment, commentRes } = useCommentPost()
    const { deleteComment } = useDeleteComment()
    const session = useSession()

    const commentHandler = (e: FormEvent) => {
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

    const trashHandler = (commentId: string) => {
      deleteComment({
        variables: { commentId, postId: posts.id },
        optimisticResponse: {
          deleteComment: {
            ...posts,
            comments: posts.comments.filter(
              (comment) => comment.id !== commentId
            ),
          },
        },
      })
    }

    return (
      <div className="post-highlight" onClick={cb}>
        <PostBox
          {...posts!}
          cb={(e) => e.stopPropagation()}
          close={close}
          highlight
        />
        <div
          className="post-highlight__box"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="post-highlight__box__comments scroll--2">
            {posts.comments.length > 0 ? (
              posts.comments.map((comment) => (
                <span key={comment.id} className="post-highlight__box__comment">
                  <PostHeader name={comment.username} />
                  <span className="post-highlight__box__comment__body">
                    <p>{comment.body}</p>
                    {session!.username === comment.username && (
                      <span className="trash">
                        <FontAwesomeIcon
                          icon={faTrash}
                          onClick={() => trashHandler(comment.id)}
                        />
                      </span>
                    )}
                  </span>
                </span>
              ))
            ) : (
              <span className="post-highlight__box__no-comment">
                No Comments
              </span>
            )}
          </div>
          <form className="post-highlight__box__post" onSubmit={commentHandler}>
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
