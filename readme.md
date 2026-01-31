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

## tabmenu
### これは何？
　タブメニュー
### ファイル一覧
* tabmenu.css
* tabmenu.js
### html の例
```html
<div class="tab-buttons">
	<button class="tab-btn active" data-target="tab1">タブ A</button>
	<button class="tab-btn" data-target="tab2">タブ B</button>
	<button class="tab-btn" data-target="tab3">タブ C</button>
</div>

<div class="tab-contents">
	<div id="tab1" class="tab-item active">
		<h2>コンテンツ A</h2>
		<p>ここはタブAの内容です。</p>
	</div>
	<div id="tab2" class="tab-item">
		<h2>コンテンツ B</h2>
		<p>ここはタブBの内容です。画像や動画も入れられます。</p>
	</div>
	<div id="tab3" class="tab-item">
		<h2>コンテンツ C</h2>
		<p>ここはタブCの内容です。</p>
	</div>
</div>
```
### 設定可能データ
　特になし
