import React from "react";
import {withFormik,Form,Field,} from "formik";
import * as Yup from "yup";



 const UserForm=({values,status,errors,touched})=>{
     console.log(values)
    return(
        <Form className="form__container">
            <label htmlFor="name">Name</label>
            <Field id="name" name="name"/>

            {touched.name && errors.name && (
            <p className="errors">{errors.name}</p>
          )}
            <label htmlFor="email">E-mail</label>
            <Field id="email" name="email"/>

            {touched.email && errors.email && (
                <p className="errors">{errors.email}</p>
            )}
            <label htmlFor="password">Password</label>
            <Field id="password" name="password"/>

            {touched.password && errors.password && (
                <p className="errors">{errors.password}</p>
            )}
            <button type="submit">Add User</button>
            <label htmlFor="terms" className="checkbox">
                <Field type="checkbox" id="terms" value="terms" checked={values.terms}/>
                <span className="checkmark"></span>
            </label>
        </Form>
    )
    
}

const FormikUserForm = withFormik({
    mapPropsToValues(props){
        return{
            name:props.name||"",
            email:props.email||"",
            password:props.password||"",
            terms:props.terms||false
        }

    },
    validationSchema: Yup.object().shape({
        name:Yup.string().required().min(3),
        email: Yup.string().required().email(),
        password: Yup.string()
        .required("Please Enter Your Password")
        .min(8,"Your Password must be at least 8 characters")
        .matches(/[a-zA-Z]/,"Your Password Can Only Contain Letters")
    }),
})(UserForm)
export default FormikUserForm;


// - [ ] Name
// - [ ] Email
// - [ ] Password
// - [ ] Terms of Service (checkbox)
// - [ ] A Submit button to send our form data to the server.