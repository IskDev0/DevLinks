<script setup lang="ts">
import data from "~/data.json"
import {Navigation} from 'swiper/modules';

const reviews = data.reviews
</script>

<template>
  <section id="reviews" class="my-16">
    <h2 class="text-3xl font-bold text-center mb-10">Reviews</h2>
    <Swiper :slidesPerView="3"
            :spaceBetween="30"
            :navigation="true"
            :loop="true"
            :modules="[Navigation]"
    >
      <SwiperSlide v-for="review in reviews" :key="review.id">
        <ReviewItem :review="review"/>
      </SwiperSlide>
    </Swiper>
  </section>
</template>

<style>
.swiper-button-next,
.swiper-button-prev {
  color: #6d28d9 !important;
}
</style>