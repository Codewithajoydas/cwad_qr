export function getDeviceType() {
  const ua = navigator.userAgent;

  if (/iPhone|iPod|Android.*Mobile/i.test(ua)) {
    return "mobile";
  }

  if (/iPad|Android(?!.*Mobile)/i.test(ua)) {
    return "tablet";
  }

  return "desktop";
}