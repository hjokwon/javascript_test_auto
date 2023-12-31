import calculationPage from "../src/pages/calculation-page";
const fs = require('fs')
const path = require('path')

declare var global: any

fixture `Calculation`.beforeEach(async t => {
    await t.navigateTo('url');
})

let check = global.serviceName.toString();

var json_list = require(`../resources/homepage/service_list.json`);

if(check) {         // nodeJs 에서 입력한 외부 변수가 있는 경우
    let nameC
    if(check.includes('_')){
        nameC = check.replace(/_/gi, " ");      // _ 를 공백으로 변경
    }

    const calcFile = path.join(__dirname, `../resources/calculation/${nameC}.json`);

    if(fs.existsSync(calcFile)){    // json 카테고리 유무 확인
        let lists = require(calcFile)
        let services = Object.keys(lists);
        for(let v of services){
            test(`${nameC} of ${v} calc`, async t => {
                await calculationPage.main(v, nameC, v)
            })
        }
    }
}