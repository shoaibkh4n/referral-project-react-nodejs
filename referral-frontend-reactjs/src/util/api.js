function apiPath(remaining) {
  return `${process.env.REACT_APP_BASE_URL}${remaining}`;
}

function getApi(remaining) {
  const token = localStorage.getItem("token");
  const response = fetch(apiPath(remaining), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
}

function postApi(remaining, json) {
  const token = localStorage.getItem("token");
  return fetch(apiPath(remaining), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(json),
  }).then((response) => response);
}

function postWithoutToken(remaining, json) {
  return window
    .fetch(apiPath(remaining), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(json),
    })
    .then((response) => response);
}

function deleteApi(remaining, json) {
  const token = localStorage.getItem("token");
  return fetch(apiPath(remaining), {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(json),
  }).then((response) => response);
}

function putApi(remaining, json) {
  const token = localStorage.getItem("token");
  return fetch(apiPath(remaining), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": window.location.origin,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(json),
  }).then((response) => response);
}

export { apiPath, getApi, postApi, deleteApi, putApi, postWithoutToken };
