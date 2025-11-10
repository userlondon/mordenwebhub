'use strict';

const ctx = document.getElementById('cryptoChart').getContext('2d');
let cryptoChart;
let currentCoin = 'bitcoin';

async function fetchCoinData(coin, days = 7) {
  const url = `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=${days}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('CoinGecko error');
  return res.json();
}

function toChartData(raw) {
  return {
    labels: raw.prices.map(p => new Date(p[0]).toLocaleString()),
    data: raw.prices.map(p => p[1]),
  };
}

async function initCryptoChart(coin = 'bitcoin') {
  const raw = await fetchCoinData(coin);
  const { labels, data } = toChartData(raw);

  if (cryptoChart) cryptoChart.destroy();

  cryptoChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: `${coin.toUpperCase()} / USD`,
          data,
          borderColor: '#ffc507',
          backgroundColor: 'rgba(255,197,7,0.08)',
          fill: true,
          tension: 0.2,
          pointRadius: 0,
        },
      ],
    },
    options: {
      animation: false,
      plugins: { legend: { display: false } },
      scales: {
        x: {
          ticks: { color: '#98a6bf', maxTicksLimit: 6 },
          grid: { color: 'rgba(255,255,255,0.05)' },
        },
        y: {
          ticks: { color: '#98a6bf' },
          grid: { color: 'rgba(255,255,255,0.05)' },
        },
      },
    },
  });
}

// auto refresh
setInterval(() => initCryptoChart(currentCoin), 20000);

// button switch
document.querySelectorAll('.crypto_btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document
      .querySelectorAll('.crypto_btn')
      .forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentCoin = btn.dataset.coin;
    initCryptoChart(currentCoin);
  });
});

initCryptoChart();

// Btc tracker
const priceEl = document.getElementById('btcPrice');
const changeEl = document.getElementById('btcChange');
let lastPrice = null;

async function updateTicker() {
  try {
    const res = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true'
    );
    const data = await res.json();
    const price = data.bitcoin.usd;
    const change = data.bitcoin.usd_24h_change.toFixed(2);

    // Format price nicely
    priceEl.textContent = `$${price.toLocaleString()}`;
    changeEl.textContent = `${change > 0 ? '+' : ''}${change}%`;

    // Color logic
    if (lastPrice !== null) {
      if (price > lastPrice) {
        priceEl.style.color = '#00ff88';
      } else if (price < lastPrice) {
        priceEl.style.color = '#ff4d4d';
      } else {
        priceEl.style.color = '#ffc507';
      }
    }

    // Change color for percentage
    changeEl.style.color = change > 0 ? '#00ff88' : '#ff4d4d';

    lastPrice = price;
  } catch (err) {
    console.warn('Ticker update failed:', err);
  }
}

// Update every 10 seconds
updateTicker();
setInterval(updateTicker, 10000);
