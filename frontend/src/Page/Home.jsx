import { useEffect, useState } from "react";
import { useProductStore, useUserStore } from "../Store/Store";
import { FaRegEdit } from "react-icons/fa";
import { LuDelete } from "react-icons/lu";
import { Link } from "react-router-dom";

const Home = () => {
  const { fetchProduct, products, deleteProduct } = useProductStore();
  const { fetchUser, users } = useUserStore();
  const [deleteId, setDeleteId] = useState("");

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  function handleShowDelete(id) {
    setDeleteId(id);
  }

  const handleDeleteProduct = async (id) => {
    const { success, message } = await deleteProduct(id); // Use deleteProduct instead of deletedProduct
    console.log("Success:", success);
    console.log("Message:", message);
    if (success) {
      alert("Product deleted successfully");
      setDeleteId(""); // Clear the delete ID or any related state after deletion
    }
  };

  return (
    <>
      <h1 className="text-center text-3xl text-white font-bold">
        Product List
      </h1>
      <div className="grid md:grid-cols-3 grid-cols-2 mt-8 gap-3">
        {products.map((p) => (
          <div className=" rounded-2xl bg-gray-700" key={p._id}>
            <div className="h-40 rounded-t-2xl overflow-hidden w-full">
              <img className="w-full" src={p.image} alt={p.name} />
            </div>
            <div className="p-2 text-white">
              <h2>{p.name}</h2>
              <h2>{p.price}</h2>
              <div className="flex gap-2 mt-3">
                <Link
                  to={`update/${p._id}`}
                  className="w-10 h-10 rounded-xl text-white text-2xl flex justify-center items-center bg-gray-800"
                >
                  <FaRegEdit />
                </Link>
                <button
                  className="w-10 h-10 rounded-xl text-white text-2xl flex justify-center items-center bg-gray-800"
                  onClick={() => handleShowDelete(p._id)}
                >
                  <LuDelete />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div
        className={`-translate-x-1/2 left-1/2 max-w-[450px] bg-gray-600 text-white p-2 fixed transition-all rounded-t-xl ${
          deleteId ? "bottom-0" : "-bottom-40"
        }`}
      >
        <h2>Do you really want to delete this product?</h2>

        <div className="flex justify-around mt-3">
          <button
            className="bg-red-500 rounded-lg px-5 py-1 "
            onClick={() => handleDeleteProduct(deleteId)}
          >
            Yes
          </button>
          <button className="bg-green-500  rounded-lg px-5 py-1 ">No</button>
        </div>
      </div>
    </>
  );
};

export default Home;
