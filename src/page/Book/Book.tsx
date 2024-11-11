import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import BookStore from "../../assets/home/bookstore_image.webp";
import Category from "./Category";
import Price from "./Price";
import Filter from "./Filter";
import BookData from "./BookData";
import Pagination from "./Pagination";
import "./style.css";

// Define types for the book data
type Book = {
  id: number;
  title: string;
  category: string | string[];
  price: number;
  img: string;
};

function Book() {
  const books: Book[] = BookData;

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const itemsPerPage = 6;
  const totalPages = Math.ceil(books.length / itemsPerPage);
  const currentBooks = books.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    console.log(selectedCategory);
  };

  const filteredBooks = selectedCategory
    ? BookData.filter((book) => {
        if (Array.isArray(book.category)) {
          return book.category.some((cat) =>
            cat.toLowerCase().replace(/\s+/g, '-').includes(selectedCategory.toLowerCase().replace(/\s+/g, '-'))
          );
        }
        return book.category.toLowerCase().replace(/\s+/g, '-').includes(selectedCategory.toLowerCase().replace(/\s+/g, '-'));
      })
    : BookData;

  return (
    <div>
      <div className="section warp_background">
        <div className="container">
          <img
            src={BookStore}
            alt="BookStore"
            className="img-fluid"
            style={{ maxWidth: "60%", padding: "20px 0px 20px 0px" }}
          />

          <div className="bg_collection section">
            <div className="row">
              <aside className="dqdt-sidebar sidebar left-content col-lg-3 col-md-4 col-sm-4">
                <Category onCategorySelect={handleCategorySelect} />
                <Price />
              </aside>
              <div className="main_container collection col-lg-9 col-md-12 col-sm-12">
                <div className="warp-srt-title">
                  <h1 className="title-module d-none">Tất cả sản phẩm</h1>
                  {/* <Filter /> */}
                </div>
                <div className="category-products products">
                  <section className="products-view products-view-grid collection_reponsive">
                    <div className="row">
                      {currentBooks.map((item) => {
                        return (
                          <div className="col-4 product-col" key={item.id}>
                            <div className="item_product_main">
                              <form action="">
                                <a href="" className="image_thumb">
                                  <img
                                    src={item.img}
                                    className="lazyload img-responsive center-block loaded"
                                    alt={item.title}
                                  />
                                </a>
                                <div className="info-product">
                                  <h3 className="product-name">
                                    <a href="" title={item.title}>{item.title}</a>
                                  </h3>
                                  <div className="price-box">
                                    {item.price.toLocaleString('vi-VN')}đ
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <Pagination
                      totalPages={totalPages}
                      currentPage={currentPage}
                      onPageChange={handlePageChange}
                    />
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Book;
