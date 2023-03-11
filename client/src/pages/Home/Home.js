import React from "react";
import Desert from "../../assets/Desert.jpg";
import Header from "../../components/Header";
import Product from "../../components/Product";
import "./Home.css";

function Home() {
  return (
    <div>
      <Header />
      <div className="home">
        <div className="home_container">
          <img className="home_image" src={Desert} alt="Desert art" />
          <div className="home_row">
            <Product
              id="223456"
              title="PlayStation PS5 Console – God of War Ragnarök Bundle"
              price={599.99}
              image="https://m.media-amazon.com/images/I/61SUJDrCTLL._AC_UY436_FMwebp_QL65_.jpg"
              rating={5}
            />
            <Product
              id="124563"
              title="LEGO DC Batman Batmobile Tumbler"
              price={269.95}
              image="https://m.media-amazon.com/images/I/81reRlhfewL._AC_SX679_.jpg"
              rating={5}
            />
          </div>
          <div className="home_row">
            <Product
              id="334552"
              title="3Pcs Modern Bookshelf Decor Sitting Thinker Statue Abstract Sculpture"
              price={29.89}
              image="https://m.media-amazon.com/images/I/61gFFS16rjL._AC_SX679_.jpg"
              rating={4}
            />
            <Product
              id="669035"
              title="ZOTAC Gaming GeForce RTX 4080 16GB Trinity OC"
              price={1199.59}
              image="https://m.media-amazon.com/images/I/819pla7Wo3L._AC_UY436_FMwebp_QL65_.jpg"
              rating={3}
            />
            <Product
              id="445789"
              title="Amazon Fire TV 50” 4-Series 4K UHD smart TV"
              price={289.99}
              image="https://m.media-amazon.com/images/I/61IZcaEIt4L._AC_UY436_FMwebp_QL65_.jpg"
              rating={4}
            />
          </div>
          <div className="home_row">
            <Product
              ID="556790"
              title="SAMSUNG 49” Odyssey G9 Gaming Monitor"
              price={1284.24}
              image="https://m.media-amazon.com/images/I/61SQz8S+fEL._AC_SX679_.jpg"
              rating={5}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
