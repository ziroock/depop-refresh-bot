const { loginToDepop } = require('./loginToDepop')

module.exports = {
  loginToDepop,
}

// curl 'https://webapi.depop.com/api/v1/shop/12724152/filteredProducts/selling?limit=24' \
//   -H 'authority: webapi.depop.com' \
//   -H 'accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9' \
//   -H 'accept-language: en-US,en;q=0.9,bg;q=0.8' \
//   -H 'cache-control: max-age=0' \
//   -H 'cookie: exp_id=b9f1160d-fb4c-4d43-8d8d-6e94657cb2aa; ACTIVITY_TRACKER_PERSISTENT_SESSION_ID=babec97b-3883-4a41-a9cf-41df6adef1c7; pxcts=5c68acda-4e4f-11ed-a024-537058574f6f; _pxvid=5c689ddf-4e4f-11ed-a024-537058574f6f; language=en; __ssid=b88f876aea3eb0b09b4d025176e0bf7; gdpr__facebook__social=true; gdpr__google__analytics=true; gdpr__depop__functional=true; _ga=GA1.2.2081992224.1666033831; _gac_UA-29057740-10=1.1666033831.CjwKCAjw-rOaBhA9EiwAUkLV4urj-3QxDySnkamUFrABvNeuhiN7pRsAfad6xjI-iDFNrJhMv-kfxxoCuqcQAvD_BwE; ajs_anonymous_id=e760aa0a-daa9-4605-be00-b095aced7801; _pin_unauth=dWlkPU5URXpNekEwWXpFdE1HRmtZeTAwTkRRMUxUZzRNakF0WWpRM05tSmxNbUkwWTJSaA; _scid=a50c7084-ab63-41a0-9e8a-ea4c0c9e1dc8; location=gb; access_token=fa52d16ecca919e2615bc11dfc932e43f79e1eba; ajs_user_id=12724152; user_id=12724152; _gid=GA1.2.1799035598.1666226370' \
//   -H 'if-none-match: W/"62d7-C0awi6UBHHIHS7EthPDnxyr/T/E"' \
//   -H 'sec-ch-ua: "Chromium";v="106", "Google Chrome";v="106", "Not;A=Brand";v="99"' \
//   -H 'sec-ch-ua-mobile: ?0' \
//   -H 'sec-ch-ua-platform: "macOS"' \
//   -H 'sec-fetch-dest: document' \
//   -H 'sec-fetch-mode: navigate' \
//   -H 'sec-fetch-site: none' \
//   -H 'sec-fetch-user: ?1' \
//   -H 'upgrade-insecure-requests: 1' \
//   -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36' \
//   --compressed
