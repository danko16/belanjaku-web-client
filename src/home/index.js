import React from 'react';
import CountDown from '../shared/countdown';
import ProductWrapper from '../shared/product_wrapper';

import Categories from './categories';

import './css/home.css';
import './css/categories.css';

const Home = () => {
  function renderCarouselItem() {
    let items = [];
    for (let i = 0; i < 6; i++) {
      items.push(
        <div key={i + 1} className={`item-wrapper`}>
          <div className="item">
            <img src={`/assets/images/example_ad_${i + 1}.webp`} alt="ads" />
          </div>
        </div>
      );
    }

    return items;
  }

  return (
    <div className="home">
      <section className="carousel-slide">
        <div className="carousel-container">{renderCarouselItem()}</div>
      </section>
      <section className="container">
        <div className="title">
          <div>
            <h2>Flash Sale</h2>
          </div>
          <CountDown />
          <div className="link-all">Lihat Semua</div>
        </div>
        <ProductWrapper />
      </section>
      <section className="container">
        <div className="title">
          <div>
            <h2>Kategori Pilihan</h2>
          </div>
        </div>
        <Categories />
      </section>
      <section className="container">
        <div className="title">
          <div>
            <h2>Belanja Terlaris</h2>
          </div>
          <div className="link-all">Lihat Semua</div>
        </div>
        <ProductWrapper />
      </section>
      <section className="container">
        <div className="title">
          <div>
            <h2>Sedang Trending</h2>
          </div>
          <div className="link-all">Lihat Semua</div>
        </div>
        <div className="trending-product"></div>
      </section>
    </div>
  );
};

export default Home;
