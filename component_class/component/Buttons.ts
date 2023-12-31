import {Selector, t} from 'testcafe';

export class Button {
    private button: Selector;

    constructor(text: string, area: string, layout?){
        let root: any // default로 any를 하지 않으면 error가 발생한다.
        if(area == 'page'){
            root = Selector('base').find('div').withAttribute('data', 'page'); // 페이지에 해당하는 selector 설정
        }
        else if(area == 'modal'){
            root = Selector('modal');
        }
        else if(area == 'tab'){
            root = Selector('base').find('div').child('div').nth(1); // 탭 하위에 있는 페이지 이므로 0,1 순서 중 1에 해당하는 페이지 선택
        }
        else{
            root = layout // 아무것도 해당하지 않는 경우, 사용자 layout으로 설정
        }
        this.button = root.find('button').withExactText(text);
    }
    getButton = async() => {
        return this.button
    }
    clickButton = async() => {
        await t.click(this.button)
    }
}