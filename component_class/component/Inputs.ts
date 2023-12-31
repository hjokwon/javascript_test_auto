import {t, Selector} from 'testcafe';

export class Input {
    private textInput: Selector;
    private label: Selector;
    constructor(option, text, layout?){
        if(option == "placeholder"){
            this.textInput = Selector('input').withAttribute('placeholder',text);
        }
        else if(option == "name"){
            this.textInput = Selector('input').withAttribute('name',text);
        }
        else if(option == "label"){
            this.textInput = Selector('input').find('label').withExactText(text).nextSibling(0);
        }
        else{
            this.textInput = layout;
        }
    }
    writeText = async (text: string) => {
        await t.typeText(this.textInput, text, {replace: true});
    }
}