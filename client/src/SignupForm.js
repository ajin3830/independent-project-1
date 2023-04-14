import {useFormik} from "formik";
import * as yup from "yup";

function SignupForm({user, setUser, redirectAccount}) {
    
    const formSchema = yup.object().shape({
        username: yup.string().required("Must enter username"),
        password: yup.string()
        .required("Must enter a password")
        .min(8, 'Password should be 8 chars min.')
        .matches(/[0-9]/, 'Password should contain 1 digit min')
        // COMMENTED OUT FOR EASIER TESTING
        // .matches(/[a-z]/, 'Password should contain 1 lowercase min')
        .matches(/[A-Z]/, 'Password should contain 1 uppercase min'),
        // .matches(/[a-zA-Z]/, 'Password should contain 1 Latin letter min.'),
        
        confirmPassword: yup.string().when("password", {
            is: val => (val && val.length > 0 ? true : false),
            then: yup.string().oneOf(
              [yup.ref("password")],
              "Must enter the same password"
            )
        })
    });

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
            confirmPassword: "",
            // ADDED ABOVE 1 LINE TO CONFIRM PASSWORD
        },
        validationSchema: formSchema,
        onSubmit: (values, {resetForm}) => {
            // successfully posted a new account to below
            // fetch("http://localhost:8000/users", {
                // shows on db and above url
                // {
                    //     "name": "test123456",
                    //     "password": "test123456",
                    //     "confirmPassword": "test123456",
                    //     "id": 1
                    // }
                    fetch("/signup", {
                        method: "POST",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify(values, null, 2),
                    })
        .then((res) => {
            // console.log('hehe')
            if (res.status === 201) {
                res.json()
                .then((user) => {
                    setUser(user)
                    window.alert(`Welcome ${user.username}!`)
                })
                .then(() => {
                    resetForm()
                    // redirectAccount()
                })
            } else if (res.status === 422) {
                res.json()
                // error is response from backend
                .then(error => window.alert(error['message']))
                resetForm()
            }
        });
        },
    });
    

    return (
        <div>
            <form onSubmit={formik.handleSubmit} style={{ margin: "30px" }}>
                <h1>Sign Up</h1>
                <label htmlFor="username">Username:</label>
                <br />
                <input
                    id="username"
                    name="username"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                />
                <p style={{ color: "red" }}> {formik.errors.name}</p>

                <label htmlFor="password">Password:</label>
                <br />
                <input
                    id="password"
                    name="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                />
                <p style={{ color: "red" }}> {formik.errors.password}</p>

                <label htmlFor="confirm-password">Confirm Password:</label>
                <br />
                <input
                    id="confirm-password"
                    name="confirmPassword"
                    onChange={formik.handleChange}
                    value={formik.values.confirmPassword}
                />
                <p style={{ color: "red" }}> {formik.errors.confirmPassword}</p>

                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default SignupForm;