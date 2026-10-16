<script setup>
import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";
import { useEventsStore } from "./stores/evenements.js";

import { onMounted } from "vue";
import { getAllIntervenants } from "./api/intervenants";

const store = useEventsStore();

onMounted(async () => {
  await store.fetchEvents();

  try {
    const intervenants = await getAllIntervenants();
    console.log(intervenants);
  } catch (error) {
    console.error("Erreur lors de la récupération des intervenants :", error);
  }
});
</script>

<template>
  <AppHeader />
  <RouterView />
  <AppFooter />
</template>
