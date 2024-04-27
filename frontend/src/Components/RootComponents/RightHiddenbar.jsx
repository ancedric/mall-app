import HistogramComponent from '../histogram';
import { getShops, dailySales, productsList as productsList, commandList, notifs } from '../../Authentication/shop'
import { useRef, useState } from 'react';
import { Link, /*useNavigate*/ } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import Timer from '../Timer';
import { user } from '../../Authentication/user';

function RightHiddenbar() {
  //variables relatives à la récupération des données de la boutique
  // eslint-disable-next-line no-unused-vars
  const [_shop, setShop] = useState({
    id: "",
    shopName: "",
    holdername: "",
    followers : "",
    openTime: "",
    closeTime: "",
    profileImageUrl: "",
  });
  const [_user, setUser] = useState ({
    id: user.id,
    username: user.username,
    email: user.email,
  });
  const [productList, setProductList] = useState([]);
  const [_dailySales, setDailySales] = useState(dailySales);
  const [commands, setCommands] = useState(commandList);
  const [_notifs, setNotifs] = useState([]);
  const [bestSeller, setBestSeller] = useState(null)
  const [lessSeller, setLessSeller] = useState(null)
  const [mostFavourite, setMostFavourite] = useState(null)
  const [lessFavourite, setLessFavourite] = useState(null)
  const [totalSales, setTotalSales] = useState(null)

  const [myAccountOpen, setMyAccountOpen] = useState(true);
  const [catalogOpen, setCatalogOpen] = useState(false);
  const [notifsOpen, setNotifsOpen] = useState(false);

  const [previousScrollPosition, setPreviousScrollPosition] = useState(
    window.scrollY || document.documentElement.scrollTop
  );
  const [scrollToTop, setScrollToTop] = useState(false);
  const scrollContainerRef = useRef(null);

  /*--Gestion du catalogue--*/
  const [commandsOpen, setCommandsOpen] = useState(false);

  //vaiables relatives à la gestion des produits du catalogue
  const [addProductOpen, setAddProductOpen] = useState(false);
  const [removeProductOpen, setRemoveProductOpen] = useState(false);
  const [updateProductOpen, setUpdateProductOpen] = useState(false);
  const [productData, setProductData] = useState({
    name: '', 
    price: '', 
    category: '', 
    description: '',
    image: '', 
    shopId: '',
  });
  // [productToUpdateData, setProductToUpdateData] = useState(null);
  const [productToRemoveId, setProductToRemoveData] = useState(null);
  const [file, setFile] = useState(null)
  //const [updateFile, setUpdateFile] = useState(null)

  //fonctions de gestion du catalogue
  const changeValue = (e) => {
    if(e.target.name !== 'image'){
      setProductData((prev) => ({...prev, [e.target.name]: e.target.value}));
    } else {
      setFile(e.target.files[0]);
    }
  };

  const changeRemove = (e) => {
    if (e && e.target) {
      const productId = e.target.value;
      setProductToRemoveData(productId);
    }
  };

  const onChange = (e) => {
    setProductData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setFile(e.target.files[0]);
  };

  //const navigate = useNavigate();

  /*setShop(shop);
  setProductsList(products);
  setDailySales(dailySales);
  setCommands(commands); */

//Récupération des données relatives à la boutique, aux produits et aux notifications
useEffect(() => {
  const fetchUser = async () => {
    const userData = user;
    setUser({
      id: userData.id,
      username: userData.username,
      email: userData.email
    });
    console.log(_user) 
  };

  fetchUser();
},);

useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await productsList;
        setProductList(productsData);
      } catch (error) {
        console.error("Erreur lors de la récupération des produits :", error);
        // Gérer l'erreur de manière appropriée
      }
    };

    fetchProducts();
  }, []);

    useEffect(() => {
      const fetchShop = async () => {
        const shopData = await getShops()
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
  
  useEffect(() => {
    const fetchNotifs = async () => {
      const notificationData = await notifs;
      setNotifs(notificationData);
    };

    fetchNotifs();
  }, []);
  
  useEffect(() => {
    if (Array.isArray(productList) && productList.length > 0) {
      const sales = productList.map((product) => product.nbSales);
      setDailySales(sales);
    }
  }, [productList]);
  
  useEffect(() => {
    if (productList && productList.length > 0) {
      const topSell = [...productList].sort((a, b) => b.nbSales - a.nbSales);
      setBestSeller(topSell[0]);
      const lessSell = [...productList].sort((a, b) => a.nbSales - b.nbSales)[0];
      setLessSeller(lessSell[0]);
      const favourite = [...productList].sort((a, b) => b.nbLikes - a.nbLikes)[0];
      setMostFavourite(favourite);
      const lessFavour = [...productList].sort((a, b) => a.nbLikes - b.nbLikes)[0];
      setLessFavourite(lessFavour);
      const total = [...productList].reduce((acc, currentValue) => acc + currentValue.nbSales, 0);
      setTotalSales(total)
    }
  }, [productList]);

  

  const handleOpen = (event) => {
    const elements = document.querySelectorAll('.profile-elements');

    // Retirez la classe "selected" de tous les éléments
    elements.forEach((element) => {
      element.classList.remove('selected');
    });
  
    const clickedElement = event.currentTarget;
    clickedElement.classList.add('selected');

    // Mettez à jour les états des contenus en fonction de l'élément cliqué
    if (clickedElement.textContent === 'Office') {
      setMyAccountOpen(true);
      setCatalogOpen(false);
      setNotifsOpen(false);
      setCommandsOpen(false);
    } else if (clickedElement.textContent === 'Catalog') {
      setMyAccountOpen(false);
      setCatalogOpen(true);
      setNotifsOpen(false);
      setCommandsOpen(false);
    } else if (clickedElement.textContent === 'Notifs.') {
      setMyAccountOpen(false);
      setCatalogOpen(false);
      setNotifsOpen(true);
      setCommandsOpen(false);
    } else if (clickedElement.textContent === 'Commands') {
      setMyAccountOpen(false);
      setCatalogOpen(false);
      setNotifsOpen(false);
      setCommandsOpen(true);
    }  
    
  };


  const handleAddProduct = () => {
    handleOpenAddProduct();
    handleCloseRemoveProduct();
    handleCloseUpdateProduct();
  };

  const handleOpenAddProduct = () => {
    setAddProductOpen(true);
    const slideUpElement = document.querySelector('.slide-up-1')
    slideUpElement.classList.add('visible')
  };
  const handleCloseAddProduct = () => {
    setAddProductOpen(false);
    document.body.classList.remove("visible");
  };

  const handleProductAdd = () => {
    const formData = new FormData();
    formData.append('name', productData.name);
    formData.append('price', productData.price);
    formData.append('shopId', _shop.id);
    formData.append('category', productData.category);
    formData.append('description', productData.description);
    formData.append('image', file);

    axios
      .post("http://localhost:8081/add-product", formData)
      .then((res) => {
        console.log(res);
        document.getElementById('add-product-form').reset();
      })
      .catch((err) => console.log(err));
  };

  const handleRemoveProduct = () => {
    handleOpenRemoveProduct();
    handleCloseAddProduct();
    handleCloseUpdateProduct()
  };

  const handleOpenRemoveProduct = () => {
    setRemoveProductOpen(true);
    document.getElementById('remove-btn').addEventListener('click', function(){
      var slideUpElement = document.querySelector('.slide-up-2')
      slideUpElement.classList.add('visible')
    })
  };

  const handleCloseRemoveProduct = () => {
    setRemoveProductOpen(false);
    document.body.classList.remove("visible");
  };

  const handleProductRemove = () => {
    axios.delete(`http://localhost:8081/remove-product/${productToRemoveId}`)
      .then((res) => {
        console.log(res.data);

        document.getElementById('product-remove-form').reset();
      })
      .catch((err) => console.error('Erreur lors de la supression du produit',err));
  };

  const handleUdateProduct = () => {
    handleOpenUpdateProduct();
    handleCloseAddProduct();
    handleCloseRemoveProduct()
  };

  const handleOpenUpdateProduct = () => {
    setUpdateProductOpen(true);
    document.getElementById('update-btn').addEventListener('click', function(){
      var slideUpElement = document.querySelector('.slide-up-3')
      slideUpElement.classList.add('visible')
    })
  };

  const handleCloseUpdateProduct = () => {
    setUpdateProductOpen(false);
    document.body.classList.remove("visible");
  };

  const handleProductUpdate = () => {

    const formData = new FormData();
    formData.append('name', productData.name);
    formData.append('price', productData.price);
    formData.append('category', productData.category);
    formData.append('description', productData.description);
    formData.append('image', file);

    console.log('product id',productData.productId)
    axios
      .put(`http://localhost:8081/update-product/${productData.productId}`, formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const handleAcceptCommand = (commandId) => {
    const updatedCommandList = commands.map((command) => {
      if (command.id === commandId) {
        return {
          ...command,
          status: "achieved",
          stock: command.stock - command.quantity,
        };
      } //faire une requete au serveur pour mettre a jour le stock dans la base de données
      axios.put(`http://localhost:3000/update-command/${commandId}`, {
        command,
      });
      return command;
      //Mettre en place une logique pour permettre d'envoyer l'argent au vendeur
    });
    setCommands(updatedCommandList);
  };
  const handleDeclineCommand = (commandId) => {
    const updatedCommandList = commands.map((command) => {
      if (command.id === commandId) {
        return { ...command, status: "decline" };
      }
      axios.put(`http://localhost:3000/update-command/${commandId}`, {
        command,
      });
      return command;
    });
    setCommands(updatedCommandList);
  };

  
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition =
        window.scrollY || document.documentElement.scrollTop;
      if (currentScrollPosition > previousScrollPosition) {
        setScrollToTop(true);
        setPreviousScrollPosition(currentScrollPosition);
      } else {
        setScrollToTop(false);
        setPreviousScrollPosition(currentScrollPosition);
      }
    };

    const scrollContainer = scrollContainerRef.current;
    scrollContainer.addEventListener("scroll", handleScroll);

    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll);
    };
  }, );

  const dailyLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  return (
    <div ref={scrollContainerRef} className="dashboard">
      <div className= 'dashboard-header'>
        <div className="user-info">
          <div className="profile-datas">
            <div className="username">
              <h3>Shop Dashboard</h3>
              <Timer shop = {_shop} />
            </div>
            <div className={`popularity ${scrollToTop ? "hidden" : ""}`}>
              <div className='shop-infos'>
                <h4>
                  Shop : <br/> {_shop.shopName}
                </h4>
                <p>
                  Holder : {_shop.holdername}
                </p>
                <p>
                  Followers : {_shop.followers}
                </p>
              </div>
              <div className='shopImage'>
                <img src={_shop.profileImageUrl} style={{borderRadius: '13px'}} />
              </div>
            </div>
          </div>
        </div>
        <div className="user-board">
          <ul>
            <li className="profile-elements selected" onClick={handleOpen}>
              Office
            </li>
            <li className="profile-elements" onClick={handleOpen}>
              Catalog
            </li>
            <li className="profile-elements" onClick={handleOpen}>
              Notifs.
            </li>
            <li className="profile-elements" onClick={handleOpen}>
              Commands
            </li>
          </ul>
        </div>
      </div>
      
      <div className="dash-switcher">
        {myAccountOpen && (<div className="stats">
          <h3>Statistics</h3>
          <HistogramComponent salesData={_dailySales} labels={dailyLabels} labTitle='daily sales' />
          <h4>Total commands of the week</h4>
          <p>{totalSales} sales this week</p>
            {bestSeller &&
              <div className="command">
                <h4>Best Seller</h4>
                <img
                  src={bestSeller.image}
                  alt="best seller"
                  style={{ width: "250px", height: "220px" }}
                />
                <h4>{bestSeller.productName}</h4>
                <p className= "price">Price : {bestSeller.price} $</p>
                <p>{bestSeller.nbSales} Commands</p>
              </div>
            }
            {lessSeller &&
              <div className="command">
                <h4>Less Seller</h4>
                <img
                  src={lessSeller.image}
                  alt="less seller"
                  style={{ width: "250px", height: "220px" }}
                />
                <h4>{lessSeller.productName}</h4>
                <p className= "price">Price : {lessSeller.price} $</p>
                <p>{lessSeller.nbSales} Commands</p>
              </div>
            }
            {mostFavourite &&
              <div className="command">
                <h4>Most favourite</h4>
                <img
                  src={mostFavourite.image}
                  alt="most-favourite"
                  style={{ width: "250px", height: "220px" }}
                />
                <h4>{mostFavourite.productName}</h4>
                <p className= "price">Price : {mostFavourite.price} $</p>
                <p>{mostFavourite.nbSales} Commands</p>
              </div>
            }
            {lessFavourite &&
              <div className="command">
                <h4>Less favourite</h4>
                <img
                  src={lessFavourite.image}
                  alt="less-favourite"
                  style={{ width: "250px", height: "220px" }}
                />
                <h4>{lessFavourite.productName}</h4>
                <p className= "price">Price : {lessFavourite.price} $</p>
                <p>{lessFavourite.nbSales} Commands</p>
              </div>
            }
            

          
        </div>)
        }
        {catalogOpen && (
          <div className="pop-up">
            <h3>Catalog</h3>
            <div className="profile-container">
              <div className="commands">
                <div className="buttons">
                  <button id="add-btn" className="green-btn" onClick={handleAddProduct}>
                    <img src="frontend\src\assets\icons\add-plus-square-svgrepo-com.svg" alt="add product" width="25px" height="25px"/>
                  </button>
                  <button id="remove-btn" className="red-btn" onClick={handleRemoveProduct}>
                  <img src="frontend\src\assets\icons\dustbin-bin-trush-svgrepo-com.svg" alt="remove product" width="25px" height="25px"/>
                  </button>
                  <button id="update-btn" className="blue-btn" onClick={handleUdateProduct}>
                  <img src="frontend\src\assets\icons\update-svgrepo-com.svg" alt="update product" width="25px" height="25px"/>
                  </button>
                </div>
                {productList && productList.map((product) => (
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
        )}
        {notifsOpen && (
          <div className="pop-up">
            <h3>Notifications</h3>
            <div className="profile-container">
              {_notifs && _notifs.map((notif) => {
                return (
                  <div key={notif.id} className={`command ${notif.status}`}>
                    <div>
                      <h4>{notif.content}</h4>
                      <Link to={notif.link}>{notif.shopName}</Link>
                      <p>{notif.date}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {commandsOpen && (
          <div className="pop-up">
            <h3>Commands</h3>
            <div className="profile-container">
              <div className="commands">
                <h4>Last Commands</h4>
                  {commands.map((command) => {
                    return (
                      <div className="command" key={command.id}>
                        <div className="command-img">
                          <img
                            src={command.productImage}
                            alt={command.name}
                            style={{ width: "200px", height: "200px" }}
                          />
                        </div>
                        <div className="command-data">
                          <h4>{command.productName}</h4>
                          <h5> Customer &apops s name : {command.customerName}</h5>
                          <h5> Customer &aposs email :{command.customerEmail}</h5>
                          <h5> Customer &apos s adress :{command.customerAdress}</h5>
                          <p>Product price : {command.ProductPrice} $</p>
                          <p>Quantity : {command.quantity} items</p>
                          <button
                            className={`${
                              command.status === "accepted" ||
                              command.status === "refused"
                                ? "grey-btn"
                                : "green-btn"
                            }`}
                            onClick={
                              command.status === "pending"
                                ? () => handleAcceptCommand(command.id)
                                : null
                            }
                          >
                            Accept Command
                          </button>
                          <button
                            className={`${
                              command.status === "accepted" ||
                              command.status === "refused"
                                ? "grey-btn"
                                : "red-btn"
                            }`}
                            onClick={
                              command.status === "pending"
                                ? () => handleDeclineCommand(command.id)
                                : null
                            }
                          >
                            Decline Command
                          </button>
                          <div className="achievement">
                            <p className="achievement-status">Achievement</p>
                            <div className={`${command.status} status`}></div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        )}
      </div>

      {addProductOpen && (
        <div className="pop slide-up-1">
          <h3>Add Product</h3>
          <div className="profile-container">
            <div className="product-form">
              <form encType="multipart/form-data" onSubmit={handleProductAdd} id="add-product-form">
                <div className="form-group dash">
                  <label htmlFor="product-name">Product name</label>
                  <input
                    type="text"
                    id="product-name"
                    name="name"
                    onChange={onChange}
                  />
                </div>
                <div className="form-group dash">
                  <label htmlFor="product-price">Product price</label>
                  <input
                    type="number"
                    id="product-price"
                    name="price"
                    onChange={onChange}
                  />
                </div>
                <div className="form-group dash">
                  <label htmlFor="product-category">Product category</label>
                  <input
                    type="text"
                    id="product-category"
                    name="category"
                    onChange={onChange}
                  />
                </div>
                <div className="form-group dash">
                  <label htmlFor="product-description">
                    Product description
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    cols="30"
                    rows="10"
                    onChange={onChange}
                  ></textarea>
                </div>
                <div className="form-group dash">
                  <label htmlFor="productImage">Click here to add image</label>
                  <input
                    type="file"
                    id="productImage"
                    name="image"
                    onChange={onChange}
                  />
                  {
                    file && (
                      <div className="file-preview">
                        <img src={URL.createObjectURL(file)} height={100} width={110} alt="uploaded-file"/>
                      </div>
                    )
                  }
                </div>
                <div className="form-group dash hidden">
                  <label htmlFor="shop-id">Shop Id</label>
                  <input
                    id="shop-id"
                    className="logo-hidden"
                    name="shopId"
                    value={_shop.id}
                  />
                </div>
                <div className="form-group dash">
                  <button type="submit">Add product</button>
                </div>
              </form>
            </div>
          </div>
          <button className='close-btn' onClick={handleCloseAddProduct}>
            <img src="frontend\src\assets\icons\close-square-svgrepo-com.svg" alt='close' width="35px"/>
          </button>
        </div>
        )}

        {removeProductOpen && (
        <div className="pop slide-up-2">
          <h3>Remove Product</h3>
          <div className="profile-container">
            <div className="product-form">
              <form onSubmit={handleProductRemove} id="product-remove-form">
                <div className="form-group dash">
                  <label htmlFor="productId">Select product to remove</label>
                  <select
                    id="productId"
                    name="productToRemove"
                    onChange={changeRemove}
                  >
                    {productList.map((product) => (
                      <option value={product.productId} key={product.productId}>
                        {product.productName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group dash">
                  <button type="submit">Remove product</button>
                </div>
              </form>
            </div>
          </div>
          <button className="close-btn" onClick={handleCloseRemoveProduct}>
            <img src="frontend\src\assets\icons\close-square-svgrepo-com.svg" alt='close' width="35px"/>
          </button>
        </div>
        )}

        {updateProductOpen && (
        <div className="pop slide-up-3">
          <h3>Update Product</h3>
          <div className="profile-container">
            <div className="product-form">
              <form encType="multipart/form-data" onSubmit={handleProductUpdate} id="update-product-form">
                <div className="form-group dash">
                  <label htmlFor="product-id">Select product to update</label>
                  <select
                    id="productId"
                    name="productId"
                    onChange={changeValue}
                  >
                    {productList.map((product) => (
                      <option
                        value={product.productId}
                        key={product.productid}
                        style={{ height: "60px" }}
                      >
                        {product.productName}
                        <img
                          src={product.image}
                          style={{ width: "50px", height: "50px" }}
                        />{" "}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group dash">
                  <label htmlFor="product-name">Product name</label>
                  <input
                    type="text"
                    id="product-name"
                    name="name"
                    onChange={changeValue}
                  />
                </div>
                <div className="form-group dash">
                  <label htmlFor="price">Product price</label>
                  <input
                    type="number"
                    id="product-price"
                    name="price"
                    onChange={changeValue}
                  />
                </div>
                <div className="form-group dash">
                  <label htmlFor="category">Product category</label>
                  <input
                    type="text"
                    id="product-category"
                    name="category"
                    onChange={changeValue}
                  />
                </div>
                <div className="form-group dash">
                  <label htmlFor="product-description">
                    Product description
                  </label>
                  <textarea
                    name="description"
                    id="product-description"
                    cols="30"
                    rows="10"
                    onChange={changeValue}
                  ></textarea>
                </div>
                <div className="form-group dash">
                  <label htmlFor="productImage">Click here to add image</label>
                  <input
                    type="file"
                    id="productImage"
                    name="image"
                    onChange={changeValue}
                  />
                  {
                    file && (
                      <div className="file-preview">
                        <img src={URL.createObjectURL(file)} height={100} width={110} alt="uploaded-file"/>
                      </div>
                    )
                  }
                </div>
                <div className="form-group dash">
                  <button type="submit">Update product</button>
                </div>
              </form>
            </div>
          </div>
          <button className="close-btn" onClick={handleCloseUpdateProduct}>
            <img src="frontend\src\assets\icons\close-square-svgrepo-com.svg" alt='close' width="35px"/>
          </button>
        </div>
        )}

    </div>
  );
}

export default RightHiddenbar