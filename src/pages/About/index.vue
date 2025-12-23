<script setup lang="ts">
import { useI18n } from "vue-i18n";

import Button from "@/components/atoms/Button.vue";
import Card from "@/components/molecules/Card.vue";
import { useRouter } from "@/composables/useRouter";

const { t } = useI18n();
const router = useRouter();
</script>

<template>
  <div class="p-8 space-y-4">
    <Card title="About Page">
      <div class="space-y-4">
        <p>{{ t("common.hello") }}! This is the about page.</p>
        <Button variant="primary" @click="router.push('/')">
          Go to Home
        </Button>
      </div>
    </Card>
  </div>
</template>
