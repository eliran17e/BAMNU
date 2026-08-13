export function ExternalLink({ href, className = "", children, label }: { href: string; className?: string; children: React.ReactNode; label?: string }) {
  return <a href={href} className={className} target="_blank" rel="noopener noreferrer" aria-label={label}>{children}</a>;
}
