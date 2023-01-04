import Register from "./Register/Register";
import Login from "./Login/Login";

type LoginProps = {
    login: (username: string, password: string) => Promise<string>
    register: (username: string, email: string, password: string) => void
}

const LoginRegisterPage = (props: LoginProps) => {
    return (
        <div className={"row"}>
            <div className={"col"}>
                <Register register={props.register}/>
            </div>
            <div className={"col"}>
                <Login login={props.login} />
            </div>
        </div>
    );
}

export default LoginRegisterPage;