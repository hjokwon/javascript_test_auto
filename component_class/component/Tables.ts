import {Selector, t} from 'testcafe';



export class Table {
    private table: Selector;
    private tableLayout: Selector;
    private header: Selector;
    private body: Selector;
    private row : Selector;
    private checkbox: Selector;
    private button: Selector;

    constructor(modal, panel, layout?) { // 테이블이 존재하는 위치를 입력 받을 수 있도록 함
         let base = Selector('#root');
         this.tableLayout = layout

         if(modal) {
               this.tableLayout = base.find('modal').filterVisible();
               this.table = this.tableLayout.find('table');
         }
         else {
               if (panel)
                   this.tableLayout.child('div').find('table');  // 웹에 노출되는 panel 형식, 갯수에 따라 다르게 작성
         }
    }
    /**
     * 테이블 header와 body를 return 하는 함수
     * @returns 
     */
    findHeader = async() => {
          this.header = this.table.child(0);
          return this.header
    }
    findBody = async() => {
          this.body = this.table.child(0);
          return this.body
    }
    rawCount = async() => {
          const raw_count = await this.table.find('tbody').find('tr').count;
          return raw_count
    }
    /**
     * 테이블 내 존재하는 text로 해당하는 열/행 위치를 return 
     * @param targetText 테이블 내 찾을 항목
     * @param col 행 순서 // 컬럼명과 몇번째 인지는 각 테스트에서 정의할 수 있도록 한다.
     * @param text 버튼 텍스트 (있는 경우)
     * @returns 
     */
    searchByIndex = async(targetText, col: number, text?: string | null) => {
            const raw_count = await this.rawCount()
            let find_cell
            let i = 0
            for(i ; i <= raw_count; i++) {
                  let cell = this.table.find('tbody').find('tr.row').nth(i)
                        .find('td').nth(col)
                  if(await cell.withText(targetText).exists) {
                        console.log(`${i} row container ${targetText}`);
                        find_cell = cell;
                        break;
                  }
                  else {
                        console.log('any string exists');
                  }
            }
            this.row = find_cell;
            if(text) {
                  this.button = this.row.find('button').withExactText(text);
            }
            let rawIndex = i;
            return {'rowCount': i, 'row': this.row, 'button': this.button, 'checkbox': this.checkbox}
    }

    click = async(s: Selector) => {
      await t.click(s)
    }
}