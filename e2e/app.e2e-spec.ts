import { SeedProjectPage } from './app.po';

describe('seed-project App', function() {
  let page: SeedProjectPage;

  beforeEach(() => {
    page = new SeedProjectPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
