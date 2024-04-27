import axios from "axios";
import { FetchPosts } from "../Components/viewPost";
import { user } from "./user";

const fetchPosts = async () => {
  try {
    const _posts = await FetchPosts();
    posts = _posts;
  } catch (error) {
    console.error("Error while getting posts in shop.jsx: ", error);
  }
};
fetchPosts();
// récupération de la boutique de l'utilisateur
export const getShops = async () => {
  try {
    const response = await axios.get(
      `http://localhost:8081/get-shops/${user.id}`
    );
    const data = response.data.userShop;

    if (data.length === 0) {
      console.log("No shop found");
      return null;
    }
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération des boutiques");
    return null;
  }
};

/* axios.defaults.withCredentials = true;
    axios.get(`http://localhost:3000/get-commands/${shopId}`).then((res) => {
      console.log(res.commands);
      if (res.commands) {
        const _commands = res.commands;
      }
    });*/

export const shop = {
  id: 1,
  shopName: "ANC Square",
  holderName: "ancedric",
  followers: 0,
  following: 0,
  closeTime: "18:30:00",
  openTime: "08:00:00",
  country: "Cameroon",
  timeZone: "UTC+1",
};

//récupération des produits

/*const getProducts = async () => {
  try{
  const response = await axios.get(`localhost:8081/get-products/${shop.id}`)
  const data = response.data
  if(!data.products||data.products.length === 0){
    console.log("No product found in this shop")
    return []
  }
  const products = data.products;
  const productList = products.map((product)=> {
            const _product = {
              id: product.shopId, 
              name: product.productName,
              price: product.price,
              stock: product.stock,
              likes: product.nbLikes,
              sales: product.nbSales,
              promotion: product.promotion,
              status: product.status,
              category: product.category,
              description: product.description,
              image: product.image,
              date: product.date,
            };
            return _product;
          })
          console.log('produits:', productList)
          return productList
  }catch(error){
    console.error('Erreur lors de la récupération des produits dans shop.jsx :', error)
    return []
  }
}

export const productList = getProducts();*/

export const products = [
  {
    id: 1,
    image: "frontend\\src\\assets\\images\\fashion-shoes-sneakers.jpg",
    name: "Fasion Shoes sneakers",
    price: 30,
    description: "Fashion sport shoes",
    category: "Shoes",
    stock: 15,
    nbLikes: 10,
    nbSales: 5,
  },
  {
    id: 2,
    image:
      "frontend\\src\\assets\\images\\beautiful-elegance-luxury-fashion-green-handbag.jpg",
    name: "Fashion green handbag",
    price: 15,
    description: "Elegance luxury fashion handbag",
    category: "Handbag",
    stock: 6,
    nbLikes: 11,
    nbSales: 8,
  },
  {
    id: 3,
    image: "frontend\\src\\assets\\images\\men-watch-wallpaper.jpg",
    name: "Men watch",
    price: 45,
    description: "Elegant men watch",
    category: "Luxury",
    stock: 10,
    nbLikes: 6,
    nbSales: 2,
  },
  {
    id: 4,
    image: "frontend\\src\\assets\\images\\pair-trainers.jpg",
    name: "Pair trainers",
    price: 19.99,
    description: "Sport shoes trainers",
    category: "Shoes",
    stock: 5,
    nbLikes: 16,
    nbSales: 8,
  },
  {
    id: 5,
    image: "frontend\\src\\assets\\images\\pink-handbags.jpg",
    name: "Hand bag",
    price: 12,
    description: "Fashion pink handbag",
    category: "Handbag",
    stock: 20,
    nbLikes: 5,
    nbSales: 4,
  },
];

