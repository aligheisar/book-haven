export let formatError = (error) => {
  let title = "Faild";
  let desc = "somting happends";
  if (error.status) {
    title = error.status;
  } else if (error.statusCode) {
    title = error.statusCode;
  }
  if (error.code) {
    desc = error.code;
  } else if (error.message) {
    desc = error.message;
  }

  return { title, desc };
};
