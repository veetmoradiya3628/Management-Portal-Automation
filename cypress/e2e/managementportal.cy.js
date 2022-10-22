import _ from 'lodash'
import FuncUtils from '../support/FuncUtils'
import Utils from '../support/Utils'

const utils = new Utils()
const funcUtils = new FuncUtils()
const config_data = require('../fixtures/config.json')
var date = new Date().toLocaleDateString().replaceAll('/', '_')

const filename = 'systems'
const prefix = 'AutoOneDesign'
const prefix_resource = 'AutoOneDesignResource'

describe('Management Portal', () => {
    describe('Login', () => {
        it('Failure Scenario', () => {
            cy.login(Cypress.env("url"), "abc@gmail.com", "12345")
            cy.get("[role='alert'] > p").should('have.text', 'Sign in failed!')
        })

        it('Success Scenario', () => {
            cy.login(Cypress.env("url"), Cypress.env("email"), Cypress.env("password"))
            cy.url({ timeout: 12000 })
            utils.clickIconButton('[aria-label="ptt gateway"]')
        })
    })

    describe('Demo System1', () => {
        describe('System', () => {
            it('Create System', () => {
                cy.visit(Cypress.env("url")).then(() => {
                    cy.wait(4000)
                    utils.clickIconButton('[aria-label="ptt gateway"]')
                    cy.load_file(filename).each((system_data) => {
                        if (system_data.mototrbo_type == config_data.CONFIG_JSON.MOTOTRBOTYPE.CAPACITY_PLUS_MULTI_SITE) {
                            funcUtils.createSystem(system_data);
                        }
                    })
                })
            })

            it('Read System', () => {
                cy.visit(Cypress.env("url")).then(() => {
                    cy.wait(4000)
                    utils.clickIconButton('[aria-label="ptt gateway"]')
                    cy.load_file(filename).each((system_data) => {
                        if (system_data.mototrbo_type == config_data.CONFIG_JSON.MOTOTRBOTYPE.CAPACITY_PLUS_MULTI_SITE) {
                            funcUtils.readSystem(system_data);
                        }
                    })
                })
            })

            it('Update System', () => {
                cy.visit(Cypress.env("url")).then(() => {
                    cy.wait(4000)
                    utils.clickIconButton('[aria-label="ptt gateway"]')
                    cy.load_file(filename).each((system_data) => {
                        if (system_data.mototrbo_type == config_data.CONFIG_JSON.MOTOTRBOTYPE.CAPACITY_PLUS_MULTI_SITE) {
                            funcUtils.updateSystem(system_data);
                        }
                    })
                })
            })
        })

        describe('Range', () => {
            it('Create Range', () => {
                cy.visit(Cypress.env("url"))
                cy.wait(4000)
                utils.clickIconButton('[aria-label="ptt gateway"]')
                cy.load_file(filename).each((system_data) => {
                    if (system_data.mototrbo_type == config_data.CONFIG_JSON.MOTOTRBOTYPE.CAPACITY_PLUS_MULTI_SITE) {
                        funcUtils.createRange(system_data)
                    }
                })
            })

            it('Read Range', () => {
                cy.visit(Cypress.env("url"))
                cy.wait(4000)
                utils.clickIconButton('[aria-label="ptt gateway"]')
                cy.load_file(filename).each((system_data) => {
                    if (system_data.mototrbo_type == config_data.CONFIG_JSON.MOTOTRBOTYPE.CAPACITY_PLUS_MULTI_SITE) {
                        funcUtils.readRange(system_data)
                    }
                })
            })

            it('Update Range', () => {
                cy.visit(Cypress.env("url"))
                cy.wait(4000)
                utils.clickIconButton('[aria-label="ptt gateway"]')
                cy.load_file(filename).each((system_data) => {
                    if (system_data.mototrbo_type == config_data.CONFIG_JSON.MOTOTRBOTYPE.CAPACITY_PLUS_MULTI_SITE) {
                        funcUtils.updateRange(system_data)
                    }
                })
            })
        })

        describe('WRG', () => {
            it('Create WRG', () => {
                cy.visit(Cypress.env("url"))
                cy.wait(4000)
                utils.clickIconButton('[aria-label="ptt gateway"]')
                cy.load_file(filename).each((system_data) => {
                    if (system_data.mototrbo_type == config_data.CONFIG_JSON.MOTOTRBOTYPE.CAPACITY_PLUS_MULTI_SITE) {
                        funcUtils.createWRG(system_data)
                    }
                })
            })

            it('Read WRG', () => {
                cy.visit(Cypress.env("url"))
                cy.wait(2000)
                utils.clickIconButton('[aria-label="ptt gateway"]')
                cy.load_file(filename).each((system_data) => {
                    if (system_data.mototrbo_type == config_data.CONFIG_JSON.MOTOTRBOTYPE.CAPACITY_PLUS_MULTI_SITE) {
                        funcUtils.readWRG(system_data);
                    }
                })
            })

            it('Update WRG', () => {
                cy.visit(Cypress.env("url"))
                cy.wait(2000)
                utils.clickIconButton('[aria-label="ptt gateway"]')
                cy.load_file(filename).each((system_data) => {
                    if (system_data.mototrbo_type == config_data.CONFIG_JSON.MOTOTRBOTYPE.CAPACITY_PLUS_MULTI_SITE) {
                        funcUtils.updateWRG(system_data);
                    }
                })
            })

            it('WRG Range Mapping', () => {
                cy.visit(Cypress.env("url"))
                cy.wait(2000)
                utils.clickIconButton('[aria-label="ptt gateway"]')
                cy.load_file(filename).each((system_data) => {
                    if (system_data.mototrbo_type == config_data.CONFIG_JSON.MOTOTRBOTYPE.CAPACITY_PLUS_MULTI_SITE) {
                        funcUtils.wrg_range_mapping(system_data);
                    }
                })
            })
        })

        describe('Device', () => {
            it('Create Device (Using system page)', () => {
                cy.visit(Cypress.env("url"))
                cy.wait(2000)
                utils.clickIconButton('[aria-label="ptt gateway"]')

                cy.load_file(filename).each((system_data) => {
                    if (system_data.mototrbo_type == config_data.CONFIG_JSON.MOTOTRBOTYPE.CAPACITY_PLUS_MULTI_SITE) {
                        system_data.device.forEach((device_data) => {
                            if (device_data.device_page == 1) {
                                utils.search(system_data.data.system_name + date)
                                utils.clickIconButton('[aria-label="add task"]')
                                utils.clickButton('Device')
                                utils.clickButton('Create Devices')
                                funcUtils.createDevice(system_data.mototrbo_type, system_data.data, device_data)
                            }
                        })
                    }
                })
            })

            it('Create Device (Using resource page)', () => {
                cy.visit(Cypress.env("url"))
                cy.wait(2000)
                utils.clickIconButton('[aria-label="ptt gateway"]')
                utils.clickIconButton('[aria-label="ptt gateway"]')
                utils.clickIconButton('[aria-label="radio profiles"]')

                cy.load_file(filename).each((system_data) => {
                    if (system_data.mototrbo_type == config_data.CONFIG_JSON.MOTOTRBOTYPE.CAPACITY_PLUS_MULTI_SITE) {
                        system_data.device.forEach((device_data) => {
                            if (device_data.device_page == 0) {

                                utils.clickButton('Create')
                                funcUtils.createDevice(system_data.mototrbo_type, system_data.data, device_data)
                            }


                        })
                    }
                })
            })

            it('Read Device', () => {
                cy.visit(Cypress.env("url"))
                cy.wait(4000)
                utils.clickIconButton('[aria-label="ptt gateway"]')
                utils.clickIconButton('[aria-label="ptt gateway"]')
                utils.clickIconButton('[aria-label="radio profiles"]')
                cy.load_file(filename).each((system_data) => {
                    if (system_data.mototrbo_type == config_data.CONFIG_JSON.MOTOTRBOTYPE.CAPACITY_PLUS_MULTI_SITE) {
                        funcUtils.readDevice(system_data)
                    }
                })
            })

            it('Update Device', () => {
                cy.visit(Cypress.env("url"))
                cy.wait(4000)
                utils.clickIconButton('[aria-label="ptt gateway"]')
                utils.clickIconButton('[aria-label="ptt gateway"]')
                utils.clickIconButton('[aria-label="radio profiles"]')
                cy.load_file(filename).each((system_data) => {
                    if (system_data.mototrbo_type == config_data.CONFIG_JSON.MOTOTRBOTYPE.CAPACITY_PLUS_MULTI_SITE) {
                        funcUtils.updateDevice(system_data)
                    }
                })
            })

            it('Bulk Import Device', () => {
                cy.visit(Cypress.env("url"))
                cy.wait(4000)
                utils.clickIconButton('[aria-label="ptt gateway"]')
                cy.load_file(filename).each((system_data) => {
                    if (system_data.mototrbo_type == config_data.CONFIG_JSON.MOTOTRBOTYPE.CAPACITY_PLUS_MULTI_SITE) {
                        system_data.bulk_device.forEach((bulk_device_data) => {
                            utils.clickIconButton('[aria-label="ptt gateway"]')
                            utils.clickIconButton('[aria-label="radio profiles"]')
                            utils.clickButton('Bulk Import')
                            funcUtils.bulkImportDevice(system_data.mototrbo_type, system_data.data, bulk_device_data)
                        })
                    }
                })
            })
        })

        describe('Talkgroup', () => {
            it('Create Talkgroup (Systems Page)', () => {
                cy.visit(Cypress.env("url"))
                cy.wait(4000)
                utils.clickIconButton('[aria-label="ptt gateway"]')
                cy.load_file(filename).each((system_data) => {
                    if (system_data.mototrbo_type == config_data.CONFIG_JSON.MOTOTRBOTYPE.CAPACITY_PLUS_MULTI_SITE) {
                        system_data.talkgroup.forEach((talkgroup_data) => {
                            if (talkgroup_data.tg_page == 1) {
                                utils.search(system_data.data.system_name + date)
                                utils.clickIconButton('[aria-rowindex="2"] > div > td > div > [name="ic_information"]')
                                utils.clickButton('Talkgroup')
                                utils.clickButton('Create Talkgroup')
                                funcUtils.createTalkgroup(system_data.mototrbo_type, system_data.data, talkgroup_data)
                            }
                        })
                    }
                })
            })

            it('Create Talkgroup (Resources Page)', () => {
                cy.visit(Cypress.env("url"))
                cy.wait(4000)
                utils.clickIconButton('[aria-label="ptt gateway"]')
                cy.load_file(filename).each((system_data) => {
                    if (system_data.mototrbo_type == config_data.CONFIG_JSON.MOTOTRBOTYPE.CAPACITY_PLUS_MULTI_SITE) {
                        system_data.talkgroup.forEach((talkgroup_data) => {
                            if (talkgroup_data.tg_page == 0) {
                                utils.clickIconButton('[aria-label="ptt gateway"]')
                                utils.clickIconButton('[aria-label="radio profiles"]')
                                utils.clickButtonWithId('.msi-tab-label-2 > div')
                                utils.clickButton('Create')
                                funcUtils.createTalkgroup(system_data.mototrbo_type, system_data.data, talkgroup_data)
                            }
                        })
                    }
                })
            })

            it('Read Talkgroup', () => {
                cy.visit(Cypress.env("url"))
                cy.wait(4000)
                utils.clickIconButton('[aria-label="ptt gateway"]')
                utils.clickIconButton('[aria-label="ptt gateway"]')
                utils.clickIconButton('[aria-label="radio profiles"]')
                utils.clickButtonWithId('.msi-tab-label-2 > div')
                cy.load_file(filename).each((system_data) => {
                    if (system_data.mototrbo_type == config_data.CONFIG_JSON.MOTOTRBOTYPE.CAPACITY_PLUS_MULTI_SITE) {
                        funcUtils.readTalkgroup(system_data)
                    }
                })
            })

            it('Update Talkgroup', () => {
                cy.visit(Cypress.env("url"))
                cy.wait(4000)
                utils.clickIconButton('[aria-label="ptt gateway"]')
                utils.clickIconButton('[aria-label="ptt gateway"]')
                utils.clickIconButton('[aria-label="radio profiles"]')
                utils.clickButtonWithId('.msi-tab-label-2 > div')
                cy.load_file(filename).each((system_data) => {
                    if (system_data.mototrbo_type == config_data.CONFIG_JSON.MOTOTRBOTYPE.CAPACITY_PLUS_MULTI_SITE) {
                        funcUtils.updateTalkgroup(system_data)
                    }
                })
            })

            it('Bulk Import Talkgroup', () => {
                cy.visit(Cypress.env("url"))
                cy.wait(4000)
                utils.clickIconButton('[aria-label="ptt gateway"]')
                cy.load_file(filename).each((system_data) => {
                    if (system_data.mototrbo_type == config_data.CONFIG_JSON.MOTOTRBOTYPE.CAPACITY_PLUS_MULTI_SITE) {
                        system_data.bulk_talkgroup.forEach((bulk_talkgroup_data) => {
                            utils.clickIconButton('[aria-label="ptt gateway"]')
                            utils.clickIconButton('[aria-label="radio profiles"]')
                            utils.clickButtonWithId('.msi-tab-label-2 > div')
                            utils.clickButton('Bulk Import')
                            funcUtils.bulkImportTalkgroup(system_data.mototrbo_type, system_data.data, bulk_talkgroup_data)
                        })
                    }
                })
            })
        })
    })

    describe('Delete System', () => {
        const systems = [];
        describe('Get System', () => {
            it('Get System', () => {
                cy.visit(Cypress.env("url")).then(() => {
                    utils.clickIconButton('[aria-label="ptt gateway"]')
                    utils.search(prefix)

                    cy.get('table').then($table => {
                        if ($table.find('> tbody').length == 0) {
                            cy.get('td[aria-colindex="1"] > div').each((wrg_icon) => {
                                cy.get(wrg_icon).invoke('text').then((text) => {
                                    systems.push(text.trim());
                                });
                            })
                        }
                    })
                });
            })
        })

        describe('Delete Resources', () => {
            it('Delete Devices', () => {
                cy.visit(Cypress.env("url")).then(() => {
                    utils.clickIconButton('[aria-label="ptt gateway"]')
                    utils.clickIconButton('[aria-label="ptt gateway"]')
                    utils.clickIconButton('[name="ic_radio_profiles"] > i')

                    utils.search(prefix_resource)
                    cy.get('div').then($table => {
                        cy.wait(1000)
                        if ($table.find('> tr > div > td > div >msi-icon:nth-child(2):not([disabled])').length > 0) {
                            cy.wait(2000)
                            cy.get("tr > div > td > div >msi-icon:nth-child(2):not([disabled])").each(($del) => {

                                cy.get('tr >div > td > div >msi-icon:nth-child(2):not([disabled]) > i').first().click()
                                utils.clickButton('Yes')
                                utils.search(prefix_resource)
                                cy.wait(2000)

                            })

                        }
                    })
                })

            })
            it('Delete TalkGroups', () => {
                cy.visit(Cypress.env("url")).then(() => {
                    utils.clickIconButton('[aria-label="ptt gateway"]')
                    utils.clickIconButton('[aria-label="ptt gateway"]')
                    utils.clickIconButton('[name="ic_radio_profiles"] > i')
                    cy.get('msi-tab-group > div > div:nth-child(3) >button >div').click()
                    utils.search(prefix_resource)
                    cy.get('div').then($table => {
                        cy.wait(1000)
                        if ($table.find('> tr > div > td > div >msi-icon:nth-child(2):not([disabled])').length > 0) {
                            cy.wait(2000)
                            cy.get("tr > div > td > div >msi-icon:nth-child(2):not([disabled])").each(($del) => {

                                cy.get('tr >div > td > div >msi-icon:nth-child(2):not([disabled]) > i').first().click()
                                utils.clickButton('Yes')
                                utils.search(prefix_resource)
                                cy.wait(2000)

                            })

                        }
                    })
                })

            })
        })

        describe('Delete Range', () => {

            it('Delete Range', () => {
                cy.visit(Cypress.env("url")).then(() => {
                    utils.clickIconButton('[aria-label="ptt gateway"]')
                    _.each(_.range(systems.length), (i) => {
                        utils.search(prefix)
                        cy.get('tr[aria-rowindex="' + (i + 2) + '"] > div > td > div > [name="ic_network"] > i').click()
                        cy.wait(3000)
                        utils.search(prefix)
                        cy.get('tbody').then($tbody => {
                            if ($tbody.find('tr').length > 0) {
                                cy.get('tbody > tr').each(() => {
                                    utils.search(prefix)
                                    cy.get('tr:nth-child(1) > td >msi-icon:nth-child(2)').click()
                                    utils.clickButton('Yes')
                                })
                            }
                        })
                        cy.get('[name="ic_back"] > i').click()
                        cy.wait(3000)
                    })
                })
            })
        })

        describe('Delete WRG', () => {

            it('Delete WRG', () => {
                cy.visit(Cypress.env("url")).then(() => {
                    utils.clickIconButton('[aria-label="ptt gateway"]')
                    _.each(_.range(systems.length), (i) => {
                        utils.search(prefix)
                        cy.get('tr[aria-rowindex="' + (i + 2) + '"] > div > td > div > [name="ic_add_task"] > i').click()
                        cy.wait(3000)
                        utils.search(prefix)

                        cy.get('tbody').then($tbody => {
                            if ($tbody.find('tr').length > 0) {
                                cy.get('tbody > tr').each(() => {
                                    utils.search(prefix)
                                    cy.get('tr:nth-child(1) > td >msi-icon:nth-child(4)').click()
                                    utils.clickButton('Yes')
                                })
                            }
                        })
                        cy.get('[name="ic_back"] > i').click()
                        cy.wait(3000)
                    })
                })
            })
        })

        describe('Delete System', () => {
            it('Delete Systems', () => {
                cy.visit(Cypress.env("url")).then(() => {
                    utils.clickIconButton('[aria-label="ptt gateway"]')
                    _.each(_.range(systems.length), () => {
                        utils.search(prefix)
                        cy.get('tr[aria-rowindex="2"] > div > td > div > [name="ic_trash"] > i').click()
                        utils.clickButton('Yes')
                    })
                })
            })
        })

    })
})


