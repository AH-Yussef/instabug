const state = {
  activeEmail: "",
	verified:false,
	authUsers: new Map(
		[
			['mohamed@instabug.com',  'A12345678'],
			['mohamed1@instabug.com', 'A12345678'],
			['mohamed2@instabug.com', 'A12345678'],
			['mohamed3@instabug.com', 'A12345678'],
			['mohamed4@instabug.com', 'A12345678'],
			['mohamed5@instabug.com', 'A12345678'],
			['mohamed6@instabug.com', 'A12345678'],
			['mohamed7@instabug.com', 'A12345678'],
		]
	)
};
  
const getters = {
  getActiveEmail: state => state.activeEmail,
	isVerified: state => state.verified,
};
  
const actions = {
  verify: ({commit}, {email, password}) => {
    if(state.authUsers.get(email) === password){
			commit('setActiveEmail', email);
			commit('setVerified', true);
		}
		else commit('setVerified', false);
  },

	authorize: () => {
		const authInfo = {verified: true, email: state.activeEmail};
		localStorage.setItem('authInfo', JSON.stringify(authInfo));
	},
	
	unAuthorize: () => {
		const authInfo = {verified: false, email: state.activeEmail};
		localStorage.setItem('authInfo', JSON.stringify(authInfo));
	}
}
  
const mutations = {
	setActiveEmail: (state, email) => state.activeEmail = email,
	setVerified: (state, status) => state.verified = status,
};
  
export default{
  state,
  getters,
  actions,
  mutations,
};