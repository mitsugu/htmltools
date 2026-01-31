// 全てのタブボタンとコンテンツを取得
const tabButtons = document.querySelectorAll('.tab-btn');
const tabItems = document.querySelectorAll('.tab-item');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    // 1. すべてのボタンとコンテンツから 'active' クラスを削除（リセット）
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabItems.forEach(item => item.classList.remove('active'));

    // 2. クリックされたボタンに 'active' を付与
    button.classList.add('active');

    // 3. クリックされたボタンの data-target に対応するコンテンツを表示
    const targetId = button.getAttribute('data-target');
    document.getElementById(targetId).classList.add('active');
  });
});
