import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),

  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false, message: "Please fill alls" };
    }

    const res = await fetch("http://localhost:5000/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
    const data = await res.json();
    set((state) => ({ products: [...state.products, data.data] }));
    return { success: true, message: "Product create successfull" };
  },
  fetchProduct: async () => {
    try {
      const res = await fetch("http://localhost:5000/api/products");
      if (!res.ok)
        throw new Error(`Failed to fetch products: ${res.statusText}`);

      const data = await res.json();
      set({ products: data.data }); // Remove the extra brackets here
    } catch (error) {
      console.error("Error fetching products:", error);
      set({ products: [] }); // Or handle it according to your application's needs
    }
  },
  updateProduct: async (updatedProduct) => {
    if (
      !updatedProduct.name ||
      !updatedProduct.price ||
      !updatedProduct.image
    ) {
      return { success: false, message: "Please fill all fields" };
    }

    const res = await fetch(
      `http://localhost:5000/api/products/${updatedProduct._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      }
    );
    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: data.message || "Failed to update product",
      };
    }

    set((state) => ({
      products: state.products.map((product) =>
        product.id === updatedProduct.id ? data.data : product
      ),
    }));

    return { success: true, message: "Product updated successfully" };
  },
  deleteProduct: async (productId) => {
    if (!productId) {
      return { success: false, message: "Product ID is required" };
    }

    const res = await fetch(`http://localhost:5000/api/products/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: data.message || "Failed to delete product",
      };
    }

    set((state) => ({
      products: state.products.filter((product) => product._id !== productId),
    }));

    return { success: true, message: "Product deleted successfully" };
  },
}));
