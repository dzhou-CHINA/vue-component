import coordtransform from 'coordtransform';

const NAVIGATION_MAP = {
  GaoDe: '高德地图',
  BaiDu: '百度地图',
  Tencent: '腾讯地图'
};
const CLIENT_SYSTEM = {
  H5: 'H5',
  Android: 'Andriod',
  IOS: 'IOS'
};

const getSystem = () => {
  let client = CLIENT_SYSTEM.H5;
  const u = navigator.userAgent;

  
  if (/ipad|iphone|midp|rv:1.2.3.4|ucweb|android|windows ce|windows mobile/.test(u.toLocaleLowerCase())) {
    client = CLIENT_SYSTEM.H5;    
  }

  if (u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
    client = CLIENT_SYSTEM.IOS;
  }

  if (u.includes('Android') || u.includes('Adr')) {
    client = CLIENT_SYSTEM.Android;
  }

  return client;
};

export const openMap = {
  // GCJ-02坐标系
  [NAVIGATION_MAP.GaoDe]: (from, to) => {
    const [usrLon, usrLat] = from;
    const { lonEnd, latEnd, destination } = to;
    // 获取到用户定位信息，走导航模式；未获取到用户定位信息，走单点标注模式
    if (usrLat && usrLon) {
      window.location.href = `https://uri.amap.com/navigation?from=${usrLon},${usrLat},我的位置&to=${lonEnd},${latEnd},${destination}&mode=walk&policy=1&src=mypage&coordinate=gaode&callnative=1`;
    } else {
      window.location.href = `https://uri.amap.com/marker?position=${lonEnd},${latEnd}&name=${destination}&src=mypage&coordinate=gaode&callnative=1`;
    }
  },
  // BD-09坐标系
  [NAVIGATION_MAP.BaiDu]: (from, to) => {
    const [usrLon, usrLat] =  coordtransform.gcj02tobd09(from[0], from[1]);
    const { lonEnd, latEnd, destination, region } = to;
    const urlCollect = {};
    const sys = getSystem();

    // 获取到用户定位信息，走导航模式；未获取到用户定位信息，走单点标注模式
    if (usrLon && usrLat) {
      const uri = `direction?origin=latlng:${usrLat},${usrLon}|name:我的位置&destination=latlng:${latEnd},${lonEnd}|name:${destination}&mode=walking&origin_region=${region}&destination_region=${region}`;
      urlCollect[CLIENT_SYSTEM.H5] = `https://api.map.baidu.com/${uri}&src=webapp.baidu.openAPIdemo&output=html`;
      urlCollect[CLIENT_SYSTEM.Android] = `bdapp://map/${uri}&src=andr.baidu.openAPIdemo`;
      urlCollect[CLIENT_SYSTEM.IOS] = `baidumap://map/${uri}&src=ios.baidu.openAPIdemo`;
    } else {
      const uri = `marker?location=${latEnd},${lonEnd}&title=${destination}&content=${destination}`;
      urlCollect[CLIENT_SYSTEM.H5] = `https://api.map.baidu.com/${uri}&output=html&src=webapp.baidu.openAPIdemo`;
      urlCollect[CLIENT_SYSTEM.Android] = `bdapp://map/${uri}&src=andr.baidu.openAPIdemo`;
      urlCollect[CLIENT_SYSTEM.IOS] = `baidumap://map/${uri}&src=ios.baidu.openAPIdemo`;
    }
    console.log(urlCollect[sys]);
    window.location.href = urlCollect[sys];
    if (sys === 'H5') return;
    // 未安装app的补偿机制
    setTimeout(() => {
      window.location.href = urlCollect.H5;
    }, 1000);
  },
  // GCJ-02坐标系
  [NAVIGATION_MAP.Tencent]: (from, to) => {
    const TMAP_KEY = process.env.VUE_APP_QQ_MAP_KEY;
    const [usrLon, usrLat] = from;
    const { lonEnd, latEnd, destination } = to;
    let mobileUrl = '';
    let h5Url = '';
    // 获取到用户定位信息，走导航模式；未获取到用户定位信息，走单点标注模式
    if (usrLat && usrLon) {
      mobileUrl = `qqmap://map/routeplan?type=walk&from=我的位置&fromcoord=${usrLat},${usrLon}&to=${destination}&tocoord=${latEnd},${lonEnd}&referer=${TMAP_KEY}`;
      h5Url = `https://apis.map.qq.com/uri/v1/routeplan?type=walk&from=我的位置&fromcoord=${usrLat},${usrLon}&to=${destination}&tocoord=${latEnd},${lonEnd}&policy=1&referer=${TMAP_KEY}`;
    } else {
      mobileUrl = `qqmap://map/marker?marker=coord:${latEnd},${lonEnd};title:${destination};addr:${destination}&referer=${TMAP_KEY}`;
      h5Url = `https://apis.map.qq.com/uri/v1/marker?marker=coord:${latEnd},${lonEnd};title:${destination};addr:${destination}&referer=${TMAP_KEY}`;
    }
    window.location.href = mobileUrl;
    // 未安装app的补偿机制
    setTimeout(() => {
      window.location.href = h5Url;
    }, 1000);
  }
};
