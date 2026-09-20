// 1200px of content: 16px side margins under 768px, 32px from 768px up.
export default function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1264px] px-4 md:px-8 ${className}`}>{children}</div>;
}
