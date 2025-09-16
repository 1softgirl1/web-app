$(document).ready(function() {
    // Навигационное меню
    $('.dropdown-toggle').click(function() {
        $('.nav-list').slideToggle(300);
    });

    $(document).click(function(e) {
        if (!$(e.target).closest('.dropdown').length) {
            $('.nav-list').slideUp(300);
        }
    });


});