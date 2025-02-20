let seeAll = Array.from(document.getElementsByClassName('seeAll'));

seeAll.forEach((item)=>{
    item.addEventListener('click', function () {
        item.previousElementSibling.classList.add('active');
        item.style.display= 'none';
    })
})