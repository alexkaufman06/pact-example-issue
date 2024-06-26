import { PactV3 } from "@pact-foundation/pact";
import path from "path";
import { testClient } from "utils/hlClient";

const pact = new PactV3({
  dir: path.resolve(process.cwd(), "contract-tests/contracts"),
  logLevel: "trace",
  host: "666.0.0.1",
  port: 65535,
  consumer: "Console",
  provider: "SOR",
  spec: 3,
});

const tenantId = "60e64fdb-0d9e-42d9-8105-c50b9ebc96a0";
const correlationId = "bd65946a-81f7-43c2-871e-62067d98c5b2";

describe("GET Test Details by ID", () => {
  it("Returns an HTTP 404 when ID is non-existent", () => {
    const missingTestId = "33e034b2-e45d-4e5d-8e11-0436c17dc977";
    pact
      .given(`There is no test details`)
      .uponReceiving(`A request for test details by non-existent ID`)
      .withRequest({
        method: "GET",
        path: `/api/v2/test/${missingTestId}`,
        headers: {
          Accept: "application/json",
          "X-Tenant-Id": tenantId,
          "X-Correlation-Id": correlationId,
        },
      })
      .willRespondWith({
        status: 404,
        headers: { "Content-Type": "application/json; charset=utf-8" },
      });

    return pact.executeTest(async (mockserver) => {
      console.log("Mock server URL: ", mockserver.url)
      const client = testClient(correlationId, tenantId, {}, mockserver.url);
      await expect(
        await client.getTestDetails(missingTestId),
      ).rejects.toThrow("Request failed with status code 404");
    });
  });

  it("Returns an HTTP 200 when ID is existent", () => {
    const testId = "febf64ec-4e40-453e-932a-1e32e3de3aaf";
    const testDetails = {
      status: "StatusAccepted",
    };
    pact
      .given(`Test details for ID exist`)
      .uponReceiving(`A request for test details by ID`)
      .withRequest({
        method: "GET",
        path: `/api/v2/test/${testId}`,
        headers: {
          Accept: "application/json",
          "X-Tenant-Id": tenantId,
          "X-Correlation-Id": correlationId,
        },
      })
      .willRespondWith({
        status: 200,
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: testDetails,
      });

    return pact.executeTest(async (mockserver) => {
      const client = testClient(correlationId, tenantId, {}, mockserver.url);
      const response = await client.getTestDetails(testId);
      // expect(response.status).toEqual(200);
      expect(response).toEqual(testDetails);
    });
  });
});
