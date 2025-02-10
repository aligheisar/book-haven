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

  return { title, desc: desc.split("_").join(" ") };
};

export const timeAgo = (utcString) => {
  const date = new Date(utcString);
  const diffMs = Date.now() - date.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSeconds < 60) return `${diffSeconds} seconds ago`;
  if (diffMinutes < 60) return `${diffMinutes} minutes ago`;
  if (diffHours < 24) return `${diffHours} hours ago`;
  return `${diffDays} days ago`;
};

export const generateUTCTimestamp = () => {
  const date = new Date();

  const utcTimestamp = date.toISOString().replace("Z", "+00:00");

  return utcTimestamp;
};
