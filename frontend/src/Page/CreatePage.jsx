import { useEffect, useState } from "react";
import { useLoged, useProductStore } from "../Store/Store";
import { useNavigate } from "react-router-dom";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const { loged, checkloged } = useLoged();
  const navigate = useNavigate();

  useEffect(() => {
    checkloged();
    if (!loged) {
      navigate("/login");
    }
  }, [loged]);

  const { createProduct } = useProductStore();

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const { success, message } = await createProduct(newProduct);
    console.log("Success:", success);
    console.log("Message:", message);
    if (success) {
      setNewProduct({
        name: "",
        price: "",
        image: "",
      });
    }
  };

  return (
    <>
      <h1 className="mt-10 text-center text-3xl font-bold text-white">
        CreatePage
      </h1>

      <form className="mt-10 max-w-[400px] mx-auto">
        <div className="flex justify-between gap-2">
          <label className="text-gray-300 text-lg" htmlFor="name">
            Name:
          </label>
          <input
            className="w-[84%] h-8 rounded-lg px-2"
            type="text"
            name="name"
            placeholder="product name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
          />
        </div>
        <div className="flex justify-between gap-2 mt-3">
          <label className="text-gray-300 text-lg" htmlFor="name">
            Price:
          </label>
          <input
            className="w-[84%] h-8 rounded-lg px-2"
            type="text"
            name="price"
            placeholder="product price"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
          />
        </div>
        <div className="flex justify-between gap-2 mt-3">
          <label className="text-gray-300 text-lg" htmlFor="name">
            Image:
          </label>
          <input
            className="w-[84%] h-8 rounded-lg px-2"
            type="text"
            name="image"
            placeholder="product image url"
            value={newProduct.image}
            onChange={(e) =>
              setNewProduct({ ...newProduct, image: e.target.value })
            }
          />
        </div>
        <button
          type="button"
          onClick={handleAddProduct}
          className="bg-blue-500 rounded-lg px-3 py-1 mt-6"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default CreatePage;
