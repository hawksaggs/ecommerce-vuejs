<script>
import Spinner from "./Spinner.vue";
import { useProductStore } from "@/stores/product";

export default {
  setup() {
    const productStore = useProductStore();

    return { productStore };
  },
  data() {
    return {
      products: this.productStore.products,
      isLoading: true,
    };
  },
  computed: {
    getProducts() {
      // return this.productStore.getProducts;
      return this.productStore.products;
    },
  },
  async mounted() {
    await this.initData();
  },
  methods: {
    async initData() {
      this.products = await this.productStore.fetchProducts();
      this.isLoading = false;
    },
  },
  components: { Spinner },
};
</script>

<template>
  <Spinner v-if="isLoading" />
  <div class="bg-white">
    <div
      class="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8"
    >
      <h2 class="sr-only">Products</h2>

      <div
        class="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
      >
        <RouterLink
          v-for="product in getProducts"
          :key="product.id"
          :to="{ name: 'productOverview', params: { productId: product.id } }"
          class="group"
        >
          <div
            class="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8"
          >
            <img
              :src="product.image"
              :alt="product.title"
              class="h-full w-full object-cover object-center group-hover:opacity-75"
            />
          </div>
          <h3 class="mt-4 text-sm text-gray-700">{{ product.title }}</h3>
          <p class="mt-1 text-lg font-medium text-gray-900">
            {{ product.price }}
          </p>
        </RouterLink>
        <!-- <a
          v-for="product in products"
          :key="product.id"
          :href="product.href"
          class="group"
        >
          <div
            class="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8"
          >
            <img
              :src="product.imageSrc"
              :alt="product.imageAlt"
              class="h-full w-full object-cover object-center group-hover:opacity-75"
            />
          </div>
          <h3 class="mt-4 text-sm text-gray-700">{{ product.name }}</h3>
          <p class="mt-1 text-lg font-medium text-gray-900">
            {{ product.price }}
          </p>
        </a> -->
      </div>
    </div>
  </div>
</template>
