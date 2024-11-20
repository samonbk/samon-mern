import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),

  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false, message: "Please fill alls" };
    }

    const res = await fetch(`${process.env.REACT_APP_API_URL || ""}/api/products`, {
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
  // fetchProduct: async () => {
  //   try {
  //     const res = await fetch("api/products");
  //     if (!res.ok)
  //       throw new Error(`Failed to fetch products: ${res.statusText}`);

  //     const data = await res.json();
  //     set({ products: data.data }); // Remove the extra brackets here
  //   } catch (error) {
  //     console.error("Error fetching products:", error);
  //     set({ products: [] }); // Or handle it according to your application's needs
  //   }
  // },
  fetchProduct: async () => {
    try {
      const apiUrl = `${process.env.REACT_APP_API_URL || ""}/api/products`; // Use full URL in deployment
      const res = await fetch(apiUrl);
  
      if (!res.ok) {
        throw new Error(`Failed to fetch products: ${res.status} ${res.statusText}`);
      }
  
      const data = await res.json();
      set({ products: data.data }); // Assuming `data.data` contains the product array
    } catch (error) {
      console.error("Error fetching products:", error);
      set({ products: [] }); // Default to an empty array on error
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
      `${process.env.REACT_APP_API_URL || ""}/api/products/${updatedProduct._id}`,
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

    const res = await fetch(`${process.env.REACT_APP_API_URL || ""}/api/products/${productId}`, {
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
