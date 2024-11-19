import { useState, useEffect } from "react";
import { useProductStore } from "../Store/Store";
import { useNavigate, useNavigation, useParams } from "react-router-dom";

const UpdatePage = () => {
  const { id } = useParams(); // Get product ID from URL parameters
  const { fetchProduct, products, updateProduct } = useProductStore();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    _id: "",
    name: "",
    price: "",
    image: "",
  });

  useEffect(() => {
    const loadProduct = async () => {
      await fetchProduct(); // Ensure products are fetched before setting product
      const productToEdit = products.find((item) => item._id === id);
      if (productToEdit) {
        setProduct({ ...productToEdit }); // Copy product object to avoid mutations
      }
    };
    loadProduct();
  }, [fetchProduct]);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    const { success, message } = await updateProduct(product);
    console.log("Success:", success);
    console.log("Message:", message);

    if (success) {
      // Use a confirm dialog to ask the user to acknowledge

      // Reset the product form state
      setProduct({
        _id: "",
        name: "",
        price: "",
        image: "",
      });
    }
    confirm();
  };

  function confirm() {
    const userConfirmed = window.confirm(
      "Product updated successfully! Click OK to go back to the home page."
    );

    if (userConfirmed) {
      // Navigate after user clicks OK
      navigate("/");
    }
  }

  return (
    <>
      <h1 className="mt-10 text-center text-3xl font-bold text-white">
        Update Product
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
            value={product.name}
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-between gap-2 mt-3">
          <label className="text-gray-300 text-lg" htmlFor="price">
            Price:
          </label>
          <input
            className="w-[84%] h-8 rounded-lg px-2"
            type="text"
            name="price"
            placeholder="product price"
            value={product.price}
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-between gap-2 mt-3">
          <label className="text-gray-300 text-lg" htmlFor="image">
            Image:
          </label>
          <input
            className="w-[84%] h-8 rounded-lg px-2"
            type="text"
            name="image"
            placeholder="product image url"
            value={product.image}
            onChange={handleChange}
          />
        </div>
        <button
          type="button"
          onClick={handleUpdateProduct}
          className="bg-blue-500 rounded-lg px-3 py-1 mt-6"
        >
          Update
        </button>
      </form>
    </>
  );
};

export default UpdatePage;
