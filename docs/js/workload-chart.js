// "Workload up, resources down": the chart from HERD Explorer's Trends page
// (https://nate-layman.github.io/herd-explorer/), drawn from data/workload-vs-recovery.json
// with a local copy of Plotly so the slide works without a network.
// Plotly cannot size a chart on a hidden slide, so it draws the first time the slide shows.

const BLUE = '#2a78d6';
const ORANGE = '#eb6834';

function loadPlotly() {
  if (window.Plotly) return Promise.resolve(window.Plotly);
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = 'js/vendor/plotly-basic-4.1.2.min.js';
    s.onload = () => resolve(window.Plotly);
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

async function draw(el) {
  const [Plotly, data] = await Promise.all([loadPlotly(), fetch('data/workload-vs-recovery.json').then(r => r.json())]);
  const font = { family: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif', color: '#191919', size: 12 };
  Plotly.newPlot(el, [
    { x: data.year, y: data.requirements, name: 'Federal research requirements, cumulative since 1991',
      type: 'scatter', mode: 'lines+markers', line: { color: BLUE, width: 3 }, marker: { size: 6 },
      hovertemplate: '%{x}: %{y} requirements<extra></extra>' },
    { x: data.year, y: data.recovered_cents_per_direct_dollar, yaxis: 'y2',
      name: 'Indirect costs recovered per $1 of direct costs',
      type: 'scatter', mode: 'lines+markers', line: { color: ORANGE, width: 3 }, marker: { size: 6 },
      hovertemplate: '%{x}: %{y:.1f}¢ per dollar<extra></extra>' },
  ], {
    width: el.clientWidth || 580, height: el.clientHeight || 330, autosize: false, font,
    paper_bgcolor: 'rgba(0,0,0,0)', plot_bgcolor: 'rgba(0,0,0,0)',
    margin: { l: 48, r: 48, t: 8, b: 64 },
    hovermode: 'x unified', showlegend: true,
    legend: { orientation: 'h', x: 0, y: -0.2, font: { size: 11 } },
    xaxis: { dtick: 2, showgrid: false, linecolor: '#bbb', ticks: 'outside' },
    yaxis: { title: { text: 'Requirements', font: { color: BLUE } }, range: [0, 300], dtick: 50, gridcolor: '#ececec', zeroline: false },
    yaxis2: { title: { text: 'Recovered per $1', font: { color: ORANGE } }, overlaying: 'y', side: 'right',
              range: [19, 24], dtick: 1, ticksuffix: '¢', showgrid: false, zeroline: false },
  }, { displayModeBar: false, responsive: false });
}

export function drawWorkloadChart(el) {
  if (!el) return;
  let started = false;
  const io = new IntersectionObserver(entries => {
    if (started || !entries.some(e => e.isIntersecting)) return;
    started = true;
    io.disconnect();
    draw(el).catch(err => { el.innerHTML = `<p style="font-size:0.6rem;color:#8a1f1f">Chart could not load: ${err.message}</p>`; });
  });
  io.observe(el);
}
