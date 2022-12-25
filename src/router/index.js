import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/auth";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("@/views/AboutView.vue"),
    },
    {
      path: "/signin",
      name: "signin",
      component: () => import("@/views/SignInView.vue"),
      meta: {
        showHeader: false,
        showFooter: false,
      },
    },
    {
      path: "/signup",
      name: "signup",
      component: () => import("@/views/SignupView.vue"),
      meta: {
        showHeader: false,
        showFooter: false,
      },
    },
    {
      path: "/products/:productId",
      name: "productOverview",
      component: () => import("@/views/ProductOverview.vue"),
      props: (route) => ({
        ...route.params,
        productId: parseInt(route.params.productId),
      }),
    },
    {
      path: "/checkout",
      name: "checkout",
      component: () => import("@/views/Checkout.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: () => import("@/views/NotFound.vue"),
    },
  ],
  linkActiveClass: "active-link",
});

router.beforeEach(async (to) => {
  const publicPagesName = [
    "signup",
    "signin",
    "home",
    "productOverview",
    "about",
  ];
  const authRequired = !publicPagesName.includes(to.name);
  const authStore = useAuthStore();

  if (authRequired && !authStore.user) {
    authStore.returnUrl = to.fullPath;
    return "/signin";
  }
});

export default router;
