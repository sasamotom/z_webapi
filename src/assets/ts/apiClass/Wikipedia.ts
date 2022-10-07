// *****************************************************
// Wikipedia
// *****************************************************
// 定数
namespace Const {
  // Wikipedia API
  export const URL_WIKIPEDIAAPI = 'https://ja.wikipedia.org/w/api.php';
}

// *****************************************************
// クラス
// *****************************************************
export class Wikipedia {
  private _textbox: HTMLElement| null;        // テキストボックス要素
  private _resultKey: HTMLElement| null;      // 検索キー表示欄
  private _resultArticle: HTMLElement| null;  // 結果記事欄
  private _resultList: HTMLElement| null;     // 結果一覧欄

  // ----------------------------------------------------
  // 機能：コンストラクタ
  // 引数：
  // 返値：なし
  // ----------------------------------------------------
  constructor() {
    // 必要な要素の取得
    this._textbox = document.getElementById('wikiTxt');
    this._resultKey = document.getElementById('wikiResulListtKey');
    this._resultArticle = document.getElementById('wikiResultArticle');
    this._resultList = document.getElementById('wikiResultList');
    if (this._textbox && this._resultArticle && this._resultList) {
      // SEARCHボタン取得
      const submitBtn = document.getElementById('wikiBtn');
      if (submitBtn) {
        // EnterキーでSEARCHボタン押下イベント登録
        this._textbox.addEventListener('keypress', (e) => {
          if (e.keyCode === 13) {
            submitBtn.click();
          }
          return false;
        });
        // ボタン押下時のイベント登録
        submitBtn.addEventListener('click', () => {
          // テキストボックスに値が入っている場合はデータを検索する
          if ((<HTMLInputElement>this._textbox).value) {
            this._searchArticle();
            this._searchList();
          }
        });
      }
    }
  }

  // ----------------------------------------------------
  // 機能：検索してページ本文を得る
  // 引数：なし
  // 返値：なし
  // ----------------------------------------------------
  private _searchArticle() {
    const key = (<HTMLInputElement>this._textbox).value;
    let url = `${Const.URL_WIKIPEDIAAPI}?origin=*`;
    const params = {
      action: 'query',
      prop: 'extracts',
      titles: key,
      rvprop: 'content',
      rvslots: 'main',
      formatversion: '2',
      format: 'json'
  };
  Object.keys(params).forEach((key) => { url += '&' + key + '=' + (<any>params)[key];});

    // 入力を不可とする
    const formElem = document.querySelectorAll('.secWiki input, .secWiki button');
    formElem.forEach((el) => {
      (<HTMLInputElement>el).disabled = true;
    });
    fetch(url)
      .then(data => data.json())
      .then(json => {
        console.log('*****> START *****> [ WikipediaAPI 記事概要 ]')
        console.log(json);
        const ttl = document.getElementById('wikiResultArticleKey');  // タイトル領域
        if (this._resultKey && this._resultArticle) {
          // 結果欄の初期化
          (<HTMLElement>ttl).innerHTML = '';
          (<HTMLElement>this._resultArticle).innerHTML = '';
          // 結果の有無により表示を切り替える
          if (json.query.pages[0].missing != true) {
            for (let i = 0; i < 1; i++) {
              const pageid = json.query.pages[i].pageid;
              const title = json.query.pages[i].title;
              // const content = json.query.pages[i].revisions[0].slots.main.content;
              const content = json.query.pages[i].extract;
              const html = `<p>${content}</p>
                <p><a href="https://ja.wikipedia.org/?curid=${pageid}" target="_blank" rel="noopener noreferrer">ページへ移動</a></p>`;
              // 画面に追加
              (<HTMLElement>this._resultArticle).innerHTML = html;
              if (ttl) {
                (<HTMLElement>ttl).innerHTML = title;
              }
            }
          }
          else {
            // 結果がないことを表示する
            (<HTMLElement>this._resultArticle).innerHTML = '<p>検索結果は0件でした。</p>';
          }
        }
        // 入力を可能とする
        const formElem = document.querySelectorAll('.secWiki input, .secWiki button');
        formElem.forEach((el) => {
          (<HTMLInputElement>el).disabled = false;
        });
        console.log('<*****  END  <***** [ WikipediaAPI 記事概要 ]')
      });
  }

  // ----------------------------------------------------
  // 機能：検索して結果リストを得る
  // 引数：なし
  // 返値：なし
  // ----------------------------------------------------
  private _searchList() {
    const key = (<HTMLInputElement>this._textbox).value;
    const url = `${Const.URL_WIKIPEDIAAPI}?format=json&action=query&origin=*&list=search&srlimit=20&srsearch="${key}"`;
    // 入力を不可とする
    const formElem = document.querySelectorAll('.secWiki input, .secWiki button');
    formElem.forEach((el) => {
      (<HTMLInputElement>el).disabled = true;
    });
    fetch(url)
      .then(data => data.json())
      .then(json => {
        console.log('>****> START >****> [ WikipediaAPI 一覧 ]')
        console.log(json);
        if (this._resultKey && this._resultList) {
          // キーの保存と結果欄の初期化
          (<HTMLElement>this._resultKey).innerHTML = key;
          (<HTMLElement>this._resultList).innerHTML = '';
          // 結果の有無により表示を切り替える
          if (json.query.search.length > 0) {
            // 結果がある場合は、全て表示する
            for (let i = 0; i < json.query.search.length; i++) {
              const pageid = json.query.search[i].pageid;
              const title = json.query.search[i].title;
              const snippet = json.query.search[i].snippet;
              const html = `<li><a href="https://ja.wikipedia.org/?curid=${pageid}" target="_blank" rel="noopener noreferrer">
                <dl><dt>${title}</dt><dd>${snippet}<dd></dl>
              </a></li>`;
              // 画面に追加
              (<HTMLElement>this._resultList).insertAdjacentHTML('beforeend', html);
            }
          }
          else {
            // 結果がないことを表示する
            (<HTMLElement>this._resultList).innerHTML = '<li>検索結果は0件でした。</li>';
          }
        }
        // 入力を可能とする
        const formElem = document.querySelectorAll('.secWiki input, .secWiki button');
        formElem.forEach((el) => {
          (<HTMLInputElement>el).disabled = false;
        });
        console.log('<****<  END  <****< [ WikipediaAPI 一覧 ]')
      });
  }
}

