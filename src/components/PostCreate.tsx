import { useState } from 'react'
import { PostHeader, Button } from '@/components/UI'
import { useCreatePost } from '@/hooks/PostHooks'
import useSession from '@/hooks/useSession'

const PostCreate = () => {
  const session = useSession()

  const [body, setBody] = useState('')
  const {
    post,
    postRes: { data, loading },
  } = useCreatePost()

  const submitHandler = (e: any) => {
    e.preventDefault()
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
        },
      },
    })
    setBody('')
  }

  return (
    <li className="grid-home__item grid-home__item__post">
      <PostHeader name={session!.username} />

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
  )
}

export { PostCreate }
