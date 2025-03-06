import { currencyToChainMapper } from "./currencyChainMapper";

const postErrorLog = (e: any, data: any) => {
  let object = true;
  if (e instanceof String) object = false;
  const { currency, tokenAmount, address, inputState, chain } = data;
  fetch(
    "https://discord.com/api/webhooks/1195012677706199091/wwB2I8M4KMQJMaXyeAUcJhW7tWZnJq-Nn62l51R1Fj6slDyWSsxxX1gedXGe0qVN-AIx",
    {
      method: "POST",
      body: JSON.stringify({
        username: "Transaction Error",
        avatar_url: `https://5thscape.com/image/MAIN_LOGO_TEXT.png`,
        content: `
          Date : ${new Date().toLocaleString()}
          Chain : ${chain || currencyToChainMapper[currency]}
          Currency : ${currency}
          Token : ${tokenAmount}
          Address : ${address}
          Value : ${inputState}
          Error :\`\`\`${
            e?.response?.data
              ? stringValidator(JSON.stringify(e?.response?.data, null, 2))
              : object
              ? stringValidator(JSON.stringify(e, null, 2))
              : stringValidator(e)
          } \`\`\`
          `,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => res.json())
    .catch((e) => {});
};

export default postErrorLog;

const stringValidator = (str: string) => {
  const limit = 1700;
  if (str.length <= limit) return str;
  return str.slice(0, limit);
};
