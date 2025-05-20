<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';

// Cookie state and assets
const cookies = ref(0);
const currentCookieImage = ref('https://pngimg.com/uploads/cookie/cookie_PNG13656.png');

// Buildings
const buildings = ref([
  { name: 'Cursor', price: 15, count: 0, cps: 0.1 },
  { name: 'Grandma', price: 100, count: 0, cps: 1 },
  { name: 'Farm', price: 1000, count: 0, cps: 10 },
  { name: 'Factory', price: 10000, count: 0, cps: 100 },
]);

// Defined Achievements
const achievementGoals = ref([
  { name: 'Reach 1 CPS', condition: () => cps.value >= 1, achieved: false },
  { name: 'Reach 5 CPS', condition: () => cps.value >= 5, achieved: false },
]);

// Upgrades
const upgrades = ref([
  { name: 'Golden Cookie', price: 50000, bought: false },
  { name: 'Grandma Upgrade', price: 100000, bought: false }
]);

// CPS
const cps = computed(() => {
  return buildings.value.reduce((sum, b) => sum + b.cps * b.count, 0);
});

// CPS tick
const cpsInterval = setInterval(() => {
  cookies.value += cps.value;
  document.title = `${cookies.value.toFixed(1)} cookies`;
  saveGame();
}, 1000);

// Buy a building
function buyBuilding(building) {
  if (cookies.value >= building.price) {
    cookies.value -= building.price;
    building.price += Math.ceil(building.price * 0.15);
    building.count++;
  }
}

// Buy an upgrade
function buyUpgrade(upgrade) {
  if (cookies.value >= upgrade.price && !upgrade.bought) {
    cookies.value -= upgrade.price;
    upgrade.bought = true;

    if (upgrade.name === 'Golden Cookie') {
      currentCookieImage.value = 'https://upload.wikimedia.org/wikipedia/commons/e/e4/Golden_cookie.png';
    }
    if (upgrade.name === 'Grandma Upgrade') {
      currentCookieImage.value = 'https://cdn-icons-png.flaticon.com/512/1046/1046857.png';
    }
  }
}

// Check achievements
watch(cps, () => {
  achievementGoals.value.forEach(ach => {
    if (!ach.achieved && ach.condition()) {
      ach.achieved = true;
    }
  });
});

// Save and load from localStorage
function saveGame() {
  localStorage.setItem('cookieData', JSON.stringify({
    cookies: cookies.value,
    buildings: buildings.value,
    upgrades: upgrades.value,
    achievements: achievementGoals.value,
    image: currentCookieImage.value,
  }));
}

function loadGame() {
  const saved = JSON.parse(localStorage.getItem('cookieData'));
  if (saved) {
    cookies.value = saved.cookies;
    buildings.value = saved.buildings;
    upgrades.value = saved.upgrades;
    achievementGoals.value = saved.achievements;
    currentCookieImage.value = saved.image;
  }
}

// Reset everything
function resetGame() {
  localStorage.removeItem('cookieData');
  location.reload();
}

onMounted(() => {
  loadGame();
});

onUnmounted(() => {
  clearInterval(cpsInterval);
});
</script>

<template>
  <div class="container mt-6">
    <div class="columns is-variable is-3">
      <!-- Cookie Area -->
      <div class="column is-3 has-background-light has-text-centered p-4">
        <h1 class="title is-3">Cookies: {{ cookies.toFixed(1) }}</h1>
        <h2 class="subtitle is-5">CPS: {{ cps.toFixed(1) }}</h2>
        <figure class="image is-128x128 mx-auto my-4" style="cursor:pointer">
          <img @click="cookies++" :src="currentCookieImage" alt="cookie" class="is-rounded" />
        </figure>
        <button class="button is-danger is-small mt-3" @click="resetGame">Reset Game</button>
      </div>

      <!-- Achievements and Upgrades -->
      <div class="column is-6 has-background-white p-4">
        <h3 class="title is-4 mb-2">Achievements</h3>
        <ul>
          <li v-for="ach in achievementGoals" :key="ach.name">
            <span :class="ach.achieved ? 'has-text-success' : 'has-text-grey'">
              {{ ach.achieved ? '✔️' : '◻️' }} {{ ach.name }}
            </span>
          </li>
        </ul>

        <hr class="my-4">

        <h3 class="title is-4 mb-2">Upgrades</h3>
        <div v-for="upgrade in upgrades" :key="upgrade.name" class="mb-2">
          <button
            class="button is-link is-fullwidth"
            :disabled="cookies < upgrade.price || upgrade.bought"
            @click="buyUpgrade(upgrade)">
            {{ upgrade.name }} - {{ upgrade.price }} cookies
            <span v-if="upgrade.bought"> (Bought)</span>
          </button>
        </div>
      </div>

      <!-- Building Shop -->
      <div class="column is-3 has-background-light p-4">
        <h3 class="title is-4">Shop</h3>
        <div v-for="building in buildings" :key="building.name" class="mb-2">
          <button
            class="button is-primary is-fullwidth"
            :disabled="cookies < building.price"
            @click="buyBuilding(building)">
            {{ building.name }} - {{ building.price }} cookies (x{{ building.count }})
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
ul {
  list-style-type: none;
  padding-left: 0;
}
</style>
