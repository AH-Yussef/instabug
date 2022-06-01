const state = {
	timer: null,
};
	
const getters = {
	sliderTimer: state => state.timer,
};
	
const actions = {
  stopTimer: () => clearInterval(state.timer),
}
  
const mutations = {
	setTimer: (state, timer) => state.timer = timer
};
	
export default{
	state,
	getters,
	actions,
	mutations,
};