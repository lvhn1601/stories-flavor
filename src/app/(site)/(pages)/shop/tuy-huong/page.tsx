"use client"

import React, { useEffect, useState } from "react";

import { useAPI } from "@/hooks/useAPI";
import { Product } from "@/types/product";
import { getProvinceName, provinceDatas } from "@/utils/provinces";
import VietnamMap from "@/components/Common/VietnamMap";
import SingleGridItem from "@/components/Shop/SingleGridItem";

const ShopWithoutSidebarPage = () => {
  const [selected, setSelected] = useState<string | null>(null);

  const [products, setProducts] = useState<Product[]>([]);

  const { API } = useAPI();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const res = await API.get("/admin/products?category=OPTIONAL", false, true);
    if (res.success) {
      setProducts(res.data);
    }
  };

  const selectedProducts = products.filter((p) => p.province === selected);

  const handleProvinceSelect = (pid) => {
    if (selected === pid) {
      setSelected(null);
    } else {
      setSelected(pid);
    }
  }

  return (
    <section className="overflow-hidden relative pb-20">
      <div className="w-full flex flex-col gap-4 justify-center items-center py-10">
        <h1 className="font-bold text-2xl xl:text-heading-4 text-dark text-center">
          Sản phẩm
        </h1>
        <p className="font-semibold rounded-full bg-primary-dark text-white px-4 py-2">
          Tùy Hương (hộp tự chọn)
        </p>
      </div>
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        <div className="w-full">
          <VietnamMap value={selected} onProvinceClick={handleProvinceSelect} />
        </div>
        {selected ? (
          <div className="flex flex-col gap-7.5 mt-10">
            <div className="w-full">
              {/* <!-- Products Grid Tab Content Start --> */}
              <div className="w-full flex justify-between items-center">
                <h3 className="font-bold text-heading-5 mb-5">
                  {getProvinceName(selected)}
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-7.5 gap-y-9">
                {selectedProducts.length === 0 ? (
                  <div className="col-span-full text-center py-8 text-gray-500">
                    Chưa có sản phẩm nào
                  </div>
                ) : (
                  selectedProducts.map((item, key) => (
                    <SingleGridItem item={item} key={key} />
                  ))
                )}
              </div>
              {/* <!-- Products Grid Tab Content End --> */}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-7.5 mt-10">
            {provinceDatas.map((p) => {
              const data = products.filter((product) => product.province === p.id);
              if (data.length > 0)
                return (
                  <div key={p.id} className="w-full">
                    {/* <!-- Products Grid Tab Content Start --> */}
                    <div className="w-full flex justify-between items-center">
                      <h3 className="font-bold text-heading-5 mb-5">
                        {p.name}
                      </h3>
                      <button className="text-primary hover:text-primary-hover" onClick={() => setSelected(p.id)}>
                        Xem thêm
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-7.5 gap-y-9">
                      {data.slice(0, 4).map((item, key) => (
                        <SingleGridItem item={item} key={key} />
                      ))}
                    </div>
                    {/* <!-- Products Grid Tab Content End --> */}
                  </div>
                )
            })}
          </div>
        )}
      </div>
    </section >
  );
};

export default ShopWithoutSidebarPage;
