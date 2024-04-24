import { TestDetail } from "../../../app/(model)/(types)/test-details";

export interface ClientInterface {
  getTestDetails: (id) => Promise<TestDetail>;
}
