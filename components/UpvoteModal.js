import { trackEvent } from "@/utils/analytics";
import { CancelCircleIcon } from "hugeicons-react";
import React, { useState, useEffect } from "react";

const UpvoteModal = ({ isOpen, onClose }) => {
  const [isVisible, setIsVisible] = useState(isOpen);

  useEffect(() => {
    setIsVisible(isOpen);
  }, [isOpen]);

  const handleUpvote = () => {
    trackEvent("modal_spotlight", {
      event_category: "User Interaction",
      event_label: "Checked spotlight from Modal",
      value: 1,
    });
    window.open("https://peerlist.io/yogini/project/legopix", "_blank");
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 text-slate-950">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Upvote LegoPix on Peerlist</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <CancelCircleIcon />
          </button>
        </div>
        <p className="mb-2">
          If you love Legos and found LegoPix enjoyable, please consider
          upvoting my project on Peerlist Project Spotlight.
        </p>

        <p className="mb-6">Your support means a lot to side projects!</p>
        <div className="flex justify-start space-x-4">
          <button
            onClick={handleUpvote}
            className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600"
          >
            Lessgo, for the Lego 💚
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpvoteModal;
