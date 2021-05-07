import { PostBox, PostCreate } from '@/components'
import { Layout } from '@/components/Wrappers'
import { useAllPost } from '@/hooks/PostHooks'

const Home = () => {
  const { data, error, loading } = useAllPost()
  console.log(data)
  return (
    <Layout title="Welcome" auth>
      <ul className="grid-home">
        <PostCreate key="Create" />
        {data?.getPosts.map((post) => (
          <PostBox key={post.id} {...post} />
        ))}
      </ul>
    </Layout>
  )
}

export default Home
