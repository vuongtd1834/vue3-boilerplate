<script setup lang="ts">
import { RouterView } from "vue-router";

import GlobalAlertDialog from "@/components/organisms/global-alert/GlobalAlertDialog.vue";
</script>

<template>
  <RouterView />
  <GlobalAlertDialog />
</template>
