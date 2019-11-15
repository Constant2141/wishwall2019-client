const baseURL = `http://47.100.12.168:3000/login`;

function getUrl(){
  let url = window.location.href.split('#')[0];
  return encodeURIComponent(url);
}
function getWord(){
  let words = [
      '如果事与愿违，请相信另有安排。',
      '野旷天低树，江清月近人。 ',
      '因为心无所恃,所以随遇而安。 ',
      '万一，努力的尽头,是你呢？ ',
      '我明白你会来，所以我等。',
      '"Night\'s " + "Watch" = "Night \'s Watch" '
  ];

  return words[parseInt(Math.random() * words.length)];
}
function getShareData(){
  const title = `2019 Night's Watch 许愿墙`
  const desc = getWord()
  const link = `http://wx.1bin.top?`
  const imgUrl = `http://1bin.top/logo.jpg`
  const success = function() { console.log('success') }

  return { title, desc, link, imgUrl, success }
}



export default async function share(){

  let url = getUrl();
  let ajax = await fetch(`${baseURL}/getConfig?url=${url}`)
  let config  = await ajax.json()
  await console.log(config);

  await wx.config(config)

  wx.ready(() => {
    let shareData = getShareData();

    wx.updateTimelineShareData(shareData)
    wx.updateAppMessageShareData(shareData)
  })
}
