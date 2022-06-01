<template>
  <div id="not-found">
    <div class="main-title">404 - Page Not Found!</div>
		<div class="sub-title">Sorry, that page doesn't exist. What would you like to do?</div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='scss' scoped>
$primaryColor: rgb(6, 36, 112);
$secondaryColor: rgb(137, 156, 193);

#not-found {
	position: absolute;
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.main-title {
	color: $primaryColor;
	font: {
		size: xx-large;
		weight: bolder;
	}
	margin-bottom: 1.2rem;
}

.sub-title {
	color: $secondaryColor;
	font: {
		size: large;
		weight: bold;
	}
}
</style>