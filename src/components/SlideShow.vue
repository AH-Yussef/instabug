<template>
  <div id="slider">
    <transition-group name="slide" tag="div" id="all-slides">
      <div v-for="i in [currentIndex]" :key="i">
				<img :src="require(`../assets/slides/${currentImg}`)" class="slide-img"/>
				<div class="disc">{{currentDisc}}</div>
      </div>
    </transition-group>
		<div id="slide-selector">
			<div v-for="i in slides.length" :key="i">
				<input type="radio" name="slider" :id="`slide-selector-${i}`" selected="false" @click="moveTo(i)">
				<label :for="`slide-selector-${i}`"></label>
			</div>
		</div>
	</div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';

export default {
	name: 'SlideShow',
	data() {
		return {
			slides: [
				{image: 'slide1.svg', discription: "Accelerate Your Entire Mobile Team Workflow"},
				{image: 'slide2.svg', discription: "The Most Comprehensive Bug Reporting Tool for Mobile Apps"},
				{image: 'slide3.svg', discription: "Secure Crash Reporting With Real-Time Alerts"},
			],
			currentIndex: 0,
		}
	},
	computed: {
		currentImg() {
			return this.slides[this.slideIndex].image;
		},

		currentDisc() {
			return this.slides[this.slideIndex].discription;
		},

		slideIndex() { 
			return Math.abs(this.currentIndex) % this.slides.length;
		},
	},

	methods: {
		...mapActions(['stopTimer']),
		...mapMutations(['setTimer']),
		startSlide() {
      const timer = setInterval(this.next, 3000);
			this.setTimer(timer);
		},

		next() {
			this.currentIndex ++;
			this.selectRadio(this.slideIndex);
		},

		moveTo(slideNumber){
			this.currentIndex = slideNumber -1;
			this.selectRadio(this.slideIndex);
			this.stopTimer();
			this.startSlide();
		},

		selectRadio(slideIndex) {
			document.getElementById(`slide-selector-${slideIndex+1}`).checked = true;
		}
	},

	mounted() {
		this.selectRadio(0);
		this.startSlide();
	}
}
</script>

<style lang="scss" scoped>
$primaryColor: rgb(6, 36, 112);
$radioCheckedColor: white;
$radioBorder: white;
$slidesNum: 3;

#slider {
	width: 50%;
	height: 100%;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	background-color: $primaryColor;
}

.slide-enter-active {
  transition: all 0.8s ease;
}
.slide-leave-active {
	display: none;
}

.slide-enter {
  transform: translate(-70%, 0);
}
.slide-leave-to {
  transform: translate(70%, 0);
	transition: display 0.8s ease;
	display: none;
}

#all-slides {
	width: 90%;

	.slide-img {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
}

.disc {
	color: white;
	font: {
		size: 180%;
		weight: 1rem;
	}
	width: 100%;
	min-height: 5rem;
	margin-top: 2rem;
	text-align: center;
}

#slide-selector {
	margin-top: 2rem;
	width: 80%;
	display: flex;
	justify-content: center;

	input[type="radio"] {
		display: none;
	}

	label {
		background: none;
		border: 1px solid $radioBorder;
		display: inline-block;
		cursor: pointer;
		width: 0.8rem;
		height: 0.8rem;
		border-radius: 50%;
		margin: 0 0.3rem 0 0.3rem;
	}

	@for $i from 1 through $slidesNum{
		#slide-selector-#{$i}:checked ~ label[for="slide-selector-#{$i}"] {
			background: $radioCheckedColor;
		}
	}
}
</style>