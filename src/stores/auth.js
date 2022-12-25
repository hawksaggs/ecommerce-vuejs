import { defineStore } from "pinia";
import router from "../router";

export const useAuthStore = defineStore("authStore", {
  state: () => {
    return {
      user: JSON.parse(localStorage.getItem("user")),
      returnUrl: "",
    };
  },
  getters: {
    isUserLoggedIn() {
      return !!this.user;
    }
  },
  actions: {
    async login({ username, password }) {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
          method: "POST",
          body: JSON.stringify({
            username: "mor_2314",
            password: "83r5^_",
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(res);
        const user = await res.text();
        this.user = user;
        localStorage.setItem("user", JSON.stringify(user));
      } catch (error) {
        console.log(error);
      }

      router.push(this.returnUrl || "/");
    },
    logout() {
      this.user = null;
      localStorage.setItem("user", null);
      router.push("/signin");
    },
  },
});
