export default function Support() {
  return (
    <>
      {/* SUPPORT HEADER/HERO SECTION - BLUE SCREEN */}
      <section className="min-h-screen bg-gradient-to-b from-blue-600 via-blue-500 to-indigo-900 text-white px-6 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">Support</h1>
          <p className="text-base md:text-lg text-blue-100 mb-8">
            Need help? Our support team is here to assist you with any questions or issues regarding Zingerr.
          </p>
          <div className="flex gap-3 md:gap-6 mb-8 text-xs md:text-sm opacity-90 flex-wrap">
            <span className="bg-white bg-opacity-20 px-3 py-2 rounded-full text-blue-900">📞 24/7 Assistance</span>
            <span className="bg-white bg-opacity-20 px-3 py-2 rounded-full text-blue-900">💬 Fast Response</span>
            <span className="bg-white bg-opacity-20 px-3 py-2 rounded-full text-blue-900">🛡️ Secure Support</span>
          </div>

          {/* BLUE SCREEN CONTENT BOX */}
          <div className="bg-blue-900 bg-opacity-40 backdrop-blur rounded-2xl shadow-2xl p-6 md:p-8 border border-blue-400 border-opacity-30 max-h-[70vh] overflow-y-auto">
            {/* Contact Methods */}
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Contact Us</h2>
              <ul className="space-y-4 text-blue-100 text-sm md:text-base">
                <li>
                  <span className="font-semibold text-yellow-300">Email:</span> <a href="mailto:support@awadhinfosolution.in" className="underline text-blue-200 hover:text-yellow-300">support@awadhinfosolution.in</a>
                </li>
                <li>
                  <span className="font-semibold text-yellow-300">Phone:</span> +91-9348381179
                </li>
                <li>
                  <span className="font-semibold text-yellow-300">Website:</span> <a href="https://awadhinfosolution.in" className="underline text-blue-200 hover:text-yellow-300" target="_blank" rel="noopener noreferrer">awadhinfosolution.in</a>
                </li>
              </ul>
            </div>

            {/* FAQ Section */}
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
              <div className="space-y-6 text-blue-100 text-xs md:text-sm">
                <div>
                  <h3 className="font-semibold text-blue-200 mb-1">How do I reset my password?</h3>
                  <p>Go to the login screen, tap "Forgot Password?", and follow the instructions to reset your password using your registered phone number.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-blue-200 mb-1">How can I update my profile information?</h3>
                  <p>Navigate to the Profile section in the app and tap "Edit" to update your details.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-blue-200 mb-1">I didn't receive my OTP. What should I do?</h3>
                  <p>Ensure you have a stable internet connection and the correct phone number. If the issue persists, contact our support team.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-blue-200 mb-1">How do I report a bug or give feedback?</h3>
                  <p>Email us at <span className="text-yellow-300">support@awadhinfosolution.in</span> with details and screenshots if possible.</p>
                </div>
              </div>
            </div>

            {/* Support Policy */}
            <div className="mb-8 pb-8 border-b border-blue-400 border-opacity-30">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Support Policy</h2>
              <ul className="list-disc list-inside text-blue-100 space-y-2 text-xs md:text-sm">
                <li>Our team responds to all queries within 24-48 hours.</li>
                <li>Support is available via email, phone, and website contact form.</li>
                <li>We do not request sensitive information (like OTPs or passwords) via email or phone.</li>
                <li>All support requests are handled confidentially and securely.</li>
              </ul>
            </div>

            {/* Footer */}
            <div className="text-center text-blue-200 text-xs pt-4">
              <p><strong>Last Updated:</strong> May 11, 2026 | <strong>Version:</strong> 1.0</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
