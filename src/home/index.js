import React from 'react';
import CountDown from '../shared/countdown';
import ProductWrapper from '../shared/product_wrapper';

import './css/home.css';

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
      <section className="flash-sale container">
        <div className="title">
          <div>
            <h2>Flash Sale</h2>
          </div>
          <CountDown />
          <div className="link-all">Lihat Semua</div>
        </div>
        <ProductWrapper />
      </section>
      <section className="flash-sale container">
        <div className="title">
          <div>
            <h2>Flash Sale</h2>
          </div>
          <CountDown />
          <div className="link-all">Lihat Semua</div>
        </div>
        <ProductWrapper />
      </section>
    </div>
  );
};

export default Home;
