<template>
  <div id="login-form">
    <div id="icon">
			<img src="../../assets/icons/instabug.svg">
		</div>
		<div id="header">Log in to Instabug</div>

		<LoginSocial id="login-social"/>

		<div id="separator">
			<div class="line"></div>
			<div class="head-text" id="or">OR</div>
		</div>

		<div id="form">
			<div id="warning" :class="[auth ? 'error-msg-disabled': 'error-msg-enabled']"> Your email and/or password are incorrect</div>

			<div class="input-group">
				<div class="input-title">Work Email</div>
				<input type="text" id="email-input" placeholder="you@company.com" v-model="emailInput" :class="[emaiStyle.input]">
				<div id="email-error" :class="['error-msg', emaiStyle.msg]">Enter a valid email address</div>
			</div>

			<div class="input-group">
				<div id="password-group">
					<div class="input-title">Password</div>
					<div id="forgot-password">Forgot password?</div>
				</div>
				<input type="password" id="password-input" placeholder="6+ Characters" v-model="passwordInput" :class="[passwordStyle.input]">
				<div id="password-error" :class="['error-msg', passwordStyle.msg]">Password must be 6 characters or more</div>
			</div>

			<div id="login-btn" :class="[loginBtnStyle]" @click="login()">Log in</div>

			<div id="links-group">
				<div id="signup-group">Don't have an account?<span id="signup-btn" class="link">Sign up</span></div>
				<div id="sso" class="link">Login via SSO</div>
			</div>
		</div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import LoginSocial from './LoginSocial.vue';

export default {
  name: 'LoginForm',
	components: {
    LoginSocial,
},
  data() {
    return {
			auth: true,
			emailInput: null,
			passwordInput: null,
		}
  },
	computed: {
		...mapGetters(['isVerified']),
		emaiStyle() {
			if(this.emailInput === null) return {input: 'neutral', msg: 'error-msg-disabled'};

			if(this.validateEmail()) return {input:'valid', msg: 'error-msg-disabled'};
			else return {input: 'invalid', msg: 'error-msg-enabled'};
		},
		passwordStyle() {
			if(this.passwordInput === null || this.validatePassword()) return {input: 'neutral', msg: 'error-msg-disabled'};
			else if(!this.validatePasswordLength()) return {input: 'invalid', msg: 'error-msg-enabled'};
			return {input: 'invalid', msg: 'error-msg-disabled'};
		},
		loginBtnStyle() {
			if(this.validateEmail() && this.validatePassword()) return 'login-btn-valid';
			return 'login-btn-invalid';
		},
	},
	methods: {
		...mapActions(['verify', 'stopTimer', 'authorize']),
		validateEmail() {
			const validationRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return validationRegex.test(String(this.emailInput).toLowerCase());
		},
		validatePassword() {
			// Validate capital letters
			const upperCaseValidation = /[A-Z]/g;
			if(!upperCaseValidation.test(String(this.passwordInput))) return false;

			// Validate numbers
			const numbersValidatoin = /[0-9]/g;
			if(!numbersValidatoin.test(String(this.passwordInput))) return false;

			// Validate length
			

			//not containing part before @
			if(this.validateEmail()) {
				const beforeAt = this.emailInput.substring(0, this.emailInput.indexOf('@'));
				if(this.passwordInput.includes(beforeAt)) return false;
			}

			return this.validatePasswordLength;
		},
		validatePasswordLength() {
			if(String(this.passwordInput).length < 6) return false;
			return true;
		},
		login() {
			if(this.validateEmail() && this.validatePassword()) {
				this.verify({email: this.emailInput, password: this.passwordInput});
				this.auth = this.isVerified;
				if(this.auth) {
					this.stopTimer();
					this.authorize();
					this.$router.push('/welcome');
				}
			}
		},
	}
}
</script>

