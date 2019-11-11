const baseURL = `http://47.100.12.168:3000/login`;

function getUrl(){
  let url = window.location.href.split('#')[0];
  return encodeURIComponent(url);
}
function getWord(){
  let words = [
      '轻轻地，我们来了。',
      '$ echo aSBhbSBoZXJlIHdhdGluZyBmb3IgeW91Cgo= | base64 -d # ',
      'NaN Undefined Null Number Object Boolean Symbol ',
      '记住你无畏青春的样子，你未必出类拔萃，但一定与众不同 ',
      '"Night\'s " + "Watch" = "Night \'s Watch"',
      '长夜将至，我从今开始守望。今夜如此，夜夜皆然。'
  ].map(e => e + '[正在招新]');

  return words[parseInt(Math.random() * words.length)];
}
function getShareData(){
  const title = `2019 Night's Watch 许愿墙`
  const desc = getWord()
  const link = `http://wx.1bin.top/#/login`
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
