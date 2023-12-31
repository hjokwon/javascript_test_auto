import {t, Selector, ClientFunction} from 'testcafe';
import calcComponents from '../utils/selector-utils'

declare var global: any;

//Floating Menu를 UI에서 제외하고 테스트 할 수 있도록 clientFunction 으로 web element style을 변경한다.
const hiddenNavigation = ClientFunction (selector => {
    var elemet = document.querySelector(selector);
    elemet.style.position = "static";
})

class Calculation {
    lnb : Selector = Selector('lnb')
    modal : Selector = Selector('modal') // 미지원 체크 모달
    floatingMenu: Selector = Selector('#div').find('total.is_fixed') // Floating 메뉴
    /**
     * 테스트 시, 일일히 리전을 입력하기 보다 key 값으로 텍스트를 가져 올 수 있도록 한다.
     * @param region 
     */
    async regionToText(region: string){
        var regionDict = {"kr1": "한국", "jp1": "일본", "us1": "미국"}
        return regionDict[region]
    }

    async clickService(id, name){
        const category_s = Selector('a').withAttribute('data', id)
        await t.click(category_s);
        await t.click(category_s.find('li').withExactText(name));
    }

    async clickRegion(name, region, s){
        await t.scrollIntoView(this.lnb).click(this.lnb.child('li').find(region))
        if(!s){
            console.log(`${name} service no support in ${region}`);
            await t.expect(this.modal.find('body').exists).ok(`no modal appear`);
            await t.click(this.modal.find('button').withAttribute('name', 'Confirm'));
        }
        else{
            const layerInPage = Selector('h4').withExactText(name).parent(0) // 하나의 페이지에 여러 서비스가 있는데, 해당하는 서비스가 있는지 조회
            await t.scrollIntoView(layerInPage);
            if(await this.floatingMenu.exists){
                await hiddenNavigation('.total.is_fixed')
            }
            else {
                console.log('first item in this page, no floating Menu')
            }
            return true // 리전 클릭 후 서비스가 있으면 true 를 반환한다.
        }
    }

    /**
     * 
     * @param s price appers in s selector
     * @param exp_r expect result
     */
    async assertPrice(s, exp_r) {
        const act_r = await s.innerText  //selector 내부 inner Text 확인
        console.log(`real Result : ${act_r}, Actual Result: ${exp_r}`)
        await t.expect(act_r).eql(exp_r)
    }
    
    /**
     * 
     * @param name service name
     * @param itmes input datas & expect result arrays (exists in './resources' folder)
     */
    async calc(name, items: Array<string>) {
        const countItems = items.length - 1
        let exp_tr = Math.floor(countItems / 5) + 1 // 1 raw 에 노출되는 최대 항목은 5개, 총 열 갯수
        let last_td = countItems % 5                // last raw 에 노출되는 항목

        const layer = Selector('h4').withExactText(name).parent(0);

        for(let i = 0; i < exp_tr; i++ ) { // 1 raw 씩 방문
            const tb = layer.find('tbody').find('tr').nth(2 * i + 1) // name -> label -> test raw 이기 때문에 홀수번째로 진입

            let last = 5;
            if( (i+1) == exp_tr ){ // last raw로 진입하면 체크한다.
                last = last_td
            }

            for( let j = 0; j < last; j++) { // 각 항목을 방문하여 input 동작 실행한다.
                let n = 5 * i + j            // 다음 raw 에서는 5 * raw * j 번째 항목이다.

                let data = items[n];
                let itemIndex = Number(data);
                let stringChecker = isNaN(itemIndex);

                if(stringChecker) {
                    await calcComponents.dropdown(layer, j, data);   // layer 의 j 번째 항목에서 dropdown을 찾아 data를 클릭한다.
                }
                else {
                    await calcComponents.typeText(layer, j, data);   // layer 의 j 번째 항목에서 dropdown을 찾아 data를 입력한다.
                }

            }
        }

        const act_r = Selector('result') // 결과 값 return
        await this.assertPrice(act_r, items[countItems])            //items 의 가장 마지막 항목이 expect result 이다.

    }

    async regionAndCalc(regions, items, id, name){
        await this.clickService(id, name)
        for(const [r, s] of Object.entries(regions)){    // r = kr, s=true
            let regionName = await this.regionToText(r);
            console.log(`moveTo ${regionName}`);
            if(await this.clickRegion(name, regionName, s)){
                let calcItmes = items[r]                     // kr 에 포함된 기대 결과 Array 하나씩 방문하여 계산
                for (let data in calcItmes){
                    await this.calc(name, calcItmes[data])
                }
            }
        }
    }

    async main(items, id, name){
        var datas = items[name];
        var regions = datas["region"];
        await this.regionAndCalc(regions, datas, id, name)
    }


}export default new Calculation