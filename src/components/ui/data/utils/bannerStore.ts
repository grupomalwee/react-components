const KEY_PREFIX = "react-components.banner.dismissed:";

export function isBannerDismissed(id = "default") {
  try {
    return localStorage.getItem(KEY_PREFIX + id) === "1";
  } catch (err) {
    void err;
    return false;
  }
}

export function dismissBanner(id = "default") {
  try {
    localStorage.setItem(KEY_PREFIX + id, "1");
  } catch (err) {
    void err;
  }
}

export function clearBannerDismissal(id = "default") {
  try {
    localStorage.removeItem(KEY_PREFIX + id);
  } catch (err) {
    void err;
  }
}

export default { isBannerDismissed, dismissBanner, clearBannerDismissal };
