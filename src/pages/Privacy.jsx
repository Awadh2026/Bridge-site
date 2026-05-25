export default function Privacy() {
  return (
    <>
      {/* PRIVACY HEADER/HERO SECTION - BLUE SCREEN */}
      <section className="min-h-screen bg-app-bg text-app-body px-6 py-12 md:py-16 flex-1">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 text-app-header">Privacy Policy</h1>
          <p className="text-base md:text-lg text-app-body mb-8">
            Your privacy is important to us. Learn how Zingerr protects your personal information and data.
          </p>
          <div className="flex gap-3 md:gap-6 mb-8 text-xs md:text-sm opacity-90 flex-wrap">
            <span className="bg-white border border-app-accent/30 px-3 py-2 rounded-full text-app-header">🔒 Data Protected</span>
            <span className="bg-white border border-app-accent/30 px-3 py-2 rounded-full text-app-header">🛡️ Secure OTP</span>
            <span className="bg-white border border-app-accent/30 px-3 py-2 rounded-full text-app-header">✅ GDPR Compliant</span>
          </div>

          {/* BLUE SCREEN CONTENT BOX */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-app-accent/30 border-l-4 border-l-app-accent max-h-[70vh] overflow-y-auto">
            {/* Section 1 */}
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-app-header mb-4">1. Introduction</h2>
              <p className="text-app-body leading-relaxed text-sm md:text-base">
                Awadh Info Solution Pvt Ltd ("Company," "we," "us," or "our") operates the Zingerr mobile application ("App"). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our App.
              </p>
              <p className="text-app-body leading-relaxed mt-3 text-sm md:text-base">
                Please read this Privacy Policy carefully. If you do not agree with our policies and practices, please do not use our App.
              </p>
            </div>

            {/* Section 2 */}
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-app-header mb-4">2. Information We Collect</h2>
              <h3 className="text-lg md:text-xl font-semibold text-app-body mb-3">2.1 Information You Provide Directly</h3>
              <div className="bg-app-bg border-l-4 border-app-accent p-4 mb-4 rounded">
                <h4 className="font-bold text-app-header mb-2 text-sm md:text-base">📱 Phone Number and OTP Authentication</h4>
                <ul className="space-y-2 text-app-body text-xs md:text-sm">
                  <li>✓ We collect your phone number to send you One-Time Passwords (OTPs) for authentication</li>
                  <li>✓ OTPs are temporary codes used to verify your identity and secure your account</li>
                  <li>✓ Your phone number is essential for account creation and login</li>
                </ul>
              </div>
              <h4 className="font-bold text-app-body mb-2 text-sm md:text-base">👤 Account Information</h4>
              <ul className="list-disc list-inside text-app-body space-y-1 mb-4 text-xs md:text-sm">
                <li>Name</li>
                <li>Email address</li>
                <li>Profile picture (optional)</li>
                <li>Address and location information (optional)</li>
              </ul>
              <h3 className="text-lg md:text-xl font-semibold text-app-body mb-3 mt-6">2.2 Information Collected Automatically</h3>
              <ul className="space-y-2 text-app-body text-xs md:text-sm">
                <li>📊 <strong>Device Information:</strong> Device type, model, operating system</li>
                <li>📈 <strong>Usage Information:</strong> Pages accessed, time spent, crash reports</li>
                <li>📍 <strong>Location Information:</strong> GPS data (with permission) or IP-based location</li>
              </ul>
            </div>

            {/* Section 3 */}
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-app-header mb-4">3. Use of Your Information</h2>
              <p className="text-app-body mb-3 text-sm md:text-base">We use the collected information for:</p>
              <ul className="space-y-2 text-app-body text-xs md:text-sm">
                <li>🔐 <strong>Authentication & Security:</strong> OTP generation and verification</li>
                <li>⚙️ <strong>Service Provision:</strong> Delivering and improving the App</li>
                <li>💬 <strong>Communication:</strong> Sending updates, notifications, and support</li>
                <li>📊 <strong>Analytics:</strong> Understanding user behavior</li>
                <li>⚖️ <strong>Legal Compliance:</strong> Fulfilling legal obligations</li>
                <li>👨‍💼 <strong>Customer Support:</strong> Responding to inquiries</li>
              </ul>
            </div>

            {/* Section 4 */}
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-app-header mb-4">4. OTP (One-Time Password) Policy</h2>
              <div className="bg-app-bg border-l-4 border-app-accent p-4 mb-4 rounded">
                <h4 className="font-bold text-app-header mb-2 text-sm md:text-base">🔒 OTP Security</h4>
                <ul className="space-y-2 text-app-body text-xs md:text-sm">
                  <li>✓ OTPs are encrypted and transmitted securely</li>
                  <li>✓ Never share your OTP with anyone</li>
                  <li>✓ We never ask for OTPs via email or phone calls</li>
                  <li>✓ OTPs expire automatically (typically within 10 minutes)</li>
                </ul>
              </div>
              <h4 className="font-bold text-app-body mb-2 text-sm md:text-base">⏱️ OTP Data Retention</h4>
              <p className="text-app-body text-xs md:text-sm">OTP records are retained for 90 days for security, then securely deleted.</p>
            </div>

            {/* Section 5 */}
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-app-header mb-4">5. Sharing of Information</h2>
              <p className="text-red-700 font-semibold text-sm md:text-base mb-3">⚠️ We do NOT sell, trade, or rent your personal information.</p>
              <p className="text-app-body mb-3 text-xs md:text-sm">We may share information only in these cases:</p>
              <ul className="space-y-2 text-app-body text-xs md:text-sm">
                <li>🔗 <strong>Third-Party Service Providers:</strong> SMS & cloud services</li>
                <li>⚖️ <strong>Legal Requirements:</strong> When required by law</li>
                <li>🏢 <strong>Business Transfers:</strong> Merger, acquisition, bankruptcy</li>
                <li>✅ <strong>User Consent:</strong> With explicit permission</li>
              </ul>
            </div>

            {/* Section 6 */}
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-app-header mb-4">6. Data Security</h2>
              <p className="text-app-body mb-3 text-xs md:text-sm">We implement comprehensive security measures:</p>
              <ul className="space-y-2 text-app-body text-xs md:text-sm">
                <li>🔐 <strong>SSL/TLS Encryption:</strong> For data in transit</li>
                <li>🔒 <strong>Encrypted Storage:</strong> For sensitive data</li>
                <li>🚪 <strong>Access Controls:</strong> Limited permissions</li>
                <li>🔍 <strong>Regular Audits:</strong> Security assessments</li>
              </ul>
            </div>

            {/* Section 7 */}
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-app-header mb-4">7. Your Privacy Rights</h2>
              <p className="text-app-body mb-3 text-xs md:text-sm">You have the right to:</p>
              <ul className="space-y-2 text-app-body text-xs md:text-sm">
                <li>👁️ <strong>Access:</strong> Request a copy of your personal data</li>
                <li>✏️ <strong>Correction:</strong> Update inaccurate information</li>
                <li>🗑️ <strong>Deletion:</strong> Request deletion of data</li>
                <li>🚫 <strong>Opt-Out:</strong> Withdraw consent</li>
                <li>📤 <strong>Data Portability:</strong> Request in portable format</li>
              </ul>
              <p className="text-app-body mt-3 text-xs md:text-sm">Contact: <span className="text-app-header font-semibold">support@awadhinfosolution.in</span></p>
            </div>

            {/* Section 8 */}
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-app-header mb-4">8. Data Retention</h2>
              <div className="space-y-2 text-xs md:text-sm">
                <div className="bg-app-bg border-l-4 border-app-accent p-3 rounded text-app-body">
                  📱 <strong>OTP Records:</strong> 90 days for security
                </div>
                <div className="bg-app-bg border-l-4 border-app-accent p-3 rounded text-app-body">
                  👤 <strong>Account Data:</strong> As long as account is active
                </div>
                <div className="bg-app-bg border-l-4 border-app-accent p-3 rounded text-app-body">
                  💬 <strong>Communication Records:</strong> 2 years or as required by law
                </div>
                <div className="bg-app-bg border-l-4 border-app-accent p-3 rounded text-app-body">
                  🗑️ <strong>Post-Deletion Data:</strong> Deleted within 30 days
                </div>
              </div>
            </div>

            {/* Section 9-12 */}
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-app-header mb-4">9. Children's Privacy</h2>
              <p className="text-app-body text-xs md:text-sm">Not intended for children under 13. We do not knowingly collect info from children.</p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-app-header mb-4">10. Third-Party Links</h2>
              <p className="text-app-body text-xs md:text-sm">App may contain third-party links. We're not responsible for their privacy practices.</p>
            </div>

            {/* Section 13 */}
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-app-header mb-4">11. Contact Us</h2>
              <div className="bg-app-bg border-l-4 border-app-accent p-4 rounded">
                <p className="font-semibold text-app-header mb-3 text-sm md:text-base">Awadh Info Solution Pvt Ltd</p>
                <p className="text-app-body mb-2 text-xs md:text-sm">📧 <span className="text-app-header">support@awadhinfosolution.in</span></p>
                <p className="text-app-body mb-2 text-xs md:text-sm">🌐 <span className="text-app-header">awadhinfosolution.in</span></p>
                <p className="text-app-body text-xs">⏱️ Response time: Within 30 days</p>
              </div>
            </div>

            {/* Section 14-15 */}
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-app-header mb-4">12. Changes to This Policy</h2>
              <p className="text-app-body text-xs md:text-sm">We may update this policy periodically. Continued use after changes constitutes acceptance.</p>
            </div>

            <div className="mb-8 pb-8 border-b border-app-accent/30">
              <h2 className="text-2xl md:text-3xl font-bold text-app-header mb-4">13. Acknowledgment</h2>
              <p className="text-app-body text-xs md:text-sm">By using the Zingerr App, you acknowledge and agree to this Privacy Policy.</p>
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