'vue''All','All''All'
<template>
  <div class="min-h-screen bg-gray-900 py-20 px-4 sm:px-6 lg:px-8">
    <h2
      class="text-4xl font-bold text-center text-emerald-400 mb-16 animate-fade-in-down"
    >
      My Projects
    </h2>

    <!-- Category Filter -->
    <div class="mb-8 text-center">
      <button
        v-for="category in categories"
        :key="category"
        @click="filterProjects(category)"
        class="inline-flex items-center px-4 py-2 mx-1 text-white bg-emerald-500 rounded hover:bg-emerald-600"
      >
        {{ category }}
      </button>
    </div>

    <div
      class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      <!-- Portfolio Item -->
      <div
        v-for="(item, index) in filteredPosts"
        :key="item.title"
        class="group relative bg-gray-800 rounded-xl overflow-hidden shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-emerald-500/20"
        :style="{ 'transition-delay': `${index * 50}ms` }"
      >
        <!-- Image Container -->
        <div v-if="item.meta?.thumbnail" class="relative h-64 overflow-hidden">
          <img
            :src="item.meta?.thumbnail"
            :alt="item.title"
            class="w-full h-full object-cover transform transition-all duration-500 group-hover:scale-110"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-90"
          ></div>
        </div>

        <!-- Content -->
        <div class="p-6">
          <h3 class="text-2xl font-bold text-gray-100 mb-2">
            {{ item.title }}
          </h3>

          <!-- Technologies List -->
          <ul class="flex flex-wrap gap-2 mb-4">
            <li
              v-for="(tech, techIndex) in item.meta.technologies"
              :key="tech"
              class="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-sm animate-pop-in"
              :style="{ 'animation-delay': `${techIndex * 100}ms` }"
            >
              {{ tech }}
            </li>
          </ul>

          <!-- Link -->
          <a
            :href="item.link"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center text-emerald-400 hover:text-emerald-300 transition-colors duration-300"
          >
            View Project
            <svg
              class="w-4 h-4 ml-2 transform transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from "vue";
const { data: posts } = await useAsyncData("projects", () =>
  queryCollection("projects").all()
);
console.log(posts.value); // Log the posts to see their structure

// Extract unique categories
const categories = ref([
  "All",
  ...new Set(posts.value.map((post) => post.meta.category).filter(Boolean)), // Filter out undefined categories
]);

const selectedCategory = ref("All");

const filteredPosts = computed(() => {
  if (selectedCategory.value === "All") {
    return posts.value;
  }
  return posts.value.filter(
    (post) => post.meta.category === selectedCategory.value
  );
});

function filterProjects(category) {
  selectedCategory.value = category;
}
</script>
