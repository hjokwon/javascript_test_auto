import {t, Selector} from 'testcafe'

class calcComponents{

    async dropdown(s, td, text){
        const items = s.find('td').nth(td).find('dropdown') // td 번째 행에 존재하는 항목
        await t.click(items);
        await t.click(items.child('option').withExactText(text)) // dropdown 에서 text를 클릭
    }

    async typeText(s, td, text){
        const items = s.find('td').nth(td).find('input') // td 번째 행에 존재하는 인풋박스
        await t.typeText(items, text, {replace: true, speed: 0.7}) // 너무 빨리 클릭하면 계산이 제대로 되지 않으므로 속도 줄임
        .pressKey('enter') // 최종 게산 시 다른 영역 클릭이나 엔터 키보드 클릭해야 정상 동작
    }

}export default new calcComponents