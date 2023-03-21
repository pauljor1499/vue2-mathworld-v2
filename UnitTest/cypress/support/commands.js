// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("GoToMathWorld", (environment) => {
    cy.clearCookies();
    if (environment === 'dev') {
        cy.visit(Cypress.env('dev_url81'));
    }    
    cy.wait(2000);
    cy.get('.signin').contains('Sign In').click();
})

Cypress.Commands.add("WriteToLog", (message) => {
    const now = new Date();
    const timestamp = now.toISOString().replace(/%/g, ' ').replace(/\..+/, '');
    message = timestamp + ' ' + message 
    cy.writeFile('cypress/log/events.txt', message + '\n', { flag: 'a+' })
})  
