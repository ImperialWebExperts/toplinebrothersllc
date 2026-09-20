import Icon from "@/components/ui/Icon";

export default function Checklist({ items }: { items: readonly React.ReactNode[] }) {
  return (
    <ul className="grid max-w-prose gap-3">
      {items.map((item, i) => (
        <li key={i} className="type-body flex items-start gap-3">
          <Icon name="check" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
