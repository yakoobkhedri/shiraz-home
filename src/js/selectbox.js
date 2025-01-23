let openSelect = Array.from(document.getElementsByClassName('openSelect'));
let options = Array.from(document.querySelectorAll('.options > li'));

openSelect.forEach((item)=>{
    item.addEventListener('click', function () {
        item.nextElementSibling.classList.toggle('active');
    })
})
options.forEach((item)=>{
    item.addEventListener('click', function () {
        options.forEach((items)=>{items.classList.remove('active')});
        item.classList.add('active');
        item.parentElement.classList.remove('active');
        item.parentElement.previousElementSibling.querySelector('.optionSelected').textContent= item.textContent;
    })
})