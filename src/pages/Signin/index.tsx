import SignInComponent from "components/Auth/SignIn";
import { useHistory } from "react-router";
import { SigninUserType } from "types/authTypes";

const SignInPage = () => {
  const history = useHistory();

  const onSubmit = async (values: SigninUserType, { setSubmitting, setErrors }: any) => {
    console.log(values);
    try {
      setSubmitting(true);
    //   await signInUserContext(values);
      localStorage.setItem('techCheckPoint', JSON.stringify({...values, token: 'abc'}))
      history.push("/home");
      setSubmitting(false);
    } catch (error) {
      setSubmitting(false);
      setErrors(error)
    }
  };

  return (
    <div>
      <SignInComponent onSubmit={onSubmit} />
    </div>
  );
};

export default SignInPage;
