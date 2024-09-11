(function () {
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


}).call(this);


// debounce so filtering doesn't happen every millisecond
function debounce(fn, threshold) {
  var timeout;
  return function debounced() {
    if (timeout) {
      clearTimeout(timeout);
    }
    function delayed() {
      fn();
      timeout = null;
    }
    timeout = setTimeout(delayed, threshold || 100);
  }
}

/*
$(window).bind("load", function () {
  $('#all').click();
});
*/


//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiPGFub255bW91cz4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFBQSxDQUFBLENBQUUsZUFBRixDQUFrQixDQUFDLGFBQW5CLENBQ0U7SUFBQSxJQUFBLEVBQU0sT0FBTjtJQUNBLG1CQUFBLEVBQXFCLElBRHJCO0lBRUEsY0FBQSxFQUFnQixLQUZoQjtJQUdBLFNBQUEsRUFBVyw4QkFIWDtJQUlBLEtBQUEsRUFDRTtNQUFBLFdBQUEsRUFBYSxJQUFiO01BQ0EsUUFBQSxFQUFVLFFBQUEsQ0FBQyxJQUFELENBQUE7ZUFDUixJQUFJLENBQUMsRUFBRSxDQUFDLElBQVIsQ0FBYSxZQUFiLENBQTBCLENBQUMsSUFBM0IsQ0FBQSxDQUFBLElBQXFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBUixDQUFhLE9BQWI7TUFEN0I7SUFEVixDQUxGO0lBUUEsSUFBQSxFQUNFO01BQUEsT0FBQSxFQUFTO0lBQVQsQ0FURjs7SUFXQSxPQUFBLEVBQ0U7TUFBQSxPQUFBLEVBQVMsSUFBVDtNQUNBLGtCQUFBLEVBQW9CLEtBRHBCO01BRUEsUUFBQSxFQUFVO0lBRlYsQ0FaRjtJQWVBLFNBQUEsRUFBVyxRQUFBLENBQUEsQ0FBQTthQUNULENBQUEsQ0FBRSxNQUFGLENBQVMsQ0FBQyxLQUFWLENBQUEsQ0FBQSxHQUFvQjtJQURYO0VBZlgsQ0FERjtBQUFBIiwic291cmNlc0NvbnRlbnQiOlsiJCgnLmdhbGxlcnktbGluaycpLm1hZ25pZmljUG9wdXBcbiAgdHlwZTogJ2ltYWdlJ1xuICBjbG9zZU9uQ29udGVudENsaWNrOiB0cnVlXG4gIGNsb3NlQnRuSW5zaWRlOiBmYWxzZVxuICBtYWluQ2xhc3M6ICdtZnAtd2l0aC16b29tIG1mcC1pbWctbW9iaWxlJ1xuICBpbWFnZTogXG4gICAgdmVydGljYWxGaXQ6IHRydWVcbiAgICB0aXRsZVNyYzogKGl0ZW0pIC0+XG4gICAgICBpdGVtLmVsLmZpbmQoJ2ZpZ2NhcHRpb24nKS50ZXh0KCkgfHwgaXRlbS5lbC5hdHRyKCd0aXRsZScpXG4gIHpvb206XG4gICAgZW5hYmxlZDogdHJ1ZVxuICAgICMgZHVyYXRpb246IDMwMFxuICBnYWxsZXJ5OlxuICAgIGVuYWJsZWQ6IHRydWVcbiAgICBuYXZpZ2F0ZUJ5SW1nQ2xpY2s6IGZhbHNlXG4gICAgdENvdW50ZXI6ICcnXG4gIGRpc2FibGVPbjogLT5cbiAgICAkKHdpbmRvdykud2lkdGgoKSA+IDY0MCAiXX0=
//# sourceURL=coffeescript




