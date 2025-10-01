import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, ArrowLeft } from "lucide-react"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
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
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-500 mb-6 shadow-xl dark:glow-secondary">
              <FileText className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-5xl font-black mb-4 gradient-text">Terms of Service</h1>
            <p className="text-muted-foreground">Last updated: January 2025</p>
          </div>

          <Card className="glass-strong border-2 depth-xl">
            <CardContent className="p-8 md:p-12 space-y-8">
              <section>
                <h2 className="text-2xl font-black mb-4 gradient-text">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing and using StudyHub, you accept and agree to be bound by the terms and provision of this
                  agreement. If you do not agree to these terms, please do not use our service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-black mb-4 gradient-text">2. Use License</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Permission is granted to temporarily access and use StudyHub for personal, non-commercial educational
                  purposes. This license shall automatically terminate if you violate any of these restrictions.
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>You may not modify or copy the materials</li>
                  <li>You may not use the materials for any commercial purpose</li>
                  <li>You may not attempt to reverse engineer any software</li>
                  <li>You may not remove any copyright or proprietary notations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-black mb-4 gradient-text">3. User Accounts</h2>
                <p className="text-muted-foreground leading-relaxed">
                  You are responsible for maintaining the confidentiality of your account and password. You agree to
                  accept responsibility for all activities that occur under your account.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-black mb-4 gradient-text">4. Content</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our service allows you to upload, submit, store, send or receive content. You retain ownership of any
                  intellectual property rights that you hold in that content. By uploading content, you give us
                  permission to use that content solely for the purpose of providing our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-black mb-4 gradient-text">5. Prohibited Uses</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">You may not use StudyHub:</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>In any way that violates any applicable law or regulation</li>
                  <li>To transmit any harmful or malicious code</li>
                  <li>To impersonate or attempt to impersonate another user</li>
                  <li>To engage in any automated use of the system</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-black mb-4 gradient-text">6. Limitation of Liability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  StudyHub shall not be liable for any indirect, incidental, special, consequential or punitive damages
                  resulting from your use of or inability to use the service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-black mb-4 gradient-text">7. Changes to Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to modify these terms at any time. We will notify users of any material changes
                  via email or through the service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-black mb-4 gradient-text">8. Contact Information</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions about these Terms, please contact us at{" "}
                  <a href="mailto:legal@studyhub.com" className="text-primary font-bold hover:underline">
                    legal@studyhub.com
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
