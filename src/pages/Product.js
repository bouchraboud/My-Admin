import { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import "./Productlist.css";

const firebaseConfig = {
    // Your Firebase configuration
    apiKey: "AIzaSyDTETlCetLThB_xkGSi-cPzctRqZGG_G2E",
  authDomain: "shopsavvy1-470e8.firebaseapp.com",
  projectId: "shopsavvy1-470e8",
  storageBucket: "shopsavvy1-470e8.appspot.com",
  messagingSenderId: "8106289071",
  appId: "1:8106289071:web:161f3664d9ff673512b15a",
  measurementId: "G-Y0GXMF37CK"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to fetch products from Firestore
export async function fetchProducts() {
  const productsRef = collection(db, 'Products');
  const snapshot = await getDocs(productsRef);
  const products = snapshot.docs.map(doc => doc.data());
  return products;
}

// ProductPage component to fetch and render products
function ProductPage() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
      // Call fetchProducts when the component mounts
      fetchProducts().then(products => {
        setProducts(products);
      });
    }, []);
  
    return (
      <div className="product-list">
      {products.map(product => (
        <div key={product.id} className="product-card">
          <h3 className="product-name">{product.Nom}</h3>
          <p className="product-description">{product.Constituants}</p>
          <img className="product-image" src={product.Image} alt={product.Nom} />
          <p className="product-description">{product.Pays}</p>
          <p className="product-price">Price: {product.Prix} DH</p>
        </div>
      ))}
    </div>
      
    
    );
}

export default ProductPage;
