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

    // Модальное окно
    $('.open-form-modal').click(function() {
        $('#formModal').fadeIn(300);
    });

    $('.modal-close, .modal').click(function(e) {
        if ($(e.target).hasClass('modal') || $(e.target).hasClass('modal-close')) {
            $('#formModal').fadeOut(300);
        }
    });

    // Форма обратной связи
    $('#contactForm').submit(function(e) {
        e.preventDefault();

        var formData = $(this).serialize();
        var $form = $(this);
        var $message = $('.form-message');

        // Показываем индикатор загрузки
        $message.html('<div class="loading">Отправка...</div>');
        $form.find('button').prop('disabled', true);

        // Симуляция AJAX запроса с задержкой
        setTimeout(function() {
            $message.html('<div class="success">Сообщение успешно отправлено!</div>');
            $form[0].reset();
            $form.find('button').prop('disabled', false);
        }, 2000);
    });

    // Закрытие модального окна по ESC
    $(document).keydown(function(e) {
        if (e.key === "Escape") {
            $('.modal').fadeOut(300);
        }
    });


});