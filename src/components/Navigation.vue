<script setup>
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/vue";
import {
  Bars3Icon,
  BellIcon,
  ShoppingCartIcon,
  XMarkIcon,
} from "@heroicons/vue/24/outline";
import { ref, onMounted } from "vue";
import Cart from "./Cart.vue";
import { useAuthStore } from "@/stores";
import { useCartStore } from "@/stores";
import { storeToRefs } from "pinia";

const initialNav = [
  { name: "Home", slug: "home", current: true },

  { name: "Checkout", slug: "checkout", current: false },
];

const navigation = ref(initialNav);
const open = ref(false);
const authStore = useAuthStore();
const cartStore = storeToRefs(useCartStore());

const { getCartLength } = cartStore;

// onMounted(() => {
//   if (!authStore.isUserLoggedIn) {
//     navigation.value.push(
//       ...[
//         { name: "SignUp", slug: "signup", current: false },
//         { name: "SignIn", slug: "signin", current: false },
//       ]
//     );
//   }
// });

async function logout() {
  await authStore.logout();
  // navigation.value = initialNav;
}

function toggleCart() {
  open.value = !open.value;
}
</script>
<!-- <script>
export default {
  data() {
    return {
      navigation: [
        { name: "Home", slug: "home", current: true },
        { name: "SignUp", slug: "signup", current: false },
        { name: "SignIn", slug: "signin", current: false },
        { name: "Checkout", slug: "checkout", current: false },
      ],
      open: false,
    };
  },
  methods: {
    toggleCart() {
      this.open = !this.open;
    },
  },
};
</script> -->

<template>
  <Disclosure
    as="nav"
    class="bg-gray-800"
    v-slot="{ open }"
    v-if="$route.meta.showHeader !== false && navigation"
  >
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <DisclosureButton
            class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          >
            <span class="sr-only">Open main menu</span>
            <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
        <div
          class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start"
        >
          <RouterLink :to="{ name: 'home' }">
            <div class="flex flex-shrink-0 items-center">
              <img
                class="block h-8 w-auto lg:hidden"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                alt="Your Company"
              />
              <img
                class="hidden h-8 w-auto lg:block"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                alt="Your Company"
              />
            </div>
          </RouterLink>
          <div class="hidden sm:ml-6 sm:block">
            <div class="flex space-x-4">
              <RouterLink
                v-for="item in navigation"
                :key="item.slug"
                :to="{ name: item.slug }"
                class="px-3 py-2 rounded-md text-sm font-medium"
              >
                {{ item.name }}
              </RouterLink>
              <!-- <a
                v-if="authStore.isUserLoggedIn"
                @click="authStore.logout"
                class="px-3 py-2 rounded-md text-sm font-medium"
                >Logout
              </a> -->
              <!-- <a
                v-for="item in navigation"
                :key="item.name"
                :href="item.href"
                :class="[
                  item.current
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'px-3 py-2 rounded-md text-sm font-medium',
                ]"
                :aria-current="item.current ? 'page' : undefined"
                >{{ item.name }}</a
              > -->
            </div>
          </div>
        </div>
        <div
          class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
        >
          <button
            type="button"
            class="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            @click="toggleCart"
          >
            <span class="sr-only">Cart</span>
            <div
              class="inline-flex absolute -top-1 justify-center items-center w-6 h-6 text-xs font-bold text-white bg-red-500 rounded-full border-2 border-white dark:border-gray-900"
            >
              {{ getCartLength }}
            </div>
            <ShoppingCartIcon class="h-6 w-6" aria-hidden="true" />
          </button>

          <RouterLink
            :key="signin"
            :to="{ name: 'signin' }"
            class="px-3 py-2 rounded-md text-sm font-medium"
            v-if="!authStore.isUserLoggedIn"
          >
           SignIn
          </RouterLink>
          <!-- <button
            type="button"
            class="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            v-if="authStore.isUserLoggedIn"
          >
            <span class="sr-only">View notifications</span>
            <BellIcon class="h-6 w-6" aria-hidden="true" />
          </button> -->

          <!-- Profile dropdown -->
          <Menu as="div" class="relative ml-3" v-if="authStore.isUserLoggedIn">
            <div>
              <MenuButton
                class="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <span class="sr-only">Open user menu</span>
                <img
                  class="h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              </MenuButton>
            </div>
            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <MenuItems
                class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <MenuItem v-slot="{ active }">
                  <a
                    href="#"
                    :class="[
                      active ? 'bg-gray-100' : '',
                      'block px-4 py-2 text-sm text-gray-700',
                    ]"
                    >Your Profile</a
                  >
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <a
                    href="#"
                    :class="[
                      active ? 'bg-gray-100' : '',
                      'block px-4 py-2 text-sm text-gray-700',
                    ]"
                    >Settings</a
                  >
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <a
                    href="#"
                    :class="[
                      active ? 'bg-gray-100' : '',
                      'block px-4 py-2 text-sm text-gray-700',
                    ]"
                    @click="logout"
                    >Sign out</a
                  >
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </div>
    </div>

    <DisclosurePanel class="sm:hidden">
      <div class="space-y-1 px-2 pt-2 pb-3">
        <DisclosureButton
          v-for="item in navigation"
          :key="item.name"
          as="a"
          :href="item.href"
          :class="[
            item.current
              ? 'bg-gray-900 text-white'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white',
            'block px-3 py-2 rounded-md text-base font-medium',
          ]"
          :aria-current="item.current ? 'page' : undefined"
          >{{ item.name }}</DisclosureButton
        >
      </div>
    </DisclosurePanel>
  </Disclosure>

  <Cart :open="open" v-if="open" @toggle-cart="toggleCart" />
</template>

<style></style>
