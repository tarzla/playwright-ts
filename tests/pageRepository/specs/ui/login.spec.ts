import { test } from 'src/setup/page-setup';
import * as LoginPage from 'tests/pageRepository/Common/LoginPage';
import * as ReportsPage from 'tests/pageRepository/Reports/ReportsPage';

// Reset storage state for this file to avoid being authenticated
test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Tests for successful, unsuccessful logins', () => {
  test('Login test - Successful login will display Reports Page @smoke @login', async () => {
    const reportTitleName = 'DASHBOARD_AAT_HOME';
    await LoginPage.navigateToLoginPage();
    await LoginPage.logInSuccessfully();
    //verifying report page/title is displayed on successful login
    await ReportsPage.verifyReportTitle(reportTitleName);
  });

  test('Login test - When login is unsuccessful will not display Reports Page @smoke @login', async () => {
    await LoginPage.navigateToLoginPage();
    await LoginPage.failureLogin();
    await LoginPage.verifyErrorMessageForFailureLogin();
    //verifying Login is still displayed
    await LoginPage.verifyLoginPageisDisplayed();
  });
});

