export default function Terms() {
  return (
    <>
      {/* TERMS HEADER/HERO SECTION - BLUE SCREEN */}
      <section className="min-h-screen bg-app-bg text-app-body px-6 py-12 md:py-16 flex-1">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 text-app-header">Terms & Conditions</h1>
          <p className="text-base md:text-lg text-app-body mb-8">
            Please read these Terms & Conditions ("Terms") carefully before using the Zingerr app operated by Awadh Info Solution Pvt Ltd ("Company").
          </p>
          <div className="bg-white p-6 md:p-8 max-h-[70vh] overflow-y-auto rounded-2xl shadow-lg border border-app-accent/30 border-l-4 border-l-app-accent">
            {/* Section 1 */}
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-app-header mb-4">1. Acceptance of Terms</h2>
              <p className="text-app-body text-sm md:text-base">By accessing or using the Zingerr app, you agree to be bound by these Terms. If you do not agree, please do not use the app.</p>
            </div>
            {/* Section 2 */}
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-app-header mb-4">2. Use of the App</h2>
              <ul className="list-disc list-inside text-app-body space-y-2 text-xs md:text-sm">
                <li>You must be at least 13 years old to use the app.</li>
                <li>You agree to use the app only for lawful purposes.</li>
                <li>You are responsible for maintaining the confidentiality of your account and OTPs.</li>
                <li>Do not misuse, hack, or disrupt the app or its services.</li>
              </ul>
            </div>
            {/* Section 3 */}
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-app-header mb-4">3. User Content</h2>
              <ul className="list-disc list-inside text-app-body space-y-2 text-xs md:text-sm">
                <li>You are responsible for any content you submit or share via the app.</li>
                <li>Do not post unlawful, harmful, or offensive content.</li>
                <li>We reserve the right to remove content that violates these Terms.</li>
              </ul>
            </div>
            {/* Section 4 */}
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-app-header mb-4">4. Privacy</h2>
              <p className="text-app-body text-sm md:text-base">Your use of the app is also governed by our <a href="/privacy" className="underline text-app-header">Privacy Policy</a>.</p>
            </div>
            {/* Section 5 */}
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-app-header mb-4">5. Intellectual Property</h2>
              <ul className="list-disc list-inside text-app-body space-y-2 text-xs md:text-sm">
                <li>All content, trademarks, and data on the app are owned by Awadh Info Solution Pvt Ltd or its licensors. Visit our website: <a href="https://awadhinfosolution.in" className="underline text-app-header" target="_blank" rel="noopener noreferrer">awadhinfosolution.in</a></li>
                <li>You may not copy, modify, or distribute any part of the app without permission.</li>
              </ul>
            </div>
            {/* Section 6 */}
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-app-header mb-4">6. Limitation of Liability</h2>
              <ul className="list-disc list-inside text-app-body space-y-2 text-xs md:text-sm">
                <li>The app is provided "as is" without warranties of any kind.</li>
                <li>We are not liable for any damages or losses resulting from your use of the app.</li>
                <li>We do not guarantee the app will be error-free or uninterrupted.</li>
              </ul>
            </div>
            {/* Section 7 */}
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-app-header mb-4">7. Changes to Terms</h2>
              <p className="text-app-body text-sm md:text-base">We may update these Terms from time to time. Continued use of the app after changes means you accept the new Terms.</p>
            </div>
            {/* Section 8 */}
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-app-header mb-4">8. Termination</h2>
              <p className="text-app-body text-sm md:text-base">We may suspend or terminate your access to the app at any time for violation of these Terms or for any other reason.</p>
            </div>
            {/* Section 9 */}
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-app-header mb-4">9. Governing Law</h2>
              <p className="text-app-body text-sm md:text-base">These Terms are governed by the laws of India. Any disputes will be resolved in the courts of India.</p>
            </div>
            {/* Section 10 */}
            <div className="mb-8 pb-8 border-b border-app-accent/30">
              <h2 className="text-2xl md:text-3xl font-bold text-app-header mb-4">10. Contact Us</h2>
              <p className="text-app-body text-sm md:text-base">If you have any questions about these Terms, contact us at <a href="mailto:support@awadhinfosolution.in" className="underline text-app-header">support@awadhinfosolution.in</a> or call <a href="tel:+919348381179" className="underline text-app-header">+91-9348381179</a>. Visit our website: <a href="https://awadhinfosolution.in" className="underline text-app-header" target="_blank" rel="noopener noreferrer">awadhinfosolution.in</a>.</p>
            </div>
            {/* Footer */}
            <div className="text-center text-app-body text-xs pt-4">
              <p><strong>Last Updated:</strong> May 11, 2026 | <strong>Version:</strong> 1.0</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}