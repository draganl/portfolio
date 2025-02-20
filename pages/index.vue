<script setup>
const { data: blog } = await useAsyncData("projects", () => queryContent("/projects").find());
</script>

<template>
  <div class="w-full">
    <div class="w-full py-40 bg-gray-100 px-4">
      <h1 class="text-6xl font-bold text-center">My Blog</h1>
    </div>
    <div class="max-w-7xl bg-white rounded-3xl shadow-md -mt-20 mx-auto p-10 grid grid-cols-3 gap-10">
      <UCard v-for="item in blog">
        <template #header>
          <h2 class="text-2xl font-bold">{{ item.title }}</h2>
        </template>
        <img :src="`/images/${item.image}`" class="w-full" :alt="`image for ${item.title} article`" />
        <p class="mt-4 font-medium text-gray-500">{{ item.description }}</p>
        <template #footer>
         <ULink :to="item._path" class="hover:underline hover:text-blue-500">Read More</ULink>
        </template>
      </UCard>
    </div>
  </div>
</template>
