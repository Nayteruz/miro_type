import { Outlet } from "react-router-dom";

/*
Тут можно посмотреть что и как должно бытть
https://github.com/clean-frontend/miro-materials/tree/main/parts
*/

export function App() {
	return (
		<div className="min-h-screen flex flex-col">
			<Outlet />
		</div>
	);
}
