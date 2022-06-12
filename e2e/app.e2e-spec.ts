import { GitAppPage } from './app.po';

describe('git-app App', function() {
  let page: GitAppPage;

  beforeEach(() => {
    page = new GitAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
