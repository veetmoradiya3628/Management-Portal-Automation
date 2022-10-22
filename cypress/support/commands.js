import Utils from './Utils'


// login
Cypress.Commands.add('login', (url,email,password) => {
    const utils = new Utils()
    cy.visit(url).then(() => {
        utils.textField("[name='username']",email)
        utils.clickButtonWithId("[value='Next']")
        utils.textField("[name='password']",password)
        utils.clickButtonWithId("[value='Sign In']")
    })
})

// load data file 
Cypress.Commands.add('load_file', (filename) => {
    cy.fixture(filename).then((data) => {
        return data;
    });
})