<style lang="scss" scoped>
$titleColor: rgb(76, 87, 107);
$gray: rgb(238, 240, 242);
$darkGray: rgb(204, 204, 204);
$shinyBlue: rgb(56, 137, 222);
$warningBackground: rgb(248, 231, 227);
$warningBorder: rgb(186, 173, 170);
$errorColor: rgb(235, 82, 65);
$validBackground: rgb(233, 240, 253);

#login-form {
	width: 50%;
	height: 100%;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

#header {
	max-width: 28rem;
	min-width: 80%;
	color: $titleColor;
	font: {
		size: xx-large;
		weight: 500;
	}
}


#separator {
	height: 3rem;
	max-width: 28rem;
	min-width: 80%;

	display: flex;
	justify-content: center;
	align-items: center;

	margin-top: 0.4rem;

	.line {
		width: 100%;
		border-bottom: solid 2px $gray;
	}

	#or {
		position: absolute;
		width: 2rem;
		
		background-color: white;
		text-align: center;
		
		color: $titleColor;
		font: {
			size: medium;
			weight: bold;
		}

	}
}


#form {
	max-width: 28rem;
	min-width: 80%;

	input[type=text],
	input[type=password] {
		width: 100%;
		padding: 0rem 1rem;
		height: 2.5rem;
		border-radius: 0.2rem;
		color: $titleColor;
		outline: none;
	}

	.input-title {
		color: $titleColor;
		font: {
			weight: 500;
			size: normal;
		}
		margin-bottom: 0.3rem;
		text-align: left;
	}

	.input-group {
		width: 100%;
		margin-bottom: 1rem;

		.error-msg {
			color: $errorColor;
			height: 1rem;
			margin-top: 0.4rem;
			font: {
				size: small;
				weight: 400;
			}
			text-align: left;
			line-height: 1rem;
		}
	}

	#password-group {
		display: flex;

		#forgot-password {
			color: $darkGray;
			font-weight: 500;
			cursor: pointer;
			margin-left: auto;

			&:hover {
				color: $shinyBlue;
			}
		}
	}

	#login-btn {
		color: white;
		width: 100%;
		height: 2.5rem;
		font-weight: bold;
		border-radius: 0.2rem;
		line-height: 2.5rem;
	}

	#links-group {
		display: flex;
		align-items: center;
		min-height: 3rem;
		font-weight: lighter;

		#signup-group {
			color: $titleColor;
			#signup-btn {
				margin-left: 0.3rem;
			}
		}

		#sso {
			margin-left: auto;
		}

		.link{
			color: $shinyBlue;
			cursor: pointer;
			font-weight: 500;

			&:hover {
				color: black;
			}
		}
	}
}

#warning {
	color: $titleColor;
	background-color: $warningBackground;
	border: solid 1px $warningBorder;
	border-radius: 0.2rem;
	width: 100%;
	height: 3rem;
	padding-left: 1rem;
	margin-bottom: 1rem;
	text-align: left;
	line-height: 3rem;
}

.invalid[type=text],
.invalid[type=password]{
	border: solid 1px $errorColor;
	&:focus {
		border: solid 1px $errorColor;
		box-shadow: inset 0px 0px 4px $errorColor;
	}
}

.valid[type=text],
.valid[type=password]{
	border: solid 1px $shinyBlue;
	box-shadow: inset 0px 0px 4px $shinyBlue;
	background-color: $validBackground;
	&:focus {
		border: solid 1px $shinyBlue;
		box-shadow: inset 0px 0px 4px $shinyBlue;
	}
}

.neutral[type=text],
.neutral[type=password]{
	border: solid 1px $gray;
	&:focus {
		border: solid 1px $shinyBlue;
		box-shadow: inset 0px 0px 4px $shinyBlue;
	}
}

.error-msg-disabled {
	display: none;
}
.error-msg-enabled {
	display: block;
}

.login-btn-invalid {
	background-color: $darkGray;
	cursor: not-allowed;
}
.login-btn-valid {
	background-color: $shinyBlue;
	cursor: pointer;
}
</style>