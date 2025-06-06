import { ROUTES } from "@/shared/model/routes";
import { Link } from "react-router-dom";
import { AuthLayout } from "./ui/auth-layout";
import { LoginForm } from "./ui/login-form";

function LoginPage() {
	return (
		<AuthLayout
			title="Вход в систему"
			description="Введите ваш email и пароль для входа в систему"
			form={<LoginForm />}
			footerText={
				<>
					Нет аккаунта?{" "}
					<Link className="text-blue-700 hover:underline" to={ROUTES.REGISTER}>
						Зарегистроваться
					</Link>
				</>
			}
		/>
	);
}

export const Component = LoginPage;
