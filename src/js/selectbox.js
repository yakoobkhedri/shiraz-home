let openSelect = Array.from(document.getElementsByClassName('openSelect'));

openSelect.forEach((item)=>{
    item.addEventListener('click', function () {
        item.nextElementSibling.classList.toggle('active');
    })
})