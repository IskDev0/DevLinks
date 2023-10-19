<script setup lang="ts">
import data from "~/data.json"
import {Pagination} from 'swiper/modules';

const breakpoints = {
  540: {
    slidesPerView: 2,
  },
  1024: {
    slidesPerView: 3,
  }
}

const reviews = data.reviews
</script>

<template>
  <section id="reviews" class="my-16">
    <h2 class="text-3xl font-bold text-center mb-10">Reviews</h2>
    <Swiper
        class="h-64"
        :slidesPerView="1"
        :spaceBetween="30"
        :loop="true"
        :breakpoints="breakpoints"
        :modules="[Pagination]"
        :pagination="{
            dynamicBullets: true,
        }"
    >
      <SwiperSlide v-for="review in reviews" :key="review.id">
        <ReviewItem :review="review"/>
      </SwiperSlide>
    </Swiper>
  </section>
</template>

<style>
.swiper-pagination-bullet-active {
  background-color: #6d28d9 !important;
}
</style>