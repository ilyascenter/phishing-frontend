async function checkURL() {
    const inputEl = document.getElementById("urlInput");
    const resultEl = document.getElementById("result");

    const url = inputEl.value.trim();

    // VALIDASI INPUT
    if (!url) {
        resultEl.innerText = "⚠️ URL tidak boleh kosong";
        resultEl.style.color = "orange";
        return;
    }

    // VALIDASI FORMAT SEDERHANA
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
        resultEl.innerText = "⚠️ URL harus diawali http:// atau https://";
        resultEl.style.color = "orange";
        return;
    }

    // LOADING STATE
    resultEl.innerText = "🔍 Checking...";
    resultEl.style.color = "black";

    try {
        const response = await fetch("/api/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ url: url })
        });

        // HANDLE HTTP ERROR
        if (!response.ok) {
            throw new Error("Server error");
        }

        const data = await response.json();

        // HANDLE RESPONSE ERROR DARI BACKEND
        if (data.error) {
            resultEl.innerText = "❌ Error: " + data.error;
            resultEl.style.color = "red";
            return;
        }

        // TAMPILKAN HASIL
        const prediction = data.prediction;
        const confidence = data.confidence;

        resultEl.innerText =
            `Result: ${prediction} (${confidence}%)`;

        // WARNA BERDASARKAN HASIL
        if (prediction === "Phishing") {
            resultEl.style.color = "red";
        } else {
            resultEl.style.color = "green";
        }

    } catch (error) {
        console.error(error);

        resultEl.innerText = "❌ Tidak bisa menghubungi server";
        resultEl.style.color = "red";
    }
}