<script setup lang="ts">
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import signOut from "~/utils/signOut";
const user = useSupabaseUser()
</script>

<template>
  <header class="py-4 container mx-auto">
    <div class="mx-4">
      <div class="flex items-center justify-between bg-white p-4 rounded-xl">
        <RouterLink class="font-bold text-2xl" to="/">DevLinks</RouterLink>
        <nav v-if="!user" class="flex items-center gap-4">
          <RouterLink to="/login">Sign In</RouterLink>
          <RouterLink class="py-2 px-4 bg-violet-700 text-white rounded-xl" to="/register">Sign Up</RouterLink>
        </nav>
        <div v-else class="w-56 text-right">
          <Menu as="div" class="relative inline-block text-left">
            <div>
              <MenuButton
                  class="inline-flex gap-2 items-center w-full justify-center rounded-md bg-violet-700 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
              >
                Profile
                <Icon name="mdi:chevron-down"/>
              </MenuButton>
            </div>

            <transition
                enter-active-class="transition duration-100 ease-out"
                enter-from-class="transform scale-95 opacity-0"
                enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-in"
                leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0"
            >
              <MenuItems
                  class="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <div class="px-1 py-1">
                  <MenuItem v-slot="{ active }">
                    <RouterLink
                        to="/links"
                        class="flex items-center gap-2"
                        :class="[
                  active ? 'bg-violet-700 text-white' : 'text-gray-900',
                  'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                ]"
                    >
                      <Icon name="mdi:link-variant"/>
                      Links
                    </RouterLink>
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                    <RouterLink
                        to="/profile"
                        class="flex items-center gap-2"
                        :class="[
                  active ? 'bg-violet-700 text-white' : 'text-gray-900',
                  'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                ]"
                    >
                      <Icon name="mdi:account"/>
                      Profile Details
                    </RouterLink>
                  </MenuItem>
                </div>
                <div class="px-1 py-1">
                  <MenuItem v-slot="{ active }">
                    <button
                        @click="signOut"
                        class="flex items-center gap-2"
                        :class="[
                  active ? 'bg-violet-700 text-white' : 'text-gray-900',
                  'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                ]"
                    >
                      <Icon name="mdi:logout"/>
                      Sign Out
                    </button>
                  </MenuItem>
                </div>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </div>
    </div>
  </header>
</template>