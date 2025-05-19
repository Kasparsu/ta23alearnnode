<script setup>
import { computed, onUnmounted, ref } from 'vue';
import Modal from '../components/Modal.vue';

let cookies = ref(0);
let modalActive = ref(false);
let selectedAchievement = ref(null);

let buildings = ref([
    { name: 'Cursor', price: 15, count: 0, cps: 0.1 },
    { name: 'Grandma', price: 100, count: 0, cps: 1 },
    { name: 'Farm', price: 1000, count: 0, cps: 10 },
    { name: 'Factory', price: 10000, count: 0, cps: 100 },
]);

let achievements = ref([
    { name: 'First Crumbs', description: 'Bake 0.3 cookies per second.', unlocked: false, condition: () => cps.value >= 0.3 },
    { name: 'Getting There', description: 'Bake 1 cookie per second.', unlocked: false, condition: () => cps.value >= 1 },
    { name: 'Hardcore baking', description: 'Bake 10 cookies per second.', unlocked: false, condition: () => cps.value >= 10 },
]);

let cps = computed(() => {
    return buildings.value.reduce((total, building) => total + building.cps * building.count, 0);
});

const cpsInterval = setInterval(() => {
    cookies.value += cps.value;
    document.title = `🍪 ${cookies.value.toFixed(1)} cookies`;

    achievements.value.forEach(achievement => {
        if (!achievement.unlocked && achievement.condition()) {
            achievement.unlocked = true;
        }
    });
}, 1000);

function buyBuilding(building) {
    if (cookies.value >= building.price) {
        cookies.value -= building.price;
        building.price += Math.ceil(building.price * 0.15);
        building.count++;
    }
}

function openAchievement(achievement) {
    selectedAchievement.value = achievement;
    modalActive.value = true;

}
onUnmounted(() => {
    clearInterval(cpsInterval);
});
</script>

<template>
    <div class="columns">
        <div class="column is-3 has-background-primary has-text-centered">
            <h1 class="is-size-1"><b>Cookies: {{ cookies.toFixed(1) }}</b></h1>
            <h3 class="is-size-3"><b>CPS: {{ cps.toFixed(1) }}</b></h3>
            <figure class="image is-square m-5">
                <img @click="cookies++" class="is-rounded"
                    src="https://pngimg.com/uploads/cookie/cookie_PNG13656.png" />
            </figure>
        </div>

        <div class="column is-7 has-background-info">
            <h1 class="is-size-1 has-text-light">Achievements</h1>
            <div class="grid">
                <button v-for="achievement in achievements" :key="achievement.name"
                    :class="['button', achievement.unlocked ? 'is-success' : 'is-danger']"
                    @click="openAchievement(achievement)">
                    {{ achievement.name }}
                </button>
            </div>

            <Modal :active="modalActive" @close="modalActive = false">
                <div class="notification is-primary">
                    <h1>{{ selectedAchievement?.name }}</h1>
                    <p>{{ selectedAchievement?.description }}</p>
                </div>
            </Modal>
        </div>

        <div class="column is-2 has-background-warning">
            <button class="button is-large is-fullwidth is-primary" v-for="building in buildings"
                :disabled="cookies < building.price" @click="buyBuilding(building)">
                {{ building.name }} 🍪{{ building.price }} #{{ building.count }}
            </button>
        </div>
    </div>
</template>
