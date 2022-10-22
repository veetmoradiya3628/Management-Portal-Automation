import Utils from "./Utils"
const utils = new Utils()
var date = new Date().toLocaleDateString().replaceAll('/', '_')
const write_bulk_file_path = './cypress/fixtures/bulk_import/'
const attach_bulk_file_path = '../fixtures/bulk_import/'
const config_data = require('../fixtures/config.json')

class FuncUtils {

    //System Utility Funcations
    createSystem(system_data) {
        utils.clickButton('Create')
        utils.selectList(system_data.system_type)
        utils.textField('#system_name', system_data.data.system_name+date)
        utils.textField('#system_desc', system_data.data.system_desc)
        if (system_data.mototrbo_type == 2) {
            utils.textField('#radiosystemaddress', system_data.data.radiosystemaddress)
            utils.textField('#port', system_data.data.port)
            utils.textField('#username', system_data.data.username)
            utils.textField('#password', system_data.data.password)
        }
        if (system_data.mototrbo_type != 2) {
            utils.dropDown('#privacytype', system_data.data.radio_sys_privacy_type)
            if (system_data.data.radio_sys_privacy_type === "Enhanced" || system_data.data.radio_sys_privacy_type === "Symmetric ") {
                utils.checkButtonDisable('Save');
                for (let j = 1; j <= system_data.data.keys.length; j++) {
                    utils.textField('#privacy_key' + j, system_data.data.keys[j - 1].privacy_key);
                    utils.textField('#privacy_val' + j, system_data.data.keys[j - 1].privacy_val);
                    if (j != system_data.data.keys.length) {
                        utils.clickButton('Add Secure Key')
                    }
                }
            }
        }
        if (system_data.mototrbo_type == 3) {
            utils.textField('#radiosystemid', system_data.data.radiosystemid)
            utils.textField('#mnisserveraddress1', system_data.data.mnisserveraddress1)
            utils.textField('#mnisserverport1', system_data.data.mnisserverport1)
        }
        utils.clickButton('Save');
        utils.clickButton('Close');
    }

    readSystem(system_data) {
        utils.search(system_data.data.system_name+date)
        utils.clickIconButton('tr[aria-rowindex="2"] > div > td > div > [name="ic_information"] > i')
        utils.checkFieldValuebyId('#system_name', system_data.data.system_name+date)
        utils.clickButton('Close')
    }

    updateSystem(system_data) {
        utils.search(system_data.data.system_name+date)
        utils.clickIconButton('tr[aria-rowindex="2"] > div > td > div > [name="ic_information"] > i')
        utils.clickButton('Edit')
        utils.textField('#system_name', system_data.data.system_name+date+'-updated')
        utils.clickButton('Update')
        utils.clickButton('Close')
    }

    // Range Utility Functions
    createRange(system_data) {
        utils.search(system_data.data.system_name+date)
        utils.clickIconButton('[aria-rowindex="2"] > div > td > div > [name="ic_network"]')
        system_data.range.forEach((range_data) => {
            utils.clickButton('Create Range')
            if (range_data.range_type != "Native range") {
                utils.dropDown("#range_type_id", range_data.range_type)
            }
            utils.textField('#range_name', range_data.range_name)
            utils.dropDown("#device_type_id", range_data.device_type)
            utils.textField('#range_start_id', range_data.range_start)
            utils.textField('#range', range_data.range)
            utils.clickButton('Save')
            utils.search(range_data.range_name)
            utils.checkRowCount()
        })
        utils.clickButton('Close')
    }

    readRange(system_data) {
        utils.search(system_data.data.system_name+date)
        utils.clickIconButton('[name="ic_network"]')
        system_data.range.forEach((range_data) => {
            utils.search(range_data.range_name)
            utils.clickIconButton('[name="ic_information"]')
            utils.checkFieldValuebyId('#range_name', range_data.range_name)
            utils.clickButton('Cancel')
        })
        utils.clickButton('Close')
    }

