import React, { useState, useRef, useLayoutEffect } from 'react';

const categories = [
  {
    name: 'Handphone & Tablet',
    thumbnail: '/assets/images/category_handphone.jpg',
  },
  {
    name: 'Otomotif',
    thumbnail: '/assets/images/category_automotive.jpg',
  },
  {
    name: 'Kecantikan',
    thumbnail: '/assets/images/category_beauty.webp',
  },
  {
    name: 'Perawatan Tubuh',
    thumbnail: '/assets/images/category_body_care.webp',
  },
  {
    name: 'Kamera',
    thumbnail: '/assets/images/category_camera.jpg',
  },
  {
    name: 'Pertukangan',
    thumbnail: '/assets/images/category_carpentery.webp',
  },
  {
    name: 'Fashion Anak & Bayi',
    thumbnail: '/assets/images/category_child_and_baby_fashion.webp',
  },
  {
    name: 'Elektronik',
    thumbnail: '/assets/images/category_electronics.webp',
  },
  {
    name: 'Makanan & Minuman',
    thumbnail: '/assets/images/category_food.jpg',
  },
  {
    name: 'Gaming',
    thumbnail: '/assets/images/category_gaming.jpg',
  },
  {
    name: 'Rumah Tangga',
    thumbnail: '/assets/images/category_house_hold.webp',
  },
  {
    name: 'Fashion Islami',
    thumbnail: '/assets/images/category_islamic_fashion.jpg',
  },
  {
    name: 'Dapur',
    thumbnail: '/assets/images/category_kitchen.jpg',
  },
  {
    name: 'Komputer dan Laptop',
    thumbnail: '/assets/images/category_laptop.jpg',
  },
  {
    name: 'Fashion Pria',
    thumbnail: '/assets/images/category_man_fashion.jpg',
  },
  {
    name: 'Kesehatan',
    thumbnail: '/assets/images/category_medicine.jpg',
  },
  {
    name: 'Perlengkapan Ibu & Bayi',
    thumbnail: '/assets/images/category_mother_and_baby.jpg',
  },
  {
    name: 'Olahraga',
    thumbnail: '/assets/images/category_sport.jpg',
  },
  {
    name: 'Fashion Wanita',
    thumbnail: '/assets/images/category_woman_fashion.jpg',
  },
  {
    name: 'Hobby',
    thumbnail: '/assets/images/category_hobby.webp',
  },
];

const Categories = () => {
  const [totalPages, setTotalPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [lastSlide, setLastSlide] = useState(0);

  const categoryContainer = useRef();

  function handleWindowWidth() {
    let lastSlide = 0;
    let totalPages = 1;
    if (window.innerWidth < 576) {
      lastSlide = (100 / 4) * (categories.length % 4);
      totalPages = Math.ceil(categories.length / 4);
    } else if (window.innerWidth >= 576 && window.innerWidth < 768) {
      lastSlide = (100 / 6) * (categories.length % 6);
      totalPages = Math.ceil(categories.length / 6);
    } else if (window.innerWidth >= 768 && window.innerWidth < 992) {
      lastSlide = (100 / 8) * (categories.length % 8);
      totalPages = Math.ceil(categories.length / 8);
    } else if (window.innerWidth >= 992 && window.innerWidth < 1200) {
      lastSlide = (100 / 10) * (categories.length % 10);
      totalPages = Math.ceil(categories.length / 10);
    } else {
      lastSlide = (100 / 12) * (categories.length % 12);
      totalPages = Math.ceil(categories.length / 12);
    }

    setTotalPages(totalPages);

    if (lastSlide === 0) {
      setLastSlide(100);
    } else {
      setLastSlide(lastSlide);
    }

    setCurrentPage(1);
    categoryContainer.current.style.transform = `translateX(0%)`;
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

    if (totalPages - currentPage === 1) {
      categoryContainer.current.style.transform = `translateX(-${lastSlide + (fullSlide - 100)}%)`;
    } else {
      categoryContainer.current.style.transform = `translateX(-${fullSlide}%)`;
    }

    setCurrentPage(currentPage + 1);
  }

  function handleSlideLeft() {
    if (currentPage === 1) return;
    categoryContainer.current.style.transform = `translateX(-${100 * (currentPage - 2)}%)`;
    setCurrentPage(currentPage - 1);
  }

  function renderCategories() {
    const data = [];
    for (let i = 0; i < categories.length; i += 2) {
      data.push(
        <div key={i} className="category-wrapper">
          <div className="category-top">
            <img src={categories[i].thumbnail} alt="category" />
            <div className="category-name">{categories[i].name}</div>
          </div>
          {categories[i + 1] && (
            <div className="category-bottom">
              <img src={categories[i + 1].thumbnail} alt="category" />
              <div className="category-name">{categories[i + 1].name}</div>
            </div>
          )}
        </div>
      );
    }
    return data;
  }
  return (
    <div className="categories">
      <i className="fa fa-angle-left" aria-hidden="true" onClick={handleSlideLeft}></i>
      <div className="ctr1">
        <div className="ctr2" ref={categoryContainer}>
          {renderCategories()}
        </div>
      </div>
      <i className="fa fa-angle-right" aria-hidden="true" onClick={handleSlideRight}></i>
    </div>
  );
};

export default Categories;
