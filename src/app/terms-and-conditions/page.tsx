import { ProtectedRoute } from '@/components/ProtectedRoute'

const terms = [
  {
    title: 'Acceptance of Terms',
    body: [
      'By creating an account or using our platform, you agree to be bound by these Terms and Conditions. If you do not agree, you must not use our services.',
    ],
  },
  {
    title: 'Eligibility',
    body: [
      'You must be at least 18 years old and legally permitted to use cryptocurrency services in your jurisdiction. You are responsible for ensuring that your use of our platform complies with applicable laws.',
    ],
  },
  {
    title: 'Our Services',
    body: [
      'We provide cryptocurrency-related services as described on our platform. We reserve the right to modify, suspend, or discontinue any service at any time with or without prior notice where permitted by law.',
    ],
  },
  {
    title: 'Account Registration',
    body: [
      'Users must provide accurate and complete information when creating an account. You are responsible for maintaining the confidentiality of your login credentials and for all activities conducted through your account.',
    ],
  },
  {
    title: 'Identity Verification',
    body: [
      'We may require identity verification (KYC) and additional documentation before providing certain services, processing large transactions, or complying with legal obligations.',
    ],
  },
  {
    title: 'User Responsibilities',
    body: ['You agree not to:'],
    bullets: [
      'Engage in fraud, money laundering, terrorist financing, or other illegal activities.',
      'Use stolen payment methods or unauthorized accounts.',
      'Attempt to hack, disrupt, or interfere with our systems.',
      'Provide false or misleading information.',
    ],
  },
  {
    title: 'Cryptocurrency Risks',
    body: [
      'Cryptocurrency markets are highly volatile. Prices may fluctuate significantly, and users acknowledge that they may lose part or all of their funds. This is not a get rich quick scheme.',
    ],
  },
  {
    title: 'Fees',
    body: [
      'Applicable fees will be disclosed before withdrawal is completed. We reserve the right to update our fee schedule from time to time.',
    ],
  },
  {
    title: 'Deposits and Withdrawals',
    body: [
      'Transactions are subject to blockchain confirmations, security reviews, and compliance checks. Processing times may vary depending on network conditions and operational requirements.',
    ],
  },
  {
    title: 'Compliance Monitoring',
    body: [
      'We reserve the right to delay, reject, suspend, or investigate transactions where required by law, regulatory obligations, or reasonable security concerns.',
    ],
  },
  {
    title: 'Promotions',
    body: [
      'Promotions, bonuses, referral rewards, and special offers are governed by separate promotional terms. We reserve the right to modify or withdraw promotions at any time.',
    ],
  },
  {
    title: 'Temporary Policies',
    body: [
      'From time to time, we may introduce temporary operational rules, security measures, trading restrictions, maintenance procedures, or promotional conditions. Such temporary policies will become effective once published through our official communication channels and will remain in force until withdrawn or replaced.',
    ],
  },
  {
    title: 'Suspension or Termination',
    body: [
      'We may suspend or terminate any account that violates these Terms, engages in suspicious activity, or poses a security or regulatory risk.',
    ],
  },
  {
    title: 'Limitation of Liability',
    body: [
      'To the fullest extent permitted by law, we shall not be liable for losses resulting from market volatility, blockchain failures, third-party service interruptions, cyberattacks beyond our reasonable control, or user negligence.',
    ],
  },
  {
    title: 'Intellectual Property',
    body: [
      'All trademarks, logos, software, and content on the platform remain our intellectual property unless otherwise stated.',
    ],
  },
  {
    title: 'Privacy',
    body: ['Your personal information will be handled in accordance with our Privacy Policy.'],
  },
  {
    title: 'Amendments',
    body: [
      'We may update these Terms and Conditions at any time. Updated versions become effective upon publication on our official platform. Continued use of our services after an update constitutes acceptance of the revised Terms.',
      'Any temporary amendment, policy, or rule will be communicated through our official Announcements, Promotion Terms and Conditions, Help Center articles, or other official communication channels. Such temporary amendments become effective upon publication and remain in force until withdrawn, replaced, or incorporated into these Terms and Conditions.',
    ],
  },
  {
    title: 'Contact Information',
    body: [
      'For questions regarding these Terms and Conditions, please contact our In-App Customer Support or Telegram Team.',
    ],
  },
]

export default function TermsAndConditionsPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-black px-4 py-10 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 border-b border-white/10 pb-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-accent">
              Last updated: November 5, 2025
            </p>
            <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
              Terms and Conditions
            </h1>
          </div>

          <div className="space-y-6">
            {terms.map((section, index) => (
              <section key={section.title} className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6">
                <h2 className="text-lg font-bold text-white">
                  {index + 1}. {section.title}
                </h2>
                <div className="mt-3 space-y-3 text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {section.bullets ? (
                    <ul className="list-disc space-y-2 pl-5">
                      {section.bullets.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
