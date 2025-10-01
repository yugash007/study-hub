import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, ArrowLeft } from "lucide-react"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4 lg:px-8 py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-smooth mb-8 group"
        >
          <ArrowLeft className="h-4 w-4 transition-smooth group-hover:-translate-x-1" />
          Back to home
        </Link>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 mb-6 shadow-xl dark:glow-success">
              <Shield className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-5xl font-black mb-4 gradient-text">Privacy Policy</h1>
            <p className="text-muted-foreground">Last updated: January 2025</p>
          </div>

          <Card className="glass-strong border-2 depth-xl">
            <CardContent className="p-8 md:p-12 space-y-8">
              <section>
                <h2 className="text-2xl font-black mb-4 gradient-text">1. Information We Collect</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We collect information that you provide directly to us, including:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Account information (name, email, password)</li>
                  <li>Profile information and preferences</li>
                  <li>Content you upload or create using our tools</li>
                  <li>Communications with our support team</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-black mb-4 gradient-text">2. How We Use Your Information</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">We use the information we collect to:</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process your requests and transactions</li>
                  <li>Send you technical notices and support messages</li>
                  <li>Respond to your comments and questions</li>
                  <li>Analyze usage patterns to improve user experience</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-black mb-4 gradient-text">3. Information Sharing</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We do not sell, trade, or rent your personal information to third parties. We may share your
                  information only in the following circumstances:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-4">
                  <li>With your consent</li>
                  <li>To comply with legal obligations</li>
                  <li>To protect our rights and prevent fraud</li>
                  <li>With service providers who assist in our operations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-black mb-4 gradient-text">4. Data Security</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We implement appropriate technical and organizational measures to protect your personal information
                  against unauthorized access, alteration, disclosure, or destruction. All data is encrypted in transit
                  using SSL/TLS and at rest using industry-standard encryption.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-black mb-4 gradient-text">5. Your Rights</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">You have the right to:</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Object to processing of your data</li>
                  <li>Export your data in a portable format</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-black mb-4 gradient-text">6. Cookies and Tracking</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We use cookies and similar tracking technologies to track activity on our service and hold certain
                  information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being
                  sent.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-black mb-4 gradient-text">7. Children's Privacy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our service is not intended for children under 13 years of age. We do not knowingly collect personal
                  information from children under 13.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-black mb-4 gradient-text">8. Changes to Privacy Policy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the
                  new Privacy Policy on this page and updating the "Last updated" date.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-black mb-4 gradient-text">9. Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions about this Privacy Policy, please contact us at{" "}
                  <a href="mailto:privacy@studyhub.com" className="text-primary font-bold hover:underline">
                    privacy@studyhub.com
                  </a>
                </p>
              </section>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
