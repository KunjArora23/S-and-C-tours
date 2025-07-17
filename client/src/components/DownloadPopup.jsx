import { useEffect, useState } from "react";

export default function DownloadPopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Only show if not already shown
    if (!localStorage.getItem('downloadPopupShown')) {
      const timer = setTimeout(() => {
        setShow(true);
        localStorage.setItem('downloadPopupShown', 'true');
      }, 5000); // show after 5 seconds
      return () => clearTimeout(timer);
    }
  }, []);

  if (!show) return null;

  return (
    <>
      {/* Overlay with blur effect */}
      <div className="fixed inset-0 z-40 backdrop-blur-sm bg-black/30" />

      {/* Popup box */}
      <div className="fixed z-50 top-1/2 left-1/2 w-[90vw] max-w-sm md:max-w-md transform -translate-x-1/2 -translate-y-1/2 bg-rolex-darkGreen text-rolex-gold rounded-xl p-5 shadow-2xl border-2 border-rolex-gold">
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="text-3xl">📥</div>
          <h2 className="text-base md:text-lg font-semibold text-rolex-gold">
            Tips to Travel to India
          </h2>
          <p className="text-sm text-rolex-champagne">
            Download our short guide to stay safe, travel smart, and make the most of your trip.
          </p>
          <a
            href="/public/S & C Tours Essential India Travel Tips.pdf"
            download
            className="mt-2 inline-block bg-rolex-gold text-rolex-darkGreen px-4 py-2 text-sm rounded hover:bg-rolex-brassHover hover:text-white border-2 border-rolex-gold transition"
          >
            Download PDF
          </a>
          <button
            onClick={() => setShow(false)}
            className="text-xs text-rolex-champagne hover:text-rolex-gold mt-2"
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
}