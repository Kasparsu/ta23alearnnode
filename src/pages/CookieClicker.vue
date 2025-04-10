<script setup>
import { computed, onUnmounted, ref, watch } from 'vue';

let cookies = ref(0);

let buildings = ref([
    { name: 'Cursor', price: 15, count: 0, cps: 0.1 },
    { name: 'Grandma', price: 100, count: 0, cps: 1 },
    { name: 'Farm', price: 1000, count: 0, cps: 10 },
    { name: 'Factory', price: 10000, count: 0, cps: 100 },
]);

let cps = computed(() => {
    return buildings.value.reduce((total, building) => total+building.cps*building.count, 0);
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

onUnmounted(() => {
    clearInterval(cpsInterval);
});

//features
let showSecondCookie = ref(false);
let showBalloons = ref(false);

watch(cookies, (newVal, oldVal) => {
    if (newVal >= 100 && oldVal < 100) {
        showSecondCookie.value = true;
        triggerBalloons();
    }

    if (Math.floor(newVal / 100) > Math.floor(oldVal / 100)) {
        triggerBalloons();
    }
});

function triggerBalloons() {
    showBalloons.value = true;
    setTimeout(() => {
        showBalloons.value = false;
    }, 2000);
}

function clickBonusCookie(event) {
    if (event.button === 0 || event.button === 2) {
        cookies.value++;
    }
}
</script>

<template>
    <div class="columns is-relative">
        <div class="column is-3 has-background-primary has-text-centered">
            <h1 class="is-size-1"><b>Cookies: {{ +cookies.toFixed(1) }}</b></h1>
            <h3 class="is-size-3"><b>CPS: {{ +cps.toFixed(1) }}</b></h3>
            <figure class="image is-square m-5">
                <img @click="cookies++" class="is-rounded cookie-img" src="https://pngimg.com/uploads/cookie/cookie_PNG13656.png" />
            </figure>
        </div>

        <div class="column is-7 has-background-info has-text-centered">
            <div v-if="showSecondCookie">
                <h2 class="is-size-2 has-text-white">Bonus Cookie!</h2>
                <figure class="image is-square m-5">
                    <img
                        class="is-rounded cookie-img"
                        src="https://pngimg.com/uploads/cookie/cookie_PNG13656.png"
                        @mousedown.prevent="clickBonusCookie"
                        @contextmenu.prevent
                    />
                </figure>
            </div>
            <div v-if="showBalloons" class="balloons-overlay">
                🎈🎈🎈🎈🎈
            </div>
        </div>

        <div class="column is-2 has-background-warning">
            <button class="button is-large is-fullwidth is-primary" v-for="building in buildings" :disabled="cookies<building.price" @click="buyBuilding(building)" >
                {{ building.name }} 🍪{{ building.price }} #{{ building.count }}
            </button>
        </div>
    </div>
</template>

<style>
.balloons-overlay {
    position: absolute;
    top: 30%;
    left: 0;
    width: 100%;
    text-align: center;
    font-size: 4rem;
    pointer-events: none;
    animation: floatUp 2s ease-out;
}

@keyframes floatUp {
    from {
        transform: translateY(100px);
        opacity: 1;
    }
    to {
        transform: translateY(-100px);
        opacity: 0;
    }
}

.cookie-img {
    width: 100%;
    max-width: 100%;
    max-height: 70%;
    cursor: pointer;
    user-select: none;
}
</style>
