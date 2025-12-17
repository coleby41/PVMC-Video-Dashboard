function downloadApp() {
  const ua = navigator.userAgent || navigator.vendor || window.opera;

  if (/iPad|iPhone|iPod/.test(ua)) {
    window.open("https://apps.apple.com/app/id6743939528", "_blank");
  } else if (/Android/.test(ua)) {
    window.open("https://play.google.com/store/apps/details?id=com.renewedvision.propresenterremote&pcampaignid", "_blank");
  } else {
    alert("Please visit the App Store or Google Play on your mobile device.");
  }
}