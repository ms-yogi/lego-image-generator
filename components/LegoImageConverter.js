import { CancelCircleIcon } from "hugeicons-react";
import React, { useState, useRef, useEffect } from "react";
import Logo from "./Logo";
import UpvoteModal from "./UpvoteModal";
import { trackEvent } from "@/utils/analytics";
import { BnWSlider, BrickCountSlider, DownloadBtn } from "./LegoUI";

const LegoImageConverter = ({ setIsImageSet }) => {
  const [originalImage, setOriginalImage] = useState(null);
  const [legoImage, setLegoImage] = useState(null);
  const [legoBlockSize, setLegoBlockSize] = useState(20);
  const [bwLevel, setBwLevel] = useState(0); // 0 is full color, 100 is full black and white
  const [showModal, setShowModal] = useState(false);

  const canvasRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      setOriginalImage(event.target.result);
    };
    reader.readAsDataURL(file);
    trackEvent("image_upload", {
      event_category: "User Interaction",
      event_label: "Image Upload to try",
      value: 1,
    });
  };

  const convertToLego = (img, blockSize, bwLevel) => {
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

    // LegoPix the image
    const studSize = blockSize * 0.4; // Size of the stud
    const borderSize = 1; // Size of the border
    for (let y = 0; y < canvas.height; y += blockSize) {
      for (let x = 0; x < canvas.width; x += blockSize) {
        const i = (y * canvas.width + x) * 4;
        let r = data[i];
        let g = data[i + 1];
        let b = data[i + 2];

        if (bwLevel > 0) {
          // Apply black and white effect
          const gray = (r + g + b) / 3;
          r = Math.round(r * (1 - bwLevel / 100) + gray * (bwLevel / 100));
          g = Math.round(g * (1 - bwLevel / 100) + gray * (bwLevel / 100));
          b = Math.round(b * (1 - bwLevel / 100) + gray * (bwLevel / 100));
        }

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

    // Configure the watermark
    ctx.font = "bold 16px Arial";
    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    ctx.strokeStyle = "rgba(0, 0, 0, 0.5)";
    ctx.lineWidth = 2;
    ctx.textBaseline = "bottom";
    ctx.textAlign = "right";

    // Add the watermark text
    const padding = 10;
    const text = "Made with - legopix.vercel.app";
    const textWidth = ctx.measureText(text).width;

    ctx.strokeText(text, canvas.width - padding, canvas.height - padding);
    ctx.fillText(text, canvas.width - padding, canvas.height - padding);

    // Add a semi-transparent rectangle behind the text for better visibility
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    ctx.fillRect(
      canvas.width - textWidth - padding * 2,
      canvas.height - 25 - padding,
      textWidth + padding * 2,
      25 + padding
    );

    // Re-add the text on top of the rectangle
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    ctx.fillText(text, canvas.width - padding, canvas.height - padding);

    // Save Lego image
    setLegoImage(canvas.toDataURL());
    setIsImageSet(true);
  };

  const handleDownload = () => {
    if (legoImage) {
      const link = document.createElement("a");
      link.href = legoImage;
      link.download = "legofied_image.png";
      link.click();
      trackEvent("image_download", {
        event_category: "User Interaction",
        event_label: "Downloaded lego image",
        value: 1,
      });
      setShowModal(true);
    }
  };

  useEffect(() => {
    if (originalImage && canvasRef.current) {
      const img = new Image();
      img.onload = () => convertToLego(img, legoBlockSize, bwLevel);
      img.src = originalImage;
    }
  }, [originalImage, legoBlockSize, bwLevel]);

  if (!originalImage) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <div className="p-10 flex flex-col justify-center items-center grow-0 max-w-lg mx-auto rounded-lg bg-gray-950">
          <Logo />

          <p className="text-center mt-6 mb-10 text-white">
            LegoPix is a fun project that lets you transform your favorite
            images into Lego-style artwork! Whether it's a selfie, a landscape,
            or your pet, LegoPix turns any image into Lego bricks (colorful or
            black and white, it's upto you to decide). It's a creative way to
            share your love for both art and Lego with the world!
          </p>

          <label className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded self-center">
            <span>Choose an Image</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex">
      <div className="w-[300px] h-screen hidden md:flex flex-col justify-between backdrop-blur-sm ">
        <div className="p-4">
          {originalImage ? (
            <div className="mb-4 md:mb-0">
              <div className="flex justify-between items-center mb-2 text-white">
                <h2 className="text-lg font-bold">Original Image</h2>
                <button
                  onClick={() => {
                    setLegoImage(null);
                    setOriginalImage(null);
                  }}
                >
                  <CancelCircleIcon />
                </button>
              </div>
              <img src={originalImage} alt="Original" className="" />

              <div className="mt-10">
                <BrickCountSlider
                  legoBlockSize={legoBlockSize}
                  setLegoBlockSize={setLegoBlockSize}
                />
              </div>

              <div className="mt-10">
                <BnWSlider bwLevel={bwLevel} setBwLevel={setBwLevel} />
              </div>

              <DownloadBtn handleDownload={handleDownload} />
            </div>
          ) : null}
        </div>
      </div>

      <div className="w-full">
        {legoImage ? (
          <div>
            <Logo />

            <div className="flex flex-col justify-center items-center w-full md:h-[calc(100vh-112px)] h-full mt-4 md:mt-0">
              <img src={legoImage} alt="Lego" className=" max-h-[80vh]" />

              <div className="flex flex-col md:hidden">
                <div className="flex mt-10 gap-6">
                  <BrickCountSlider
                    legoBlockSize={legoBlockSize}
                    setLegoBlockSize={setLegoBlockSize}
                  />
                  <BnWSlider bwLevel={bwLevel} setBwLevel={setBwLevel} />
                </div>
                <DownloadBtn handleDownload={handleDownload} />
              </div>
            </div>
          </div>
        ) : null}

        <canvas ref={canvasRef} style={{ display: "none" }} />
      </div>

      <UpvoteModal
        isOpen={showModal}
        onClose={() => {
          trackEvent("closed_modal", {
            event_category: "User Interaction",
            event_label: "Closed modal",
            value: 1,
          });
          setShowModal(false);
        }}
      />
    </div>
  );
};

export default LegoImageConverter;
