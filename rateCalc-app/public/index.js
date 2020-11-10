
// ハンバーガーメニュー
document.getElementById("hamburger").onclick = function() {
    let hamburger = document.getElementById('hamburger');
    let menu = document.getElementById('globalMenuSp');
    hamburger.classList.toggle('active');
    if(hamburger.classList.contains('active')){
        menu.classList.add("active");
    }else {
        menu.classList.remove("active");
    }
};