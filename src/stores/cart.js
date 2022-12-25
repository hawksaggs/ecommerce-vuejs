import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => {
    return {
      cart: null,
    };
  },
  getters: {
    getCart(state) {
      return state.cart;
    },
    getCartLength(state) {
      return state.cart.products.length;
    },
  },
  actions: {
    async fetchCart() {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/carts/user/2`);
      const data = await res.json();
      if (data.length) {
        const cart = data[0];
        const products = [];
        for (const product of cart.products) {
          const productRes = await fetch(
            `${import.meta.env.VITE_API_URL}/products/${product.productId}`
          );
          const productData = await productRes.json();
          products.push(Object.assign({}, product, productData));
        }
        cart.products = products;
        this.cart = cart;
      }
    },
    async addToCart({ productId, quantity }) {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/carts`, {
        method: "POST",
        body: JSON.stringify({
          userId: 2,
          date: "2020-02-03",
          products: [{ productId, quantity }],
        }),
      });
      const response = await res.json();
      await this.fetchCart();
    },
  },
});
