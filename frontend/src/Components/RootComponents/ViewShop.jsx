import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { getUserShops, productsList } from '../../Authentication/shop'

const ViewShop = () => {
  const [shop, setShop] = useState(null)
  const [products, setProducts] = ([])
  const shopParams = useParams()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await productsList;
        setProducts(productsData);
      } catch (error) {
        console.error("Erreur lors de la récupération des produits :", error);
        // Gérer l'erreur de manière appropriée
      }
    };

    fetchProducts();
  }, [setProducts]);

    useEffect(() => {
      const fetchShop = async () => {
        const shopData = await getUserShops(shopId)
        setShop({
          id: shopData.id,
          shopName: shopData.shopName,
          holdername: shopData.holdername,
          followers : shopData.followers,
          openTime: shopData.openTime,
          closeTime: shopData.closeTime,
          profileImageUrl: shopData.profileImageUrl,
        });
    };
    fetchShop();
  }, );
  return (
    <div>
      <div>
        <h3>{shop && shop.holdername}</h3>
      </div>
      <div>
        <div>
          <h4>{shop && shop.shopName} </h4>
          <p>{shop && shop.holdername} </p>
          <p>{shop && shop.followers} </p>
          <p>{shop && shop.description} </p>
        </div>
        <div>
          <img src={shop && shop.profileImageUrl} />
        </div>

        <div>
          <h3>SHOP CATALOG</h3>
          <div>
          <div className="profile-container">
              <div className="commands">
                {products && products.map((product) => (
                  <div className="command" key={product.id}>
                    <div><img
                      src={product.image}
                      alt={product.productName}
                      style={{ width: "200px", height: "200px" }}
                    /></div>
                    <div>
                    <h4>{product.productName.toUpperCase()}</h4>
                    <h5>Category: {product.category}</h5>
                    <p>{product.description}</p>
                    <p className="price">Price: {product.price} $</p>
                    <p>Stock: {product.stock} items</p>
                    <p>Likes: {product.likes} Likes</p>
                    <p>Commands: {product.sales} Commands</p>
                    </div>
                  </div>
                ))}
                <p>Copyright S-Mall 2024</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewShop