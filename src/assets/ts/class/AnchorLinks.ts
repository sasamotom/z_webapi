// *****************************************************
// アンカーリンク関連
// *****************************************************

// *****************************************************
// アンカーリンククラス
// *****************************************************
export class AnchorLinks {
  // ----------------------------------------------------
  // 機能：コンストラクタ
  // 引数：なし
  // 返値：なし
  //----------------------------------------------------
  constructor() {
    // アンカーリンク一覧作成と現在位置を示すクラスをスクロールで付け替えるよう設定
    const ancLinks = document.getElementById('ancLinks');   // アンカーリンク領域
    // IntersectionObserverのオプション設定
    const options = {
      root: null,
      rootMargin: "-49% 0%",
      threshold: 0,
    };
    // IntersectionObserverのコールバック関数登録
    const observer = new IntersectionObserver(this._setActiveLink, options);
    if (ancLinks) {
      const secs = document.querySelectorAll('.secCard'); // セクション一覧
      if (secs) {
        secs.forEach((sec, index) => {
          // アンカーリンク一覧作成
          let ttlStr = ""; // タイトル
          const ttl = sec.querySelector('.secCard_ttl');
          if (ttl) {
            ttlStr = ttl.innerHTML
          }
          sec.setAttribute('id','anc-' + index);    // セクションタイトルにID付加
          const html = '<li><a href="#anc-' + index + '"><span>' + ttlStr + '</span></a></li>'
          ancLinks.insertAdjacentHTML('beforeend', html); // アンカー一覧への追加

          // 現在位置を示すクラスをスクロールで付け替えるよう設定
          observer.observe(sec);
        });
      }
    }
  }

  // ----------------------------------------------------
  // 機能：アクティブなリンク・要素にクラスをつける
  // 引数：entries
  // 返値：なし
  // ----------------------------------------------------
  private _setActiveLink(entries: any) {
    if (entries.length > 0) {
      for (let i = 0; i < entries.length; i++) {
        const entry = entries[i];
        const ancLink = document.querySelector('#ancLinks a[href="#' + entry.target.getAttribute('id') + '"]');
        if (entry.isIntersecting) {
          entry.target.classList.add("-active");
          if (ancLink) {
            ancLink.classList.add("-active");
          }
        }
        else {
          entry.target.classList.remove('-active');
          if (ancLink) {
            ancLink.classList.remove("-active");
          }
        }
      }
    }
  }
}
