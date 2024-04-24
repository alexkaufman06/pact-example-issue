// Learn more: https://github.com/testing-library/jest-dom
import fetchMock from "jest-fetch-mock";
import "@testing-library/jest-dom";

fetchMock.enableMocks();
jest.mock("@mui/x-license-pro", () => ({
  ...jest.requireActual("@mui/x-license-pro"),
  useLicenseVerifier: () => "Valid",
  Watermark: () => null,
}));

// Mock global environment variables
process.env = {
  ...process.env,
};
