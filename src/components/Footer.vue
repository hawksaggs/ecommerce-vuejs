<template>
  <footer
    class="p-4 bg-white md:p-8 lg:p-10 dark:bg-gray-800"
    v-if="$route.meta.showFooter !== false"
  >
    <div class="mx-auto max-w-screen-xl text-center">
      <ul
        class="flex flex-wrap justify-center items-center mb-6 text-gray-900 dark:text-white"
      >
        <li>
          <RouterLink
            class="mr-4 hover:underline md:mr-6"
            :to="{ name: 'about' }"
          >
            About
          </RouterLink>
        </li>
        <li>
          <a href="#" class="mr-4 hover:underline md:mr-6">Premium</a>
        </li>
        <li>
          <a href="#" class="mr-4 hover:underline md:mr-6">Campaigns</a>
        </li>
        <li>
          <a href="#" class="mr-4 hover:underline md:mr-6">Blog</a>
        </li>
        <li>
          <a href="#" class="mr-4 hover:underline md:mr-6">Affiliate Program</a>
        </li>
        <li>
          <a href="#" class="mr-4 hover:underline md:mr-6">FAQs</a>
        </li>
        <li>
          <a href="#" class="mr-4 hover:underline md:mr-6">Contact</a>
        </li>
      </ul>
      <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400"
        >© 2021-2022 <a href="#" class="hover:underline"></a>. All Rights
        Reserved.</span
      >
    </div>
  </footer>
</template>
