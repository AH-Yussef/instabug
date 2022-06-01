describe('Redirection tests LOCAL', function() {  
	it('redirection scenario', function() {
		cy.visit('http://localhost:8080/#/login');
		//enter email
		cy.get('#email-input')
			.type('mohamed@instabug.com')

		//enter password
		cy.get('#password-input')
			.type('A12345678')
		
		//click login
		cy.get('#login-btn').click()

		//re visit login
		cy.visit('http://localhost:8080/#/login');
		
		//validate redirection to welcome
		cy.url().should('include', '/welcome');

		//logout
		cy.get('#logout-btn').click()

		//try visiting welcome again
		cy.visit('http://localhost:8080/#/welcome');

		//validate redirection to welcome
		cy.url().should('include', '/login');
	})

	it('page not found', function() {
		cy.visit('http://localhost:8080/#/aaa');

		cy.url().should('include', '/404')
	})
}) 