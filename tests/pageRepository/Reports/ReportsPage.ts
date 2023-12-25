import { expectElementToHaveText } from 'src/utils/assert-utils';
import { getLocator } from 'src/utils/locator-utils';
import { NAVIGATION_TIMEOUT } from 'src/utils/timeout-constants';

const reportTitle = () => getLocator('//*[@class="report-navigation-toggle__report-title"]');

export async function verifyReportTitle(reportTitleName: string) {
    await expectElementToHaveText(reportTitle(), reportTitleName, {timeout: NAVIGATION_TIMEOUT});
}
