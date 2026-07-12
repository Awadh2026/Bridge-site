import { Link } from "react-router-dom";

export default function DeleteAccount() {
  return (
    <section className="min-h-screen bg-app-bg text-app-body px-6 py-12 md:py-16 flex-1">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 text-app-header">
          Delete Account
        </h1>
        <p className="text-base md:text-lg text-app-body mb-8">
          You can request deletion of your Zingerr account and the personal data associated with it.
        </p>

        <div className="flex gap-3 md:gap-6 mb-8 text-xs md:text-sm opacity-90 flex-wrap">
          <span className="bg-white border border-app-accent/30 px-3 py-2 rounded-full text-app-header">
            🗑️ Account deletion request
          </span>
          <span className="bg-white border border-app-accent/30 px-3 py-2 rounded-full text-app-header">
            📧 Support assistance
          </span>
          <span className="bg-white border border-app-accent/30 px-3 py-2 rounded-full text-app-header">
            ⏱️ 7 business days
          </span>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-app-accent/30 border-l-4 border-l-app-accent">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-app-header mb-4">
              How to request deletion
            </h2>
            <p className="text-app-body leading-relaxed text-sm md:text-base mb-3">
              To request deletion of your Zingerr account and associated personal data, email us at
              <a
                href="mailto:support@awadhinfosolution.in"
                className="text-app-accent font-semibold ml-1 hover:underline"
              >
                support@awadhinfosolution.in
              </a>
              from the phone number or email address associated with your account.
            </p>
            <p className="text-app-body leading-relaxed text-sm md:text-base rounded-lg border border-app-accent/30 bg-app-bg px-4 py-3 font-semibold text-app-header">
              You can also delete your account directly from the app by opening your profile and selecting Delete Account.
            </p>
            <p className="text-app-body leading-relaxed text-sm md:text-base mt-3">
              Please include your full name, registered phone number or email address, and a clear request to delete your account.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-app-header mb-4">
              What data will be deleted
            </h2>
            <ul className="list-disc list-inside text-app-body space-y-2 text-sm md:text-base">
              <li>Account profile details</li>
              <li>Saved addresses and personal information</li>
              <li>App preferences and account settings</li>
              <li>Other personal data stored in connection with your account</li>
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-app-header mb-4">
              Data that may be retained
            </h2>
            <p className="text-app-body leading-relaxed text-sm md:text-base">
              Certain records, such as order and payment information, may be retained for the period required by applicable tax, legal, or fraud-prevention requirements.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-app-header mb-4">
              Processing time
            </h2>
            <p className="text-app-body leading-relaxed text-sm md:text-base">
              We will process your request within 7 business days after verifying your identity.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="mailto:support@awadhinfosolution.in"
              className="inline-flex items-center justify-center rounded-full bg-app-accent px-5 py-3 text-sm font-semibold text-white hover:bg-app-accent/90 transition"
            >
              Email Support
            </a>
            <Link
              to="/privacy"
              className="inline-flex items-center justify-center rounded-full border border-app-accent/30 px-5 py-3 text-sm font-semibold text-app-header hover:border-app-accent transition"
            >
              Read Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
