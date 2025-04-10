<script setup>
import { computed, onUnmounted, ref } from 'vue';

let cookies = ref(0);

let buildings = ref([
    { name: 'Cursor', price: 15, count: 0, cps: 0.1 },
    { name: 'Grandma', price: 100, count: 0, cps: 1 },
    { name: 'Farm', price: 1000, count: 0, cps: 10 },
    { name: 'Factory', price: 10000, count: 0, cps: 100 },
]);

let boostActive = ref(false);
let showBoostCookie = ref(false);

// CPS includes boost if active
let cps = computed(() => {
    const multiplier = boostActive.value ? 4 : 1;
    return buildings.value.reduce((total, building) => total + building.cps * building.count, 0) * multiplier;
});


const cpsInterval = setInterval(() => {
    cookies.value+=cps.value;
    document.title = `🍪 ${cookies.value} cookies`;
}, 1000);


function buyBuilding(building){
    cookies.value-=building.price;
    building.price += Math.ceil(building.price * 0.15);
    building.count++;
}
// Show boost cookie randomly
function scheduleBoostCookie() {
    const delay = Math.random() * 20000 + 20000; // 20s–40s
    setTimeout(() => {
        showBoostCookie.value = true;
        setTimeout(() => showBoostCookie.value = false, 10000); // disappear in 10s
        scheduleBoostCookie(); // schedule next one
    }, delay);
}
const isJumping = ref(false);

function clickMainCookie(){
    cookies.value += boostActive.value ? 4 : 1;

    // Trigger jump animation
    isJumping.value = true;
    setTimeout(() => {
        isJumping.value = false;
    }, 300); // match with animation duration
}

// Activate boost for 60s
function activateBoost() {
    boostActive.value = true;
    showBoostCookie.value = false;
    setTimeout(() => boostActive.value = false, 60000);
}

scheduleBoostCookie();
onUnmounted(() => {
    clearInterval(cpsInterval);
});
</script>
<style scoped>
@keyframes jump {
  0%   { transform: scale(1) translateY(0); }
  30%  { transform: scale(1.05) translateY(-20px); }
  50%  { transform: scale(1.05) translateY(-10px); }
  100% { transform: scale(1) translateY(0); }
}

.jump {
  animation: jump 0.3s ease;
}
</style>
<template>
    <div class="columns">
        <div class="column is-3 has-background-primary has-text-centered">
            <h1 class="is-size-1"><b>Cookies: {{ +cookies.toFixed(1) }}</b></h1>
            <h3 class="is-size-3"><b>CPS: {{ +cps.toFixed(1) }}</b></h3>
            <figure class="image is-square m-5">
                <img
  @click="clickMainCookie"
  class="is-rounded"
  :class="{ jump: isJumping }"
  src="https://pngimg.com/uploads/cookie/cookie_PNG13656.png"
/>
            </figure>
        </div>
        <div class="column is-7 has-background-info">Second column</div>
        <div class="column is-2 has-background-warning">
            <button class="button is-large is-fullwidth is-primary" v-for="building in buildings" :disabled="cookies<building.price" @click="buyBuilding(building)" >
                {{ building.name }} 🍪{{ building.price }} #{{ building.count }}
            </button>
        </div>
    </div>
</template>