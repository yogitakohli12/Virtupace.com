import { useState } from "react";
import { createHash } from "crypto";
import toast from "react-hot-toast";

const hash = (string: string) => {
  return createHash("sha256").update(string).digest("hex");
};
const useSubmitConversion = () => {
  const conversion = async (input: Record<string, any>) => {
    const body = {
      data: [
        {
          event_name: "Purchase",
          event_time: Math.round(new Date().getTime() / 1000),
          action_source: "website",
          user_data: {
            em: input?.email ? [hash(input?.email)] : [],
            ph: [],
          },
          custom_data: {
            value: input.value,
            currency: "USD",
          },
          opt_out: false,
        },
      ],
    };
    try {
      (window as any)?.fbq("track", "Purchase", {
        value: +input.value,
        currency: "USD",
      });
    } catch (e) {}
    try {
      (window as any).plausible("sale-final", {
        revenue: { currency: "USD", amount: +input.value },
      });
    } catch (e) {}
    fetch(`/api/meta-pixel`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((e) => {});
  };
  return { conversion };
};

export default useSubmitConversion;
