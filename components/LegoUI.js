import { CancelCircleIcon, DownloadCircle01Icon } from "hugeicons-react";

export const DownloadBtn = ({ handleDownload }) => (
  <button
    onClick={handleDownload}
    className="text-white flex justify-center items-center gap-1 mt-10 cursor-pointer bg-blue-500 hover:bg-blue-600 font-bold py-2 px-4 rounded"
  >
    <DownloadCircle01Icon /> Download
  </button>
);

export const BnWSlider = ({ bwLevel, setBwLevel }) => (
  <div>
    <label htmlFor="bwLevel" className="block text-sm font-medium text-white">
      Black & White Level: {bwLevel}%
    </label>
    <input
      type="range"
      id="bwLevel"
      name="bwLevel"
      min="0"
      max="100"
      value={bwLevel}
      onChange={(e) => setBwLevel(Number(e.target.value))}
      className="mt-1 block w-full"
    />
  </div>
);

export const BrickCountSlider = ({ legoBlockSize, setLegoBlockSize }) => (
  <div>
    <label htmlFor="blockSize" className="block text-sm font-medium text-white">
      Brick Density: {legoBlockSize}
    </label>
    <input
      type="range"
      id="blockSize"
      name="blockSize"
      min="5"
      max="50"
      value={legoBlockSize}
      onChange={(e) => setLegoBlockSize(Number(e.target.value))}
      className="mt-1 block w-full"
    />
  </div>
);
