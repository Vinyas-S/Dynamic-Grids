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

    var machineState = getMachineState(machine);
    var stateText = $('<span>', {
        class: 'state-text',
        text: machineState
    });

    stateIndicator.append(stateText);

    var gridBody = $("<div>", {
      class: "card-body",
    });

    var metricsList = $("<ul>", {
      class: "list-group list-group-flush",
    });

    $.each(machine.metrics, function (index, metric) {
      var metricItem = $("<li>", {
        class: "list-group-item",
        text: metric.name + ": " + metric.value,
      });

      metricsList.append(metricItem);
    });

    gridBody.append(metricsList);
    grid.append(stateIndicator, gridBody);

    gridsContainer.append(grid);
  });
}

function getMachineStateColor(machine) {
  var stateColor = "";

  $.each(machine.metrics, function (index, metric) {
    if (metric.name === "Running Since") {
      stateColor = "bg-success";
      return false;
    } else if (metric.name === "Paused Since") {
      stateColor = "bg-secondary";
      return false;
    } else if (metric.name === "Stopped Since") {
      stateColor = "bg-danger";
      return false;
    }
  });

  return stateColor;
}

function getMachineState(machine) {
  var machineState = '';

  $.each(machine.metrics, function(index, metric) {
    if (metric.name === 'Running Since') {
      machineState = 'Running';
      return false; 
    } else if (metric.name === 'Paused Since') {
      machineState = 'Paused';
      return false;
    } else if (metric.name === 'Stopped Since') {
      machineState = 'Stopped';
      return false;
    }
  });

  return machineState;
}
