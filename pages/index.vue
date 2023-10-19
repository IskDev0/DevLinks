<template>
  <HomeHeader/>
  <main class="container mx-auto px-4">
    <div class="bg-white p-5 rounded-xl mb-10">
      <h1 class="text-2xl font-black text-center text-violet-700 mt-4 md:mt-10 md:text-4xl">A simple way to combine all your links</h1>
      <p class="text-xl text-center mx-auto py-4 md:w-2/3 md:py-10 md:text-2xl">Devlinks is an amazingly user-friendly service designed for
        those who want to simplify access to their social networks, online portfolios, and other important resources. No
        endless profile updates or complicated bios. Simply create your own personalized Devlinks page and give your
        audience instant access to all your links.</p>
    </div>
    <section id="howItWorks" class="my-16">
      <h2 class="text-3xl font-bold text-center">How it works</h2>
      <div class="flex flex-col md:grid md:grid-cols-3 gap-10 mt-10">
        <article class="bg-white py-4 px-6 rounded-xl">
          <h3 class="flex items-center gap-2 font-bold text-xl"><span>1. Create your page</span>
            <Icon color="#6d28d9" name="mdi:account"/>
          </h3>
          <p class="mt-4">Registration is easy and fast. Create a unique Devlinks page and customize it to fit your
            style.</p>
        </article>
        <article class="bg-white py-4 px-6 rounded-xl">
          <h3 class="flex items-center gap-2 font-bold text-xl"><span>2. Add your links</span>
            <Icon color="#6d28d9" name="mdi:plus-box"/>
          </h3>
          <p class="mt-4">Add links to all your social media, website, blog, online store and other important
            platforms.</p>
        </article>
        <article class="bg-white py-4 px-6 rounded-xl">
          <h3 class="flex items-center gap-2 font-bold text-xl"><span>3. Share your page</span>
            <Icon color="#6d28d9" name="mdi:link-variant"/>
          </h3>
          <p class="mt-4">Share your personalized Devlinks link with your subscribers. Now they can easily find you
            wherever you have an online presence.</p>
        </article>
      </div>
    </section>
    <section id="examples">
      <h2 class="text-3xl font-bold text-center mb-10">Examples</h2>
    <div class="flex flex-col md:grid md:grid-cols-2 items-stretch gap-10">
      <img class="rounded-xl" src="/preview-image.png" alt="preview image">
      <img class="rounded-xl" src="/preview-image2.png" alt="preview image">
      <img class="rounded-xl" src="/preview-image4.png" alt="preview image">
      <img class="rounded-xl" src="/preview-image3.png" alt="preview image">
    </div>

    </section>
    <ReviewsList/>
    <FAQs/>
  </main>
  <footer class="bg-zinc-800 py-10 mt-16 px-4">
    <div class="container mx-auto text-white">
      <div class="flex flex-col md:flex-row justify-between gap-10">
        <div class="w-80">
          <RouterLink class="font-bold text-2xl" to="/">DevLinks</RouterLink>
          <p class="my-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis, repudiandae!</p>
          <div class="flex gap-4">
            <a href="https://twitter.com"><Icon size="30" name="mdi:twitter"/></a>
            <a href="https://facebook"><Icon size="30" name="mdi:facebook"/></a>
            <a href="https://instagram"><Icon size="30" name="mdi:instagram"/></a>
            <a href="https://linkedin.com"><Icon size="30" name="mdi:linkedin"/></a>
          </div>
        </div>
        <div class="flex items-center justify-start md:justify-center">
          <nav class="flex items-center gap-4">
            <a class="transition ease-in-out duration-200 hover:text-violet-700" href="#howItWorks">How It Works</a>
            <a class="transition ease-in-out duration-200 hover:text-violet-700" href="#examples">Examples</a>
            <a class="transition ease-in-out duration-200 hover:text-violet-700" href="#reviews">Reviews</a>
            <a class="transition ease-in-out duration-200 hover:text-violet-700" href="#faq">FAQ</a>
          </nav>
        </div>
        <div>
          <h2 class="font-bold text-2xl">Contact</h2>
          <form class="flex items-center mt-4">
          <input class="py-2 px-4 rounded-l-md text-black focus:outline-none" type="email" placeholder="Email">
            <input class="bg-violet-700 py-2 px-4 rounded-r-md text-white cursor-pointer focus:outline-none" type="submit" value="Send">
          </form>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">

definePageMeta({
  layout: "no-header"
})


</script>

<style>
.swiper-button-next,
.swiper-button-prev {
  color: #6d28d9 !important;
}
</style>