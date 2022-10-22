import 'cypress-file-upload';

class Utils {
    // Common Utility Functions
    textField(id,value){
        cy.get(id).clear().type(value)
    }

    dropDown(id,value){
        cy.get(id+'  > div > [name="ic_list_arrow_down"]').click({ multiple: true })
        cy.get('.msi-select-options-list').contains(value).click()
        cy.wait(2000)
    }

    selectList(value){
        cy.get('msi-dropdown-item').get('.msi-dropdown-item').contains(value).click()
    }

    clickButton(value){
        cy.contains('button', value).should('be.enabled').click({ force: true })
        cy.wait(2000)
    }

    search(value){
        cy.get('input[placeholder*="Search"]').clear().type(value)
        cy.wait(3000)
    }

    clickButtonWithId(id){
        cy.wait(3000)
        cy.get(id).click()
        cy.wait(3000)
    }

    clickIconButton(id){
        cy.wait(3000)
        cy.get(id).click({ force: true })
        cy.wait(3000)
    }

    attachBulkFile(name ,file_path){
        cy.get(name).attachFile(file_path)
    }

    // Assert Functions
    checkButtonEnable(value){
        cy.contains('button', value).should('be.enabled')
    }

    checkButtonDisable(value){
        cy.contains('button', value).should('be.disabled')
    }

    checkRowCount(){
        cy.get('.table-scroll').find('tr').should('have.length',1)
    }
    
    checkFieldValuebyId(id, expectedValue){
        cy.get(id).invoke('text').should('eq', expectedValue)
    }
}

export default Utils
