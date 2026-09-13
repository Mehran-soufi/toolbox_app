"use client";

export default function OfflinePage() {
  return (
    <>
      <style>{`
        @font-face {
          font-family: "Vazirmatn";
          src: url("/font/vazirmatn/Vazirmatn-Regular.ttf") format("truetype");
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }

        @font-face {
          font-family: "Vazirmatn";
          src: url("/font/vazirmatn/Vazirmatn-Black.ttf") format("truetype");
          font-weight: 900;
          font-style: normal;
          font-display: swap;
        }

        * {
          box-sizing: border-box;
        }

        html,
        body {
          width: 100%;
          height: 100%;
          margin: 0;
        }

        body {
          font-family: "Vazirmatn", sans-serif;
          background:
            radial-gradient(
              circle at 50% 28%,
              rgba(255, 255, 255, 0.12),
              transparent 34%
            ),
            linear-gradient(
              145deg,
              #7c1dce 0%,
              #ad46ff 48%,
              #7e22ce 100%
            );
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .offline-page {
          width: min(100%, 420px);
          min-height: 100%;
          padding: 32px 22px 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .icon-wrapper {
          width: 82px;
          height: 82px;
          margin-bottom: 26px;
          border-radius: 22px;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.12);
          border: 1px solid rgba(255, 255, 255, 0.18);
          box-shadow:
            0 12px 30px rgba(0, 0, 0, 0.16),
            inset 0 1px 0 rgba(255, 255, 255, 0.12);
        }

        .icon-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        h1 {
          margin: 0;
          max-width: 350px;
          font-size: 18px;
          line-height: 1.9;
          font-weight: 900;
        }

        .description {
          margin: 7px 0 22px;
          max-width: 330px;
          font-size: 12.5px;
          line-height: 1.9;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.76);
        }

        .retry-button {
          width: min(100%, 280px);
          height: 46px;
          border: 0;
          border-radius: 13px;
          background: #ffffff;
          color: #8b2bd9;
          font-family: inherit;
          font-size: 13.5px;
          font-weight: 900;
          cursor: pointer;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
          transition:
            transform 0.15s ease,
            box-shadow 0.15s ease;
        }

        .retry-button:active {
          transform: scale(0.98);
          box-shadow: 0 5px 16px rgba(0, 0, 0, 0.13);
        }

        .divider {
          width: min(100%, 280px);
          height: 1px;
          margin: 24px 0 15px;
          background: rgba(255, 255, 255, 0.2);
        }

        .offline-link {
          border: 0;
          background: transparent;
          color: rgba(255, 255, 255, 0.9);
          font-family: inherit;
          font-size: 12.5px;
          font-weight: 400;
          cursor: pointer;
          padding: 6px 10px;
        }

        .offline-link:hover {
          color: #ffffff;
        }

        .offline-link:active {
          opacity: 0.7;
        }

        @media (max-width: 420px) {
          .offline-page {
            padding: 24px 18px 20px;
          }

          .icon-wrapper {
            width: 74px;
            height: 74px;
            margin-bottom: 22px;
            border-radius: 20px;
          }

          h1 {
            font-size: 20px;
            line-height: 1.8;
          }

          .description {
            font-size: 11px;
            margin-bottom: 20px;
          }

          .retry-button {
            width: min(100%, 220px);
            height: 44px;
          }
        }
      `}</style>

      <main className="offline-page">
        <div className="icon-wrapper">
          <img src="/icon-192.png" alt="جعبه ابزار" />
        </div>

        <h1>به نظر میرسد به اینترنت متصل نیستید</h1>

        <p className="description">
          اتصال اینترنت خود را بررسی کنید و دوباره تلاش کنید.
        </p>

        <button
          className="retry-button"
          type="button"
          onClick={() => window.location.reload()}
        >
          تلاش مجدد
        </button>

        <div className="divider"></div>

        <button
          className="offline-link"
          type="button"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          ادامه به صورت آفلاین
        </button>
      </main>
    </>
  );
}
