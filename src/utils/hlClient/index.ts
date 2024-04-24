import routes from "utils/routes";
import { v4 as uuidv4 } from "uuid";
import { ClientInterface } from "./(types)/hl-client.interface";
import { HttpOptions } from "./(types)/http-options";

// Errors are NOT caught. Caller should handle them.
async function http<T extends object>(
  method,
  route,
  { callbacks, headers, tags, queryParameters }: HttpOptions,
  body?: T,
) {
  const queryParamString = queryParameters
    ? `?${new URLSearchParams(queryParameters).toString()}`
    : "";
  const fullUrl = `${route}${queryParamString}`;
  const res = await fetch(fullUrl, {
    method,
    headers: {
      "X-Correlation-Id": uuidv4(),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    ...(tags && { next: { tags } }),
  });

  if (callbacks[res.status] && typeof callbacks[res.status] === "function") {
    callbacks[res.status]();
  }
  if (res.status === 204) {
    return;
  }
  if (res.ok) {
    return res.json();
  }

  const responseBody = await res.json();

  return Promise.reject({
    status: res.status,
    responseBody,
    message: `${res?.status} ${res?.statusText}`,
  });
}

function client(token, tenantId = "", callbacks = {}): ClientInterface {
  const opt = {
    callbacks,
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
      ...(tenantId && { "requested-tenant-id": tenantId }),
    },
  };

  return {
    getTestDetails: (sensorId) =>
      http("GET", routes.testDetails(sensorId), opt)
  };
}

export { client as testClient };
