async function checkURL() {
    const url = document.getElementById("urlInput").value.trim();
    const resultEl = document.getElementById("result");
    const descEl = document.getElementById("description");
    const riskEl = document.getElementById("risk");

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

        resultEl.innerText = `${data.prediction} (${data.confidence}%)`;

        // COLOR
        if (data.prediction === "Phishing") {
            resultEl.style.color = "red";
        } else if (data.prediction === "Suspicious") {
            resultEl.style.color = "orange";
        } else {
            resultEl.style.color = "green";
        }

        // DESCRIPTION
        if (data.prediction === "Phishing") {
            descEl.innerText = "⚠️ URL ini berbahaya. Jangan masukkan data pribadi.";
        } else if (data.prediction === "Suspicious") {
            descEl.innerText = "⚠️ URL mencurigakan, harap berhati-hati.";
        } else {
            descEl.innerText = "✅ URL terlihat aman.";
        }

        // RISK LEVEL
        if (data.confidence > 70) {
            riskEl.innerText = "Risk: HIGH";
        } else if (data.confidence > 40) {
            riskEl.innerText = "Risk: MEDIUM";
        } else {
            riskEl.innerText = "Risk: LOW";
        }

        // REASONS
        if (data.reasons && data.reasons.length > 0) {
            descEl.innerText += "\n\nAlasan:\n- " + data.reasons.join("\n- ");
        }

    } catch (err) {
        resultEl.innerText = "❌ Error koneksi ke server";
    }
}