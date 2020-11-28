import React, { useRef, useState, useLayoutEffect } from 'react';

import './css/product_wrapper.css';

const productExample = [
  {
    id: 1,
    name: 'Wardah - EyeXpert Aqua Lash Mascara 6 g',
    discount_percentage: '1%',
    actual_price: '156.000',
    price: '44.000',
    progress: '20%',
    progress_desc: 'Segera Habis',
    thumbnail: '/assets/images/example_flash_sale_1.webp',
  },
  {
    id: 2,
    name: 'Earhook Kacamata Silicone Pengait Kuping Kacamata / Anti Slip',
    discount_percentage: '2%',
    actual_price: '123.000',
    price: '63.000',
    progress: '35%',
    progress_desc: 'Segera Habis',
    thumbnail: '/assets/images/example_flash_sale_2.webp',
  },
  {
    id: 3,
    name: 'Wardah - EyeXpert Aqua Lash Mascara 6 g',
    discount_percentage: '3%',
    actual_price: '156.000',
    price: '44.000',
    progress: '',
    progress_desc: 'Segera Habis',
    thumbnail: '/assets/images/example_flash_sale_3.webp',
  },
  {
    id: 4,
    name: 'Wardah - EyeXpert Aqua Lash Mascara 6 g',
    discount_percentage: '4%',
    actual_price: '156.000',
    price: '44.000',
    progress: '',
    progress_desc: 'Segera Habis',
    thumbnail: '/assets/images/example_flash_sale_4.webp',
  },
  {
    id: 5,
    name: 'Wardah - EyeXpert Aqua Lash Mascara 6 g',
    discount_percentage: '5%',
    actual_price: '156.000',
    price: '44.000',
    progress: '',
    progress_desc: 'Segera Habis',
    thumbnail: '/assets/images/example_flash_sale_5.webp',
  },
  {
    id: 6,
    name: 'Wardah - EyeXpert Aqua Lash Mascara 6 g',
    discount_percentage: '6%',
    actual_price: '156.000',
    price: '44.000',
    progress: '',
    progress_desc: 'Segera Habis',
    thumbnail: '/assets/images/example_flash_sale_6.webp',
  },
  {
    id: 7,
    name: 'Wardah - EyeXpert Aqua Lash Mascara 6 g',
    discount_percentage: '7%',
    actual_price: '156.000',
    price: '44.000',
    progress: '',
    progress_desc: 'Segera Habis',
    thumbnail: '/assets/images/example_flash_sale_7.webp',
  },
  {
    id: 8,
    name: 'Wardah - EyeXpert Aqua Lash Mascara 6 g',
    discount_percentage: '8%',
    actual_price: '156.000',
    price: '44.000',
    progress: '',
    progress_desc: 'Segera Habis',
    thumbnail: '/assets/images/example_flash_sale_5.webp',
  },
  {
    id: 9,
    name: 'Wardah - EyeXpert Aqua Lash Mascara 6 g',
    discount_percentage: '9%',
    actual_price: '156.000',
    price: '44.000',
    progress: '',
    progress_desc: 'Segera Habis',
    thumbnail: '/assets/images/example_flash_sale_6.webp',
  },
  {
    id: 10,
    name: 'Wardah - EyeXpert Aqua Lash Mascara 6 g',
    discount_percentage: '10%',
    actual_price: '156.000',
    price: '44.000',
    progress: '',
    progress_desc: 'Segera Habis',
    thumbnail: '/assets/images/example_flash_sale_7.webp',
  },
  {
    id: 11,
    name: 'Wardah - EyeXpert Aqua Lash Mascara 6 g',
    discount_percentage: '11%',
    actual_price: '156.000',
    price: '44.000',
    progress: '',
    progress_desc: 'Segera Habis',
    thumbnail: '/assets/images/example_flash_sale_6.webp',
  },
  {
    id: 12,
    name: 'Wardah - EyeXpert Aqua Lash Mascara 6 g',
    discount_percentage: '12%',
    actual_price: '156.000',
    price: '44.000',
    progress: '',
    progress_desc: 'Segera Habis',
    thumbnail: '/assets/images/example_flash_sale_7.webp',
  },
  {
    id: 13,
    name: 'Wardah - EyeXpert Aqua Lash Mascara 6 g',
    discount_percentage: '13%',
    actual_price: '156.000',
    price: '44.000',
    progress: '',
    progress_desc: 'Segera Habis',
    thumbnail: '/assets/images/example_flash_sale_7.webp',
  },
  {
    id: 14,
    name: 'Wardah - EyeXpert Aqua Lash Mascara 6 g',
    discount_percentage: '14%',
    actual_price: '156.000',
    price: '44.000',
    progress: '',
    progress_desc: 'Segera Habis',
    thumbnail: '/assets/images/example_flash_sale_5.webp',
  },
  {
    id: 15,
    name: 'Wardah - EyeXpert Aqua Lash Mascara 6 g',
    discount_percentage: '15%',
    actual_price: '156.000',
    price: '44.000',
    progress: '',
    progress_desc: 'Segera Habis',
    thumbnail: '/assets/images/example_flash_sale_6.webp',
  },
  {
    id: 16,
    name: 'Wardah - EyeXpert Aqua Lash Mascara 6 g',
    discount_percentage: '16%',
    actual_price: '156.000',
    price: '44.000',
    progress: '',
    progress_desc: 'Segera Habis',
    thumbnail: '/assets/images/example_flash_sale_7.webp',
  },
  {
    id: 17,
    name: 'Wardah - EyeXpert Aqua Lash Mascara 6 g',
    discount_percentage: '17%',
    actual_price: '156.000',
    price: '44.000',
    progress: '',
    progress_desc: 'Segera Habis',
    thumbnail: '/assets/images/example_flash_sale_6.webp',
  },
  {
    id: 18,
    name: 'Wardah - EyeXpert Aqua Lash Mascara 6 g',
    discount_percentage: '18%',
    actual_price: '156.000',
    price: '44.000',
    progress: '',
    progress_desc: 'Segera Habis',
    thumbnail: '/assets/images/example_flash_sale_7.webp',
  },
];

