"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
describe('User handler test:', () => {
    it('User index returns ', async () => {
        const { data } = await axios_1.default.get('http://localhost:3000/users');
        expect(data.length).toBeGreaterThan(0);
    });
    it('User auth returns token', async () => {
        const { data } = await axios_1.default.get('http://localhost:3000/auth?username=maccimac&password=pw123');
        token = data.token;
        expect(Boolean(data.token)).toEqual(true);
    });
    const userCred = {
        username: "sample_user_2",
        firstname: "Coquitlam",
        lastname: "Vancouver",
        password: "canada647"
    };
    let token;
    let userId;
    it('User create can add user', async () => {
        const { data } = await (0, axios_1.default)({
            method: "POST",
            url: `http://localhost:3000/user/`,
            data: userCred,
        });
        console.log(data);
        expect(Boolean(data)).toEqual(true);
    });
    it('User update can edit', async () => {
        const { data } = await (0, axios_1.default)({
            method: "PUT",
            url: `http://localhost:3000/user/${userCred.username}`,
            data: {
                ...userCred,
                password: "manila45"
            }
        });
        console.log(data);
        expect(Boolean(data)).toEqual(true);
    });
    it('User delete can remove user', async () => {
        const { data } = await (0, axios_1.default)({
            method: "DELETE",
            url: "http://localhost:3000/user",
            data: {
                username: userCred.username
            },
        });
        console.log(data);
        expect(data.status).toEqual('success');
    });
});
// https://stackoverflow.com/questions/25572069/testing-event-handler-on-an-object-with-jasmine
/*it('it handles clicks on radio buttons', function () {
    var view = new MyClass();
    spyOn(view, 'toggleServices');
    view.render();

    view.$('input[type="radio"]').eq(0).click();
    expect(view.toggleServices).toHaveBeenCalled();
});*/
