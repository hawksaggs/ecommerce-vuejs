<script setup>
import { RouterView } from "vue-router";
import Footer from "./components/Footer.vue";
import Navigation from "./components/Navigation.vue";
</script>

<template>
  <div>
    <Navigation />
  </div>
  <main>
    <RouterView />
  </main>
  <Footer />
</template>
