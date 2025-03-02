<template>
  <div class="font-body min-h-screen bg-gray-900">
    <!-- Hero Section -->
    <section
      class="hero bg-black flex items-center justify-center h-screen relative overflow-hidden"
    >
      <div class="absolute inset-0 z-0 opacity-10 h-full w-full">
        <img
          src="/frontend.jpeg"
          alt="Frontend Developer"
          class="w-full h-auto object-cover"
        />
      </div>
      <div class="text-center relative z-10">
        <h1 class="font-heading font-bold text-5xl text-secondary mb-4 animate-fade-in-down">
          Welcome to My Portfolio
        </h1>
        <p class="text-lg text-primary mb-8">
          I am a Frontend Developer specializing in modern web applications.
        </p>
        <button
          @click="scrollToPortfolio"
          class="px-6 py-3 bg-accent text-white rounded hover:bg-highlight transition duration-300"
        >
          View My Work
        </button>
      </div>
    </section>

    <!-- Category Filter -->
    <div class="filter my-8 text-center">
      <button
        v-for="category in categories"
        :key="category"
        @click="filterProjects(category)"
        class="inline-flex items-center px-4 py-2 mx-1 text-white bg-accent rounded hover:bg-highlight transition duration-300"
      >
        {{ category }}
      </button>
    </div>

    <div class="max-w-7xl py-20 mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Portfolio Item -->
      <div
        v-for="(item, index) in filteredPosts"
        :key="item.title"
        class="group relative bg-gray-800 overflow-hidden shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-accent/30"
        :style="{ 'transition-delay': `${index * 50}ms` }"
      >
        <!-- Image Container -->
        <div v-if="item.meta?.thumbnail" class="relative h-96  overflow-hidden">
          <img
            :src="item.meta?.thumbnail"
            :alt="item.title"
            class="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-90"
          ></div>
        </div>

        <!-- Content -->
        <div class="p-6">
          <h3 class="text-2xl font-heading text-text mb-2">
            {{ item.title }}
          </h3>

          <!-- Technologies List -->
          <ul class="flex flex-wrap gap-2 mb-4">
            <li
              v-for="(tech, techIndex) in item.meta.technologies"
              :key="tech"
              class="px-3 py-1 bg-accent/10 text-primary rounded-full text-sm animate-pop-in"
              :style="{ 'animation-delay': `${techIndex * 100}ms` }"
            >
              {{ tech }}
            </li>
          </ul>

          <!-- Link -->
          <nuxt-link
            :to="item.meta.link"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center text-primary hover:text-highlight transition-colors duration-300"
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
          </nuxt-link>
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
console.log(posts)
// Extract unique categories
const categories = ref([
  "All",
  ...(posts.value ? [...new Set(posts.value.map((post) => post.meta.category).filter(Boolean))] : []), // Safe check for posts.value
]);

console.log(categories)
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

// Scroll to portfolio section
function scrollToPortfolio() {
  const portfolioSection = document.querySelector(".filter");
  if (portfolioSection) {
    portfolioSection.scrollIntoView({ behavior: "smooth" });
  }
}
</script>

<style>
/* Custom Animations */
@keyframes fade-in-down {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-down {
  animation: fade-in-down 0.6s ease-out forwards;
}

/* Remove rounded corners */
.rounded {
  border-radius: 0 !important;
}
</style>
