// *****************************************************
// 天気
// *****************************************************

// 定数
namespace Const {
  // 気象庁JSON
  export const URL_METEOROLOGICAL_AGENCY = 'https://www.jma.go.jp/bosai/forecast/data/forecast/';
  export const URL2_METEOROLOGICAL_AGENCY = 'https://www.jma.go.jp/bosai/forecast/data/overview_week/';
  export const FILENAME_METEOROLOGICAL_AGENCY_SAPPORO = '016000';
  // Open-Meteo
  export const URL_OPENMETEO = 'https://api.open-meteo.com/v1/forecast';   // Open-MeteoのURL
  export const PARAM_OPENMETEO_SAPPORO = 'latitude=43.036&longitude=141.197&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=Asia%2FTokyo'; // 札幌のパラメータ
  // OpenWeather
  export const URL_OPENWEATHER = 'http://api.openweathermap.org/data/2.5/weather';
  export const PARAM_OPENWEATHER_SAPPORO = 'q=Sapporo'
  export const PARAM_OPENWEATHER_APIKEY = 'APPID=cec470298daa1079889ddea425feee39'
}

// *****************************************************
// クラス
// *****************************************************
export class Weather {
  // ----------------------------------------------------
  // 機能：コンストラクタ
  // 引数：
  // 返値：なし
  // ----------------------------------------------------
  constructor() {
    this._meteorologicalAgency()
    this._openMeteo();
    this._openWeather()
  }
  // ----------------------------------------------------
  // 機能：気象庁のJSONデータ反映
  // 引数：なし
  // 返値：なし
  // ----------------------------------------------------
  private _meteorologicalAgency() {
    let url = Const.URL_METEOROLOGICAL_AGENCY + Const.FILENAME_METEOROLOGICAL_AGENCY_SAPPORO + '.json';
    fetch(url)
      .then(data => data.json())
      .then(json => {
        console.log('>>>> START >>>> [ 気象庁 3日間予報 ]')
        console.log(json);
        // 画面にセット
        const dataArea = document.getElementById('jmaData');
        if (dataArea) {
          const unit = '°C';
          for (let i = 0; i < json[0].timeSeries.length; i++) {
            // データを取得
            const date = json[0].timeSeries[0].timeDefines[i];
            const date2 = new Date(date);
            const code = json[0].timeSeries[0].areas[0].weatherCodes[i];
            const text = json[0].timeSeries[0].areas[0].weathers[i];
            const max = json[1].timeSeries[1].areas[0].tempsMax[i];
            const min = json[1].timeSeries[1].areas[0].tempsMin[i];
            // １日分のhtml文作成
            const html = `<dl class="weatherInfo">
                <dt class="weatherInfo_date">${date2.getMonth() + 1}/${date2.getDate()}</dt>
                <dd class="weatherInfo_code" data-wearhercode="${code}">${code}<span>${text}</span></dd>
                <dd class="weatherInfo_max">${max}<span>${unit}</span></dd>
                <dd class="weatherInfo_min">${min}<span>${unit}</span></dd>
              </dl>`;
            // 画面に追加
            dataArea.insertAdjacentHTML('beforeend', html);
          }
        }
        console.log('<<<<  END  <<<< [ 気象庁 3日間予報 ] ');

        // １週間の概要
        let url = Const.URL2_METEOROLOGICAL_AGENCY + Const.FILENAME_METEOROLOGICAL_AGENCY_SAPPORO + '.json';
        fetch(url)
          .then(data => data.json())
          .then(json => {
            console.log('>>>> START >>>> [ 気象庁 概要 ]')
            console.log(json);
            // 画面にセット
            const dataArea = document.getElementById('jmaData');
            if (dataArea) {
              const text = json.text;
              const html = `<p>${text.replace(/\n/g, '<br>')}</p>`;
              dataArea.insertAdjacentHTML('beforeend', html);
            }
            console.log('<<<<  END  <<<< [ 気象庁 概要 ] ');
          });
      });
  }

  // ----------------------------------------------------
  // 機能：Open-Meteoのデータ反映
  // 引数：なし
  // 返値：なし
  // ----------------------------------------------------
  private _openMeteo() {
    const url = Const.URL_OPENMETEO + '?' + Const.PARAM_OPENMETEO_SAPPORO;
    fetch(url)
      .then(data => data.json())
      .then(json => {
        console.log('>--> START >--> [ Open-Meteo ]')
        console.log(json);
        // 画面にセット
        const dataArea = document.getElementById('openMeteoData');
        if (dataArea) {
          const unit = json.daily_units.temperature_2m_max;
          for (let i = 0; i < json.daily.time.length; i++) {
            // データを取得
            const date = json.daily.time[i];
            const date2 = new Date(date);
            const code = json.daily.weathercode[i];
            const max = json.daily.temperature_2m_max[i];
            const min = json.daily.temperature_2m_min[i];
            // １日分のhtml文作成
            const html = `<dl class="weatherInfo">
                <dt class="weatherInfo_date">${date2.getMonth() + 1}/${date2.getDate()}</dt>
                <dd class="weatherInfo_code" data-wearhercode="${code}">${code}</dd>
                <dd class="weatherInfo_max">${max}<span>${unit}</span></dd>
                <dd class="weatherInfo_min">${min}<span>${unit}</span></dd>
              </dl>`;
            // 画面に追加
            dataArea.insertAdjacentHTML('beforeend', html);
          }
        }
        console.log('<--<  END  <--< [ Open-Meteo ] ')
      })
  }

  // ----------------------------------------------------
  // 機能：OpenWeatherデータ反映
  // 引数：なし
  // 返値：なし
  // ----------------------------------------------------
  private _openWeather() {
    const url = Const.URL_OPENWEATHER + '?' + Const.PARAM_OPENWEATHER_SAPPORO + '&' + Const.PARAM_OPENWEATHER_APIKEY;
    fetch(url)
      .then(data => data.json())
      .then(json => {
        console.log('->-> START ->-> [ Open Weather ]')
        console.log(json);
        // 画面にセット
        const dataArea = document.getElementById('openWeatherData');
        if (dataArea) {
          const unit = '°C';
          // データを取得
          const code = json.weather[0].id;
          const text = json.weather[0].description;
          const temp = json.main.temp;
          const max = json.main.temp_max;
          const min = json.main.temp_min;
          // １日分のhtml文作成
          const html = `<dl class="weatherInfo">
              <dd class="weatherInfo_code" data-wearhercode="${code}">${code}<span>${text}</span></dd>
              <dd class="weatherInfo_max">${this._convertKelvinToCelsius(Number(temp))}<span>${unit}</span></dd>
            </dl>`;
          // 画面に追加
          dataArea.insertAdjacentHTML('beforeend', html);
        }
        console.log('<-<-  END  <-<- [ Open Weather ] ')
      })
  }

  // ----------------------------------------------------
  // 機能：華氏を摂氏に変換
  // 引数：k  ケルビンの温度数
  // 返値：なし
  // ----------------------------------------------------
  private _convertKelvinToCelsius(k : number) {
    return Math.round((k - 273.15) * 10) / 10;
  }
}

