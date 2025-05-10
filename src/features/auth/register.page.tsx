import { Link } from "react-router-dom";
import { AuthLayout } from "./ui/auth-layout";
import { ROUTES } from "@/shared/model/routes";
import { RegisterForm } from "./ui/register-form";

function RegisterPage() {
	return (
		<AuthLayout
			title="Регистрация"
			description="Введите ваш email и пароль для регистрации в системе"
			form={<RegisterForm />}
			footerText={
				<>
					Есть аккаунт?{" "}
					<Link className="text-blue-700 hover:underline" to={ROUTES.LOGIN}>
						Войти
					</Link>
				</>
			}
		/>
	);
}

export const Component = RegisterPage;
