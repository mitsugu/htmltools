# Web 用ツール
## autoslider
### これは何？
　Web 用スライドツール。
### ファイル一覧
* autoslider.css
* autoslider.js
### html の例
```html
<div class="slider-wrapper"
     data-auto-play="true"
     data-duration="3.0"
     data-aspect-ratio="512/763"
     data-max-width="512px">

    <button class="slider-btn prev">＜</button>
    <div class="slider-container">
        <div class="slide-item bg-w"><img src="fig2026011002.png" alt="縦長画像1"></div>
        <div class="slide-item bg-w"><img src="fig2026011003.png" alt="縦長画像2"></div>
        <div class="slide-item bg-w"><img src="fig2026011004.png" alt="縦長画像2"></div>
        <div class="slide-item bg-w"><img src="fig2026011005.png" alt="縦長画像2"></div>
        <div class="slide-item bg-w"><img src="fig2026011006.png" alt="縦長画像2"></div>
    </div>
    <button class="slider-btn next">＞</button>
    <div class="status-icon" style="display: none;"></div>
</div>
```
### 設定可能データ
**data-auto-play:** true:オートプレイスタート false:停止状態スタート  
**data-duration:**` オートプレイ時の停止時間 ex) 3.0  
**data-aspect-ratio:** 画像の横縦比 ex) 512/763  
**data-max-width:** PC ブラウザでの画像の幅 ex) 512px  
