
import { gotoURL, fill, clickAndNavigate, wait, click, selectByText } from 'src/utils/action-utils';
import { expectElementToBeVisible } from 'src/utils/assert-utils';
import { getLocatorByRole, getLocator } from 'src/utils/locator-utils';
import { NAVIGATION_TIMEOUT } from 'src/utils/timeout-constants';
import { testConfig } from '../../../testConfig';
const ENV = process.env.npm_config_ENV;

const userName = '#UserName';
const password = '#Password';
const login = () => getLocatorByRole('button', { name: 'Log in' });
const loginSAML = () => getLocatorByRole('button', { name: 'Login' });
const errorMessage = '//*[contains(@class, "Wrong user name/password")]';
const application = () => getLocator('//*[@id="Application"]');
const logoutIDP = () => getLocatorByRole('link', { name: 'Log out from Identity Provider' });

export async function navigateToLoginPage() {
  await gotoURL(testConfig[ENV]);
}

export async function logInSuccessfully() {
  await fill(userName, testConfig.username);
  await fill(password, testConfig.password);
  await clickAndNavigate(login());
  await wait(8000);
}

//SAML login
export async function logInSuccessfullySAML(applicationName: string) {
  await selectApplication(applicationName);
  await click(loginSAML());
}

export async function failureLogin() {
  await fill(userName, testConfig.username);
  await fill(password, testConfig.password_incorrect);
  await click(login());
}

export async function verifyErrorMessageForFailureLogin() {
  await expectElementToBeVisible(errorMessage);
}

export async function verifyLoginPageisDisplayed() {
  await expectElementToBeVisible(userName);
}

export async function selectApplication(applicationName: string) {
  await selectByText(application(), applicationName);
}

export async function logoutFromIDP() {
  await click(logoutIDP(), {timeout: NAVIGATION_TIMEOUT});
}
