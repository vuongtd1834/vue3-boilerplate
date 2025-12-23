<script lang="ts">
/**
 * FIXME: This component used for demo purpose only.
 * Navigation Bar Component
 *
 * @description
 * A navigation bar component that displays the navigation menu and user information.
 *
 * @example
 * ```vue
 * <Navbar />
 * ```
 */
</script>
<script setup lang="ts">
import { Disclosure, Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import {
  ChartLine,
  ChevronDown,
  CirclePile,
  CircleUserRound,
  ListCheck,
  LockOpen,
  type LucideIcon,
} from "lucide-vue-next";

import Button, { type Props as ButtonProps } from "@/components/atoms/button/Button.vue";

type NavigationItem = {
  name: string;
  current: boolean;
  variant: ButtonProps["variant"];
  class: string;
  disabled?: boolean;
  icon?: LucideIcon;
};

const navigation: NavigationItem[] = [
  {
    name: "Edit Mode",
    current: true,
    variant: "default",
    class: "border-primary",
    disabled: true,
    icon: LockOpen,
  },
  {
    name: "DG Check",
    current: false,
    variant: "info",
    class: "border-info",
    icon: ListCheck,
  },
  {
    name: "V6 Plot",
    current: false,
    variant: "info",
    icon: ChartLine,
    class: "border-info",
  },
  {
    name: "Derivation Group",
    current: false,
    variant: "info",
    class: "border-info",
    icon: CirclePile,
  },
];

const userNavigation = [
  { name: "CATIA", href: "#" },
  { name: "Part Structure", href: "#" },
  { name: "Derivation Editor", href: "#" },
];
</script>

<template>
  <div class="relative bg-[#005685]">
    <Disclosure as="nav" class="bg-[#005685]">
      <div class="mx-auto sm:px-2 lg:px-1">
        <div class="flex h-12 items-center justify-between px-4 sm:px-0">
          <div class="flex items-center">
            <div class="shrink-0">
              <h4 class="text-xl text-white">Honda Drawing Editor</h4>
            </div>
            <div class="hidden md:block">
              <div class="ml-10 flex items-baseline space-x-4">
                <Button
                  v-for="item in navigation"
                  :key="item.name"
                  :variant="item.variant"
                  :class="['text-white bg-transparent border', item.class]"
                  :disabled="item.disabled"
                >
                  <component :is="item.icon" class="text-white" aria-hidden="true" />
                  {{ item.name }}
                </Button>
              </div>
            </div>
          </div>
          <div class="hidden md:block">
            <div class="ml-4 flex items-center md:ml-6">
              <Button variant="ghost" class="text-white"> Create Change Report </Button>
              <Button variant="ghost" class="text-white"> Export </Button>
              <Menu as="div" class="relative ml-3">
                <MenuButton as="template">
                  <Button
                    variant="ghost"
                    class="inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium text-white focus"
                  >
                    Launch
                    <ChevronDown class="h-5 w-5" aria-hidden="true" />
                  </Button>
                </MenuButton>

                <transition
                  enter-active-class="transition ease-out duration-100"
                  enter-from-class="transform opacity-0 scale-95"
                  enter-to-class="transform scale-100"
                  leave-active-class="transition ease-in duration-75"
                  leave-from-class="transform scale-100"
                  leave-to-class="transform opacity-0 scale-95"
                >
                  <MenuItems
                    class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg outline-1 outline-black/5"
                  >
                    <MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }">
                      <a
                        :href="item.href"
                        :class="[
                          active ? 'bg-secondary outline-hidden' : '',
                          'block px-4 py-2 text-sm text-secondary-foreground',
                        ]"
                      >
                        {{ item.name }}
                      </a>
                    </MenuItem>
                  </MenuItems>
                </transition>
              </Menu>
              <Button variant="link" size="icon">
                <CircleUserRound class="size-5 text-white" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Disclosure>
  </div>
</template>
