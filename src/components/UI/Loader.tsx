import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFan } from '@fortawesome/free-solid-svg-icons'

const Loader = () => {
  return (
    <div className="loader">
      <FontAwesomeIcon icon={faFan} size="5x" className="loader__icon" />
    </div>
  )
}

export { Loader }
