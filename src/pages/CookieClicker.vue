<script setup>
import { computed, onUnmounted, ref } from "vue";
import img1 from "../assets/Cookie1.png";
import img2 from "../assets/Cookie2.png";
import img3 from "../assets/Cookie3.png";
import cunchSound from "../assets/Cunch.mp3";
let currentImage = ref(img1);
let cookies = ref(0);

let buildings = ref([
	{ name: "Cursor", price: 15, count: 0, cps: 0.1 },
	{ name: "Grandma", price: 100, count: 0, cps: 1 },
	{ name: "Farm", price: 1000, count: 0, cps: 10 },
	{ name: "Factory", price: 10000, count: 0, cps: 100 },
]);

let buffs = ref([
	{ name: "Little click", price: 15, count: 0, cpc: 0.1 },
	{ name: "DB click", price: 100, count: 0, cpc: 2 },
	{ name: "Super click", price: 1000, count: 0, cpc: 10 },
	{ name: "MEGA click", price: 10000, count: 0, cpc: 25 },
]);

let cps = computed(() => {
	return buildings.value.reduce(
		(total, building) => total + building.cps * building.count,
		0
	);
});

let cpc = computed(() => {
	return buffs.value.reduce((total, buff) => total + buff.cpc * buff.count, 1);
});

const cpsInterval = setInterval(() => {
	cookies.value += cps.value;
	document.title = `🍪 ${cookies.value} cookies`;
}, 1000);

function CookieClick() {
	cookies.value += cpc.value;

	const audio = new Audio(cunchSound);
	audio.play();

	if (currentImage.value == img1) {
		currentImage.value = img2;
	} else if (currentImage.value == img2) {
		currentImage.value = img3;
	} else {
		currentImage.value = img1;
	}
}

function buyBuilding(building) {
	cookies.value -= building.price;
	building.price += Math.ceil(building.price * 0.15);
	building.count++;
}

function buyBuff(buff) {
	cookies.value -= buff.price;
	buff.price += Math.ceil(buff.price * 0.15);
	buff.count++;
}

onUnmounted(() => {
	clearInterval(cpsInterval);
});
</script>
<template>
	<div class="columns">
		<div class="column is-3 has-background-grey-light has-text-centered">
			<h1 class="is-size-1">
				<b>Cookies: {{ +cookies.toFixed(1) }}</b>
			</h1>
			<h3 class="is-size-3">
				<b>CPS: {{ +cps.toFixed(1) }}</b>
			</h3>
			<figure class="image is-square m-5">
				<img @click="CookieClick" :src="currentImage" class="is-rounded" />
			</figure>
		</div>
		<div class="column is-7 has-background-grey">Something</div>
		<div class="column is-2 has-background-dark">
			<button
				class="button is-large is-fullwidth is-warning"
				v-for="building in buildings"
				:disabled="cookies < building.price"
				@click="buyBuilding(building)"
			>
				{{ building.name }} 🍪{{ building.price }} #{{ building.count }}
			</button>
			<button
				class="button is-large is-fullwidth is-danger"
				v-for="buff in buffs"
				:disabled="cookies < buff.price"
				@click="buyBuff(buff)"
			>
				{{ buff.name }} 🖱️{{ buff.price }} #{{ buff.count }}
			</button>
		</div>
	</div>
</template>
