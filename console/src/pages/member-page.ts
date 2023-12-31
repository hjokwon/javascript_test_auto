const s = require('../../../component_class/selector-utils');
import {t, Selector} from 'testcafe';

declare var global: any;

class memberPage{
    addMemberString : String = "회원 등록"
    checkInfoString : String = "회원 정보 보기"
    deleteMemberString : String = "회원 삭제"
    memberTableCol: any = [{"colName": '사용자', "colAttr": 'memberNameText', 'colIndex:': 0}, {"colName": '관리', "colAttr": 'actions', 'colIndex:': 1}]

    async addMember(memberEmail: string, memberName: string){
        await s.clickButtonInPage(this.addMemberString);
        await s.typeText('email', memberEmail);
        await s.typeText('name', memberName);
        await s.clickButtonInTable(this.checkInfoString, this.memberTableCol[1].colIndex);
    }
    async deleteMember(memberEmail){
        await s.clickCheckboxInTable(memberEmail);
        await s.clickButtonInPage(this.deleteMemberString, this.memberTableCol[1].colIndex);
    }
}export default new memberPage