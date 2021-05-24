import { useState, useEffect, memo } from 'react'
import { motion, AnimateSharedLayout } from 'framer-motion'
import { PostBox, PostHighlight, PostCreate, PostLoader } from '@/components'
import { Layout } from '@/components/Wrappers'
import { ErrorPop } from '@/components/UI'
import { useAllPost } from '@/hooks/PostHooks'
import { Post } from '@/utils/types'
import { initializeApollo } from '@/utils/apollo'
import { GET_POSTS } from '@/utils/gql-schema'

const Home = () => {
  const { data, error, loading } = useAllPost()
  const [errToggle, setErrToggle] = useState(false)
  const [togglePost, setTogglePost] = useState<Post | null>(null)

  useEffect(() => {
    // Sync Post w/ PostHighlight
    if (togglePost) {
      const findPost = data!.getPosts.find((p) => p.id === togglePost!.id)
      setTogglePost(findPost!)
    }
  }, [data])

  useEffect(() => {
    error && setErrToggle(true)
  }, [error])

  return (
    <Layout title="Home" auth>
      {errToggle && <ErrorPop errors={error!} cb={() => setErrToggle(false)} />}
      <AnimateSharedLayout>
        <motion.ul className="grid-home">
          <PostCreate key="Create" />
          {loading && <PostLoader />}
          {data?.getPosts
            .filter((p) => !p._deleted)
            .map((post) => (
              <PostBox key={post.id} {...post} cb={() => setTogglePost(post)} />
            ))}
        </motion.ul>
        {togglePost && (
          <PostHighlight
            cb={() => setTogglePost(null)}
            posts={togglePost}
            close={() => setTogglePost(null)}
          />
        )}
      </AnimateSharedLayout>
    </Layout>
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
