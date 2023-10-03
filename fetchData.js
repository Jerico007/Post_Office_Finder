async function FetchData(url) {
  let ans = "";
  await fetch(url).then(async (data) => {
    await data
      .json()
      .then((data) => {
        if (data.hasOwnProperty("error")) {
          throw new Error(data.error.message);
        } else {
          ans = data;
        }
      })
      .catch((error) => {
        alert(error);
      });
  });

  return ans;
}
