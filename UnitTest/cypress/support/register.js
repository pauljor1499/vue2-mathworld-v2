/// <reference types="Cypress" />
const faker = require('faker');


Cypress.Commands.add("CreateRegisterDataSet", () => {
    cy.writeFile('cypress/fixtures/registeruserDataSet.json', {
        'User': Cypress._.times(1, () => {
            var use
            return {
                'fname': faker.name.firstName(),
                'mname': faker.name.middleName(),
                'lname': faker.name.lastName(),
                'registerdAs': 'Student',
                'school': 'University of ' + faker.random.word(8),
                'email': faker.random.word(8) + '@' + faker.random.word(8) + '.com',
                'password': faker.internet.password(),                
            }
        })
    })
})

Cypress.Commands.add("WriteToLog", (message) => {
    const now = new Date();
    const timestamp = now.toISOString().replace(/%/g, ' ').replace(/\..+/, '');
    message = timestamp + ' ' + message 
    cy.writeFile('cypress/log/events.txt', message + '\n', { flag: 'a+' })
})  

Cypress.Commands.add("AddNewAccount", (fname, mname, lname, registerdAs, school, email, password) => {
    var logMessage = 'New Account: ';    
    cy.readFile('cypress/fixtures/registeruserDataSet.json').then((data) => {
        cy.get(".v-btn__content").contains("Register").click();
        cy.get("h5").contains("Create New Account", { timeout: 5000 });
        // First Name
        cy.get('#input-firstname').clear();
        if (fname === '') {                
            cy.get('#input-firstname').type(data.User[0].fname);
            logMessage = logMessage + 'First Name: ' + data.User[0].fname;
        } else if (fname !== 'blank') {
            cy.get('#input-firstname').type(fname);
            logMessage = logMessage + 'First Name: ' + fname;
        }        
        
        // Middle Name
        cy.get('#input-middlename').clear();
        if (mname === '') {                
            cy.get('#input-middlename').type(data.User[0].mname);
            logMessage = logMessage + ' Middle Name: ' + data.User[0].mname;
        } else if (mname !== 'blank') {
            cy.get('#input-middlename').type(mname);
            logMessage = logMessage + ' Middle Name: ' + mname;
        }
        // Last Name
        cy.get('#input-lastname').clear();
        if (lname === '') {    
            cy.get('#input-lastname').type(data.User[0].lname);
            logMessage = logMessage + ' Last Name: ' + data.User[0].lname;
        } else if (lname !== 'blank') {
            cy.get('#input-lastname').type(lname);
            logMessage = logMessage + ' Last Name: ' + lname;
        }
        // Registered As
        if (registerdAs !== '') {        
            cy.get('#input-role').click();
            cy.get('.v-list-item__content').contains(registerdAs).click();  
            logMessage = logMessage + ' Registered As: ' + registerdAs;
        }
        // School
        cy.get('#input-school').clear();
        if (school === '') {                
            cy.get('#input-school').type(data.User[0].school);
            logMessage = logMessage + ' School: ' + data.User[0].school;
        } else if (school !== 'blank') {
            cy.get('#input-school').type(school);
            logMessage = logMessage + ' School: ' + school;
        }
        
        // Email Address
        cy.get('#input-email').clear();
        var emailAdress = data.User[0].email;  
        var alternateEmail = faker.random.word(8) + '@' + faker.random.word(8) + '.com';
        if (email === '') {                            
            if (emailAdress.length > 25) {   
                emailAdress = email.substring(0, 2);             
            }       
            if (emailAdress.length < 1) {   
                emailAdress = alternateEmail
            }
            cy.get('#input-email').type(emailAdress);            
            logMessage = logMessage + ' Email: ' + emailAdress;
        } else if (email !== 'blank') {
            cy.get('#input-email').type(email);
            logMessage = logMessage + ' Email: ' + email;
        }
        // Password
        cy.get('#input-password').clear();
        if (password === '') {              
            cy.get('#input-password').type(data.User[0].password);
            logMessage = logMessage + ' Password: ' + data.User[0].password;
        } else if (password !== 'blank') {
            cy.get('#input-password').type(password);
            logMessage = logMessage + ' Password: ' + password;
        }
        cy.WriteToLog(logMessage);
    })
})

