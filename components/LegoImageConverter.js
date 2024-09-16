import React, { useState, useRef, useEffect } from "react";

const LegoImageConverter = () => {
  const [originalImage, setOriginalImage] = useState(null);
  const [legoImage, setLegoImage] = useState(null);
  const canvasRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      setOriginalImage(event.target.result);
    };

    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (originalImage && canvasRef.current) {
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        // Set canvas size
        canvas.width = img.width;
        canvas.height = img.height;

        // Draw original image
        ctx.drawImage(img, 0, 0);

        // Get image data
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // Lego-ify the image
        const blockSize = 10; // Block size
        const studSize = blockSize * 0.4; // Size of the stud
        const borderSize = 1; // Size of the border
        for (let y = 0; y < canvas.height; y += blockSize) {
          for (let x = 0; x < canvas.width; x += blockSize) {
            const i = (y * canvas.width + x) * 4;
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];

            // Draw the main block
            ctx.fillStyle = `rgb(${r},${g},${b})`;
            ctx.fillRect(x, y, blockSize, blockSize);

            // Draw the border
            ctx.strokeStyle = `rgba(0,0,0,0.3)`;
            ctx.lineWidth = borderSize;
            ctx.strokeRect(x, y, blockSize, blockSize);

            // Draw the stud with enhanced 3D effect
            const centerX = x + blockSize / 2;
            const centerY = y + blockSize / 2;
            const gradient = ctx.createRadialGradient(
              centerX,
              centerY,
              0,
              centerX,
              centerY,
              studSize / 2
            );
            gradient.addColorStop(0, `rgba(${r + 30},${g + 30},${b + 30},0.8)`);
            gradient.addColorStop(1, `rgba(${r},${g},${b},0.8)`);

            // Drop shadow
            ctx.shadowColor = "rgba(0,0,0,0.3)";
            ctx.shadowBlur = 2;
            ctx.shadowOffsetX = 1;
            ctx.shadowOffsetY = 1;

            ctx.beginPath();
            ctx.arc(centerX, centerY, studSize / 2, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();

            // Reset shadow
            ctx.shadowColor = "transparent";
            ctx.shadowBlur = 0;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;

            // Shiny highlight
            ctx.beginPath();
            ctx.arc(
              centerX - studSize / 6,
              centerY - studSize / 6,
              studSize / 4,
              0,
              Math.PI * 2
            );
            ctx.fillStyle = "rgba(255,255,255,0.1)";
            ctx.fill();
          }
        }

        // Save Lego image
        setLegoImage(canvas.toDataURL());
      };
      img.src = originalImage;
    }
  }, [originalImage]);

  const handleDownload = () => {
    if (legoImage) {
      const link = document.createElement("a");
      link.href = legoImage;
      link.download = "lego_image.png";
      link.click();
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-center mb-4">
        {legoImage ? (
          <button
            className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              setLegoImage(null);
              setOriginalImage(null);
            }}
          >
            <span className="flex items-center">
              <img src="/images/lego-head.png" className="w-6 mr-1" /> Remove
              Image <img src="/images/lego-head.png" className="w-6 ml-1" />
            </span>
          </button>
        ) : (
          <label className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            <span className="flex items-center">
              <img src="/images/lego-head.png" className="w-6 mr-1" /> Choose an
              Image <img src="/images/lego-head.png" className="w-6 ml-1" />
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        )}
      </div>
      <div className="flex flex-col md:flex-row md:space-x-4">
        {originalImage && (
          <div className="mb-4 md:mb-0">
            <h2 className="text-lg font-bold mb-2">Original Image</h2>
            <img src={originalImage} alt="Original" className="max-w-xs" />
          </div>
        )}
        {legoImage && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-bold">Lego Image</h2>
              <button
                onClick={handleDownload}
                className="ml-4 px-2 text-white underline"
              >
                Download
              </button>
            </div>
            <img src={legoImage} alt="Lego" className="max-w-xs" />
          </div>
        )}
      </div>
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
};

export default LegoImageConverter;
