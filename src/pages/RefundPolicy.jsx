import { Link } from "react-router-dom";

export default function RefundPolicy() {
  return (
    <>
      <section className="min-h-screen bg-gradient-to-b from-blue-600 via-blue-500 to-indigo-900 text-white px-6 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">Refund & Cancellation Policy</h1>
          <p className="text-base md:text-lg text-blue-100 mb-8">
            This Refund & Cancellation Policy ("Policy") applies to payments made for products and services offered through the Zingerr mobile application and related platforms operated by Awadh Info Solution Pvt Ltd ("Company," "we," "us," or "our").
          </p>

          <div className="bg-blue-900 bg-opacity-40 backdrop-blur p-6 md:p-8 max-h-[70vh] overflow-y-auto rounded-2xl shadow-2xl border border-blue-400 border-opacity-30">
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">1. Scope</h2>
              <p className="text-blue-100 text-sm md:text-base">
                This Policy governs refunds and cancellations for paid subscriptions, in-app purchases, digital services, and any other paid offerings made through Zingerr or our authorized payment partners. By making a payment, you agree to this Policy along with our{" "}
                <Link to="/terms" className="underline text-yellow-300">Terms & Conditions</Link> and{" "}
                <Link to="/privacy" className="underline text-yellow-300">Privacy Policy</Link>.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">2. Refund Eligibility</h2>
              <p className="text-blue-100 text-sm md:text-base mb-3">You may be eligible for a refund if:</p>
              <ul className="list-disc list-inside text-blue-100 space-y-2 text-xs md:text-sm">
                <li>You were charged incorrectly or multiple times for the same transaction.</li>
                <li>The paid service was not delivered or was substantially unavailable due to a fault on our side.</li>
                <li>You cancel within any free-trial or money-back period explicitly stated at the time of purchase.</li>
                <li>A refund is required under applicable Indian consumer protection or payment regulations.</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">3. Non-Refundable Items</h2>
              <ul className="list-disc list-inside text-blue-100 space-y-2 text-xs md:text-sm">
                <li>Services already used, consumed, or delivered in full.</li>
                <li>Purchases made through third-party app stores (Google Play, Apple App Store) — refunds must be requested directly from the respective store per their policies.</li>
                <li>Promotional or discounted purchases where refund terms were stated as non-refundable at checkout.</li>
                <li>Charges arising from user error, unauthorized use of your account, or violation of our Terms.</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">4. Cancellation Policy</h2>
              <ul className="list-disc list-inside text-blue-100 space-y-2 text-xs md:text-sm">
                <li>Subscriptions may be cancelled at any time through the app or by contacting support before the next billing cycle.</li>
                <li>Cancellation stops future charges; it does not automatically entitle you to a refund for the current billing period unless stated otherwise.</li>
                <li>One-time purchases may be cancelled only before the service is activated or delivered, subject to review.</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">5. How to Request a Refund</h2>
              <p className="text-blue-100 text-sm md:text-base mb-3">To request a refund, contact us with:</p>
              <ul className="list-disc list-inside text-blue-100 space-y-2 text-xs md:text-sm mb-4">
                <li>Registered phone number or email associated with your account</li>
                <li>Transaction ID, payment receipt, or order reference</li>
                <li>Date and amount of payment</li>
                <li>Reason for the refund request</li>
              </ul>
              <p className="text-blue-100 text-sm md:text-base">
                Email:{" "}
                <a href="mailto:support@awadhinfosolution.in" className="underline text-yellow-300">
                  support@awadhinfosolution.in
                </a>{" "}
                | Phone:{" "}
                <a href="tel:+919348381179" className="underline text-yellow-300">
                  +91-9348381179
                </a>
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">6. Refund Processing Timeline</h2>
              <ul className="list-disc list-inside text-blue-100 space-y-2 text-xs md:text-sm">
                <li>We acknowledge refund requests within 2–3 business days.</li>
                <li>Approved refunds are initiated within 7–10 business days from approval.</li>
                <li>Refunds are credited to the original payment method (UPI, card, net banking, wallet, etc.).</li>
                <li>Your bank or payment provider may take an additional 5–10 business days to reflect the amount in your account.</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">7. Partial Refunds</h2>
              <p className="text-blue-100 text-sm md:text-base">
                Where only part of a service was unused or unavailable, we may issue a partial refund proportional to the unused portion, at our discretion and in line with the purchase terms shown at checkout.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">8. Failed or Disputed Transactions</h2>
              <p className="text-blue-100 text-sm md:text-base">
                If a payment fails but your account was debited, the amount is typically auto-reversed by your bank or payment gateway within 5–7 business days. For unresolved cases, contact us with proof of debit. Chargebacks initiated with your bank without contacting us first may delay resolution.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">9. Changes to This Policy</h2>
              <p className="text-blue-100 text-sm md:text-base">
                We may update this Policy from time to time. The revised version will be posted on this page with an updated "Last Updated" date. Continued use of paid services after changes constitutes acceptance of the updated Policy.
              </p>
            </div>

            <div className="mb-8 pb-8 border-b border-blue-400 border-opacity-30">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">10. Contact & Governing Law</h2>
              <p className="text-blue-100 text-sm md:text-base mb-3">
                <strong>Awadh Info Solution Pvt Ltd</strong>
                <br />
                Website:{" "}
                <a
                  href="https://awadhinfosolution.in"
                  className="underline text-yellow-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  awadhinfosolution.in
                </a>
              </p>
              <p className="text-blue-100 text-sm md:text-base">
                This Policy is governed by the laws of India. Disputes shall be subject to the exclusive jurisdiction of courts in India.
              </p>
            </div>

            <div className="text-center text-blue-200 text-xs pt-4">
              <p>
                <strong>Last Updated:</strong> May 24, 2026 | <strong>Version:</strong> 1.0
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
