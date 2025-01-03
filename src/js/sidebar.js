// open Sidebar

let openSidebar = document.getElementById('openSidebar');
let closeSidebar = document.getElementById('closeSidebar');

openSidebar.addEventListener('click' , function () {
  document.getElementById('sidebar').classList.add('active');
});
closeSidebar.addEventListener('click' , function () {
  document.getElementById('sidebar').classList.remove('active');
})