Cypress.Commands.add("AddContactPerson", (cpFName, cpMiddleName, cpLName, cpRelation, cpCountry, cpState, cpCity, cpStreet, cpZip, cpPhone) => {
    var logMessage = 'Contact Person: ';    
    // Contact First Name
    cy.get('#contact-firstname').clear();
    if (cpFName === '') {
        var fname = faker.name.firstName();
        cy.get('#contact-firstname').type(fname);
        logMessage = logMessage + 'First Name: ' + fname;
    } else if (cpFName !== 'blank') {
        cy.get('#contact-firstname').type(cpFName);
        logMessage = logMessage + 'First Name: ' + cpFName;
    }
    // Contact Middle Name
    cy.get('#contact-middlename').clear();
    if (cpMiddleName === '') {
        var mname = faker.name.middleName();
        cy.get('#contact-middlename').type(mname);
        logMessage = logMessage + ' Middle Name: ' + mname;
    } else if (cpMiddleName !== 'blank') {
        cy.get('#contact-middlename').type(cpMiddleName);
        logMessage = logMessage + ' Middle Name: ' + cpMiddleName;
    }   
    // Contact Last Name
    cy.get('#contact-lastname').clear();
    if (cpLName === '') {
        var lname = faker.name.lastName();
        cy.get('#contact-lastname').type(lname);
        logMessage = logMessage + ' Last Name: ' + lname;
    } else if (cpLName !== 'blank') {
        cy.get('#contact-lastname').type(cpLName);
        logMessage = logMessage + ' Last Name: ' + cpLName;
    }
    // Contact Relation
    cy.get('#contact-relationship').clear();
    if (cpRelation === '') {
        var relation = faker.random.word(8);
        cy.get('#contact-relationship').type(relation);
        logMessage = logMessage + ' Relation: ' + relation;
    } else if (cpRelation !== 'blank') {
        cy.get('#contact-relationship').type(cpRelation);
        logMessage = logMessage + ' Relation: ' + cpRelation;
    }
    // Contact Country
    cy.get('#contact-country').clear();
    if (cpCountry === '') {
        var contactCountry = faker.address.country();
        cy.get('#contact-country').type(contactCountry);
        logMessage = logMessage + ' Country: ' + contactCountry;
    } else if (cpCountry !== 'blank') {
        cy.get('#contact-country').dblclick();
        cy.get('#contact-country').type(cpCountry);
        cy.get('#contact-country').type('{downarrow}');
        cy.get('#contact-country').type('{enter}');     
        logMessage = logMessage + ' Country: ' + cpCountry;
    }

    // Contact State
    cy.get('#contact-state').clear();
    if (cpState === '') {
        /// cy.get('select').find('option').eq(2).select() # randomize the number        
        cy.get('#contact-state').select(faker.address.state());
    } else if (cpState !== 'blank') {   
        cy.get('#contact-state').dblclick();
        cy.get('#contact-state').type(cpState);
        cy.get('#contact-state').type('{downarrow}');
        cy.get('#contact-state').type('{enter}');                    
        logMessage = logMessage + ' State: ' + cpState;
    }

    // Contact City
    cy.get('#contact-city').clear();
    if (cpCity === ''){
        cy.get('#contact-city').select(faker.address.city());
    } else if (cpCity !== 'blank') {
        cy.get('#contact-city').dblclick();
        cy.get('#contact-city').type(cpCity);
        cy.get('#contact-city').type('{downarrow}');
        cy.get('#contact-city').type('{enter}');        
        logMessage = logMessage + ' City: ' + cpCity;
    }

    // Contact Street
    cy.get('#contact-street').clear();
    if (cpStreet === ''){
        cy.get('#contact-street').type(faker.address.streetAddress());
    } else if (cpStreet !== 'blank') {
        cy.get('#contact-street').dblclick();
        cy.get('#contact-street').type(cpStreet);
        cy.get('#contact-street').type('{downarrow}');
        cy.get('#contact-street').type('{enter}');   
        logMessage = logMessage + ' Street: ' + cpStreet;
    }

    // Contact Zip
    cy.get('#contact-zipcode').clear();
    if (cpZip === ''){
        cy.get('#contact-zipcode').type(faker.address.zipCode('#####'));
    } else if (cpZip !== 'blank') {
        cy.get('#contact-zipcode').type(cpZip);
        logMessage = logMessage + ' Zip: ' + cpZip;
    }

    // Contact Phone Number (Use Faker to generate random phone number  )
    cy.get('#contact-phone').clear();
    if (cpPhone === ''){
        cy.get('#contact-phone').type('9999999999');
        logMessage = logMessage + ' Phone: 9999999999';
    } else if (cpPhone !== 'blank' && cpPhone !== 'Random') {
        cy.get('#contact-phone').dblclick();
        cy.get('#contact-phone').type(cpPhone);
        logMessage = logMessage + ' Phone: ' + cpPhone;
    } else if (cpPhone === 'Random') {
        var phoneNumber = faker.phone.phoneNumberFormat(10);        
        cy.get('#contact-phone').type(phoneNumber);
        logMessage = logMessage + ' Phone: ' + phoneNumber;
    }  
    cy.WriteToLog(logMessage);
})

Cypress.Commands.add("CreateAccount", () => {                
    cy.get('span').contains('CREATE ACCOUNT').click();
})

Cypress.Commands.add("ResponseMsg", (message) => {
    cy.get('span').should('contain', message);
})
