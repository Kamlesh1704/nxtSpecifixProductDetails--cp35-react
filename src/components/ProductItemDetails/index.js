import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import SimilarProductItem from '../SimilarProductItem'
import './index.css'

const apiStatusConstaint = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}
class ProductItemDetails extends Component {
  state = {
    productItemData: {},
    similarProduct: [],
    count: 1,
    apiStatus: apiStatusConstaint.initial,
  }

  componentDidMount() {
    this.getProductItemDetail()
  }

  getProductItemDetail = async () => {
    this.setState({apiStatus: apiStatusConstaint.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/products/:${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      const Data = {
        id: fetchedData.id,
        imageUrl: fetchedData.image_url,
        title: fetchedData.title,
        brand: fetchedData.brand,
        rating: fetchedData.rating,
        price: fetchedData.price,
        disciption: fetchedData.disciption,
        totalReviews: fetchedData.total_reviews,
        availability: fetchedData.availability,
      }
      const similarProductData = fetchedData.similar_products.map(eachProduct => ({
        id: eachProduct.id,
        imageUrl: eachProduct.image_url,
        title: eachProduct.title,
        style: eachProduct.style,
        price: eachProduct.price,
        disciption: eachProduct.disciption,
        brand: eachProduct.brand,
        totalReviews: eachProduct.total_reviews,
        rating: eachProduct.rating,
        availability: eachProduct.availability,
      }))
      this.setState({
        similarProducts:similarProductData,
        productItemData: Data,
        apiStatus: apiStatusConstaint.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstaint.failure})
    }
  }

  loadingItems = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />
    </div>
  )

  failureItems = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        alt="error view"
      />
      <h1>Product Not Found</h1>
      <button>Continue Shopping</button>
    </div>
  )

  renderProductItems = () => {
    const {productItemData, count, similarProducts} = this.state
    const {
      id,
      availability,
      brand,
      imageUrl,
      title,
      totalReviews,
      rating,
      price,
      disciption,
    } = productItemData
    return (
      <div>
        <Header />
        <div>
          <img src={imageUrl} alt="product" className="image" />
          <h1>{title}</h1>
          <p>Rs {price}</p>
          <p>{rating}</p>
          <img
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
            alt="star"
          />
          <p>{totalReviews}Reviews</p>
          <p>{disciption}</p>
          <p>Available {availability}</p>
          <p>Brand {brand}</p>
          <button data-testid="minus">
            <BsDashSquare />
          </button>
          <p>{count}</p>
          <button data-testid="plus">
            <BsPlusSquare />
          </button>
          <button>ADD TO CART</button>
        </div>
        <div>
          <h1>Similar Producst</h1>
          <ul>
            {similarProducts.map(eachProduct => (
              <SimilarProductItem details={eachProduct} key={eachProduct.id} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstaint.success:
        return this.renderProductItems()
      case apiStatusConstaint.failure:
        return this.failureItems()
      case apiStatusConstaint.loading:
        return this.loadingItems()
    }
  }
}
export default ProductItemDetails
