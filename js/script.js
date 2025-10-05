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

        var $form = $(this);
        var $message = $('.form-message');
        var name = $form.find('input[name="name"]').val().trim();
        var email = $form.find('input[name="email"]').val().trim();
        var msg = $form.find('textarea[name="message"]').val().trim();
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        var errors = [];

        if (name.length < 2) {
            errors.push('Имя должно содержать минимум 2 символа.');
        }
        if (!emailPattern.test(email)) {
            errors.push('Введите корректный email.');
        }
        if (msg.length < 5) {
            errors.push('Сообщение должно содержать минимум 5 символов.');
        }

        if (errors.length > 0) {
            $message.html('<div class="error">' + errors.join('<br>') + '</div>');
            return;
        }

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

    // Загрузка данных портфолио из JSON-файла
    var jsonPath = 'data/portfolio.json';
    // Загрузка JSON
    $.getJSON(jsonPath)
        .done(function(data) {
            renderPortfolio(data.projects);
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            console.error('Ошибка загрузки JSON:', textStatus, errorThrown);
            $('.portfolio-container').html('<p class="error">Не удалось загрузить данные портфолио.</p>');
        });

    // Функция для отрисовки карточек портфолио
    function renderPortfolio(projects) {
        const portfolioContainer = $('.portfolio-container');
        portfolioContainer.empty();

        $.each(projects, function(index, project) {
            // Создаем карточку проекта
            const projectCard = $('<div>').addClass('portfolio-card');
            const projectInfo = $('<div>').addClass('portfolio-info');
            projectInfo.append($('<h3>').text(project.title));
            projectInfo.append($('<p>').text(project.description));
            projectInfo.append($('<p>').html('<strong>Технологии:</strong> ' + project.technologies));
            projectInfo.append($('<p>').html('<strong>Результат:</strong> ' + project.result));
            projectInfo.append(
                $('<a>')
                    .attr('href', project.link)
                    .attr('target', '_blank')
                    .addClass('portfolio-link')
                    .text('Посмотреть на GitHub')
            );

            projectCard.append(projectInfo);
            portfolioContainer.append(projectCard);
        });
    }

    //Карусель навыков
    $(".owl-carousel").owlCarousel({
        loop: true,
        margin: 20,
        nav: true,
        dots: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 3
            }
        },
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,

        navText: [
            "<img src='img/left-arrow.png' alt='Previous'>",
            "<img src='img/right-arrow.png' alt='Next'>"
        ]
    });

    //Кнопка «Вверх» — плавный скролл к началу страницы
    let backToTop = $("#backToTop");

    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            backToTop.fadeIn();
        } else {
            backToTop.fadeOut();
        }
    });

    backToTop.click(function() {
        $("html, body").animate({ scrollTop: 0 }, 300);
        return false;
    });

    // Подсветка активного пункта меню при скролле
    const sections = ['about', 'skills', 'portfolio', 'contacts'];
    const navLinks = $('.nav-list li a');
    $(window).on('scroll', function() {
        let scrollPos = $(document).scrollTop() + 100;
        let found = false;
        for (let i = 0; i < sections.length; i++) {
            let section = $('#' + sections[i]);
            if (section.length && section.offset().top <= scrollPos) {
                navLinks.removeClass('active');
                navLinks.filter('[href="#' + sections[i] + '"]').addClass('active');
                found = true;
            }
        }
        if (!found) navLinks.removeClass('active');
    });

});

document.querySelector('[data-switch-dark]').addEventListener('click', function() {
    document.body.classList.toggle('dark');
});