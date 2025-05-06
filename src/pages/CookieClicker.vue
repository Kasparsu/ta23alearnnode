<script setup>
import { computed, onUnmounted, ref } from 'vue';

let cookies = ref(0);

let buildings = ref([
    { name: 'Cursor', price: 15, count: 0, cps: 0.1, img: "https://cookieclicker.wiki.gg/images/d/d2/Plain_cursor.png?9ed1ed" },
    { name: 'Grandma', price: 100, count: 0, cps: 1, img: "https://cookieclicker.wiki.gg/images/3/31/Grandma_new.png" },
    { name: 'Farm', price: 1100, count: 0, cps: 8, img: "https://cookieclicker.wiki.gg/images/a/a7/Farm.png?abe7b9.png/revision/latest?cb=20151222041313" },
    { name: 'Factory', price: 12000, count: 0, cps: 47, img: "https://cookieclicker.wiki.gg/images/a/a3/Factory.png?49687a" },
    { name: 'Bank', price: 1400000, count: 0, cps: 1400, img: "https://cookieclicker.wiki.gg/images/a/ae/Bank.png?83c29f" },
    { name: 'Temple', price: 20000000, count: 0, cps: 7800, img: "https://cookieclicker.wiki.gg/images/4/49/Temple.png?548118" },
    { name: 'Wizard Tower', price: 330000000, count: 0, cps: 44000, img: "https://cookieclicker.wiki.gg/images/2/22/Wizardtower.png?bd538b" },
    { name: 'Shipment', price: 5100000000, count: 0, cps: 260000, img: "https://cookieclicker.wiki.gg/images/f/fb/Shipment_new.png?d93626" }
]);

let cps = computed(() => {
    return buildings.value.reduce((total, building) => total + building.cps * building.count, 0);
});

const cpsInterval = setInterval(() => {
    cookies.value += cps.value;
    document.title = `🍪 ${+cookies.value.toFixed(1)} cookies`;
}, 1000);


function buyBuilding(building) {
    cookies.value -= building.price;
    building.price += Math.ceil(building.price * 0.15);
    building.count++;
}

onUnmounted(() => {
    clearInterval(cpsInterval);
});

// Cursorf

let x = ref(0);
let y = ref(0);

let angle = ref(0);
let cursorIndex = ref(1);

const orbitPosition = (index, total, radius) => {
    const angle = (index / total) * 2 * Math.PI;
    return {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius
    };
};

const cursorOrbitRadius = 200;
</script>
<template>
    <div class="columns">
        <div class="column is-3 has-background-primary has-text-centered">
            <h1 class="is-size-1"><b>Cookies: {{ +cookies.toFixed(1) }}</b></h1>
            <h3 class="is-size-3"><b>CPS: {{ +cps.toFixed(1) }}</b></h3>
            <figure class="image">
                <img @click="cookies++" class="is-rounded"
                    src="https://pngimg.com/uploads/cookie/cookie_PNG13656.png" />
                <img v-for="(n, index) in buildings.find(b => b.name === 'Cursor').count" :key="index"
                    :src="buildings.find(b => b.name === 'Cursor').img" class="orbiting-cursor" :style="{
                        transform: `rotate(${(index / buildings.find(b => b.name === 'Cursor').count) * 360}deg) translate(${cursorOrbitRadius}px) rotate(-${(index / buildings.find(b => b.name === 'Cursor').count) * 360}deg)`
                    }" />
            </figure>
        </div>
        <div class="column is-7 has-background-info">
            <h2 class="title is-4 has-text-white">Your buildings</h2>
            <div v-for="building in buildings" :key="building.name" class="mb-5">
                <div v-if="building.name === 'Cursor'">
                    <h3 class="has-text-white mb-2">{{ building.name }} ({{ building.count }})</h3>
                </div>
                <div v-else>
                    <h3 class="has-text-white mb-2">{{ building.name }} ({{ building.count }})</h3>
                    <div class="stacked-images">
                        <img v-for="n in building.count" :key="n" :src="building.img" class="building-image"
                            :alt="building.name" />
                    </div>
                </div>

            </div>
        </div>
        <div class="column is-2 has-background-warning">

            <button class="button is-large is-fullwidth is-primary" v-for="building in buildings"
                :disabled="cookies < building.price" @click="buyBuilding(building)">
                {{ building.name }} 🍪{{ building.price.toLocaleString() }}
            </button>
        </div>
    </div>
</template>

<style scoped>
.button {
    word-break: break-word;
    white-space: normal !important;
    text-align: center;
    margin-bottom: 10px;
}
.orbiting-cursor{
    width: 32px;
    height: 32px;
    position: absolute;
    top: 45%;
    left: 45%;
    object-fit: contain;
}

</style>