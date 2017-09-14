import { FirebaseLoginPage } from './app.po';

describe('firebase-login App', () => {
  let page: FirebaseLoginPage;

  beforeEach(() => {
    page = new FirebaseLoginPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
