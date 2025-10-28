"use client"

import React, { useEffect, useState } from "react";

import { useAPI } from "@/hooks/useAPI";
import { Product } from "@/types/product";
import { domainDatas, getDomainName, getProvinceName, provinceDatas } from "@/utils/provinces";
import SingleListItem from "@/components/Shop/SingleListItem";

const ShopWithoutSidebarPage = () => {
  const [selected, setSelected] = useState<string>("");

  const [products, setProducts] = useState<Product[]>([]);

  const { API } = useAPI();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const res = await API.get("/admin/products?category=SUGGEST", false, true);
    if (res.success) {
      setProducts(res.data);
    }
  };

  const selectedProducts = products.filter((p) => p.province === selected);

  return (
    <section className="overflow-hidden relative pb-20 pt-36 bg-[#f3f4f6]">
      <div className="w-full flex flex-col gap-4 justify-center items-center py-10">
        <h1 className="font-bold text-2xl xl:text-heading-4 text-dark text-center">
          Sản phẩm
        </h1>
        <p className="font-semibold rounded-full bg-primary-dark text-white px-4 py-2">
          Tinh tuyển (hộp gợi ý)
        </p>
      </div>
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        <div className="w-full flex justify-between items-center">
          <h3 className="w-[20%] font-bold text-base xl:text-xl">
            Chọn tỉnh thành
          </h3>
          <select
            name="province"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className="w-[80%] border border-gray-3 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
          >
            <option value="">Tất cả</option>
            {domainDatas.map((d) => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>
        </div>
        {selected ? (
          <div className="flex flex-col gap-7.5 mt-10">
            <div className="w-full">
              {/* <!-- Products Grid Tab Content Start --> */}
              <div className="w-full flex justify-between items-center">
                <h3 className="font-bold text-heading-5 mb-5">
                  {getDomainName(selected)}
                </h3>
              </div>
              <div className="flex flex-col gap-7.5">
                {selectedProducts.length === 0 ? (
                  <div className="col-span-full text-center py-8 text-gray-500">
                    Chưa có sản phẩm nào
                  </div>
                ) : (
                  selectedProducts.map((item, key) => (
                    <SingleListItem item={item} key={key} />
                  ))
                )}
              </div>
              {/* <!-- Products Grid Tab Content End --> */}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-7.5 mt-10">
            {products.length === 0 ? (
              <div className="col-span-full text-center py-8 text-gray-500">
                Chưa có sản phẩm nào
              </div>
            ) : (
              domainDatas.map((d) => {
                const data = products.filter((product) => product.province === d.id);
                if (data.length > 0)
                  return (
                    <div key={d.id} className="w-full">
                      {/* <!-- Products Grid Tab Content Start --> */}
                      <div className="w-full flex justify-between items-center">
                        <h3 className="font-bold text-heading-5 mb-5">
                          {d.name}
                        </h3>
                        <button className="text-primary hover:text-primary-hover" onClick={() => setSelected(d.id)}>
                          Xem thêm
                        </button>
                      </div>
                      <div className="flex flex-col gap-7.5">
                        {data.slice(0, 2).map((item, key) => (
                          <SingleListItem item={item} key={key} />
                        ))}
                      </div>
                      {/* <!-- Products Grid Tab Content End --> */}
                    </div>
                  )
              })
            )}
          </div>
        )}
      </div>
    </section >
  );
};

export default ShopWithoutSidebarPage;
