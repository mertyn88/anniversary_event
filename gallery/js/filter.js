export async function galleryPopup() {
    $('.gallery-link').magnificPopup({
        type: 'image',
        closeOnContentClick: true,
        closeBtnInside: false,
        mainClass: 'mfp-with-zoom mfp-img-mobile',
        image: {
            verticalFit: true,
            titleSrc: function (item) {
                return item.el.find('figcaption').text() || item.el.attr('title');
            }
        },
        zoom: {
            enabled: true
        },
        // duration: 300
        gallery: {
            enabled: true,
            navigateByImgClick: false,
            tCounter: ''
        },
        disableOn: function () {
            return $(window).width() > 640;
        }
    });


    

    var $grid = $('.grid').isotope({
        masonry: {
            columnWidth: '.gallery-link',
            horizontalOrder: true
        }
    });



    // filter buttons
    $('.filters-button-group').on('click', 'button', function () {
        var filterValue = $(this).attr('data-filter');
        $grid.isotope({ filter: filterValue });
    });


    $('.button-group').each(function (i, buttonGroup) {
        var $buttonGroup = $(buttonGroup);
        $buttonGroup.on('click', 'button', function () {
            $buttonGroup.find('.is-checked').removeClass('is-checked');
            $(this).addClass('is-checked');
        });
    });

    setTimeout(function () {
        $("#gallery-list").show();
        $('#all').trigger('click');
    }, 1000);
}