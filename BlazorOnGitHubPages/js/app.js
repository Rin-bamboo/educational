// wwwroot/js/app.js
window.initializeBootstrapCollapse = () => {
    // 現在のページ上の全てのアコーディオン要素を取得し、BootstrapのCollapseインスタンスを作成
    // Bootstrap 5はdata-bs-toggle属性を持つ要素を自動初期化するため、
    // 通常このコードは不要ですが、Blazorの動的なDOM変更に対応するため試します。
    var collapseElements = document.querySelectorAll('.accordion-collapse');
    collapseElements.forEach(function (collapseEl) {
        // 既にBootstrapのCollapseインスタンスがある場合は再初期化しない
        if (bootstrap.Collapse.getInstance(collapseEl) === null) {
            new bootstrap.Collapse(collapseEl, {
                toggle: false // 自動で開かないように設定
            });
        }
    });
    console.log("Bootstrap collapse elements re-initialized.");
};