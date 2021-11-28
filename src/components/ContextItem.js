import { Col } from 'react-bootstrap'
import Skeleton from "react-loading-skeleton"

const ContextItem =  ({resizedImages, srcLabel, alt, heading, blurb}) => {
  return (
    <Col md={4}>
      {resizedImages ? (
        <img src={resizedImages[srcLabel]} alt={alt}/>
      ) : (
        <Skeleton width={200} height={200} />
      )}
      <h3 className="my-3">{heading}</h3>
      <p>{blurb}</p>
    </Col>
  )
}

export default ContextItem;