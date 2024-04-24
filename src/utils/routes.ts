const domain = 'https://api.stage.test';

const routes = {
  testDetails: (testId: string) =>
    `${domain}/api/v2/test/${testId}`,
};

export default routes;
