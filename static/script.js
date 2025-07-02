
let allData = {};
let storedAPIKey = "";

async function fetchData() {
  const res = await fetch("/data/fake_data.json");
  allData = await res.json();
}
fetchData();

function saveApiKey() {
  storedAPIKey = document.getElementById("vtApiKey").value;
  alert("✅ API Key saved. Now perform a search.");
}

function suggestNumbers() {
  const input = document.getElementById("numberInput").value;
  const suggestionBox = document.getElementById("suggestions");
  const suggestions = Object.keys(allData).filter(num => num.startsWith(input));
  suggestionBox.innerHTML = suggestions.map(num => `<div onclick="useNumber('${num}')">${num}</div>`).join("");
}

function useNumber(num) {
  document.getElementById("numberInput").value = num;
  document.getElementById("suggestions").innerHTML = "";
}

function lookupNumber() {
  const number = document.getElementById("numberInput").value.trim();
  const info = allData[number];
  const out = document.getElementById("report-output");
  const face = document.getElementById("face-sim");
  const geo = document.getElementById("geoip");

  if (!info) {
    out.innerHTML = `<p>No intelligence found on ${number}</p>`;
    document.getElementById("dashboard").style.display = "block";
    return;
  }

  let report = `
    <h4>Basic Info</h4>
    <p><b>Name:</b> ${info.name}</p>
    <p><b>Location:</b> ${info.location}</p>
    <p><b>Carrier:</b> ${info.carrier}</p>
    <p><b>Status:</b> ${info.report_status}</p>
    <p><b>Telegram:</b> ${info.telegram}</p>
    <h4>📞 Call Logs</h4><ul>
    ` + info.call_logs.map(log => `<li>${log.timestamp} - ${log.type} - ${log.duration} (${log.contact})</li>`).join("") + "</ul>";

  out.innerHTML = report;

  face.innerHTML = `
    <h4>🧬 SIM & Face</h4>
    <p><b>Match:</b> ${info.face_match}</p>
    <p><b>IMEI:</b> ${info.imei}</p>
    <p><b>SIM Activation:</b> ${info.sim_activation}</p>
  `;

  geo.innerHTML = `
    <h4>🌍 Geo-IP</h4>
    <p>Simulated Geo Trace from ${info.location}</p>
  `;

  document.getElementById("dashboard").style.display = "block";
}

function downloadPDF() {
  alert("PDF generation placeholder.");
}
