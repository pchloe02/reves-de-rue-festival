<script setup>
import AppHeader from "./components/layout/AppHeader.vue";
import AppFooter from "./components/layout/AppFooter.vue";
import Toaster from "./components/notifications/Toaster.vue";
</script>

<template>
  <AppHeader />
  <RouterView />
  <AppFooter />
  <Toaster />
</template>
