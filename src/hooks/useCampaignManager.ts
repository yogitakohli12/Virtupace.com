import axios from "axios";

// VISIT with is_completed is wallet conversion
// BUY with is_completed is sales conversion
interface ActionBody {
  action: "VISIT" | "BUY";
  href?: string;
  referral_url?: string | undefined;
  value?: number;
  isCompleted?: boolean;
  ref?: string | undefined;
  wallet_address?: string | undefined;
  isInitiated?: boolean;
}

class CampaignManager {
  private isVisitActionLogged: boolean;
  private serverUrl?: string;
  private href: string;
  private language: string;

  constructor() {
    this.language = "en";
    this.isVisitActionLogged = false;
    this.serverUrl = "https://campaign.virtupace.com/";
    this.href = typeof window === "undefined" ? "" : window.location.href;
  }

  async setup(language?: string) {
    this.language = language ?? "en";
    if (this.isVisitActionLogged) {
      return;
    }
    this.isVisitActionLogged = true;
    await this.logAction({ action: "VISIT" });
  }

  async logAction(body: ActionBody) {
    if (!this.serverUrl) {
      return;
    }
    try {
      const referral_url = document.referrer;
      const res = await axios.post(
        `${this.serverUrl}api/log-user-action`,
        {
          ...body,
          href: this.href,
          referral_url,
          language: this.language,
          resolution: `${window.screen.width}x${window.screen.height}`,
        },
        {
          headers: {
            // coment
            token: localStorage.getItem("_cc_token") ?? "",
          },
        }
      );
      if (res.data._token) {
        localStorage.setItem("_cc_token", res.data._token);
      }
    } catch (error) {}
  }
}

export const campaign = new CampaignManager();
