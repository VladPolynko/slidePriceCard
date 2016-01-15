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

  function appendFilterBar() {

    for (var lable in name_bar_data) {
      countries_label.push(lable);
    }
    console.log(countries_label);

    $('#filter-bar').html('');

    $('#filter-bar').append("<div class='filter' data-filter='all'>Все</div>");

    for (var i=0; i < countries_label.length; i++) {
      console.log(name_bar_data[countries_label[i]]);
      console.log(name_bar_data[countries_label[i]]['countries']);

      $('#filter-bar').append("<div class='filter' data-filter='" + name_bar_data[countries_label[i]]['countries'] + "'>" + name_bar_data[countries_label[i]]['title'] + "</div>")

    }
  }

  function parse() {

  }

});

