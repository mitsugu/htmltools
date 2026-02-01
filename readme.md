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

## hero
### これは何？
　ヒーローセクション
### ファイル一覧
* hero.css

## opal
### これは何？
　画像クロスフェードダー
### ファイル一覧
* opal.css
* opal.js
### html の例
```html
<div class="image-crossfader"
	data-auto-play="true"
	data-duration="4.0"
	data-fade-speed="1.5"
	data-aspect-ratio="1280 / 512"
	data-max-width="80vw">
    <img src="fig0001.jpg" alt="Image 1">
    <img src="fig0002.jpg" alt="Image 1">
	<img src="IMGP7391.jpg" alt="Image 1">
	<img src="IMGP7426.jpg" alt="Image 1">
	<img src="IMGP7654.jpg" alt="Image 1">
	<img src="IMGP7871.jpg" alt="Image 1">
	<img src="IMGP7884.jpg" alt="Image 1">
	<img src="IMGP7937.jpg" alt="Image 1">
	<img src="IMGP7944.jpg" alt="Image 1">
</div>
```
### 設定可能データ
**data-auto-play:** true: auto start false: stop start  
**data-duration:** 位置画像の表示時間 (sec) ex) 4.0  
**data-fade-speed:** フェードタイム (sec) ex) 1.5  
**data-aspect-ratio:** アスペクト比 ex) 1280 / 512  
**data-max-width:** フェーダーの横幅 ex) 80vw  

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

## wrappedmedia
### これは何？
　画像の回り込み
### ファイル一覧
* wrappedmedia.css
### html の例
```html
<div class="container">
	<div class="left">
		<figure>
			<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3327.68308409262!2d135.75092461177158!3d33.483600873265424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60063aa7a3956155%3A0x760f402fde00b9fb!2z5rCR5a6_44O76auY5bKh!5e0!3m2!1sja!2sjp!4v1769944406105!5m2!1sja!2sjp" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
		</figure>
	</div>
	<p>住所</p>
	<p>〒999‐9999　和歌山県東牟婁郡串本町xxxx 999‐9<br>TEL 9999‐99‐9999</a><br>FAX 9999‐99‐9999<br>✉ kushimoto@gov.jp</p>
</div>
```
### 設定可能データ
　特になし
