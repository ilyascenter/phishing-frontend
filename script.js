async function checkURL() {
    const url = document.getElementById("urlInput").value.trim();
    const resultEl = document.getElementById("result");
    const descEl = document.getElementById("description");
    const riskEl = document.getElementById("risk");

    if (!url) {
        resultEl.innerText = "⚠️ URL tidak boleh kosong";
        return;
    }

    resultEl.innerText = "🔍 Checking...";
    descEl.innerText = "";
    riskEl.innerText = "";

    try {
        const res = await fetch("/api/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ url })
        });

        const data = await res.json();

        const prediction = data.prediction;
        const confidence = data.confidence;

        resultEl.innerText = `Result: ${prediction} (${confidence}%)`;

        // 🔴 PHISHING
        if (prediction === "Phishing") {
            resultEl.style.color = "red";

            descEl.innerText =
                "⚠️ URL ini terindikasi berbahaya. Disarankan untuk tidak mengakses atau memasukkan data pribadi.";

            if (confidence > 80) {
                riskEl.innerText = "Risk Level: HIGH";
            } else if (confidence > 60) {
                riskEl.innerText = "Risk Level: MEDIUM";
            } else {
                riskEl.innerText = "Risk Level: LOW";
            }

        } 
        // 🟢 LEGIT
        else {
            resultEl.style.color = "green";

            descEl.innerText =
                "✅ URL ini terlihat aman berdasarkan analisis. Namun tetap berhati-hati saat memasukkan data.";

            riskEl.innerText = "Risk Level: LOW";
        }

    } catch (err) {
        resultEl.innerText = "❌ Tidak bisa menghubungi server";
    }
}