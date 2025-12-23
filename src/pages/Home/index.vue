<script setup lang="ts">
import { useI18n } from "vue-i18n";

import Button from "@/components/atoms/Button.vue";
import Card from "@/components/molecules/Card.vue";
import { useRouter } from "@/composables/useRouter";
import { useExampleStore } from "@/stores/example";

const { t } = useI18n();
const store = useExampleStore();
const router = useRouter();
</script>

<template>
  <div class="p-8 space-y-4">
    <Card :title="t('common.welcome')">
      <div class="space-y-4">
        <p>{{ t("common.hello") }}! Count: {{ store.count }}</p>
        <div class="flex gap-2">
          <Button @click="store.increment"> Increment </Button>
          <Button variant="secondary"> Secondary </Button>
          <Button variant="danger"> Danger </Button>
        </div>
        <Button variant="primary" @click="router.push('/about')">
          Go to About
        </Button>
      </div>
    </Card>
  </div>
</template>
