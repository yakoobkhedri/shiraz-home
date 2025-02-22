var portfolio = $('#portfolio-container').isotope({
    originLeft: false
});
$('#portfolio-filter > div').on('click', function () {
    $("#portfolio-filter > div").removeClass('active');
    $(this).addClass('active');
    portfolio.isotope({
        filter: $(this).data('filter')
    });
});