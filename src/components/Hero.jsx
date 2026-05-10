export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-700 to-indigo-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-10 items-center">

        {/* LEFT SIDE */}
        <div>
          <h1 className="text-5xl font-bold leading-tight">
            Streamline Orders and Grow Faster with Zingerr
          </h1>

          <p className="mt-6 text-lg text-gray-200">
            Zingerr from Awadh Info Solution Pvt Ltd is a powerful app designed to simplify your workflow and keep every task moving with speed and ease. It helps you stay organized with intelligent features built for modern teams. Experience faster decision-making and smoother collaboration wherever you go.
          </p>

          <a
            href="https://play.google.com/store/apps/details?id=com.awadhinfosolution"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex bg-pink-500 hover:bg-pink-600 px-8 py-4 rounded-full font-semibold transition"
          >
            Download App
          </a>

          <div className="flex gap-6 mt-10 text-sm opacity-90">
            <span>✅ Secure Platform</span>
            <span>✅ Fast Performance</span>
            <span>✅ Trusted Company</span>
          </div>
        </div>

      </div>
    </section>
  );
}