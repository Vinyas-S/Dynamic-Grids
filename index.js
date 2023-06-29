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

    
    gridsContainer.append(grid);
  });
}
