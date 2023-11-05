Cypress.Commands.add("LoginUser", (title, email, password) => {
    cy.get(".v-btn").contains("Sign In").click();    
    cy.get('#select-role').click();    
    if (title !== '') {
        cy.get('.v-list-item__title').contains(title).click();    
    } 

    cy.get('input[id="input-email"]').clear()    
    if (email !== '') {
        cy.get('input[id="input-email"]').type(email);
    }

    cy.get('input[id="input-password"]').clear()
    if (password !== '') {
        cy.get('input[id="input-password"]').type(password);
    }
    
    cy.get('button[id="button-signin"]').click();        
})

Cypress.Commands.add("CredentialsMsg", (message) => {
    if (message === 'Invalid username or password') {
    cy.get('#error-message').contains('Invalid username or password');
    }
})

Cypress.Commands.add("ResponseMsg", (message) => {

    switch (message) {
        case 'Must be valid e-mail':
            cy.get('.v-messages__message').contains(message);
            break;
        case 'This field is required':
            cy.get('.v-messages__message').contains(message);
            break;
        case 'Email is required', 'E-mail is required':
            cy.get('.v-messages__message').contains(message);
            break;                            
    }
})

Cypress.Commands.add("LogoutUser", () => {
    cy.get('.v-avatar').click()
    cy.contains('Logout').click()    
    cy.get('.v-btn__content').contains('Yes').click()
    cy.wait(2000)
    cy.get('.v-btn').contains('Sign In').should('be.visible')
});