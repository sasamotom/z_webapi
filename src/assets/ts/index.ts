import { AnchorLinks } from './class/AnchorLinks';
import { General } from './class/General';
import { Accordion } from './class/Accordion';
import { Hamburger } from './class/Hamburger';
import { Modal } from './class/Modal2';
import { Tab } from './class/Tab'
import { SwiperOperate } from './class/SwiperOperate';

// APIに関するもの
import { Weather } from './apiClass/Weather';


window.addEventListener('DOMContentLoaded', () => {
  const anc = new AnchorLinks();  // アンカーリンク一覧を最初に作成

  const general = new General();
  general.setAnchorPosition();  // アンカーリンクの位置調整（ページロード時用）
  general.setSmoothScroll();    // スムーススクロール
  general.adjust100vh();        // 100vhを調整
  // const acd = new Accordion();  // アコーディオン
  // const hmb = new Hamburger();  // ハンバーガーメニュー
  const mdl = new Modal();      // モーダル
  // const tab = new Tab();        // タブ

  // スワイパー
  new SwiperOperate();

  // API処理
  new Weather();
});
