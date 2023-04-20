import {useFormik} from "formik";
import * as yup from "yup";


function LoginForm({user, setUser, redirectAccount}) {

    const formSchema = yup.object().shape({
        username: yup.string().required("Must enter username"),
        password: yup.string().required("Must enter a password"),
    });

    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
    
        validationSchema: formSchema,
        onSubmit: (values, {resetForm}) => {
            // http://127.0.0.1:5555/login
            fetch("login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(values, null, 2),
            })
            .then((res) => {
                if (res.status === 401) {
                    window.alert("Account not Found! Please check your input.")
                    resetForm()
                } else {
                    res.json()
                    .then((user) => {
                        setUser(user)
                        window.alert(`Welcome back ${user.username}!`)
                    })
                    .then(() => {
                        resetForm()
                        // redirectAccount()
                    }) 
                }
            });
        },
    });

    // const recoveryFormSchema = yup.object().shape({
    //     email: yup.string().email('Invalid email').required('Email is required')
    // })

    // const recoveryFormik = useFormik({
    //     initialValues: {
    //         email: '',
    //     },
    //     validationSchema: recoveryFormSchema,
    //     onSubmit:(values) => {
    //         fetch('password-recovery', {
    //             method: 'POST',
    //             headers: {'Content-Type': 'application/json'},
    //             body: JSON.stringify(values, null, 2),
    //         })
    //         .then((res) => {
    //             if (res.status === 200) {
    //                 window.alert('Password recovery email sent. Please check your email')
    //             } else if (res.status === 404) {
    //                 window.alert("Email not found. Please check your input.");
    //             } else {
    //             window.alert("Password recovery failed. Please try again later.");
    //             } 
    //         })
    //         .catch((err) => {
    //             console.err("Password recovery error:", err)
    //         })
    //     }
    // })

    return (
        <div>
            <form 
                onSubmit={formik.handleSubmit} 
                style={{ margin: "30px" }} 
                className="font-normal md:font-bold"
            >
                <h1>Login</h1>

                <label htmlFor="username">Username:</label>
                <br />
                <input
                    id="username"
                    name="username"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                />
                <p style={{ color: "red" }}> {formik.errors.username}</p>

                <label htmlFor="password">Password:</label>
                <br />
                <input
                    id="password"
                    type="password"
                    name="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                />
                <p style={{ color: "red" }}> {formik.errors.password}</p>
                <button type="submit">Submit</button>
            </form>

            {/* <form onSubmit={recoveryFormik.handleSubmit} style={{ margin: "30px" }}>
                <h1>Forgot Your Password?</h1>
                <label htmlFor="email">Email:</label>
                <br />
                <input
                id="email"
                name="email"
                onChange={recoveryFormik.handleChange}
                value={recoveryFormik.values.email}
                />
                <p style={{ color: "red" }}>{recoveryFormik.errors.email}</p>
                <button type="submit">Submit</button>
            </form> */}
        </div>
    )
}

export default LoginForm;