const ProductCard = () => {
  const [totalPages, setTotalPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [lastSlide, setLastSlide] = useState(0);

  const productContainer = useRef();

  function handleWindowWidth() {
    let lastSlide = 0;
    let totalPages = 1;
    if (window.innerWidth < 576) {
      lastSlide = (100 / 2) * (productExample.length % 2);
      totalPages = Math.ceil(productExample.length / 2);
    } else if (window.innerWidth >= 576 && window.innerWidth < 768) {
      lastSlide = (100 / 3) * (productExample.length % 3);
      totalPages = Math.ceil(productExample.length / 3);
    } else if (window.innerWidth >= 768 && window.innerWidth < 992) {
      lastSlide = (100 / 4) * (productExample.length % 4);
      totalPages = Math.ceil(productExample.length / 4);
    } else if (window.innerWidth >= 992 && window.innerWidth < 1200) {
      lastSlide = (100 / 5) * (productExample.length % 5);
      totalPages = Math.ceil(productExample.length / 5);
    } else {
      lastSlide = (100 / 6) * (productExample.length % 6);
      totalPages = Math.ceil(productExample.length / 6);
    }

    setTotalPages(totalPages);

    if (lastSlide === 0) {
      setLastSlide(100);
    } else {
      setLastSlide(lastSlide);
    }

    setCurrentPage(1);
    productContainer.current.style.transform = `translateX(0%)`;
  }

  useLayoutEffect(() => {
    handleWindowWidth();
    window.addEventListener('resize', handleWindowWidth);
    return () => {
      window.removeEventListener('resize', handleWindowWidth);
    };
  }, []);

  function handleSlideRight() {
    if (currentPage === totalPages) return;
    const fullSlide = 100 * currentPage;

    console.log(lastSlide);
    if (totalPages - currentPage === 1) {
      productContainer.current.style.transform = `translateX(-${lastSlide + (fullSlide - 100)}%)`;
    } else {
      productContainer.current.style.transform = `translateX(-${fullSlide}%)`;
    }

    setCurrentPage(currentPage + 1);
  }

  function handleSlideLeft() {
    if (currentPage === 1) return;
    productContainer.current.style.transform = `translateX(-${100 * (currentPage - 2)}%)`;
    setCurrentPage(currentPage - 1);
  }

  function renderProducts() {
    return productExample.map((val) => (
      <div className="product-wrapper" key={val.id}>
        <div className="product-card">
          <img src={val.thumbnail} alt="flash sale" />
          <div className="product-description">
            <div className="name">{val.name}</div>
            <div className="discount">
              <span className="discount-percentage">{val.discount_percentage}</span>
              <span className="actual-price">Rp {val.actual_price}</span>
            </div>
            <div className="price">Rp {val.price}</div>
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: val.progress }}
              ></div>
            </div>
            <div className="progress-desc">{val.progress_desc}</div>
          </div>
        </div>
      </div>
    ));
  }
  return (
    <div className="products">
      <i className="fa fa-angle-left" aria-hidden="true" onClick={handleSlideLeft}></i>
      <div className="product-ctr1">
        <div className="product-ctr2" ref={productContainer}>
          {renderProducts()}
        </div>
      </div>
      <i className="fa fa-angle-right" aria-hidden="true" onClick={handleSlideRight}></i>
    </div>
  );
};

export default ProductCard;
