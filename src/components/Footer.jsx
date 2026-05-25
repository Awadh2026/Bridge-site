export default function Footer() {
  return (
    <footer className="bg-app-bg text-app-header py-6 border-t-4 border-app-accent">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-8">
        <div>
          <p className="text-lg font-semibold">© 2026 Awadh Info Solution Pvt Ltd</p>
          <p className="text-sm text-app-body">Connect with us on social and app stores.</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://www.instagram.com/zingerr2026?igsh=MWVxczRxN2IzcTlyOA== "
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Awadh Info Solution on Instagram"
            className="flex items-center gap-2 rounded-full bg-white border border-app-accent/30 px-4 py-2 hover:border-app-accent transition text-app-body"
          >
            <span className="w-5 h-5 text-[#E1306C]">
              <svg viewBox="0 0 24 24" className="w-full h-full" fill="currentColor" aria-hidden="true">
                <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm0 2h10c1.66 0 3 1.34 3 3v10c0 1.66-1.34 3-3 3H7c-1.66 0-3-1.34-3-3V7c0-1.66 1.34-3 3-3zm5 2.25a4.75 4.75 0 1 0 0 9.5 4.75 4.75 0 0 0 0-9.5zm0 2a2.75 2.75 0 1 1 0 5.5 2.75 2.75 0 0 1 0-5.5zm4.75-.5a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5z" />
              </svg>
            </span>
            <span>Instagram</span>
          </a>
          <a
            href="https://x.com/zingerr2026?s=11"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Awadh Info Solution on Twitter"
            className="flex items-center gap-2 rounded-full bg-white border border-app-accent/30 px-4 py-2 hover:border-app-accent transition text-app-body"
          >
            <span className="w-5 h-5 text-[#1DA1F2]">
              <svg viewBox="0 0 24 24" className="w-full h-full" fill="currentColor" aria-hidden="true">
                <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.3 4.3 0 0 0 1.88-2.37 8.59 8.59 0 0 1-2.72 1.04 4.28 4.28 0 0 0-7.3 3.9 12.14 12.14 0 0 1-8.8-4.46 4.28 4.28 0 0 0 1.33 5.72 4.25 4.25 0 0 1-1.94-.54v.05a4.28 4.28 0 0 0 3.43 4.2 4.3 4.3 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.97 8.6 8.6 0 0 1-5.33 1.84A8.7 8.7 0 0 1 2 19.3a12.12 12.12 0 0 0 6.56 1.92c7.88 0 12.2-6.53 12.2-12.2 0-.19-.01-.39-.02-.58A8.7 8.7 0 0 0 22.46 6z" />
              </svg>
            </span>
            <span>Twitter</span>
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=com.awadhinfosolution"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Awadh Info Solution on Google Play Store"
            className="flex items-center gap-2 rounded-full bg-white border border-app-accent/30 px-4 py-2 hover:border-app-accent transition text-app-body"
          >
            <span className="w-5 h-5 text-[#34A853]">
              <svg viewBox="0 0 24 24" className="w-full h-full" fill="currentColor" aria-hidden="true">
                <path d="M3.37 2.25A2.25 2.25 0 0 0 1.12 4.5v15a2.25 2.25 0 0 0 2.25 2.25h17.26a2.25 2.25 0 0 0 2.25-2.25v-15a2.25 2.25 0 0 0-2.25-2.25H3.37zm14.8 6.6-8.7 4.35a.75.75 0 0 1-1.08-.67V8.5a.75.75 0 0 1 1.08-.67l8.7 4.35a.75.75 0 0 1 0 1.34z" />
              </svg>
            </span>
            <span>Play Store</span>
          </a>
          <a
            href="https://www.linkedin.com/company/awadh-info-solution/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Awadh Info Solution on LinkedIn"
            className="flex items-center gap-2 rounded-full bg-white border border-app-accent/30 px-4 py-2 hover:border-app-accent transition text-app-body"
          >
            <span className="w-5 h-5 text-[#0A66C2]">
              <svg viewBox="0 0 24 24" className="w-full h-full" fill="currentColor" aria-hidden="true">
                <path d="M4.98 3.5A2.5 2.5 0 0 0 2.5 6v12a2.5 2.5 0 0 0 2.48 2.5h14.04A2.5 2.5 0 0 0 21.5 18V6a2.5 2.5 0 0 0-2.48-2.5H4.98zm3.27 15.5H6.5V9.5h1.75v9.5zm-.88-10.75a1.02 1.02 0 1 1 0-2.05 1.02 1.02 0 0 1 0 2.05zm11.34 10.75h-1.75v-4.75c0-1.14-.4-1.92-1.4-1.92-.76 0-1.21.51-1.41 1.01-.07.17-.09.4-.09.63V18h-1.75s.02-6.5 0-7.19h1.75v1.02c.23-.35.64-.85 1.56-.85 1.14 0 1.99.74 1.99 2.33V18z" />
              </svg>
            </span>
            <span>LinkedIn</span>
          </a>
        </div>
      </div>
    </footer>
  );
}