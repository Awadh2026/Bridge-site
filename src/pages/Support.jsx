export default function Support() {
  return (
    <>
      {/* SUPPORT HEADER/HERO SECTION - BLUE SCREEN */}
      <section className="min-h-screen bg-app-bg text-app-body px-6 py-12 md:py-16 flex-1">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 text-app-header">Support</h1>
          <p className="text-base md:text-lg text-app-body mb-8">
            Need help? Our support team is here to assist you with any questions or issues regarding Zingerr.
          </p>
          <div className="flex gap-3 md:gap-6 mb-8 text-xs md:text-sm opacity-90 flex-wrap">
            <span className="bg-white border border-app-accent/30 px-3 py-2 rounded-full text-app-header">📞 24/7 Assistance</span>
            <span className="bg-white border border-app-accent/30 px-3 py-2 rounded-full text-app-header">💬 Fast Response</span>
            <span className="bg-white border border-app-accent/30 px-3 py-2 rounded-full text-app-header">🛡️ Secure Support</span>
          </div>

          {/* BLUE SCREEN CONTENT BOX */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-app-accent/30 border-l-4 border-l-app-accent max-h-[70vh] overflow-y-auto">
            {/* Contact Methods */}
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-app-header mb-4">Contact Us</h2>
              <ul className="space-y-4 text-app-body text-sm md:text-base">
                <li>
                  <span className="font-semibold text-app-header">Email:</span> <a href="mailto:support@awadhinfosolution.in" className="underline text-app-body hover:text-app-header">support@awadhinfosolution.in</a>
                </li>
                <li>
                  <span className="font-semibold text-app-header">Phone:</span> +91-9348381179
                </li>
                <li>
                  <span className="font-semibold text-app-header">Website:</span> <a href="https://awadhinfosolution.in" className="underline text-app-body hover:text-app-header" target="_blank" rel="noopener noreferrer">awadhinfosolution.in</a>
                </li>
              </ul>
            </div>

            {/* FAQ Section */}
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-app-header mb-4">Frequently Asked Questions</h2>
              <div className="space-y-6 text-app-body text-xs md:text-sm">
                <div>
                  <h3 className="font-semibold text-app-body mb-1">How do I reset my password?</h3>
                  <p>Go to the login screen, tap "Forgot Password?", and follow the instructions to reset your password using your registered phone number.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-app-body mb-1">How can I update my profile information?</h3>
                  <p>Navigate to the Profile section in the app and tap "Edit" to update your details.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-app-body mb-1">I didn't receive my OTP. What should I do?</h3>
                  <p>Ensure you have a stable internet connection and the correct phone number. If the issue persists, contact our support team.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-app-body mb-1">How do I report a bug or give feedback?</h3>
                  <p>Email us at <span className="text-app-header">support@awadhinfosolution.in</span> with details and screenshots if possible.</p>
                </div>
              </div>
            </div>

            {/* Support Policy */}
            <div className="mb-8 pb-8 border-b border-app-accent/30">
              <h2 className="text-2xl md:text-3xl font-bold text-app-header mb-4">Support Policy</h2>
              <ul className="list-disc list-inside text-app-body space-y-2 text-xs md:text-sm">
                <li>Our team responds to all queries within 24-48 hours.</li>
                <li>Support is available via email, phone, and website contact form.</li>
                <li>We do not request sensitive information (like OTPs or passwords) via email or phone.</li>
                <li>All support requests are handled confidentially and securely.</li>
              </ul>
            </div>

            {/* Footer */}
            <div className="text-center text-app-body text-xs pt-4">
              <p><strong>Last Updated:</strong> july 15, 2026 | <strong>Version:</strong> 1.0.0+1</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
