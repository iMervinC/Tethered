import { useState } from 'react'
import { PostBox, PostCreate, PostLoader } from '@/components'
import { Layout } from '@/components/Wrappers'
import { useAllPost } from '@/hooks/PostHooks'
import { Post } from '@/utils/types'

const Home = () => {
  const { data, error, loading } = useAllPost()
  const [togglePost, setTogglePost] = useState<Post | null>(null)
  return (
    <>
      {togglePost && (
        <div
          className="post-highlight"
          onClick={() => {
            setTogglePost(null)
          }}
        >
          <PostBox {...togglePost!} cb={(e) => e.stopPropagation()} />
        </div>
      )}
      <Layout title="Home" auth>
        <ul className="grid-home">
          <PostCreate key="Create" />
          {loading && <PostLoader />}
          {data?.getPosts.map((post) => (
            <PostBox key={post.id} {...post} cb={() => setTogglePost(post)} />
          ))}
        </ul>
      </Layout>
    </>
  )
}

export default Home
