<script setup>
import { computed, onUnmounted, ref } from "vue";
import img1 from "../assets/Cookie1.png";
import img2 from "../assets/Cookie2.png";
import img3 from "../assets/Cookie3.png";
import cunchSound from "../assets/Cunch.mp3";
let currentImage = ref(img1);
let cookies = ref(0);
let titles = ref([]);

let buildings = ref([
	{ name: "Cursor", price: 15, count: 0, cps: 0.1 },
	{ name: "Grandma", price: 100, count: 0, cps: 1 },
	{ name: "Farm", price: 1000, count: 0, cps: 10 },
	{ name: "Factory", price: 10000, count: 0, cps: 100 },
	{ name: "Assembly", price: 100000, count: 0, cps: 1000 },
	{ name: "Shipment", price: 1000000, count: 0, cps: 10000 },
	{ name: "Teleporter", price: 10000000, count: 0, cps: 100000 },
]);

let buffs = ref([
	{ name: "Little click", price: 15, count: 0, cpc: 10000000000 },
	{ name: "DB click", price: 100, count: 0, cpc: 2 },
	{ name: "Super click", price: 1000, count: 0, cpc: 10 },
	{ name: "MEGA click", price: 10000, count: 0, cpc: 25 },
	{ name: "HYPER click", price: 100000, count: 0, cpc: 50 },
	{ name: "GALACTIC", price: 1000000, count: 0, cpc: 100 },
	{ name: "GODLY", price: 10000000, count: 0, cpc: 250 },
	{ name: "?", price: 10000000000, count: 0, cpc: 10000000000 },
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
	achivements();
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

let Beginner_farmer = false;
let Experienced_farmer = false;
let Pro_farmer = false;
let Grandma_bought = false;
let what_bought = false;
let Auto_farmer = false;
let Machine_farmer = false;
function achivements() {
	if (cpc.value >= 10 && !Beginner_farmer) {
		titles.value.push("💅 Beginner Farmer!");
		Beginner_farmer = true;
	}
	if (cpc.value >= 100 && !Experienced_farmer) {
		titles.value.push("🌾 Experienced Farmer!");
		Experienced_farmer = true;
	}
	if (cpc.value >= 1000 && !Pro_farmer) {
		titles.value.push("💪🏻 Pro Farmer!");
		Pro_farmer = true;
	}

	if (cps.value >= 10 && !Auto_farmer) {
		titles.value.push("⚙️ Auto Farmer!");
		Auto_farmer = true;
	}
	if (cps.value >= 100 && !Machine_farmer) {
		titles.value.push("🤖 Machine Farmer!");
		Machine_farmer = true;
	}

	let grandma = buildings.value.find((b) => b.name == "Grandma");
	if (grandma && grandma.count >= 1 && !Grandma_bought) {
		titles.value.push("👵🏻 Grandma Slavery?");
		Grandma_bought = true;
	}
	let what = buffs.value.find((b) => b.name == "?");
	if (what.count >= 1 && !what_bought) {
		titles.value.push("w̷̡͎̼͎͎͔̝͎̠̣̰̟͕̼̭̟͎͒̑̂̿̈̀̊͌̃̋̑̊̅͑̔̀̄̎͑̄̓͝͠h̸̡̰̭̳̟͍͗̾͂̓̃̀̆̆͊̅͂̌̏̀͂͂͐̉̃̀̏̓̈͛̕̚̕͠͝ą̷̢̨̢̩̗͔͓̱͚̗̠̺̣͕̞̪̥̣͎̟͓͎͇̖͎̳̯͋͜͜t̴̡̢̢̪̝̥̦̗͇̝̭͙̬̪͙̤̦̱̜̟̦͓͕̮̾̓̄́̑͆̈́͆̽ͅͅͅ ̷̢̢͈̥̤̩̪̊͑̓̏̌̎̈́̿͊̑̈́̚͘̕͝į̵̧̢̧̛̛͍̦̯͚̯̘͎̲̘̞͕̜͉̰̳̜̤̬͖͉͔͒̇͑̇̑́̾́͛̃͋͂̓̚̕̕͝͝ͅş̶̹̫̰̩̱̻͔̞̹̮͓̳̹͓̦̬̤͍̦̮̱͉͈͇̓̄͝ ̷̧̧̛̛̥̣͚̬͓̭̰̙̞̬̫͇̫̼̯͉̘͕͛͆̎̅̓̓͌͛͂́̈́̓͆́̎̔̒̐̓͗͑͛͘̚͜͜ͅt̵͕̰͈̹̤̊̓́̿̑͌̍͐̄͒ͅh̸̬̱̰̮̿̓͐̎̉͊̀̈̓į̶̠̪̰̟̭̓̎͂̎͛̈̍̀̈́͂̿͜͝ͅs̴̡̹̬͙͖͎̠̠͎̦̪̣̍͗͜ͅ");
		what_bought = true;
	}
}
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
		<div class="column is-7 has-background-grey">
			<h2 class="title is-4 has-text-white">Achievements</h2>
			<div
				style="font-weight: 500"
				v-for="(title, index) in titles"
				:key="index"
				class="has-text-white"
			>
				{{ title }}
			</div>
		</div>
		<div
			class="column is-2 has-background-dark"
			style="max-height: 800px; overflow-y: scroll"
		>
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
