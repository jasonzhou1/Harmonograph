var n = 5000;
var x = [], y = [], z = [];
var dt = 0.015;
var graph = document.getElementById('graph');
var t = 0;

var pi = Math.PI;
var d1 = 0.0002, d2 = 0.0002, d3 = 0.0004;
var f1 = .04, f2 = .08, f3 = .08;
var p1 = 0, p2 = 0, p3 = 0;

var layout = {
  autosize: true,
  width: 1200,
  height: 800,
  xaxis: {
    range: [-2, 2],
    showgrid: false,
    zeroline: false,
    showline: false,
    showticklabels: false
  },
  yaxis: {
    range: [-2, 2],
    showgrid: false,
    zeroline: false,
    showline: false,
    showticklabels: false
  },
  colorway: [],
  hidesurface: true
};

var config = {
  toImageButtonOptions: {
    format: 'png', // one of png, svg, jpeg, webp
    filename: 'harmonograph_image',
    height: 2048,
    width: 2048,
    scale: 1 // Multiply title/legend/axis/canvas sizes by this factor
  }
};

function animatePlot() {
  Plotly.newPlot(graph, [{
    x: [],
    y: [],
    mode: 'lines',
    type: 'lines',
  }], layout);

  stuff = [];
  x = computex(n);
  y = computey(n);
  stuff = generate_data_objects();
  Plotly.addFrames(graph, stuff);

  Plotly.animate('graph', stuff, {
    frame: {
      duration: 1,
      redraw: false
    },
    transition: {
      duration: 1
    },
    mode: 'immediate'
  });
}

function drawAll() {
  setVars();
  x = computex(n);
  y = computey(n);
  stuff = [];

  Plotly.newPlot(graph, [{
    x: x,
    y: y,
    mode: 'lines',
    type: 'lines',
  }], layout, config);
}

function setVars() {
  d1 = document.getElementById("d1slider").value;
  d2 = document.getElementById("d2slider").value;
  d3 = document.getElementById("d3slider").value;

  f1 = document.getElementById("f1slider").value;
  f2 = document.getElementById("f2slider").value;
  f3 = document.getElementById("f3slider").value;

  // p1 = document.getElementById("p1slider").value;
  // p2 = document.getElementById("p2slider").value;
  // p3 = document.getElementById("p3slider").value;
}

function generate_data_objects() {
  temp = []
  for (i = 0; i < n; i++) {
    temp[i] = { data: [{ x: x.slice(0, i), y: y.slice(0, i) }] };
  }
  return temp;
}
function computex(t) {
  temp = [];

  for (i = 0; i < t; i++) {
    temp[i] = (Math.pow(Math.E, -d1 * i) * Math.sin(i * f1 + p1) + Math.pow(Math.E, -d2 * i) * Math.sin(i * f2 + p2));
  }
  return temp;
}

function computey(n) {
  temp = [];
  for (i = 0; i < n; i++) {
    temp[i] = Math.pow(Math.E, -d3 * i) * Math.sin(i * f3 + p3) * 2;
  }
  return temp;
}

function updateTraceColor() {
  layout["colorway"] = [document.getElementById('line_color_value').value];
  drawAll();
}

function updateBackgroundColor() {
  layout["plot_bgcolor"] = document.getElementById('background_color_value').value;
  drawAll();
}

function updatePaperColor() {
    layout["paper_bgcolor"] = document.getElementById('background_color_value').value;
}