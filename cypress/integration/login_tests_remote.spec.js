describe('Login tests REMOTE', function() {
    it('non existing email', function() {
      cy.visit('https://ah-yussef.github.io/instabug/#/login');
  
      //enter password
      cy.get('#email-input')
        .type('nonExisting@instabug.com')
      
      //enter password
      cy.get('#password-input')
        .type('1234567AA')
      
      //click login button
          cy.get('#login-btn').click();
      
      //assert warning msg has appeared
      cy.get('#warning')
        .should('have.css', 'display', 'block')
    })
  
    it('existing email but wrong password', function() {
      cy.visit('https://ah-yussef.github.io/instabug/#/login');
  
      //enter email
      cy.get('#email-input')
        .type('mohamed@instabug.com')
      
      //enter password
      cy.get('#password-input')
        .type('1234567AA')
      
      //click login button
      cy.get('#login-btn').click();
      
      //assert warning msg has appeared
      cy.get('#warning')
        .should('have.css', 'display', 'block')
    })
  
    it('correct email and correct password', function() {
      cy.visit('https://ah-yussef.github.io/instabug/#/login');
  
      //enter email
      cy.get('#email-input')
        .type('mohamed@instabug.com')
      
      //enter password
      cy.get('#password-input')
        .type('A12345678')
      
      //click login button
      cy.get('#login-btn').click()
  
      //Validate that the browser will redirect to the welcome page
      cy.url().should('include', '/welcome')
    })
  
    it('invalid email', function() {
      cy.visit('https://ah-yussef.github.io/instabug/#/login');
  
      //enter email
      cy.get('#email-input')
        .type('dddd')
        .blur()
  
      //Validate that the red validation message will appear
      cy.get('#email-input')
        .should('have.css', 'border-color', 'rgb(235, 82, 65)')
  
      //Validate that the textbox border will be red
      cy.get('#email-error')
        .should('have.css', 'display', 'block')
    })
  }) 