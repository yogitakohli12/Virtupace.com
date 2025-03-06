export const postSlackMessage = (text: string) => {
  fetch("/api/webhook/slack", {
    method: "POST",
    body: JSON.stringify({ text }),
  })
    .then((res) => res.json())
    .catch((e) => {});
};