    updateRange(system_data) {
        utils.search(system_data.data.system_name+date)
        utils.clickIconButton('[name="ic_network"]')
        system_data.range.forEach((range_data) => {
            utils.search(range_data.range_name)
            utils.clickIconButton('[name="ic_information"]')
            utils.clickButton('Edit')
            utils.textField('#range_name', range_data.range_name + "-updated")
            utils.clickButton('Update')
            utils.clickButton('Cancel')
            utils.search(range_data.range_name + "-updated")
            utils.checkRowCount()
        })
        utils.clickButton('Close')
    }

    // WRG Utility Functions
    createWRG(system_data) {
        utils.search(system_data.data.system_name+date)
        utils.clickIconButton('[aria-rowindex="2"] > div > td > div > [name="ic_add_task"] > i')
        utils.clickButton('Create Gateway')
        utils.textField('#wrg_machine_name', system_data.wrg[0].wrg_iotgw_machine_name)
        utils.clickButton('Validate')
        utils.textField('#wrg_name', system_data.wrg[0].wrg_name)
        utils.textField('#wrgdesc', system_data.wrg[0].wrgdesc)
        utils.textField('#groupcalltimeout', system_data.wrg[0].groupcalltimeout)
        utils.textField('#pvtcalltimeout', system_data.wrg[0].pvtcalltimeout)
        utils.textField('#maxpttduration', system_data.wrg[0].maxpttduration)
        if (system_data.mototrbo_type == 2) {
            utils.textField('#subscrunitid', system_data.wrg[0].unitid)
        } else {
            utils.textField('#unitid', system_data.wrg[0].unitid)
            utils.textField('#cancelemergencyalert', system_data.wrg[0].cancelemergencyalert)
        }
        if (system_data.mototrbo_type == 0 || system_data.mototrbo_type == 1) {
            utils.clickButton('RadioSystem Configuration')
            utils.textField('#gateway_peer_id', system_data.wrg[0].gatewaypeerid)
            utils.textField('#master_rep_ip', system_data.wrg[0].master_repeater_ip)
            utils.textField('#master_rep_udp_port', system_data.wrg[0].master_repeater_udp_port)
            utils.textField('#mnis_le_udp_port', system_data.wrg[0].mnis_link_eashtablish_port)
            utils.textField('#authentication_key', system_data.wrg[0].mnis_le_key)
        }
        utils.clickButton('Save')
        cy.wait(1000)
        utils.clickButton('Close')
    }

    readWRG(system_data) {
        utils.search(system_data.data.system_name+date)
        utils.clickIconButton('[aria-rowindex="2"] > div > td > div > [name="ic_add_task"] > i')
        utils.search(system_data.wrg[0].wrg_name)
        utils.clickIconButton('[name="ic_information"]')
        utils.checkFieldValuebyId('#wrg_name',system_data.wrg[0].wrg_name)
        utils.clickButton('Close')
        cy.wait(2000)
    }

    updateWRG(system_data) {
        utils.search(system_data.data.system_name+date)
        utils.clickIconButton('[aria-rowindex="2"] > div > td > div > [name="ic_add_task"] > i')
        utils.search(system_data.wrg[0].wrg_name)
        utils.clickIconButton('[name="ic_information"]')
        utils.clickButton('Edit')
        utils.textField('#wrg_name', system_data.wrg[0].wrg_name+"-updated")
        utils.clickButton('Update')
        cy.wait(1000)
        utils.clickButton('Cancel')
        utils.search(system_data.wrg[0].wrg_name+"-updated")
        utils.clickButton('Close')
    }

    wrg_range_mapping(system_data) {
        utils.search(system_data.data.system_name+date)
        utils.clickIconButton('[aria-rowindex="2"] > div > td > div > [name="ic_add_task"] > i')
        utils.search(system_data.wrg[0].wrg_name+'-updated')
        utils.clickIconButton('[name="ic_network"]')
        system_data.range_wrg_mapping.forEach((range_map) => {
            utils.clickButton('Map Range')
            utils.dropDown('#range_id', range_map.range_name)
            utils.dropDown('#wrg_id', range_map.wrg_name)
            utils.clickButton('Save')
        });
        utils.clickButton('Close')
    }

