import Link from "next/link"
import { BookOpen } from "lucide-react"

export function AppFooter() {
  return (
    <footer className="glass-strong border-t border-border/50 py-8 mt-16 md:mt-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary shadow-lg dark:glow-primary">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-black gradient-text">StudyHub</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Empowering students with AI-powered learning tools for exam success.
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-4">Product</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/#tools" className="text-muted-foreground hover:text-foreground transition-smooth">
                  Tools
                </Link>
              </li>
              <li>
                <Link href="/#features" className="text-muted-foreground hover:text-foreground transition-smooth">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-smooth">
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/help" className="text-muted-foreground hover:text-foreground transition-smooth">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-smooth">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-smooth">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-smooth">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            © 2025 StudyHub. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-smooth">
              Twitter
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-smooth">
              GitHub
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-smooth">
              Discord
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
