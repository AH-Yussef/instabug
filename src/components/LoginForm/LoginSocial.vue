<template>
  <div id="login-social">
		<div class="social-btn" id="google">
			<div id="google-img" class="image-holder"><img src="../../assets/icons/google.png" width="20px"></div>
			<div class="title">Google</div>
		</div>
		<div class="social-btn" id="github">
			<div id="github-img" class="image-holder"><img src="../../assets/icons/github.png" width="30px"></div>
			<div class="title">GitHub</div>
		</div>
		<div class="social-btn" id="microsoft">
			<div id="microsoft-img" class="image-holder"><img src="../../assets/icons/microsoft.png" width="30px"></div>
			<div class="title">Microsoft</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'LoginSocial',
}
</script>

<style lang="scss" scoped>
$google: rgb(81, 134, 236);
$github: rgb(51, 51, 51);
$microsoft: white;
$microsoftColor: rgb(94, 94, 94);
$microsoftBorder: rgb(140, 140, 140);

#login-social {
	max-width: 28rem;
	min-width: 80%;
}

.social-btn {
	width: 100%;
	height: 3rem;
	margin-top: 0.5rem;
	display: flex;
	align-items: center;
	border-radius: 0.2rem;
	cursor: pointer;
}

.title {
	color: white;
	width: 100%;
	font: {
		weight: bold;
		size: normal;
	}
}

.image-holder {
  display: inline-grid;
  place-items: center;
	margin-left: 0.5rem;
	width: 2.5rem;
	height: 2.5rem;
}

#google {
	background-color: $google;

	#google-img {
		background-color: white;
		border-radius: 0.2rem;
	}
}

#github {
	background-color: $github;
}

#microsoft {
	border: solid 1px $microsoftBorder;

	.title {
		color: $microsoftColor;
	}
}
</style>