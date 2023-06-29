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
      class: "card col-lg-4 col-md-6 col-sm-12",
    });

    var stateColor = getMachineStateColor(machine);
    var stateIndicator = $("<div>", {
      class: "state-indicator " + stateColor,
      text: machine.name,
    });

    var machineState = machine.STATUS;
    var stateText = $("<span>", {
      class: "state-text",
      text: machineState,
    });

    stateIndicator.text(machine.MACHINE).append(stateText);

    var gridBody = $("<div>", {
      class: "card-body",
    });

    var metricsList = $("<ul>", {
      class: "list-group list-group-flush",
    });

    $.each(machine, function (key, value) {
      if (key !== "MACHINE" && key !== "STATUS") {
        var metricItem = $("<li>", {
          class: "list-group-item",
          text: key + ": " + value,
        });

        metricsList.append(metricItem);
      }
    });

    gridBody.append(metricsList);
    grid.append(stateIndicator, gridBody);

    gridsContainer.append(grid);
  });
}

function getMachineStateColor(machine) {
  if (machine.STATUS === "RUNNING") {
    return "bg-success";
  } else if (machine.STATUS === "STOPPED") {
    return "bg-danger";
  } else {
    return "";
  }
}
