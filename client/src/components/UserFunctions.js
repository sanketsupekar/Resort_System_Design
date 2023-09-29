
export async function fetchAPI(data, url, method)
{
    const respones = await fetch(url, {
        method: method,
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      }).catch((e) => console.log("Error : ", e));

      return respones;
}