export const trackEvent = (eventName, eventParams) => {
  if (window && window.gtag) {
    window.gtag("event", eventName, eventParams);
  }
};
