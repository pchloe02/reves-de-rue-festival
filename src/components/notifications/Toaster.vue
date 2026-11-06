<script setup lang="ts">
import { onBeforeUnmount, watch } from "vue";
import { useToast } from "../../composables/useToast";
import { TOAST_DURATION_MS } from "../../constants/toast";

const { toasts, removeToast } = useToast();
const timers = new Map<number, ReturnType<typeof setTimeout>>();

watch(toasts, (currentToasts) => {
  currentToasts.forEach((toast) => {
    if (timers.has(toast.id)) {
      return;
    }

    timers.set(
      toast.id,
      setTimeout(() => {
        removeToast(toast.id);
        timers.delete(toast.id);
      }, TOAST_DURATION_MS),
    );
  });
});

onBeforeUnmount(() => {
  timers.forEach((timer) => clearTimeout(timer));
});
</script>

<template>
  <div class="toaster" aria-live="polite">
    <div
      v-for="toast in toasts"
      :key="toast.id"
      class="toast"
      :class="`toast-${toast.type}`"
      role="status"
    >
      <span>{{ toast.message }}</span>
      <button
        type="button"
        aria-label="Fermer la notification"
        @click="removeToast(toast.id)"
      >
        ×
      </button>
    </div>
  </div>
</template>

<style scoped>
.toaster {
  position: fixed;
  right: 16px;
  bottom: 16px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 360px;
  max-width: calc(100vw - 32px);
}

.toast {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  box-sizing: border-box;
  width: 100%;
  padding: 16px 20px;
  border-left: 4px solid transparent;
  border-radius: 8px;
  background: white;
  color: #4b286d;
  box-shadow: 0 4px 12px rgb(0 0 0 / 20%);
  font-weight: 700;
}

.toast span {
  min-width: 0;
  overflow-wrap: anywhere;
}

.toast-success {
  border-left-color: #287a4b;
}

.toast-error {
  border-left-color: #a43838;
}

button {
  flex: 0 0 auto;
  padding: 0;
  border: 0;
  background: transparent;
  color: inherit;
  cursor: pointer;
  font-size: 20px;
  line-height: 1;
}
</style>
