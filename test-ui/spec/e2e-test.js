const assert = require('assert');
const kinto = new (require('kinto-client').default)(process.env.DATABASE_URL, {
  headers: {
    Authorization: 'Basic dGVzdDp0ZXN0' // btoa('test:'test')
  }
});
const hasText = (text) => `//*[contains(text(),"${text}")]`;

describe('The site', function() {
  before(async function () {
    // Do some initial DB setup, auth etc. here
  });

  after(async function () {
    // Whatever needs to be cleaned up
  })

  beforeEach(async function () {
    // Ensure db state what needs to be for a fresh test case
  });

  afterEach(async function () {
    // Maybe cleanup DB - not needed if sufficient cleanup in beforeEach
  });


  it('should be accessible', () => {
    browser.url('/')
    .pause(2000);
    assert.equal(browser.getTitle(), 'Formbuilder');
  });


  it('opens form for new form', async () => {
    browser.url('/').pause(1000)
    await browser.click(hasText('Start a new form')).pause(1000)
    await browser.waitForExist(hasText('Untitled form'))
  })


  it('can create a simple form and open it for filling', async() => {
    const formTitle = 'My new form'

    browser.url('/')
    await browser
      .click(hasText('Start a new form'))
      .pause(500)
    await browser
      .click(hasText('Add a field'))
      .pause(500)
    await browser
      .click(hasText('Short text'))
      .pause(500)
    await browser
      .click('legend span')
      .pause(500)
      .setValue('legend input', formTitle)
      .pause(500)
    await browser
      .click(hasText('Save your form'))
      .pause(500)

    const formUrls = await browser.getValue('input.form-control')

    await browser
      .url(formUrls[0])
      .waitForExist(hasText(formTitle))

  })
});
