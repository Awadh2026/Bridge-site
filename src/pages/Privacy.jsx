export default function Privacy() {
  return (
    <>
      {/* PRIVACY HEADER/HERO SECTION */}
      <section className="bg-gradient-to-r from-blue-700 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <h1 className="text-5xl font-bold leading-tight">Privacy Policy</h1>
          <p className="mt-6 text-lg text-blue-100">
            Your privacy is important to us. Learn how Zingerr protects your personal information and data.
          </p>
          {/* <div className="flex gap-6 mt-10 text-sm opacity-90 flex-wrap">
            <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full">🔒 Data Protected</span>
            <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full">🛡️ Secure OTP</span>
            <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full">✅ GDPR Compliant</span>
          </div> */}
          {/* PRIVACY CONTENT SECTION */}
          <section className="py-16 px-6">
            <div className="max-w-4xl mx-auto">

              {/* Section 1 */}
              <div className=" rounded-lg shadow-md p-8 mb-6">
                <h2 className="text-2xl font-bold  mb-4">1. Introduction</h2>
                <p className=" leading-relaxed">
                  Awadh Info Solution Pvt Ltd ("Company," "we," "us," or "our") operates the Zingerr mobile application ("App"). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our App.
                </p>
                <p className=" leading-relaxed mt-3">
                  Please read this Privacy Policy carefully. If you do not agree with our policies and practices, please do not use our App.
                </p>
              </div>

              {/* Section 2 */}
              <div className=" rounded-lg shadow-md p-8 mb-6">
                <h2 className="text-2xl font-bold  mb-4">2. Information We Collect</h2>
                
                <h3 className="text-xl font-semibold  mb-3">2.1 Information You Provide Directly</h3>
                <div className="border-l-4 border-blue-500 p-4 mb-4">
                  <h4 className="font-bold  mb-2">📱 Phone Number and OTP Authentication</h4>
                  <ul className="space-y-2 ">
                    <li>✓ We collect your phone number to send you One-Time Passwords (OTPs) for authentication</li>
                    <li>✓ OTPs are temporary codes used to verify your identity and secure your account</li>
                    <li>✓ Your phone number is essential for account creation and login</li>
                  </ul>
                </div>

                <h4 className="font-bold  mb-2">👤 Account Information</h4>
                <ul className="list-disc list-inside  space-y-1 mb-4">
                  <li>Name</li>
                  <li>Email address</li>
                  <li>Profile picture (optional)</li>
                  <li>Address and location information (optional)</li>
                </ul>

                <h3 className="text-xl font-semibold  mb-3 mt-6">2.2 Information Collected Automatically</h3>
                <ul className="space-y-2 ">
                  <li>📊 <strong>Device Information:</strong> Device type, model, operating system</li>
                  <li>📈 <strong>Usage Information:</strong> Pages accessed, time spent, crash reports</li>
                  <li>📍 <strong>Location Information:</strong> GPS data (with permission) or IP-based location</li>
                </ul>
              </div>

              {/* Section 3 */}
              <div className=" rounded-lg shadow-md p-8 mb-6">
                <h2 className="text-2xl font-bold  mb-4">3. Use of Your Information</h2>
                <p className=" mb-3">We use the collected information for:</p>
                <ul className="space-y-2 ">
                  <li>🔐 <strong>Authentication & Security:</strong> OTP generation and verification</li>
                  <li>⚙️ <strong>Service Provision:</strong> Delivering and improving the App</li>
                  <li>💬 <strong>Communication:</strong> Sending updates, notifications, and support</li>
                  <li>📊 <strong>Analytics:</strong> Understanding user behavior and improving experience</li>
                  <li>⚖️ <strong>Legal Compliance:</strong> Fulfilling legal obligations</li>
                  <li>👨‍💼 <strong>Customer Support:</strong> Responding to inquiries</li>
                </ul>
              </div>

              {/* Section 4 */}
              <div className=" rounded-lg shadow-md p-8 mb-6">
                <h2 className="text-2xl font-bold  mb-4">4. OTP (One-Time Password) Policy</h2>
                
                <div className="border-l-4 border-green-500 p-4 mb-4">
                  <h4 className="font-bold  mb-2">🔒 OTP Security</h4>
                  <ul className="space-y-2 ">
                    <li>✓ OTPs are encrypted and transmitted securely</li>
                    <li>✓ Never share your OTP with anyone</li>
                    <li>✓ We never ask for OTPs via email or phone calls</li>
                    <li>✓ OTPs expire automatically (typically within 10 minutes)</li>
                  </ul>
                </div>

                <h4 className="font-bold  mb-2">⏱️ OTP Data Retention</h4>
                <p className="">
                  OTP records are retained for security and compliance purposes for up to 90 days. After which, they are securely deleted.
                </p>
              </div>

              {/* Section 5 */}
              <div className=" rounded-lg shadow-md p-8 mb-6">
                <h2 className="text-2xl font-bold  mb-4">5. Sharing of Information</h2>
                <p className="text-red-600 font-semibold text-lg mb-3">⚠️ We do NOT sell, trade, or rent your personal information.</p>
                <p className=" mb-3">We may share information only in these cases:</p>
                <ul className="space-y-2 ">
                  <li>🔗 <strong>Third-Party Service Providers:</strong> SMS providers, cloud services</li>
                  <li>⚖️ <strong>Legal Requirements:</strong> When required by law</li>
                  <li>🏢 <strong>Business Transfers:</strong> Merger, acquisition, or bankruptcy</li>
                  <li>✅ <strong>User Consent:</strong> With your explicit permission</li>
                </ul>
              </div>

              {/* Section 6 */}
              <div className=" rounded-lg shadow-md p-8 mb-6">
                <h2 className="text-2xl font-bold  mb-4">6. Data Security</h2>
                <p className=" mb-3">We implement comprehensive security measures including:</p>
                <ul className="space-y-2 ">
                  <li>🔐 <strong>SSL/TLS Encryption:</strong> For data in transit</li>
                  <li>🔒 <strong>Encrypted Storage:</strong> For sensitive data</li>
                  <li>🚪 <strong>Access Controls:</strong> Limited permissions and access</li>
                  <li>🔍 <strong>Regular Audits:</strong> Security assessments and testing</li>
                </ul>
              </div>

              {/* Section 7 */}
              <div className=" rounded-lg shadow-md p-8 mb-6">
                <h2 className="text-2xl font-bold  mb-4">7. Your Privacy Rights</h2>
                <p className=" mb-3">You have the right to:</p>
                <ul className="space-y-2 ">
                  <li>👁️ <strong>Access:</strong> Request a copy of your personal data</li>
                  <li>✏️ <strong>Correction:</strong> Update or correct inaccurate information</li>
                  <li>🗑️ <strong>Deletion:</strong> Request deletion of your data</li>
                  <li>🚫 <strong>Opt-Out:</strong> Withdraw consent for data processing</li>
                  <li>📤 <strong>Data Portability:</strong> Request your data in portable format</li>
                </ul>
                <p className=" mt-4">
                  To exercise these rights, contact us at <span className="font-semibold text-blue-600">support@awadhinfosolution.in</span>
                </p>
              </div>

              {/* Section 8 */}
              <div className=" rounded-lg shadow-md p-8 mb-6">
                <h2 className="text-2xl font-bold  mb-4">8. Data Retention</h2>
                <div className="space-y-2">
                  <div className=" p-3 rounded">
                    <strong className="">📱 OTP Records:</strong> <span className="">90 days for security</span>
                  </div>
                  <div className=" p-3 rounded">
                    <strong className="">👤 Account Data:</strong> <span className="">As long as account is active</span>
                  </div>
                  <div className=" p-3 rounded">
                    <strong className="">💬 Communication Records:</strong> <span className="">2 years or as required by law</span>
                  </div>
                  <div className=" p-3 rounded">
                    <strong className="">🗑️ Post-Deletion Data:</strong> <span className="">Deleted within 30 days</span>
                  </div>
                </div>
              </div>

              {/* Section 9 */}
              <div className=" rounded-lg shadow-md p-8 mb-6">
                <h2 className="text-2xl font-bold  mb-4">9. Children's Privacy</h2>
                <p className="">
                  The App is not intended for children under 13 years of age. We do not knowingly collect personal information from children. If we learn that we have collected such information, we will delete it promptly.
                </p>
              </div>

              {/* Section 10 */}
              <div className=" rounded-lg shadow-md p-8 mb-6">
                <h2 className="text-2xl font-bold  mb-4">10. Third-Party Links</h2>
                <p className="">
                  The App may contain links to third-party websites and services not operated by us. This Privacy Policy does not apply to third-party services. Please review their privacy policies separately.
                </p>
              </div>

              {/* Section 11 */}
              <div className=" rounded-lg shadow-md p-8 mb-6">
                <h2 className="text-2xl font-bold  mb-4">11. GDPR Compliance (EU Users)</h2>
                <p className=" mb-3">If you are located in the European Union:</p>
                <ul className="space-y-2 ">
                  <li>⚖️ <strong>Legal Basis:</strong> Your consent and legitimate business interests</li>
                  <li>🏢 <strong>Data Controller:</strong> Awadh Info Solution Pvt Ltd</li>
                  <li>✅ <strong>Rights:</strong> Access, rectification, erasure, and data portability</li>
                  <li>🔔 <strong>Complaint:</strong> Contact your local data protection authority</li>
                </ul>
              </div>

              {/* Section 12 */}
              <div className=" rounded-lg shadow-md p-8 mb-6">
                <h2 className="text-2xl font-bold  mb-4">12. California Privacy Rights (CCPA)</h2>
                <p className=" mb-3">If you are a California resident, you have additional rights:</p>
                <ul className="space-y-2 ">
                  <li>👁️ Right to know what personal information is collected and used</li>
                  <li>🗑️ Right to delete personal information</li>
                  <li>🚫 Right to opt-out of information sharing</li>
                </ul>
              </div>

              {/* Section 13 */}
              <div className=" rounded-lg shadow-md p-8 mb-6">
                <h2 className="text-2xl font-bold  mb-4">13. Contact Us</h2>
                <div className=" border-l-4 border-blue-500 p-6">
                  <p className="text-lg font-semibold  mb-3">Awadh Info Solution Pvt Ltd</p>
                  <p className=" mb-2">📧 <span className="font-semibold">Email:</span> support@awadhinfosolution.in</p>
                  <p className=" mb-2">🌐 <span className="font-semibold">Website:</span> awadhinfosolution.in</p>
                  <p className=" mb-3">📞 <span className="font-semibold">Support:</span> Use the in-app support feature</p>
                  <p className="text-sm text-gray-600">⏱️ We aim to respond to privacy inquiries within 30 days.</p>
                </div>
              </div>

              {/* Section 14 */}
              <div className=" rounded-lg shadow-md p-8 mb-6">
                <h2 className="text-2xl font-bold  mb-4">14. Changes to This Privacy Policy</h2>
                <p className="">
                  We may update this Privacy Policy from time to time. Significant changes will be communicated through the App. Your continued use after changes constitutes your acceptance of the updated Privacy Policy.
                </p>
              </div>

              {/* Section 15 */}
              <div className=" rounded-lg shadow-md p-8 mb-6">
                <h2 className="text-2xl font-bold  mb-4">15. Acknowledgment</h2>
                <p className="">
                  By downloading and using the Zingerr App, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy.
                </p>
              </div>

              {/* Footer Info */}
              <div className=" rounded-lg p-4 text-center mb-8">
                <p className="text-sm ">
                  <strong>Last Updated:</strong> May 11, 2026 | <strong>Version:</strong> 1.0
                </p>
              </div>

            </div>
          </section>
        </div>
      </section>
    </>
  );
}