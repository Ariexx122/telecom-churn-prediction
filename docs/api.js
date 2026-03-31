async function predict() {
  document.getElementById("prediction").innerText =
    "🔄 Waking up server... please wait.";
  document.getElementById("prediction").style.color = "gray";
  document.getElementById("churn_probability").innerText = "";
  document.getElementById("probability_text").innerText = "";
  document.getElementById("prob-bar").style.width = "0%";
  const data = {
    type: document.getElementById("type").value,
    monthly_charges: parseFloat(
      document.getElementById("monthly_charges").value,
    ),
    internet_service: document.getElementById("internet_service").value,
    paperless_billing: document.getElementById("paperless_billing").value,
    payment_method: document.getElementById("payment_method").value,
    online_security: document.getElementById("online_security").value,
    online_backup: document.getElementById("online_backup").value,
    device_protection: document.getElementById("device_protection").value,
    tech_support: document.getElementById("tech_support").value,
    streaming_tv: document.getElementById("streaming_tv").value,
    streaming_movies: document.getElementById("streaming_movies").value,
    gender: document.getElementById("gender").value,
    senior_citizen:
      document.getElementById("senior_citizen").value === "Yes" ? "1" : "0",
    partner: document.getElementById("partner").value,
    dependents: document.getElementById("dependents").value,
    multiple_lines: document.getElementById("multiple_lines").value,
    monthly_contract:
      document.getElementById("monthly_contract").value === "Yes" ? "1" : "0",
    num_services: document.getElementById("num_services").value,
    start_month: document.getElementById("start_month").value,
    start_year: document.getElementById("start_year").value,
    tenure_days: parseInt(document.getElementById("tenure_days").value),
  };

  const response = await fetch(
    "https://telecom-churn-prediction-5ue1.onrender.com/predict-churn/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );

  const result = await response.json();

  const predictionText =
    result.churn_prediction === 1
      ? "⚠️ Customer likely to churn"
      : "✅ Customer likely to stay";

  const prob = result.churn_probability;
  const probPercent = (result.churn_probability * 100).toFixed(2);
  const bar = document.getElementById("prob-bar");

  bar.style.width = probPercent + "%";

  if (prob < 0.3) {
    bar.style.background = "green";
  } else if (prob < 0.7) {
    bar.style.background = "orange";
  } else {
    bar.style.background = "red";
  }

  document.getElementById("prediction").innerText = predictionText;

  document.getElementById("prediction").style.color =
    result.churn_prediction === 1 ? "red" : "green";

  document.getElementById("churn_probability").innerText =
    "Churn Probability: " + (result.churn_probability * 100).toFixed(2) + "%";

  let message = "";

  if (prob < 0.488) {
    message = "Low risk customer 🟢";
  } else if (prob < 0.7) {
    message = "Moderate risk ⚠️";
  } else {
    message = "High risk customer 🚨";
  }

  document.getElementById("probability_text").innerText = `${message}`;
}