export const commandList = [
  {
    id: 1,
    customerName: "JohnDoe",
    customerEmail: "johndoe@email.com",
    customerAdress: "2 Rue du Commerce Dubaï",
    productName: "Pair Trainers",
    productImage: "frontend\\src\\assets\\images\\pair-trainers.jpg",
    ProductPrice: 19.99,
    quantity: 2,
    status: "accepted",
  },
  {
    id: 2,
    customerName: "Alexia2",
    customerEmail: "alexia2@email.com",
    customerAdress: "13 sweet street New York",
    productName: "Fashion Green Hand bag",
    productImage:
      "frontend\\src\\assets\\images\\beautiful-elegance-luxury-fashion-green-handbag.jpg",
    ProductPrice: 15,
    quantity: 1,
    status: "pending",
  },
  {
    id: 3,
    customerName: "Michaëlzzz",
    customerEmail: "mickaelz@email.com",
    customerAdress: "200 rue du marché Belgrade",
    productName: "Men Watch",
    productImage: "frontend\\src\\assets\\images\\men-watch-wallpaper.jpg",
    ProductPrice: 45,
    quantity: 1,
    status: "refused",
  },
];

export const notifications = [
  {
    id: 1,
    shopId: 1,
    shopName: "ANC Square",
    content: `New update from a shop that you follow `,
    link: `/view-post`,
    text: "There's a new update that may interest you. Take a look at it...",
    date: Date.now(),
    status: "unread",
  },
  {
    id: 2,
    shopId: 1,
    shopName: "ANC Square",
    content: `New update from a shop that you follow `,
    link: `/view-post`,
    text: "There's a new update that may interest you. Take a look at it...",
    date: Date.now(),
    status: "read",
  },
  {
    id: 3,
    shopId: 1,
    shopName: "ANC Square",
    content: `New update from a shop that you follow `,
    link: `/view-post`,
    text: "There's a new update that may interest you. Take a look at it...",
    date: Date.now(),
    status: "unread",
  },
];

export const dailySales = [12, 3, 8, 5, 15, 9, 2];

const FetchProducts = async () => {
  try {
    const response = await axios.get(
      `http://localhost:8081/get-products/${shop.id}`
    );
    const data = response.data;

    if (!data || !data.products) {
      console.log("Erreur lors de la récupération des produits dans shop.jsx");
      console.log(data);
      return data;
    }
    console.log("data 2:", data);
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération des produits :", error);
    // Gérer l'erreur de manière appropriée, par exemple en lançant une exception ou en retournant une valeur par défaut.
    throw error;
  }
};

export const productsList = FetchProducts();

const getNotifs = async () => {
  try {
    const response = await axios.get(
      `http://localhost:8081/get-notif/${user.id}`
    );
    const data = response.data;

    if (!data.notifications || data.notifications.length === 0) {
      console.log("No notification found");
    } else {
      console.log("notifications:", data.notifications);
      const notifs = data.notifications[0];
      const _notification = {
        shopId: notifs.shopId,
        shopName: notifs.shopName,
        holderName: notifs.holderName,
        followers: notifs.followers,
        following: notifs.following,
      };
      console.log("Notifications: ", _notification);
    }
  } catch (error) {
    console.error("Erreur lors de la récupération de la notification");
  }
};

export const notifs = getNotifs();

/*
  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios
      .get(`http://localhost:3000/get-appointments/${shopId}`)
      .then((res) => {
        console.log(res.appointments);
        if (res.appointments) {
          setAppointmentsData(res.appointments);
        }
      });
  });

  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios
      .get(`http://localhost:3000/get-payment-modes/${shopId}`)
      .then((res) => {
        console.log(res.payments);
        if (res.payments) {
          setPaymentMethod(res.payments);
        }
      });
  });

  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios.get("http://localhost:3000/get-delivery-modes").then((res) => {
      console.log(res.deliveryModes);
      if (res.deliveryModes) {
        setDeliveryMode(res.deliveryModes);
      }
    });
  });

  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios.get(`http://localhost:3000/get-dailysales/${shopId}`).then((res) => {
      console.log(res.dailySales);
      if (res.dailySales) {
        setDailySales(res.dailySales);
      }
    });
  });*/
