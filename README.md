## Users List

Demo app for managing users, built with **React**, using **MSW** for API mocking and **Playwright** for e2e tests

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd <project-folder>

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install --with-deps
```

### Run Dev

```bash
npm run start
```

Then open [http://localhost:3000](http://localhost:3000)

The app uses **MSW** as a fake API server for development and testing

### Run Playwright e2e tests

```bash
# Run all tests
npm run test
```

### Stack

* **Frontend:** React + TypeScript
* **Mock API:** MSW
* **E2E Tests:** Playwright
* **CI/CD:** GitHub Actions

### Production

Published to Render with updating on commit