    // Device Utility Functions
    createDevice(mototrbo_type, system_data, device_data) {
        utils.textField('#resource_name', device_data.deviceName+date)
        utils.dropDown('#resource_id_type', device_data.resource_id_type)
        if (device_data.device_page == 0) {
            let system_type
            if (mototrbo_type == config_data.CONFIG_JSON.MOTOTRBOTYPE.CAPACITY_PLUS_SINGLE_SITE) {
                system_type = "Capacity Plus Single Site"
            } else if (mototrbo_type == config_data.CONFIG_JSON.MOTOTRBOTYPE.CAPACITY_PLUS_MULTI_SITE) {
                system_type = "Capacity Plus Multi Site"
            } else if (mototrbo_type == config_data.CONFIG_JSON.MOTOTRBOTYPE.CONNECT_PLUS) {
                system_type = "Connect Plus"
            } else if (mototrbo_type == config_data.CONFIG_JSON.MOTOTRBOTYPE.CAPACITY_MAX) {
                system_type = "Capacity Max"
            }
            utils.dropDown('#mototrbo_type', system_type)
            utils.dropDown('#system_id', system_data.system_name)
        }

        utils.textField('#resource_id', device_data.resource_id)
        utils.dropDown('#subscriber_type', device_data.subscriber_type)

        if (device_data.bbSystem != "MI02_POC_SYSTEM") {
            utils.dropDown('#bbSystem', device_data.bbSystem)
        }
        if (device_data.subscriber_type == "PTT" || device_data.resource_id_type == "ION Device") {
            utils.dropDown('#mknz_bb_mdn', device_data.broadbandMdn)
        }

        utils.clickButton('Create');
        cy.wait(5000)
        if (device_data.device_page == 1) {
            utils.clickButton('Close');
        }
        else if (device_data.device_page == 0) {
            utils.clickButton('Cancel');
        }
    }
  
    readDevice(system_data) {
        system_data.device.forEach((device_data) => {
            utils.search(device_data.deviceName+date)
            cy.get('div').then($table => {
                cy.wait(1000)
                if ($table.find('> tr > div > td > div >msi-icon:nth-child(2):not([disabled])').length > 0) {
                    cy.get('tr >div > td > div >msi-icon:nth-child(1):not([disabled]) > i').first().click()
                    cy.wait(2000)
                }
            })
            utils.checkFieldValuebyId('#resource_name',device_data.deviceName+date)
            utils.clickButton('Cancel')
        })
    }

    updateDevice(system_data) {
        system_data.device.forEach((device_data) => {
            utils.search(device_data.deviceName+date)
            cy.wait(1000)
            cy.get('div').then($table => {
                cy.wait(1000)
                if ($table.find('> tr > div > td > div >msi-icon:nth-child(2):not([disabled])').length > 0) {
                    cy.get('tr >div > td > div >msi-icon:nth-child(1):not([disabled]) > i').first().click()
                    cy.wait(2000)
                }
            })
            utils.clickButton('Edit')
            utils.textField('#resource_name', device_data.deviceName + date + '-updated')
            utils.clickButton('Update')
            utils.clickButton('Cancel')
            utils.search(device_data.deviceName + date + '-updated')
        })
    }

