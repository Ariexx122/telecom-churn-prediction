# 📡 Telecom Churn Prediction Service

**Live Interface:**  
https://ariexx122.github.io/telecom-churn-prediction/

This project is a full-stack Machine Learning application designed to predict customer churn (abandono) in a telecommunications company. It features a **Logistic Regression** model served via a **FastAPI** backend and a responsive web frontend.

---

## 🚀 Project Overview

This project analyzes customer attributes such as contract type, monthly charges, and service usage to estimate the probability of churn.

A key focus of this project was ensuring **realistic and reliable performance**, achieved by:

- Applying **time-based validation** to simulate real-world predictions  
- Detecting and removing **data leakage** from time-derived features  
- Optimizing the classification threshold based on business impact  

Instead of relying on default settings, the model uses a custom probability threshold of **0.478**, prioritizing the detection of at-risk customers while minimizing missed churn cases.

---

## 🧠 Modeling Approach

Several models were evaluated, including Logistic Regression, Random Forest, LightGBM, and CatBoost.

Final selection:
- **Model:** Logistic Regression  
- **ROC AUC:** ~0.75  
- **F1 Score:** ~0.71  

Although more complex models were tested, Logistic Regression achieved the best balance of performance and interpretability.

### Key decisions:

- **Time-based split:** Prevents unrealistic evaluation caused by random shuffling  
- **Multicollinearity control:** Ensures stability in the linear model  
- **Threshold optimization:**  
  - Reduced false negatives (missed churn)  
  - Increased recall for at-risk customers  

This reflects a real-world scenario where **failing to detect a customer at risk is more costly than a false alarm**.

---

## 📈 Business Impact

This system can help a telecom company:

- Identify customers at high risk of churn  
- Prioritize retention strategies  
- Reduce revenue loss  

By adjusting the classification threshold, the model can be aligned with different business strategies (e.g., aggressive retention vs. cost control).

---

## 🛠️ Tech Stack

- **Modeling:** Python, Scikit-learn, Pandas  
- **API:** FastAPI, Uvicorn  
- **Frontend:** HTML5, CSS3, JavaScript  
- **Deployment:** Render (Backend) and GitHub Pages (Frontend)

---

## 📂 Repository Structure

- **`/api`** → FastAPI backend, trained model, and requirements  
- **`/docs`** → Frontend (HTML, CSS, JS) deployed with GitHub Pages  
- **`/notebook`** → EDA and model development  

---

## 🛠️ Features

- **Real-time prediction** via frontend → API communication  
- **Interactive UI** with dynamic risk indicators (Green / Orange / Red)  
- **Cold-start handling** for free-tier backend deployment  
- **Clear separation** between ML, API, and frontend layers  

---

## 💻 Local Setup

### 1. Clone the repository
```bash
git clone https://github.com/Ariexx122/telecom-churn-prediction.git
cd telecom-churn-prediction
```

---

## Install dependencies
```bash
pip install -r api/requirements.txt
```

## Run the API
```bash
uvicorn api.main:app --reload
```

---

## Open the interface

Open **`docs/index.html`** in your browser to start predicting.
