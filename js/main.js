jQuery(function ($) {
  var name_bar_data;
  var data_filter = "all";
  var cards = [];
  var showCountCards = 2;   //kol cards
  var currentPage = 0;      //some page
  var counters = [];        //


  $(document).ready(function () {
    include();
  });

  function include() {
    $.getJSON('include/include.json', function (data) {
      name_bar_data = data;
      appendFilterBar();
    });
  }

  function appendFilterBar() {
    for (var i = 0; i < name_bar_data.length; i++) {
      $('#filter-bar').append(
          "<div class='filter' data-filter='" + name_bar_data[i]['countries'] + "'>" + name_bar_data[i]['title'] + "</div>");
    }
    parseOnClickFilterBar();
  }

  function parseOnClickFilterBar() {
    cards = [];
    $("#loadPriseCardZone").html("");

    if (data_filter == "all") {
      cards = name_bar_data;
    } else {
      for (var i in name_bar_data) {
        if (name_bar_data[i]["countries"] == data_filter) {
          cards.push(name_bar_data[i]);
        }
      }
    }
    appendPriceCard(cards, showCountCards, currentPage);
  }

  function appendPriceCard(card, count, page) {

    var localObj = [];
    for (var i in card) {
      for (var j in card[i]["slides"]) {
        localObj.push(card[i]["slides"][j]);
      }
    }
    var counter;
    if ((count + page) > localObj.length) {
      counter = localObj.length;
    } else {
      counter = count + page;
    }
    for (var i = page; i < counter; i++) {
      $("#loadPriseCardZone").append(" <div class='price-card'>" +
          "<div class='top-panel'>" +
          "<div class='text-part'>" +
          "<p class='type-1'>" +
          "<span>Національна</span>" +
          "</p>" +
          "<p class='days'>" +
          localObj[i]['durations'] +
          "</p>" +
          "</div>" +
          "<div class='price'>" +
          "" + localObj[i]['price'] + "" +
          "</div>" +
          "</div>" +
          " <div class='card-body'>" +
          "<p>" + localObj[i]['proviso'][0] + "</p>" +
          "<p>" + localObj[i]['proviso'][1] + "</p>" +
          "<p>" + localObj[i]['proviso'][2] + "</p>" +
          "<p>" + localObj[i]['proviso'][3] + "</p>" +
          "<p>" + localObj[i]['proviso'][4] + "</p>" +
          "<div class='url-holder'>" +
          "<a href='#' class='type-2'>" +
          "Дізнатись детальніше" +
          "</a>" +
          "</div>" +
          "</div>" +
          "</div>")
    }
  }

  $("#wrapper_slider").on('click', '#filter-bar div', function () {
    currentPage = 0;
    data_filter = $(this).data("filter");
    $("#filter-bar div").removeClass('active-filter');
    $(this).addClass('active-filter');

    parseOnClickFilterBar();

  });
  function addParams() {
    counters = [];
    for (var i in cards) {
      for (var j in cards[i]["slides"]) {
        counters.push(cards[i]['slides'][j]);
      }
    }
  }

  function next_page() {
    ++currentPage;
    parseOnClickFilterBar();
  }

  function preff_page() {
    --currentPage;
    parseOnClickFilterBar();
  }

  $("#price_card_nav").on('click', '#btn_back', function () {
    addParams();
    console.log(currentPage);
    if (currentPage > 0) {
      preff_page();
      console.log('back');
    }

  });
  $("#price_card_nav").on('click', '#btn_next', function () {
    addParams();
    console.log(counters.length);
    if (currentPage < (counters.length - 2)) {
      next_page();
      console.log('next');
    }
  });

});