    bulkImportDevice(mototrbo_type, system_data, bulk_device_data) {
        utils.dropDown('#resource_id_type', bulk_device_data.resource_id_type)
        let system_type
        if (mototrbo_type == config_data.CONFIG_JSON.MOTOTRBOTYPE.CAPACITY_PLUS_SINGLE_SITE) {
            system_type = "Capacity Plus Single Site"
        } else if (mototrbo_type == config_data.CONFIG_JSON.MOTOTRBOTYPE.CAPACITY_PLUS_MULTI_SITE) {
            system_type = "Capacity Plus Multi Site"
        } else if (mototrbo_type == config_data.CONFIG_JSON.MOTOTRBOTYPE.CONNECT_PLUS) {
            system_type = "Connect Plus"
        } else if (mototrbo_type == config_data.CONFIG_JSON.MOTOTRBOTYPE.CAPACITY_MAX) {
            system_type = "Capacity Max"
        }
        utils.dropDown('#mototrbo_type', system_type)
        utils.dropDown('#system_id', system_data.system_name)
        utils.dropDown('#subscriber_type', bulk_device_data.subscriber_type)
        if (bulk_device_data.bb_sys != "MI02_POC_SYSTEM") {
            utils.dropDown('#bbSystem', bulk_talkgroup_data.bb_sys)
        }
        let csvContent = ''
        bulk_device_data.bulk_data.forEach((rowArray) => {
            let row = rowArray.join(",");
            csvContent += row + "\r";
        });
        cy.writeFile(write_bulk_file_path + 'mototrbo_device.csv', csvContent)
        cy.wait(5000)
        utils.checkButtonEnable('Upload')
        utils.attachBulkFile('input[type=file]', attach_bulk_file_path + 'mototrbo_device.csv')
        cy.wait(5000)
        utils.checkButtonEnable('Create')
        cy.wait(2000)
        utils.clickButton('Create')
        cy.wait(2000)
        utils.clickButton('Cancel')
    }

    // Talkgroup Utility Functions
    createTalkgroup(mototrbo_type, system_data, talkgroup_data) {
        utils.textField('#resource_name', talkgroup_data.resource_name+date)
        utils.dropDown('#resource_id_type', talkgroup_data.resource_id_type)
        if (talkgroup_data.tg_page == 0) {
            let system_type
            if (mototrbo_type == config_data.CONFIG_JSON.MOTOTRBOTYPE.CAPACITY_PLUS_SINGLE_SITE) {
                system_type = "Capacity Plus Single Site"
            } else if (mototrbo_type == config_data.CONFIG_JSON.MOTOTRBOTYPE.CAPACITY_PLUS_MULTI_SITE) {
                system_type = "Capacity Plus Multi Site"
            } else if (mototrbo_type == config_data.CONFIG_JSON.MOTOTRBOTYPE.CONNECT_PLUS) {
                system_type = "Connect Plus"
            } else if (mototrbo_type == config_data.CONFIG_JSON.MOTOTRBOTYPE.CAPACITY_MAX) {
                system_type = "Capacity Max"
            }
            utils.dropDown('#mototrbo_type', system_type)
            utils.dropDown('#system_id', system_data.system_name)
        }
        utils.textField('#resource_id', talkgroup_data.talkgroup_id)
        utils.dropDown('#type', talkgroup_data.type)
        if(mototrbo_type != config_data.CONFIG_JSON.MOTOTRBOTYPE.CONNECT_PLUS){
            if (system_data.radio_sys_privacy_type != 'None') {
                utils.dropDown('#privacy_key_type', system_data.radio_sys_privacy_type)
            } else {
                cy.get('#privacy_key_type > div > [name="ic_list_arrow_down"]').click()
                cy.get('div > div > div[class="msi-select-options-list"] > msi-select-option > div').click()
            }
            if (system_data.radio_sys_privacy_type == 'Enhanced' || system_data.radio_sys_privacy_type == 'Symmetric ') {
                utils.dropDown('#privacykeyid', system_data.keys[Math.floor(Math.random() * system_data.keys.length)].privacy_key)
            }
        }
        if (talkgroup_data.bb_sys != "MI02_POC_SYSTEM") {
            utils.dropDown('#bbSystem', talkgroup_data.bb_sys)
        }
        utils.dropDown('#sgmdn', talkgroup_data.bb_grp)
        utils.clickButton('Create')
        cy.wait(3000)
        utils.clickButton('Cancel')
        cy.wait(3000)
        utils.search(talkgroup_data.resource_name+date)
        if (talkgroup_data.tg_page == 1) {
            utils.clickButton('Close')
        } else if (talkgroup_data.tg_page == 0) {
            utils.clickIconButton('[aria-label="ptt gateway"]')
            utils.clickIconButton('[aria-label="settings"]')
        }
    }

