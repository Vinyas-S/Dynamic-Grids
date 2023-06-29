$(document).ready(function () {
  $.ajax({
    url: "data.json",
    dataType: "json",
    success: function (data) {
      renderGrids(data);
    },
    error: function (error) {
      console.log(error);
    },
  });
});

function renderGrids(data) {
  var gridsContainer = $("#grids-container");
  gridsContainer.empty();

  $.each(data, function (index, machine) {
    var grid = $("<div>", {
      class: "grid col-lg-3 col-md-6 col-sm-12",
    });

    var gridBody = $('<div>', {
      class: 'grid-body'
    });

    var metricsList = $('<ul>', {
      class: 'list-group list-group-flush'
    });

    $.each(machine.metrics, function(index, metric) {
      var metricItem = $('<li>', {
        class: 'list-group-item',
        text: metric.name + ': ' + metric.value
      });

      metricsList.append(metricItem);
    });

    gridBody.append(metricsList);
    grid.append(stateIndicator, gridBody);

    gridsContainer.append(grid);
  });
}
