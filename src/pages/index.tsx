import { useState, useEffect } from 'react'
import { motion, AnimateSharedLayout } from 'framer-motion'
import { PostBox, PostHighlight, PostCreate, PostLoader } from '@/components'
import { Layout } from '@/components/Wrappers'
import { useAllPost } from '@/hooks/PostHooks'
import { Post } from '@/utils/types'
import { initializeApollo } from '@/utils/apollo'
import { GET_POSTS } from '@/utils/gql-schema'

const Home = () => {
  const { data, error, loading } = useAllPost()
  const [togglePost, setTogglePost] = useState<Post | null>(null)

  useEffect(() => {
    // Sync Post w/ PostHighlight
    if (togglePost) {
      const findPost = data!.getPosts.find((p) => p.id === togglePost!.id)
      setTogglePost(findPost!)
    }
  }, [data])

  return (
    <>
      {togglePost && (
        <PostHighlight cb={() => setTogglePost(null)} posts={togglePost} />
      )}
      <Layout title="Home" auth>
        <ul className="grid-home">
          <PostCreate key="Create" />
          {loading && <PostLoader />}
          {data?.getPosts
            .filter((p) => !p._deleted)
            .map((post) => (
              <PostBox key={post.id} {...post} cb={() => setTogglePost(post)} />
            ))}
        </ul>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: GET_POSTS,
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  }
}

export default Home
