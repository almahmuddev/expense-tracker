import { CATEGORY_STYLES } from "@/lib/categories";

interface Props {
    category: string;
}

export default function CategoryBadge({ category }: Props) {
    const style = CATEGORY_STYLES[category] || CATEGORY_STYLES["Others"];

    return (
        <span
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${style.bg} ${style.text} ${style.border}`}
        >
            {style.emoji} {category}
        </span>
    );
}