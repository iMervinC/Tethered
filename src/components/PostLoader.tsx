import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFan } from '@fortawesome/free-solid-svg-icons'

const PostLoader = () => {
  return (
    <>
      <PostLoading />
      <PostLoading />
      <PostLoading />
      <PostLoading />
      <PostLoading />
    </>
  )
}

const PostLoading = () => {
  return (
    <div className="grid-home__item">
      <FontAwesomeIcon
        icon={faFan}
        size="5x"
        className="loader__icon loader__icon--post"
      />
    </div>
  )
}

export { PostLoader }
