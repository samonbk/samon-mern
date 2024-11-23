import { create } from "zustand";

export const useUserStore = create((set) => ({
  users: [],
  setUsers: (users) => set({ users }),
  fetchUser: async () => {
    try {
      const apiUrl = "https://samon-mern.vercel.app";

      const res = await fetch(apiUrl + "/api/users");

      if (!res.ok) {
        throw new Error(
          `Failed to fetch users: ${res.status} ${res.statusText}`
        );
      }

      const data = await res.json();
      set({ users: data.data });
    } catch (error) {
      console.error("Error fetching users:", error);
      set({ users: [] });
    }
  },
}));

export const useLoged = create((set) => ({
  loged: false,
  setLoged: (loged) => set({ loged }),
  checkloged: () => {
    const checkloged = localStorage.getItem("islogedkey");
    if (checkloged) {
      if (checkloged !== "") {
        set({ loged: true });
      }
    } else {
      localStorage.setItem("islogedkey", "");
      set({ loged: false });
    }
  },
  setLogedIn: () => {
    set({ loged: true });
  },
  setLogedOut: () => {
    set({ loged: false });
    localStorage.setItem("islogedkey", "");
  },
}));

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),

  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false, message: "Please fill alls" };
    }

    const res = await fetch(
      `${process.env.REACT_APP_API_URL || ""}/api/products`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      }
    );
    const data = await res.json();
    set((state) => ({ products: [...state.products, data.data] }));
    return { success: true, message: "Product create successfull" };
  },

  fetchProduct: async () => {
    try {
      const apiUrl = "https://samon-mern.vercel.app";

      const res = await fetch(apiUrl + "/api/products");

      if (!res.ok) {
        throw new Error(
          `Failed to fetch products: ${res.status} ${res.statusText}`
        );
      }

      const data = await res.json();
      set({ products: data.data });
    } catch (error) {
      console.error("Error fetching products:", error);
      set({ products: [] });
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
      `${process.env.REACT_APP_API_URL || ""}/api/products/${
        updatedProduct._id
      }`,
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

    const res = await fetch(
      `${process.env.REACT_APP_API_URL || ""}/api/products/${productId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
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
