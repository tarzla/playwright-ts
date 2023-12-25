# Introduction 
Playwright Typescript Framework

Top Features:

- Easy to Configure.
- Auto-waits for all the relevant checks to pass and only then performs the requested action.
- Records videos for Test Cases.
- Records the test script and every action on the target page is turned into generated script.
- Generates trace file, which gives in-depth details of Test Case execution.
- Execution of test case is faster when compared with other competitive framework in market.
- Supports Headful/Headless mode execution for Firefox/Webkit/Google Chrome/Chromium/MS Edge on Windows/Linux/Mac machines.
- It supports API testing (From Playwright version 1.16 onwards)
- It can be used to simulate browser behaviour on mobile devices, and supports over 100+ devices.
- It has ability to produce and visually compare screenshots.
- To slow down execution slowMo option is available.
- Supports 'download' event monitoring, so there is no need for user to actually wait for downloads to finish.
- Supports Serial and Parallel execution.
- Allure/HTML Reports are generated after execution with an option to capture screenshot/video/trace file on failure.

# Build With

- [Playwright](https://playwright.dev)
- [Typescript](https://www.typescriptlang.org/)

# Getting Started

# Prerequisites

The following software are required:

- nodejs : Download and Install Node JS from
  ```sh
  https://nodejs.org/en/download/
  ```
- Install Java 8 or above, Allure Reports require Java 8 or higher.
- Install Java 11 instead of Java 8 if you intend to use Sonar Qube.
- allure commandline : Install allure command line for generating Allure Reports using
  ```sh
  npm ci -g allure-commandline
  ```

# Installation

1. Clone the repo using below URL

```sh
https://github.com/tarzla/playwright-ts.git
```

2. Navigate to folder and install npm packages using:

```sh
npm install
```
3. For first time installation run below command to download required browsers

```sh
npx playwright install
```

# Usage 

1. For Browser Configuration, change required parameters in `playwright.config.ts`.
2. For execution entire test suite on all available browsers simultaneously execute below command where "ENV" can be "qa" or "dev", `Test Cases are present in "tests" folder`:

```JS
npm run test --ENV="qa"
```

3. For executing single test case on Chrome browser execute the below command, you can change the browser for execution e.g. if you want to run test cases on Firefox, you can change `--project=Firefox` against `test:single` in `package.json`, just make sure the browser name given matches the name given in `playwright.config.ts`.

```JS
npm run test:single --ENV="qa"
```

4. For executing test cases in parallel, provide a suitable tag `@SmokeTest` at the start of your test case name, then in `package.json` against `test:parallel` give the tag value and execute :

```JS
npm run test:parallel --ENV="qa"
```

5. For executing test cases in sequence, provide a suitable tag `@SmokeTest` at the start of your test case name, then in `package.json` against `test:serial` give the tag value and execute, `workers` parameter correspond to test cases you want to execute simultaneously e.g. `--workers=3`, executes 3 test cases simultaneously :

```JS
npm run test:serial --ENV="qa"
```

6. For executing API test cases, please provide "ENV" value as "qaApi" or "devApi" :

```JS
npm run test:api --ENV="qaApi" 
```

7. For recording test scripts :

```JS
npm run test:record
```

8. To produce and visually compare screenshots execute below command. On first execution reference screenshot will be generated for comparision with subsequent runs.

```JS
npm run test:visual --ENV="qa"
```

9. For emulating test cases on any device, in `playwright.config.ts`, under device section provide desired device name and execute :

```JS
npm run test:device --ENV="qa"
```

10. For Allure Report generation execute :

```JS
npm run allureReport
```


Happy testing! 🚀




