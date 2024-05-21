let domain = process.env.DOMAIN;

function routes(baseUrl?: string) {
  if (baseUrl) {
    domain = baseUrl;
  }
  return {
    testDetails: (testId: string) => `${domain}/api/v2/test/${testId}`,
  }
};

export default routes;
