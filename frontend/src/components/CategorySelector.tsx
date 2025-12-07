import { Checkbox } from "@/components/ui/checkbox"
import type { Category } from "@/types/category";

type Props = {
  categories: Category[];
  selected: number[];
  onChange: (id: number, checked: boolean) => void;
};

export default function CategorySelector({ categories, selected, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-4 mb-6">
      {categories.map((c) => (
        <label key={c.id} className="flex items-center gap-2 cursor-pointer">
          <Checkbox
            checked={selected.includes(c.id)}
            onCheckedChange={(checked) => onChange(c.id, Boolean(checked))}
          />
          <span>{c.ten}</span>
        </label>
      ))}
    </div>
  );
}
