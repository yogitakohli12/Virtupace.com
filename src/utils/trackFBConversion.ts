export const EventType = {
  Purchase: "Purchase",
  InitiateCheckout: "InitiateCheckout",
  CompleteRegistration: "CompleteRegistration",
  AddPaymentInfo: "AddPaymentInfo",
  PageView: "PageView",
};
import { getUrl } from "@/config/url";
import axios from "axios";
import { createHash } from "crypto";
import { getUUID } from "./getUUID";

const hash = (text: string) => {
  return createHash("sha256").update(text).digest("hex");
};
const metaEvents = async (data: any) => {
  try {
    const { email, phone, country, ...rest } = data;
    const res = await axios.post(getUrl("api/fb-conversion"), {
      em: [email ? hash(email) : null],
      ph: [phone ? hash(phone) : null],
      country: [country ? hash(country) : null],
      ...rest,
    });
    return res.data;
  } catch (e) {
    console.log(e);
  }
};
export const addCampaignLog = async (data: any) => {
  try {
    // const { domain,full_url,ip,country,type, ...rest } = data;
    const res = await axios.post(getUrl("api/add-campaign-logs"), data);
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export default metaEvents;
export const trackFBConversion = async (data: any) => {
  const event_id = getUUID();
  const fbclid = new URLSearchParams(window.location.search).get("fbclid");
  const fbc = fbclid ? `fb.1.${new Date().getTime()}.${fbclid}` : "";
  try {
    if (data.event_type === EventType.Purchase) {
      (window as any)?.fbq?.("track", data.event_type, {
        value: data.value || 0,
        currency: "USD",
        eventID: event_id,
      });
    } else {
      (window as any)?.fbq?.("track", data.event_type, {
        eventID: event_id,
      });
    }
  } catch (error) {
    console.error(error);
  }
  metaEvents({
    fbc,
    event_name: data.event_type,
    event_id,
    email: data.email,
    phone: data.phone,
    country: data.country,
    client_user_agent: navigator.userAgent || "",
    value: data.value || 0,
    clickId: data.clickId || "",
  });
  addCampaignLog({
    domain: window.location.host,
    full_url: window.location.href,
    ip: data.ip,
    country: data.country,
    type: data.event_type,
  })
};
