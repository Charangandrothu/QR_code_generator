const imgBox = document.getElementById("imgBox");
const qrImage = document.getElementById("qrImage");
const qrText = document.getElementById("qrText");
const downloadBtn = document.getElementById("downloadBtn");

    function generateQR() {
      const text = qrText.value.trim();
      if (text === "") {
        alert("Please enter text or URL");
        imgBox.classList.remove("show-img");
        downloadBtn.style.display = "none";
        return;
      }

      const qrUrl = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + encodeURIComponent(text);
      qrImage.crossOrigin = "anonymous"; // IMPORTANT for canvas security
      qrImage.src = qrUrl;

      qrImage.onload = function () {
        imgBox.classList.add("show-img");
        downloadBtn.style.display = "block";
      };
    }

    function downloadQR() {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = qrImage.naturalWidth;
      canvas.height = qrImage.naturalHeight;

      ctx.drawImage(qrImage, 0, 0);

      const dataURL = canvas.toDataURL("image/png");

      const a = document.createElement("a");
      a.href = dataURL;
      a.download = "qr-code.png";
      a.click();
    }   