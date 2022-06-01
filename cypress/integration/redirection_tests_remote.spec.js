describe('Redirection tests REMOTE', function() {  
	it('redirection scenario', function() {
		cy.visit('https://ah-yussef.github.io/instabug/#/login');
		//enter email
		cy.get('#email-input')
			.type('mohamed@instabug.com')

		//enter password
		cy.get('#password-input')
			.type('A12345678')
		
		//click login
		cy.get('#login-btn').click()

		//re visit login
		cy.visit('https://ah-yussef.github.io/instabug/#/login');
		
		//validate redirection to welcome
		cy.url().should('include', '/welcome');

		//logout
		cy.get('#logout-btn').click()

		//try visiting welcome again
		cy.visit('https://ah-yussef.github.io/instabug/#/welcome');

		//validate redirection to welcome
		cy.url().should('include', '/login');
	})

	it('page not found', function() {
        //visiting non existing page
		cy.visit('https://ah-yussef.github.io/instabug/#/aaa');

        //validate redirection to 404 page
		cy.url().should('include', '/404')
	})
}) 