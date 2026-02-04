document.addEventListener('DOMContentLoaded', () => {
  const fabMenu = document.getElementById('fab-menu');

  // メニュー内の各項目をクリックした時の処理
  fabMenu.addEventListener('click', (e) => {
    const target = e.target.closest('.menu-item');
    if (target) {
      console.log(`${target.textContent} がクリックされました`);
      // 処理が終わったら閉じる
      fabMenu.hidePopover();
    }
  });
});
