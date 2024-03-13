// Write your code here
const SimilarProductItem = props => {
  const {details} = props
  const {
    id,
    imageUrl,
    title,
    style,
    price,
    discription,
    brand,
    totalReviews,
    rating,
    availability,
  } = details
  return (
    <li>
      <img src={imageUrl} alt={`similar product ${title}`} />
      <h1>{title}</h1>
      <p>by {brand}</p>
      <p>Rs {price}</p>
      <p>{rating}</p>
      <img
        src="https://assets.ccbp.in/frontend/react-js/star-img.png"
        alt="star"
      />
    </li>
  )
}
export default SimilarProductItem
