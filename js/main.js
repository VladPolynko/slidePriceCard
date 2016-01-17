jQuery(function ($) {
  var name_bar_data;
  var countries_label = [];

  $(document).ready(function () {
    include();
  });

  function include() {
    $.getJSON('include/name.json', function (data) {
      name_bar_data = data;
      appendFilterBar();
    });
  }

  function parsPriceCard(nameFilter) {
    console.log(name_bar_data[nameFilter]['url']);
    var jsonUrl = name_bar_data[nameFilter]['url'];

    $.getJSON(jsonUrl, function (data) {
      console.log(data);
      appendPriceCard(data);
    });
  }

  $(document).on('click', '#filter-bar div', function (e) {
    var data_filter = $(this).data("filter");
    $("#loadPriseCardZone").html("");
    var index_arr = countries_label.indexOf(data_filter);
    console.log(index_arr);

    if (index_arr == -1) {
      appendPriceCardAll();
      console.log('all');
    } else if (index_arr != -1) {
      parsPriceCard(data_filter);
    }

  });

  function appendFilterBar() {

    for (var lable in name_bar_data) {
      countries_label.push(lable);
    }
    console.log(countries_label);

    $('#filter-bar').html('');

    $('#filter-bar').append("<div class='filter' data-filter='all'>Все</div>");

    for (var i = 0; i < countries_label.length; i++) {
      console.log(name_bar_data[countries_label[i]]);
      console.log(name_bar_data[countries_label[i]]['countries']);
      $('#filter-bar').append(
          "<div class='filter' data-filter='" + name_bar_data[countries_label[i]]['countries'] + "'>" + name_bar_data[countries_label[i]]['title'] + "</div>")

    }
  }

  function appendPriceCard(object) {
    for (var i = 0; i < object.length; i++) {
      $("#loadPriseCardZone").append(" <div class='price-card'>" +
          "<div class='top-panel'>" +
          "<div class='text-part'>" +
          "<p class='type-1'>" +
          "<span>Національна</span>" +
          "</p>" +
          "<p class='days'>" +
          object[i]['durations'] +
          "</p>" +
          "</div>" +
          "<div class='price'>" +
          "" + object[i]['price'] + "" +
          "</div>" +
          "</div>" +
          " <div class='card-body'>" +
          "<p>" + object[i]['proviso'][0] + "</p>" +
          "<p>" + object[i]['proviso'][1] + "</p>" +
          "<p>" + object[i]['proviso'][2] + "</p>" +
          "<p>" + object[i]['proviso'][3] + "</p>" +
          "<p>" + object[i]['proviso'][4] + "</p>" +
          "<div class='url-holder'>" +
          "<a href='#' class='type-2'>" +
          "Дізнатись детальніше" +
          "</a>" +
          "</div>" +
          "</div>" +
          "</div>")
    }
  }

  function appendPriceCardAll() {
    var urlAll = [];
    console.log(name_bar_data);
    $.each(name_bar_data, function (key) {
      urlAll.push(name_bar_data[key]['url']);

    });
    console.log(urlAll);
    for (var i = 0; i < urlAll.length; i++) {
      $.getJSON(urlAll[i], function (data) {
        console.log(data);
        appendPriceCard(data);
      });
    }
  }

});