    readTalkgroup(system_data) {
        system_data.talkgroup.forEach((talkgroup_data) => {
            utils.search(talkgroup_data.resource_name+date)
            cy.get('div').then($table => {
                cy.wait(1000)
                if ($table.find('> tr > div > td > div >msi-icon:nth-child(2):not([disabled])').length > 0) {
                    cy.get('tr >div > td > div >msi-icon:nth-child(1):not([disabled]) > i').first().click()
                    cy.wait(2000)
                }
            })
            utils.checkFieldValuebyId('#resource_name',talkgroup_data.resource_name+date)
            utils.clickButton('Cancel')
        })
    }

    updateTalkgroup(system_data) {
        system_data.talkgroup.forEach((talkgroup_data) => {
            utils.search(talkgroup_data.resource_name+date)
            cy.get('div').then($table => {
                cy.wait(1000)
                if ($table.find('> tr > div > td > div >msi-icon:nth-child(2):not([disabled])').length > 0) {
                    cy.get('tr >div > td > div >msi-icon:nth-child(1):not([disabled]) > i').first().click()
                    cy.wait(2000)
                }
            })
            utils.clickButton('Edit')
            utils.textField('#resource_name', talkgroup_data.resource_name + date + '-updated')
            utils.clickButton('Update')
            utils.clickButton('Cancel')
            utils.search(talkgroup_data.resource_name + date + '-updated')
        })
    }

    bulkImportTalkgroup(mototrbo_type, system_data, bulk_talkgroup_data) {
        utils.dropDown('#resource_id_type', bulk_talkgroup_data.resource_id_type)
        let system_type
        if (mototrbo_type == config_data.CONFIG_JSON.MOTOTRBOTYPE.CAPACITY_PLUS_SINGLE_SITE) {
            system_type = "Capacity Plus Single Site"
        } else if (mototrbo_type == config_data.CONFIG_JSON.MOTOTRBOTYPE.CAPACITY_PLUS_MULTI_SITE) {
            system_type = "Capacity Plus Multi Site"
        } else if (mototrbo_type == config_data.CONFIG_JSON.MOTOTRBOTYPE.CONNECT_PLUS) {
            system_type = "Connect Plus"
        } else if (mototrbo_type == config_data.CONFIG_JSON.MOTOTRBOTYPE.CAPACITY_MAX) {
            system_type = "Capacity Max"
        }
        utils.dropDown('#mototrbo_type', system_type)
        utils.dropDown('#system_id', system_data.system_name)
        utils.dropDown('#type', bulk_talkgroup_data.type)
        if(mototrbo_type != config_data.CONFIG_JSON.MOTOTRBOTYPE.CONNECT_PLUS){
            if (system_data.radio_sys_privacy_type != 'None') {
                utils.dropDown('#privacy_key_type', system_data.radio_sys_privacy_type)
            } else {
                cy.get('#privacy_key_type > div > [name="ic_list_arrow_down"]').click()
                cy.get('div > div > div[class="msi-select-options-list"] > msi-select-option > div').click()
            }
            if (system_data.radio_sys_privacy_type == 'Enhanced' || system_data.radio_sys_privacy_type == 'Symmetric ') {
                utils.dropDown('#privacykeyid', system_data.keys[Math.floor(Math.random() * system_data.keys.length)].privacy_key)
            }
        }
        if (bulk_talkgroup_data.bb_sys != "MI02_POC_SYSTEM") {
            utils.dropDown('#bbSystem', bulk_talkgroup_data.bb_sys)
        }
        let csvContent = ''
        bulk_talkgroup_data.bulk_data.forEach((rowArray) => {
            let row = rowArray.join(",");
            csvContent += row + "\r";
        });
        cy.writeFile(write_bulk_file_path + 'mototrbo_talkgroup.csv', csvContent)
        cy.wait(3000)
        utils.checkButtonEnable('Upload')
        utils.attachBulkFile('input[type=file]', attach_bulk_file_path + 'mototrbo_talkgroup.csv')
        utils.checkButtonEnable('Create')
        cy.wait(2000)
        utils.clickButton('Create')
        utils.checkButtonEnable('Bulk Import')
    }
}

export default FuncUtils