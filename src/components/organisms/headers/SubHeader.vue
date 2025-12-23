<script lang="ts">
/**
 * FIXME: This component used for demo purpose only.
 * SubHeader Component
 *
 * @description
 * A subheader component that displays part information and navigation tabs.
 * It shows part details (part number, name, revision, status, drawn, designed, completion date, news)
 * along with action buttons (3D check, Check/Save, Plot) and a tab navigation menu.
 *
 * @example
 * ```vue
 * <SubHeader />
 * ```
 *
 * @component
 * @since 1.0.0
 */
</script>
<script setup lang="ts">
import { computed } from "vue";
import { RouterLink, useRoute } from "vue-router";

const route = useRoute();

const tabsConfig = [
  { name: "Management info", href: "#" },
  { name: "Basic spec", href: "#" },
  { name: "DWG SYMBOL", href: "#" },
  { name: "Composition parts", href: "#" },
  { name: "Set Short parts", href: "#" },
  { name: "Note", href: "#" },
  { name: "Upload file", href: "/upload" },
  { name: "Weld(point)", href: "#" },
  { name: "Test A", href: "#" },
];

const currentLocale = computed(() => {
  const lang = route.params.lang as string;
  return lang || "en";
});

const getLocalizedPath = (href: string): string => {
  if (href === "#") return href;
  return `/${currentLocale.value}${href}`;
};

const tabs = computed(() =>
  tabsConfig.map((tab) => {
    const localizedHref = getLocalizedPath(tab.href);
    return {
      ...tab,
      href: localizedHref,
      current: tab.href !== "#" && route.path === localizedHref,
    };
  })
);
</script>

<template>
  <div class="full-width px-4 py-1">
    <div class="flex items-center gap-4">
      <div class="flex items-center gap-4">
        <div class="flex flex-col">
          <span class="text-sm font-bold tracking-widest"> PART NO. </span>
          <span class="text-sm font-bold tracking-widest"> PART NAME. </span>
        </div>
        <div class="flex flex-col">
          <span class="text-sm text-muted leading-6 tracking-widest"> 48970-3JAA-A000-H1 </span>
          <span class="text-sm text-muted leading-6 tracking-widest"> TEST48970 L1PART </span>
        </div>
      </div>
      <div class="flex items-center gap-4">
        <div class="flex flex-col">
          <span class="text-sm font-bold tracking-widest"> REVISION NO. </span>
          <span class="text-sm font-bold tracking-widest"> STATUS. </span>
        </div>
        <div class="flex flex-col">
          <span class="text-sm text-muted leading-6 tracking-widest opacity-0">&nbsp;</span>
          <span class="text-sm text-muted leading-6 tracking-widest"> Part Number registered </span>
        </div>
      </div>
      <div class="flex items-center gap-4">
        <div class="flex flex-col">
          <span class="text-sm font-bold tracking-widest"> DRAWN </span>
          <span class="text-sm font-bold tracking-widest"> DESIGNED </span>
        </div>
        <div class="flex flex-col">
          <span class="text-sm text-muted leading-6 tracking-widest"> Uchida Hajime </span>
          <span class="text-sm text-muted leading-6 tracking-widest"> Uchida Hajime </span>
        </div>
      </div>
      <div class="flex items-center gap-4">
        <div class="flex flex-col">
          <span class="text-sm font-bold tracking-widest"> COMPLETION DATE </span>
          <span class="text-sm font-bold tracking-widest"> NEWS </span>
        </div>
        <div class="flex flex-col">
          <span class="text-sm text-muted leading-6 tracking-widest"> 12-OCT-23 </span>
          <span class="text-sm text-primary leading-6 tracking-widest underline cursor-pointer">
            <a href="#">CheckSave:OK V6Plot:OK</a>
          </span>
        </div>
      </div>
      <div class="flex gap-2">
        <div class="flex text-xs items-center w-[80px] border border-black justify-center">3D check</div>
        <div class="flex text-xs items-center w-[80px] bg-[yellow] border border-black justify-center">
          Check/<br />Save
        </div>
        <div class="flex text-xs items-center w-[80px] bg-[yellow] border border-black justify-center">Plot</div>
        <div class="flex items-center gap-0.5 flex-col self-center">
          <div class="bg-amber-500 text-[10px] px-1">DARWIN 3D (HPDF)</div>
          <div class="border border-black text-[10px] leading-none w-full text-center">✓ HPDF</div>
        </div>
      </div>
    </div>
    <div class="hidden sm:block">
      <div class="border-b border-gray-200">
        <nav class="-mb-px flex space-x-5" aria-label="Tabs">
          <RouterLink
            v-for="tab in tabs"
            :key="tab.name"
            :to="tab.href"
            :class="[
              tab.current
                ? 'border-primary text-primary'
                : 'border-transparent text-foreground hover:border-primary hover:text-primary',
              'border-b-2 px-1 py-3 text-sm font-bold whitespace-nowrap uppercase',
            ]"
            :aria-current="tab.current ? 'page' : undefined"
          >
            {{ tab.name }}
          </RouterLink>
        </nav>
      </div>
    </div>
  </div>
</template>
