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

    // Загрузка данных портфолио из JSON-файла
    // Пробуем разные пути, так как структура папок может отличаться
    var jsonPaths = [
        'portfolio.json',
        'data/portfolio.json',
        './portfolio.json',
        './data/portfolio.json'
    ];

    var jsonLoaded = false;

    // Пробуем загрузить JSON по разным путям
    function tryLoadJson(pathIndex) {
        if (pathIndex >= jsonPaths.length) {
            if (!jsonLoaded) {
                console.error('Не удалось загрузить portfolio.json ни по одному из путей');
                $('#portfolio-container').html('<p class="error">Не удалось загрузить данные портфолио.</p>');
            }
            return;
        }

        var currentPath = jsonPaths[pathIndex];

        $.getJSON(currentPath)
            .done(function(data) {
                jsonLoaded = true;
                renderPortfolio(data.projects);
            })
            .fail(function(jqXHR, textStatus, errorThrown) {
                console.error('Ошибка загрузки JSON по пути ' + currentPath + ':', textStatus, errorThrown);
                tryLoadJson(pathIndex + 1); // Пробуем следующий путь
            });
    }


    tryLoadJson(0);

    // Функция для отрисовки карточек портфолио
    function renderPortfolio(projects) {
        const portfolioContainer = $('.portfolio-container');
        portfolioContainer.empty(); // Очищаем контейнер

        $.each(projects, function(index, project) {
            // Создаем карточку проекта
            const projectCard = $('<div>').addClass('portfolio-card');

            const projectInfo = $('<div>').addClass('portfolio-info');

            // Добавляем заголовок
            projectInfo.append($('<h3>').text(project.title));

            // Добавляем описание
            projectInfo.append($('<p>').text(project.description));

            // Добавляем технологии
            projectInfo.append($('<p>').html('<strong>Технологии:</strong> ' + project.technologies));

            // Добавляем результат
            projectInfo.append($('<p>').html('<strong>Результат:</strong> ' + project.result));

            // Добавляем ссылку
            projectInfo.append(
                $('<a>')
                    .attr('href', project.link)
                    .attr('target', '_blank')
                    .addClass('portfolio-link')
                    .text('Посмотреть на GitHub')
            );

            // Собираем карточку
            projectCard.append(projectInfo);

            // Добавляем карточку в контейнер
            portfolioContainer.append(projectCard);
        });
    }

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
        autoplayHoverPause: true
    });




});