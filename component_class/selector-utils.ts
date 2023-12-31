import {Table} from "./component/Tables";
import {Button} from "./component/Buttons";
import {Input} from "./component/Inputs";

module.exports = {
    clickButtonInPage: async function(text){
        const button = new Button(text, 'page');
        await button.clickButton();
    },
    typeText: async function(inputBoxAttr, targetText){
        const input = new Input('name', inputBoxAttr);
        await input.writeText(targetText)
    },

    clickButtonInTable: async function(layout, target, index, buttonText){
        const modal =false
        const panel = false
        const table = new Table(modal, panel, layout);
        var tableAttr = await table.searchByIndex(target, index, buttonText);
        await table.click(tableAttr.button)
    },
    clickCheckboxInTable: async function(layout, target, index){
        const modal =false
        const panel = false
        const table = new Table(modal, panel, layout);
        var tableAttr = await table.searchByIndex(target, index);
        await table.click(tableAttr.checkbox)
    }
}