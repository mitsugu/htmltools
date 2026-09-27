/* =========================================
   image-unit
   fullscreen + zoom + pan
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

    document.querySelectorAll('.img-container').forEach(figure => {

        const img = figure.querySelector('.target-img');
        const button = figure.querySelector('.fullscreen-btn');

        if (!img) {
            return;
        }


        /* =====================================
           ズームステージを作る
           ===================================== */

        /*
         * 既に作られている場合は再利用。
         */
        let stage = figure.querySelector('.image-zoom-stage');

        if (!stage) {
            stage = document.createElement('div');
            stage.className = 'image-zoom-stage';

            /*
             * img の直前に stage を作る。
             */
            img.parentNode.insertBefore(stage, img);

            /*
             * img を stage の中へ移動。
             */
            stage.appendChild(img);
        }


        /* =====================================
           設定
           ===================================== */

        let zoom = 1;

        const MIN_ZOOM = 1;
        const MAX_ZOOM = 5;

        const ZOOM_STEP = 0.2;

        /*
         * キーボード移動量。
         */
        const PAN_STEP = 80;


        /* =====================================
           fullscreen 判定
           ===================================== */

        const isFullscreen = () => {
            return (
                document.fullscreenElement === figure ||
                document.webkitFullscreenElement === figure
            );
        };


        /* =====================================
           画像サイズ取得
           ===================================== */

        const getNaturalSize = () => {

            const width = img.naturalWidth;
            const height = img.naturalHeight;

            if (
                !width ||
                !height
            ) {
                return null;
            }

            return {
                width,
                height
            };
        };


        /* =====================================
           fullscreen時の基準画像サイズ
           ===================================== */

        const getBaseImageSize = () => {

            const natural = getNaturalSize();

            if (!natural) {
                return null;
            }

            const viewportWidth = figure.clientWidth;
            const viewportHeight = figure.clientHeight;

            /*
             * 画面内に収まる倍率。
             *
             * 1倍を上限にしているので、
             * 小さい画像を勝手に拡大しない。
             */
            const fitScale = Math.min(
                viewportWidth / natural.width,
                viewportHeight / natural.height,
                1
            );

            return {
                width: natural.width * fitScale,
                height: natural.height * fitScale
            };
        };


        /* =====================================
           stage / image のレイアウト
           ===================================== */

        const updateLayout = (center = false) => {

            if (!isFullscreen()) {
                return;
            }

            const base = getBaseImageSize();

            if (!base) {
                return;
            }


            /*
             * 現在の画像サイズ。
             */
            const imageWidth =
                base.width * zoom;

            const imageHeight =
                base.height * zoom;


            /*
             * stage は
             *
             *   viewport
             *   または image
             *
             * の大きいほう。
             */
            const stageWidth = Math.max(
                figure.clientWidth,
                imageWidth
            );

            const stageHeight = Math.max(
                figure.clientHeight,
                imageHeight
            );


            /*
             * stage サイズ設定。
             */
            stage.style.width =
                `${stageWidth}px`;

            stage.style.height =
                `${stageHeight}px`;


            /*
             * img の実サイズ設定。
             */
            img.style.width =
                `${imageWidth}px`;

            img.style.height =
                `${imageHeight}px`;


            /*
             * 1倍に戻したときなどは
             * 必ず中央にする。
             */
            if (center) {

                requestAnimationFrame(() => {

                    figure.scrollLeft =
                        Math.max(
                            0,
                            (stageWidth - figure.clientWidth) / 2
                        );

                    figure.scrollTop =
                        Math.max(
                            0,
                            (stageHeight - figure.clientHeight) / 2
                        );
                });
            }
        };


        /* =====================================
           スクロール位置を制限
           ===================================== */

        const clampScroll = () => {

            figure.scrollLeft = Math.max(
                0,
                Math.min(
                    figure.scrollLeft,
                    figure.scrollWidth - figure.clientWidth
                )
            );

            figure.scrollTop = Math.max(
                0,
                Math.min(
                    figure.scrollTop,
                    figure.scrollHeight - figure.clientHeight
                )
            );
        };


        /* =====================================
           ズーム変更
           ===================================== */

        /*
         * anchorX / anchorY が指定された場合、
         * その位置を中心にズームする。
         *
         * これによりマウスポインタ位置を
         * 基準にしたズームができる。
         */
        const setZoom = (
            newZoom,
            anchorX = null,
            anchorY = null
        ) => {

            if (!isFullscreen()) {
                return;
            }


            const oldZoom = zoom;

            newZoom = Math.max(
                MIN_ZOOM,
                Math.min(MAX_ZOOM, newZoom)
            );


            if (newZoom === oldZoom) {
                return;
            }


            /*
             * 現在の画像位置。
             */
            const oldBase = getBaseImageSize();

            if (!oldBase) {
                return;
            }


            const oldImageWidth =
                oldBase.width * oldZoom;

            const oldImageHeight =
                oldBase.height * oldZoom;

            const oldStageWidth =
                Math.max(
                    figure.clientWidth,
                    oldImageWidth
                );

            const oldStageHeight =
                Math.max(
                    figure.clientHeight,
                    oldImageHeight
                );

            const oldImageLeft =
                (oldStageWidth - oldImageWidth) / 2;

            const oldImageTop =
                (oldStageHeight - oldImageHeight) / 2;


            /*
             * anchor が指定されている場合、
             * その点が画像のどこなのか計算。
             *
             * 未指定なら viewport 中心。
             */
            const localX =
                anchorX !== null
                    ? anchorX
                    : figure.clientWidth / 2;

            const localY =
                anchorY !== null
                    ? anchorY
                    : figure.clientHeight / 2;


            const oldPointX =
                figure.scrollLeft +
                localX -
                oldImageLeft;

            const oldPointY =
                figure.scrollTop +
                localY -
                oldImageTop;


            /*
             * 画像上の相対位置。
             */
            const relativeX =
                oldImageWidth > 0
                    ? oldPointX / oldImageWidth
                    : 0.5;

            const relativeY =
                oldImageHeight > 0
                    ? oldPointY / oldImageHeight
                    : 0.5;


            /*
             * ズーム更新。
             */
            zoom = newZoom;


            /*
             * 新しいレイアウトサイズ。
             */
            const newImageWidth =
                oldBase.width * zoom;

            const newImageHeight =
                oldBase.height * zoom;

            const newStageWidth =
                Math.max(
                    figure.clientWidth,
                    newImageWidth
                );

            const newStageHeight =
                Math.max(
                    figure.clientHeight,
                    newImageHeight
                );

            const newImageLeft =
                (newStageWidth - newImageWidth) / 2;

            const newImageTop =
                (newStageHeight - newImageHeight) / 2;


            /*
             * stage / img 更新。
             */
            stage.style.width =
                `${newStageWidth}px`;

            stage.style.height =
                `${newStageHeight}px`;

            img.style.width =
                `${newImageWidth}px`;

            img.style.height =
                `${newImageHeight}px`;


            /*
             * 元々見ていた画像上の点を
             * 新しい表示位置でも同じ場所にする。
             */
            requestAnimationFrame(() => {

                let newScrollLeft =
                    newImageLeft +
                    relativeX * newImageWidth -
                    localX;

                let newScrollTop =
                    newImageTop +
                    relativeY * newImageHeight -
                    localY;


                /*
                 * スクロール可能範囲に制限。
                 */
                newScrollLeft = Math.max(
                    0,
                    Math.min(
                        newScrollLeft,
                        figure.scrollWidth - figure.clientWidth
                    )
                );

                newScrollTop = Math.max(
                    0,
                    Math.min(
                        newScrollTop,
                        figure.scrollHeight - figure.clientHeight
                    )
                );


                figure.scrollLeft =
                    newScrollLeft;

                figure.scrollTop =
                    newScrollTop;
            });
        };


        /* =====================================
           fullscreen 開始
           ===================================== */

        const enterFullscreenLayout = () => {

            zoom = 1;

            /*
             * まず通常表示時の
             * CSS width/height 制約を解除。
             */
            img.style.maxWidth = 'none';
            img.style.maxHeight = 'none';

            updateLayout(true);
        };


        /* =====================================
           fullscreen 終了
           ===================================== */

        const leaveFullscreenLayout = () => {

            zoom = 1;

            /*
             * inline style を解除して
             * 通常時の CSS に戻す。
             */
            img.style.width = '';
            img.style.height = '';

            img.style.maxWidth = '';
            img.style.maxHeight = '';

            stage.style.width = '';
            stage.style.height = '';

            stage.classList.remove(
                'is-dragging'
            );

            /*
             * スクロール位置をリセット。
             */
            figure.scrollLeft = 0;
            figure.scrollTop = 0;
        };


        /* =====================================
           fullscreen change
           ===================================== */

        document.addEventListener(
            'fullscreenchange',
            () => {

                if (document.fullscreenElement === figure) {
                    enterFullscreenLayout();
                } else {
                    leaveFullscreenLayout();
                }
            }
        );


        /* =====================================
           Safari
           ===================================== */

        document.addEventListener(
            'webkitfullscreenchange',
            () => {

                if (
                    document.webkitFullscreenElement === figure
                ) {
                    enterFullscreenLayout();
                } else {
                    leaveFullscreenLayout();
                }
            }
        );


        /* =====================================
           fullscreen ボタン
           ===================================== */

        if (button) {

            button.addEventListener('click', event => {

                event.preventDefault();
                event.stopPropagation();


                /*
                 * fullscreen 無効なら何もしない。
                 */
                if (
                    figure.getAttribute(
                        'data-fullscreen'
                    ) !== 'true'
                ) {
                    return;
                }


                /*
                 * 既に fullscreen なら終了。
                 */
                if (isFullscreen()) {

                    if (document.exitFullscreen) {
                        document.exitFullscreen();

                    } else if (
                        document.webkitExitFullscreen
                    ) {
                        document.webkitExitFullscreen();
                    }

                    return;
                }


                /*
                 * figure を fullscreen にする。
                 */
                if (figure.requestFullscreen) {

                    figure.requestFullscreen();

                } else if (
                    figure.webkitRequestFullscreen
                ) {

                    figure.webkitRequestFullscreen();
                }
            });
        }


        /* =====================================
           マウスホイールでズーム
           ===================================== */

        figure.addEventListener(
            'wheel',
            event => {

                if (!isFullscreen()) {
                    return;
                }


                /*
                 * ボタンの上でのホイールは無視。
                 */
                if (
                    event.target.closest(
                        '.fullscreen-btn'
                    )
                ) {
                    return;
                }


                event.preventDefault();


                /*
                 * マウスポインタの位置を
                 * figure 内の座標に変換。
                 */
                const rect =
                    figure.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left;

                const y =
                    event.clientY -
                    rect.top;


                /*
                 * 上方向 → 拡大
                 * 下方向 → 縮小
                 */
                if (event.deltaY < 0) {

                    setZoom(
                        zoom + ZOOM_STEP,
                        x,
                        y
                    );

                } else {

                    setZoom(
                        zoom - ZOOM_STEP,
                        x,
                        y
                    );
                }

            },
            {
                passive: false
            }
        );


        /* =====================================
           ダブルクリック
           ===================================== */

        img.addEventListener(
            'dblclick',
            event => {

                if (!isFullscreen()) {
                    return;
                }

                event.preventDefault();


                if (zoom === 1) {

                    setZoom(2);

                } else {

                    setZoom(1);
                }
            }
        );


        /* =====================================
           マウスドラッグ / タッチスワイプ
           ===================================== */

        let dragging = false;

        let pointerId = null;

        let startX = 0;
        let startY = 0;

        let startScrollLeft = 0;
        let startScrollTop = 0;


        stage.addEventListener(
            'pointerdown',
            event => {

                if (!isFullscreen()) {
                    return;
                }


                /*
                 * 左ボタン以外のマウスは無視。
                 */
                if (
                    event.pointerType === 'mouse' &&
                    event.button !== 0
                ) {
                    return;
                }


                /*
                 * ボタン操作は除外。
                 */
                if (
                    event.target.closest(
                        '.fullscreen-btn'
                    )
                ) {
                    return;
                }


                dragging = true;

                pointerId = event.pointerId;

                startX = event.clientX;
                startY = event.clientY;

                startScrollLeft =
                    figure.scrollLeft;

                startScrollTop =
                    figure.scrollTop;


                stage.classList.add(
                    'is-dragging'
                );


                /*
                 * pointer capture により
                 * stage の外へ出ても追跡できる。
                 */
                stage.setPointerCapture(
                    pointerId
                );

                event.preventDefault();
            }
        );


        stage.addEventListener(
            'pointermove',
            event => {

                if (
                    !dragging ||
                    event.pointerId !== pointerId
                ) {
                    return;
                }


                const dx =
                    event.clientX - startX;

                const dy =
                    event.clientY - startY;


                /*
                 * ドラッグ方向と逆向きに
                 * スクロールすることで、
                 * 画像を掴んで動かす感覚にする。
                 */
                figure.scrollLeft =
                    startScrollLeft - dx;

                figure.scrollTop =
                    startScrollTop - dy;


                clampScroll();

                event.preventDefault();
            }
        );


        const finishDrag = event => {

            if (
                !dragging ||
                (
                    event.pointerId !== undefined &&
                    event.pointerId !== pointerId
                )
            ) {
                return;
            }


            dragging = false;

            stage.classList.remove(
                'is-dragging'
            );


            if (
                pointerId !== null &&
                stage.hasPointerCapture(pointerId)
            ) {
                stage.releasePointerCapture(
                    pointerId
                );
            }


            pointerId = null;
        };


        stage.addEventListener(
            'pointerup',
            finishDrag
        );

        stage.addEventListener(
            'pointercancel',
            finishDrag
        );


        /* =====================================
           キーボード
           ===================================== */

        document.addEventListener(
            'keydown',
            event => {

                if (!isFullscreen()) {
                    return;
                }


                /*
                 * 入力フォーム等では
                 * キー操作を奪わない。
                 */
                const tag =
                    event.target.tagName;

                if (
                    tag === 'INPUT' ||
                    tag === 'TEXTAREA' ||
                    tag === 'SELECT'
                ) {
                    return;
                }


                /* -----------------------------
                   ←
                   ----------------------------- */

                if (event.key === 'ArrowLeft') {

                    event.preventDefault();

                    figure.scrollLeft -= PAN_STEP;
                }


                /* -----------------------------
                   →
                   ----------------------------- */

                if (event.key === 'ArrowRight') {

                    event.preventDefault();

                    figure.scrollLeft += PAN_STEP;
                }


                /* -----------------------------
                   ↑
                   ----------------------------- */

                if (event.key === 'ArrowUp') {

                    event.preventDefault();

                    figure.scrollTop -= PAN_STEP;
                }


                /* -----------------------------
                   ↓
                   ----------------------------- */

                if (event.key === 'ArrowDown') {

                    event.preventDefault();

                    figure.scrollTop += PAN_STEP;
                }


                /* -----------------------------
                   +
                   ----------------------------- */

                if (
                    event.key === '+' ||
                    event.key === '='
                ) {

                    event.preventDefault();

                    setZoom(
                        zoom + ZOOM_STEP
                    );
                }


                /* -----------------------------
                   -
                   ----------------------------- */

                if (event.key === '-') {

                    event.preventDefault();

                    setZoom(
                        zoom - ZOOM_STEP
                    );
                }


                /* -----------------------------
                   0
                   ----------------------------- */

                if (event.key === '0') {

                    event.preventDefault();

                    setZoom(1);
                }


                /* -----------------------------
                   Home
                   ----------------------------- */

                if (event.key === 'Home') {

                    event.preventDefault();

                    figure.scrollTop = 0;
                    figure.scrollLeft = 0;
                }


                /* -----------------------------
                   End
                   ----------------------------- */

                if (event.key === 'End') {

                    event.preventDefault();

                    figure.scrollTop =
                        figure.scrollHeight;

                    figure.scrollLeft =
                        figure.scrollWidth;
                }

            }
        );


        /* =====================================
           ウィンドウサイズ変更
           ===================================== */

        window.addEventListener(
            'resize',
            () => {

                if (!isFullscreen()) {
                    return;
                }

                updateLayout(false);

                requestAnimationFrame(
                    clampScroll
                );
            }
        );

    });

});
