import { useState } from 'react'
import { PostHeader, Button, ErrorPop } from '@/components/UI'
import { useCreatePost } from '@/hooks/PostHooks'
import useSession from '@/hooks/useSession'

const PostCreate = () => {
  const session = useSession()
  const [errToggle, setErrToggle] = useState(false)
  const [body, setBody] = useState('')
  const {
    post,
    postRes: { data, loading },
    postErr,
  } = useCreatePost()

  const submitHandler = (e: any) => {
    e.preventDefault()
    if (body.trim() !== '') {
      post({
        variables: { body },

        optimisticResponse: {
          createPost: {
            body,
            username: session!.username,
            createdAt: new Date().toISOString(),
            comments: [],
            likes: [],
            id: 'Temp_ID',
            __typename: 'Post',
            _deleted: false,
          },
        },
      })
      setBody('')
    }
  }

  return (
    <>
      {errToggle && (
        <ErrorPop errors={postErr!} cb={() => setErrToggle(false)} />
      )}

      <li className="grid-home__item grid-home__item__post">
        <PostHeader name={session!.username} type="welcome" />
        <form className="grid-home__item__form" onSubmit={submitHandler}>
          <textarea
            name="Post"
            placeholder={`What's up doc!`}
            value={body}
            onChange={(e) => {
              setBody(e.target.value)
            }}
          />
          <Button label="Post" submit type="square" loader={loading} />
        </form>
      </li>
    </>
  )
}

export { PostCreate }
