<script setup>
import { computed, onUnmounted, ref } from 'vue';

let cookies = ref(0);

let buildings = ref([
    { name: 'Cursor', price: 15, count: 0, cps: 0.1 },
    { name: 'Grandma', price: 100, count: 0, cps: 1 },
    { name: 'Farm', price: 1000, count: 0, cps: 10 },
    { name: 'Factory', price: 10000, count: 0, cps: 100 },
]);

let upgrades = ref([
    {name: 'CursorUpgrade', price: 100}
]);

let isCursorUpgradeBought = ref(false);

let cps = computed(() => {
    return buildings.value.reduce((total, building) => total+building.cps*building.count, 0);
});

const cpsInterval = setInterval(() => {
    cookies.value+=cps.value;
    document.title = `🍪 ${+cookies.value.toFixed(1)} cookies`;
}, 1000);


function buyBuilding(building){
    cookies.value-=building.price;
    building.price += Math.ceil(building.price * 0.15);
    building.count++;
}


function getBuildingImage(building) {
    switch (building.name) {
        case 'Cursor':
            return 'https://pngimg.com/uploads/cursor/cursor_PNG68.png';
        case 'Grandma':
            return 'https://pngimg.com/uploads/girls/small/girls_PNG6492.png';
        case 'Farm':
            return 'https://pngimg.com/uploads/grass/grass_PNG109097.png';
        case 'Factory':
            return 'https://pngimg.com/uploads/building/building_PNG28.png';
    }
}


function DoubleCursorCPS() {
    const cursorBuilding = buildings.value.find(b => b.name === 'Cursor');
    if (cursorBuilding) {
        cursorBuilding.cps *= 2; 
    }
    cookies.value-=100;
    isCursorUpgradeBought.value = true;
}

onUnmounted(() => {
    clearInterval(cpsInterval);
});

</script>
<template>
    <div class="columns">
        <div class="column is-3 has-background-primary has-text-centered">
            <h1 class="title is-size-1"><b>Cookies: {{ +cookies.toFixed(1) }}</b></h1>
            <h3 class="title is-size-3"><b>CPS: {{ +cps.toFixed(1) }}</b></h3>
            <figure class="image is-square m-5">
                <img @click="cookies++" class="is-rounded" src="https://pngimg.com/uploads/cookie/cookie_PNG13656.png" />
            </figure>
        </div>

        <div class="column is-7 has-background-info">
            <h1 class="title has-text-centered">Buildings</h1>
            <div v-for="building in buildings" :key="building.name">
                <div v-if="building.count > 0" class="has-text-centered m-3">
                    <div class="columns is-multiline">
                        <div class="column is-narrow" v-for="n in building.count" :key="n">
                            <figure class="image is-16x16">
                                <img class="is-rounded" :src="getBuildingImage(building)">
                            </figure>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="column is-2 has-background-warning">
            <p class="title has-text-centered is-size-3 mt-5">Store</p>
            <button class="button is-large is-fullwidth is-primary mt-1" v-for="building in buildings" :key="building.name" :disabled="cookies < building.price" 
            @click="buyBuilding(building)">
                {{ building.name }} 🍪{{ building.price }} #{{ building.count }}
            </button>
            <p class="title has-text-centered is-size-3 mt-5">Upgrades</p>
            <button class="button is-large is-fullwidth is-primary" 
                    :disabled="cookies < upgrades[0].price || isCursorUpgradeBought" 
                    v-if="!isCursorUpgradeBought" 
                    @click="DoubleCursorCPS">
                Cursor Upgrade
            </button>
        </div>
    </div>
</template>

