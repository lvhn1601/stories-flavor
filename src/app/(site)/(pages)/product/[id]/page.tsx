"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { usePreviewSlider } from "@/app/context/PreviewSliderContext";
import { useAPI } from "@/hooks/useAPI";
import { Product } from "@prisma/client";
import { useParams } from "next/navigation";

const ShopDetailsPage = () => {
  const { openPreviewModal } = usePreviewSlider();
  const [previewImg, setPreviewImg] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);
  const { id } = useParams();
  const { API } = useAPI();

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    const res = await API.get(`/product?id=${id}`, false, true);
    if (res.success) setProduct(res.data);
  };

  console.log(product)

  if (!product) return <div className="text-center py-20">Đang tải...</div>;

  return (
    <main className="mt-[120px]">
      <div className="w-full flex flex-col gap-4 justify-center items-center py-5">
        <h1 className="font-bold text-2xl xl:text-heading-4 text-dark text-center">
          Sản phẩm
        </h1>
        <p className="font-semibold rounded-full bg-primary-dark text-white px-4 py-2">
          Thượng vị (hộp cao cấp)
        </p>
      </div>
      {/* === PRODUCT SECTION === */}
      <section className="py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-0">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* === LEFT IMAGE SECTION === */}
            <div className="w-full lg:w-1/2 flex flex-col items-center">
              <div className="relative bg-white border-gray-1 border rounded-xl shadow-1 flex items-center justify-center p-4 sm:p-6 w-full">
                <button
                  onClick={openPreviewModal}
                  aria-label="button for zoom"
                  className="gallery__Image w-11 h-11 rounded-[5px] bg-gray-1 shadow-1 flex items-center justify-center ease-out duration-200 text-dark hover:text-blue absolute top-4 lg:top-6 right-4 lg:right-6 z-50"
                >
                  <svg
                    className="fill-current"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M9.11493 1.14581L9.16665 1.14581C9.54634 1.14581 9.85415 1.45362 9.85415 1.83331C9.85415 2.21301 9.54634 2.52081 9.16665 2.52081C7.41873 2.52081 6.17695 2.52227 5.23492 2.64893C4.31268 2.77292 3.78133 3.00545 3.39339 3.39339C3.00545 3.78133 2.77292 4.31268 2.64893 5.23492C2.52227 6.17695 2.52081 7.41873 2.52081 9.16665C2.52081 9.54634 2.21301 9.85415 1.83331 9.85415C1.45362 9.85415 1.14581 9.54634 1.14581 9.16665L1.14581 9.11493C1.1458 7.43032 1.14579 6.09599 1.28619 5.05171C1.43068 3.97699 1.73512 3.10712 2.42112 2.42112C3.10712 1.73512 3.97699 1.43068 5.05171 1.28619C6.09599 1.14579 7.43032 1.1458 9.11493 1.14581ZM16.765 2.64893C15.823 2.52227 14.5812 2.52081 12.8333 2.52081C12.4536 2.52081 12.1458 2.21301 12.1458 1.83331C12.1458 1.45362 12.4536 1.14581 12.8333 1.14581L12.885 1.14581C14.5696 1.1458 15.904 1.14579 16.9483 1.28619C18.023 1.43068 18.8928 1.73512 19.5788 2.42112C20.2648 3.10712 20.5693 3.97699 20.7138 5.05171C20.8542 6.09599 20.8542 7.43032 20.8541 9.11494V9.16665C20.8541 9.54634 20.5463 9.85415 20.1666 9.85415C19.787 9.85415 19.4791 9.54634 19.4791 9.16665C19.4791 7.41873 19.4777 6.17695 19.351 5.23492C19.227 4.31268 18.9945 3.78133 18.6066 3.39339C18.2186 3.00545 17.6873 2.77292 16.765 2.64893ZM1.83331 12.1458C2.21301 12.1458 2.52081 12.4536 2.52081 12.8333C2.52081 14.5812 2.52227 15.823 2.64893 16.765C2.77292 17.6873 3.00545 18.2186 3.39339 18.6066C3.78133 18.9945 4.31268 19.227 5.23492 19.351C6.17695 19.4777 7.41873 19.4791 9.16665 19.4791C9.54634 19.4791 9.85415 19.787 9.85415 20.1666C9.85415 20.5463 9.54634 20.8541 9.16665 20.8541H9.11494C7.43032 20.8542 6.09599 20.8542 5.05171 20.7138C3.97699 20.5693 3.10712 20.2648 2.42112 19.5788C1.73512 18.8928 1.43068 18.023 1.28619 16.9483C1.14579 15.904 1.1458 14.5696 1.14581 12.885L1.14581 12.8333C1.14581 12.4536 1.45362 12.1458 1.83331 12.1458ZM20.1666 12.1458C20.5463 12.1458 20.8541 12.4536 20.8541 12.8333V12.885C20.8542 14.5696 20.8542 15.904 20.7138 16.9483C20.5693 18.023 20.2648 18.8928 19.5788 19.5788C18.8928 20.2648 18.023 20.5693 16.9483 20.7138C15.904 20.8542 14.5696 20.8542 12.885 20.8541H12.8333C12.4536 20.8541 12.1458 20.5463 12.1458 20.1666C12.1458 19.787 12.4536 19.4791 12.8333 19.4791C14.5812 19.4791 15.823 19.4777 16.765 19.351C17.6873 19.227 18.2186 18.9945 18.6066 18.6066C18.9945 18.2186 19.227 17.6873 19.351 16.765C19.4777 15.823 19.4791 14.5812 19.4791 12.8333C19.4791 12.4536 19.787 12.1458 20.1666 12.1458Z"
                      fill=""
                    />
                  </svg>
                </button>

                <Image
                  src={product.images[previewImg]}
                  alt="products-details"
                  width={400}
                  height={400}
                />
              </div>

              {/* Thumbnails */}
              <div className="flex flex-wrap sm:flex-nowrap gap-3 sm:gap-4 mt-5 justify-center">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setPreviewImg(i)}
                    className={`w-20 h-20 rounded-lg shadow-1 border-2 overflow-hidden transition ${i === previewImg
                      ? "border-primary"
                      : "border-transparent hover:border-primary/60"
                      }`}
                  >
                    <Image
                      src={img}
                      alt="thumbnail"
                      width={80}
                      height={80}
                      className="object-cover w-full h-full"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* === RIGHT DETAILS SECTION === */}
            <div className="w-full lg:w-1/2 space-y-6">
              <h1 className="text-2xl sm:text-3xl font-semibold text-dark">
                {product.name}
              </h1>

              <p className="text-xl font-medium text-primary">
                {product.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VNĐ
              </p>

              {/* Quantity + Buy */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center border border-gray-3 rounded-md">
                  <button
                    onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                    className="w-10 h-10 flex items-center justify-center hover:text-blue transition"
                  >
                    −
                  </button>
                  <span className="w-12 text-center border-x border-gray-3">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center hover:text-blue transition"
                  >
                    +
                  </button>
                </div>

                <button className="bg-primary hover:bg-primary-dark text-white font-medium px-6 py-3 rounded-md transition">
                  Mua ngay
                </button>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-xl font-semibold mb-2">Mô tả</h3>
                <div
                  className="prose max-w-none text-dark/80"
                  dangerouslySetInnerHTML={{ __html: product.description || "" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === REVIEWS SECTION === */}
      <section className="py-16 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-dark mb-6">Đánh giá</h2>

          <form className="mb-8">
            <textarea
              rows={5}
              placeholder="Viết đánh giá của bạn..."
              className="w-full border border-gray-3 rounded-md p-4 outline-none focus:border-primary focus:shadow-input"
            ></textarea>
            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <span>Tối đa 250 ký tự</span>
              <span>0/250</span>
            </div>
            <button
              type="submit"
              className="bg-primary text-white px-6 py-3 rounded-md mt-3 hover:bg-primary-dark transition"
            >
              Thêm đánh giá
            </button>
          </form>

          {/* Example review items */}
          <div className="space-y-5">
            {[1, 2, 3].map((r) => (
              <div key={r} className="rounded-xl bg-white shadow-lg p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <a href="#" className="flex items-center gap-4">
                    <div className="w-12.5 h-12.5 rounded-full overflow-hidden">
                      <Image
                        src="/images/users/user-01.jpg"
                        alt="author"
                        className="w-12.5 h-12.5 rounded-full overflow-hidden"
                        width={50}
                        height={50}
                      />
                    </div>

                    <div>
                      <h3 className="font-medium text-dark">
                        Davis Dorwart
                      </h3>
                      <p className="text-custom-sm">
                        Serial Entrepreneur
                      </p>
                    </div>
                  </a>
                </div>

                <p className="text-dark mt-6">
                  “Lorem ipsum dolor sit amet, adipiscing elit. Donec
                  malesuada justo vitaeaugue suscipit beautiful
                  vehicula’’
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* <RecentlyViewdItems /> */}
    </main>
  );
};

export default ShopDetailsPage;
