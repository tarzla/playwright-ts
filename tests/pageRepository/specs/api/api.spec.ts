import { test, expect } from '@playwright/test';
import { testConfig } from 'testConfig';
import createUser from 'tests/pageRepository/specs/test-data/createTestForm.json';
const ENV = process.env.npm_config_ENV;


test.describe.configure({ mode: 'parallel' });

test.use({ storageState: './user.json' });

test('@API GET Request - Get First User Data', async ({ request }) => {
    const response = await request.get(testConfig[ENV] + '/api/passion/Workflow/GetDataForCurrentUser');
    const status = response.status();
    const jsonResponse = await response.json();
    const firstWorkflow = jsonResponse[0];

    const { Name, DueInWorkingDays, CurrentStep  } = firstWorkflow;
    expect(status).toBe(200);
    expect(Name).toBe('Workflow_Edit_OneOff');
    expect(DueInWorkingDays).toBe(-254);
    expect(CurrentStep).toBe(0);
});

test('@API GET Request - Get Second Workflow', async ({ request }) => {
    const response = await request.get('/api/passion/Workflow/GetDataForUser');
    const status = response.status();
    const jsonResponse = await response.json();
    const secondWorkflow = jsonResponse[1];

    const { Name, DueInWorkingDays, CurrentStep  } = secondWorkflow;
    expect(status).toBe(200);
    expect(Name).toBe('Workflow_Edit_Recurring');
    expect(DueInWorkingDays).toBe(-254);
    expect(CurrentStep).toBe(0);
});

test('@API POST Request - Create new user', async ({ request}) => {
    const response =  await request.post('/api/passion/Workflow/CreateUserTemplate', {
        data : createUser
    });
    console.log(await response.json());
    const status = response.status();
    expect(status).toBe(200);
});
