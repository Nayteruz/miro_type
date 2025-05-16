import { cn } from "@/shared/lib/css";
import { Tabs, TabsList, TabsTrigger } from "@/shared/ui/kit/tabs";
import { ImagesIcon, ListIcon } from "lucide-react";

export const ViewMode = {
	GRID: "grid",
	LIST: "list",
} as const;

export type IViewMode = (typeof ViewMode)[keyof typeof ViewMode];

interface ViewModeToggleProps {
	value: IViewMode;
	onChange: (value: IViewMode) => void;
}

const cursorClass = (value: boolean) => (value ? "cursor-default pointer-events-none" : "cursor-pointer");

export function ViewModeToggle({ value, onChange }: ViewModeToggleProps) {
	return (
		<Tabs defaultValue={value} onValueChange={(e) => onChange(e as IViewMode)}>
			<TabsList>
				<TabsTrigger className={cn(cursorClass(value === ViewMode.GRID))} value={ViewMode.GRID}>
					<ListIcon />
				</TabsTrigger>
				<TabsTrigger className={cn(cursorClass(value === ViewMode.LIST))} value={ViewMode.LIST}>
					<ImagesIcon />
				</TabsTrigger>
			</TabsList>
		</Tabs>
	);
}
