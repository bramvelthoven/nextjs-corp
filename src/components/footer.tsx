export default function Footer() {
    return (
        <footer className="bg-secondary text-secondary-foreground p-4 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} Solaro.io AI Therapy. All rights reserved.
          </p>
        </footer>
    );
    }