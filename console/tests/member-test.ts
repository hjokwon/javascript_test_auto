import {t, Selector} from 'testcafe';
import memberPage from '../src/pages/member-page';

declare var global: any

fixture`Test-Member`.beforeEach(async t => {
    await t.navigateTo('url');
})

test('member add and delete', async t => {
    const email = global.testIds[0];
    const name = global.testNames[0];
    await memberPage.addMember(email, name);
    await memberPage.deleteMember(email);
})