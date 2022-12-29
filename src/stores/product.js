import { defineStore } from "pinia";

export const useProductStore = defineStore("products", {
  state: () => {
    return {
      products: [],
      product: null,
    };
  },
  getters: {
    getProducts(state) {
      return state.products;
    },
  },
  actions: {
    async fetchProducts() {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/products`);
      this.products = await res.json();
    },

    async fetchSingleProduct(id) {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/products/${id}`
      );
      const product = await res.json();
      product.breadcrumbs = [
        { id: 1, name: "Men", href: "#" },
        { id: 2, name: "Clothing", href: "#" },
      ];
      product.colors = [
        { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
        { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
        { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
      ];
      product.sizes = [
        { name: "XXS", inStock: false },
        { name: "XS", inStock: true },
        { name: "S", inStock: true },
        { name: "M", inStock: true },
        { name: "L", inStock: true },
        { name: "XL", inStock: true },
        { name: "2XL", inStock: true },
        { name: "3XL", inStock: true },
      ];
      product.highlights = [
        "Hand cut and sewn locally",
        "Dyed with our proprietary colors",
        "Pre-washed & pre-shrunk",
        "Ultra-soft 100% cotton",
      ];
      this.product = product;
    },

    async setProduct(product) {
      state.product = product;
    },
  },
});
