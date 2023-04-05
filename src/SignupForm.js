import {useNavigate} from "react-router-dom";
import {useFormik} from "formik";
import * as yup from "yup";


function SignupForm({user, setUser}) {

    let navigate = useNavigate()

    function redirectHome() {
        navigate('/')
    }
    
    const formSchema = yup.object().shape({
        name: yup.string().required("Must enter username"),
        password: yup.string()
        .required("Must enter a password")
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
        // ADDED ABOVE 2 LINES TO PASSWORD VALIDATION
        
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
            name: "",
            password: "",
            confirmPassword: "",
            // ADDED ABOVE 1 LINE TO CONFIRM PASSWORD
        },
    
        validationSchema: formSchema,
        onSubmit: (values) => {
        // successfully posted a new account to below
        // fetch("http://localhost:8000/blogs", {
        // on db it shows
        // {
        //     "name": "test123456",
        //     "password": "test123456",
        //     "confirmPassword": "test123456",
        //     "id": 13
        // }
        fetch("/signup", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(values, null, 2),
        }).then((res) => {
            if (res.status === 201) {
                redirectHome()
                res.json().then(user => {
                    setUser(user)
                })
            } 
        });
        },
    });

    return (
        <div>
            <form onSubmit={formik.handleSubmit} style={{ margin: "30px" }}>
                <h1>Sign Up</h1>
                <label htmlFor="name">Username:</label>
                <br />
                <input
                    id="name"
                    name="name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
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