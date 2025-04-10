import React, { useState } from "react";
import { motion, Reorder } from "framer-motion";

const UserProfile: React.FC = () => {
  const user = {
    name: "Bakr Al-Lozi",
    avatarUrl: "https://via.placeholder.com/150",
    salesCount: 128,
  };

  const initialProducts = [
    { id: 1, name: "منتج 1", price: 50, image: "https://via.placeholder.com/300x200" },
    { id: 2, name: "منتج 2", price: 70, image: "https://via.placeholder.com/300x200" },
    { id: 3, name: "منتج 3", price: 120, image: "https://via.placeholder.com/300x200" },
    { id: 4, name: "منتج 4", price: 90, image: "https://via.placeholder.com/300x200" },
    // { id: 5, name: "منتج 5", price: 60, image: "https://via.placeholder.com/300x200" },
    // { id: 6, name: "منتج 6", price: 80, image: "https://via.placeholder.com/300x200" },
    // { id: 7, name: "منتج 7", price: 110, image: "https://via.placeholder.com/300x200" },
    // { id: 8, name: "منتج 8", price: 95, image: "https://via.placeholder.com/300x200" },
  ];

  const [products, setProducts] = useState(initialProducts);

  const chunkArray = (arr: any[], size: number) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (_, i) => arr.slice(i * size, i * size + size));

  const productRows = chunkArray(products, 4);

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat p-8 space-y-20"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1616627459511-2db569f32514?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')",
      }}
    >
      {/* بطاقة المستخدم */}
      <div className="backdrop-blur-sm bg-white/30 rounded-xl shadow-xl p-8 flex items-center space-x-6">
        <img
          src={user.avatarUrl}
          alt={user.name}
          className="w-24 h-24 rounded-full border-4 border-yellow-800 shadow-md"
        />
        <div>
          <h1 className="text-3xl font-bold text-yellow-900">{user.name}</h1>
          <p className="text-yellow-700">المبيعات: {user.salesCount}</p>
        </div>
      </div>

      {/* المنتجات على رفوف */}
      <div className="space-y-24">
        <h2 className="text-3xl font-bold text-center text-yellow-800 drop-shadow-md">
          مكتبة المنتجات
        </h2>

        {productRows.map((row, index) => (
          <div key={index} className="relative mb-20">
            {/* المنتجات */}
            <Reorder.Group
              axis="x"
              values={products}
              onReorder={setProducts}
              className="flex justify-center gap-16 flex-wrap relative z-10"
            >
              {row.map((product) => (
                <Reorder.Item
                  key={product.id}
                  value={product}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white shadow-2xl rounded-lg overflow-hidden w-48 cursor-grab active:cursor-grabbing"
                  style={{ boxShadow: "0 6px 15px rgba(0,0,0,0.2)" }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4 text-center">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {product.name}
                    </h3>
                    <p className="text-gray-600">{product.price} $</p>
                    <button className="w-full py-2 mt-3 bg-yellow-800 text-white rounded hover:bg-yellow-900 transition">
                      عرض المنتج
                    </button>
                  </div>
                </Reorder.Item>
              ))}
            </Reorder.Group>

            {/* رف خشبي */}
            <div
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[95%] h-8 rounded-full shadow-lg"
              style={{
                background: "linear-gradient(90deg, #8B5E3C, #A97454, #8B5E3C)",
                boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
              }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfile;
