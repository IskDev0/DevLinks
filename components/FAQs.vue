<script setup lang="ts">
import {Disclosure, DisclosureButton, DisclosurePanel} from '@headlessui/vue'

const faqs = ref<{ question: string, answer: string }[]>([
  {
    question: ' Aliquam accumsan augue lacus. ',
    answer: "Vestibulum vehicula, nunc sed mollis iaculis, nisi lectus tempus augue, cursus facilisis nisl elit id quam."},
  {
    question: "Duis faucibus leo et lacus efficitur, at bibendum mi rutrum.",
    answer: "Curabitur tincidunt volutpat dignissim. Curabitur lobortis maximus dignissim. In tristique, dui a posuere bibendum, velit enim malesuada ante, vitae aliquet ex nulla ut est."
  },
  {
    question: "uspendisse eleifend pretium elit nec maximus.",
    answer: "Morbi accumsan orci nec lacus venenatis laoreet. Ut eu sagittis eros. Proin gravida mauris id pulvinar laoreet. Suspendisse tincidunt imperdiet purus sed porttitor."
  },
  {
    question: " Nulla accumsan massa et scelerisque dapibus.",
    answer: "Quisque diam libero, gravida eget feugiat in, suscipit quis nulla. Vestibulum vehicula, nunc sed mollis iaculis, nisi lectus tempus augue, cursus facilisis nisl elit id quam."
  },
  {
    question: "Donec suscipit lorem at ullamcorper tincidunt.",
    answer: "Phasellus mollis mattis orci, sed ullamcorper nibh ultrices et. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
  },
  {
    question: "Nunc lobortis erat vitae est tincidunt molestie.",
    answer: "Etiam elit enim, facilisis vel dictum malesuada, pretium sit amet orci. Integer lobortis, dolor et placerat luctus, ipsum purus auctor mauris, at convallis tortor mi eu augue."
  }
])
</script>

<template>
  <h2 class="text-3xl font-bold text-center mb-10">FAQ</h2>
  <div class="flex flex-col gap-4 mx-auto w-full rounded-xl bg-white p-4">
    <Disclosure v-for="faq in faqs" :key="faq.question" v-slot="{ open }">
      <DisclosureButton

          class="flex w-full justify-between rounded-lg bg-violet-600 px-4 py-2 text-left text-sm font-medium text-white hover:bg-violet-500 focus:outline-none focus-visible:ring focus-visible:ring-violet-500 focus-visible:ring-opacity-75"
      >
        <span>{{ faq.question }}</span>
        <Icon
            name="mdi:chevron-down"
            :class="open ? 'rotate-180 transform' : ''"
            class="h-5 w-5 text-white"
        />
      </DisclosureButton>
      <transition
          enter-active-class="transition duration-100 ease-out"
          enter-from-class="transform scale-95 opacity-0"
          enter-to-class="transform scale-100 opacity-100"
          leave-active-class="transition duration-75 ease-out"
          leave-from-class="transform scale-100 opacity-100"
          leave-to-class="transform scale-95 opacity-0"
      >
      <DisclosurePanel class="px-4 pb-2 text-sm text-gray-500">
        {{ faq.answer }}
      </DisclosurePanel>
      </transition>
    </Disclosure>
  </div>
</template>