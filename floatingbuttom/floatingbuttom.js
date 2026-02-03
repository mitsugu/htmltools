/**
 * floatingbuttom.js
 * 汎用フローティングボタン制御
 */
document.addEventListener('DOMContentLoaded', function() {
  const floatBtns = document.querySelectorAll('.floating-btn-reservation');

  floatBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // 1. 指定された要素をクリック（タブ、a要素、何でも可）
      const clickSelector = this.getAttribute('data-click-target');
      if (clickSelector) {
        const targetEl = document.querySelector(clickSelector);
        if (targetEl) {
          targetEl.click();
        }
      }

      // 2. 指定された要素へスクロール
      const scrollSelector = this.getAttribute('data-scroll-target');
      if (scrollSelector) {
        const scrollTarget = document.querySelector(scrollSelector);
        if (scrollTarget) {
          const offset = 80; // ヘッダー等の余白
          const targetPos = scrollTarget.getBoundingClientRect().top + window.pageYOffset - offset;

          window.scrollTo({
            top: targetPos,
            behavior: 'smooth'
          });
        }
      }
    });
  });
});
