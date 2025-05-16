import { Input } from "@/shared/ui/kit/input";

interface BoardsSearchProps {
	value: string;
	onChange: (value: string) => void;
}

export function BoardsSearch({ value, onChange }: BoardsSearchProps) {
	return (
		<Input
			type="search"
			placeholder="Поиск по доскам..."
			value={value}
			onChange={(e) => onChange(e.target.value)}
			className="max-w-xs"
		/>
	);
}
