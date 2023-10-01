<script setup lang="ts">
import {computed, PropType} from "vue";
import {useLinkStore} from "@/stores/link";
import {Listbox, ListboxButton, ListboxOption, ListboxOptions,} from '@headlessui/vue'
import type LinkItemType from "@/utils/types/linkItemType";
import {storeToRefs} from "pinia";
import {useSupabaseClient} from "#imports";
import Database from "~/utils/types/database";

import { defineProps } from 'vue';

const props = defineProps({
  link: {
    type: Object as PropType<LinkItemType>,
    required: true // Делаем link обязательным
  },
  index: {
    type: Number
  }
});


const linkStore = useLinkStore()

const {links, platformsList} = storeToRefs(linkStore)

const platforms = computed(() => {
  const allPlatforms = links.value.map(link => link.platform);
  return platformsList.value.filter(platform => !allPlatforms.includes(platform));
});

const placeholderText = computed(() => {
  const platformsMap:any = {
    GitHub: "https://github.com/",
    GitLab: "https://gitlab.com/",
    Youtube: "https://youtube.com/",
    LinkedIn: "https://linkedin.com/",
    Twitter: "https://twitter.com/",
  };

  return platformsMap[props.link.platform]
});

const user = useSupabaseUser()
const supabase = useSupabaseClient<Database>()

async function deleteItem(index: number): Promise<void> {

  const platform = links.value[index].platform;

  const updateData: { [platform: string]: null } = {};

  updateData[platform] = null;

  const {data, error} = await supabase
      .from('links')
      .update(updateData)
      .eq('userId', user.value?.id)
      .select();

  linkStore.deleteItem(index)
}

</script>

<template>
  <div class="flex flex-col gap-4 bg-[#eeeeee] p-4 rounded-xl">
    <Listbox v-model="link!.platform">
      <div class="relative mt-1">
        <div class="flex items-center justify-between mb-4">
          <h1 class="text-gray-400 font-semibold text-xl">Link #{{ index + 1 }}</h1>
          <button @click="deleteItem(<number>index)" class="text-gray-400 text-lg">Remove</button>
        </div>
        <ListboxButton
            class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-600 sm:text-sm"
        >
          <span class="block truncate cursor-pointer">{{ link.platform }}</span>
          <span
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
          >
            <Icon name="mdi:chevron-up-down"/>
          </span>
        </ListboxButton>

        <transition
            leave-active-class="transition duration-100 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
          <ListboxOptions
              v-if="platforms.length > 0"
              class="z-10 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
            <ListboxOption
                v-slot="{ active, selected }"
                v-for="platform in platforms"
                :key="platform"
                :value="platform"
                as="template"
            >
              <li
                  class="cursor-pointer"
                  :class="[
                  active ? 'bg-gray-100 text-black' : 'text-gray-900',
                  'relative cursor-default select-none py-2 pl-10 pr-4',
                ]"
              >
                <span
                    class="cursor-pointer"
                    :class="[
                    selected ? 'font-medium' : 'font-normal',
                    'block truncate',
                  ]"
                >{{ platform }}</span
                >
                <span
                    v-if="selected"
                    class="absolute inset-y-0 left-0 flex items-center pl-3 text-black"
                >
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
    <input v-model="link!.href" class="w-full rounded-lg py-1.5 bg-white px-4 focus:outline-purple-700"
           :placeholder="placeholderText"
           type="text">
  </div>
</template>