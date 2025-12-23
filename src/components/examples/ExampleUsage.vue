<script setup lang="ts">
import { useI18n } from "vue-i18n";

import Button from "@/components/atoms/Button.vue";
import Card from "@/components/molecules/Card.vue";
import { useExampleStore } from "@/stores/example";

const { t } = useI18n();
const store = useExampleStore();
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
      </div>
    </Card>
  </div>
</template>
