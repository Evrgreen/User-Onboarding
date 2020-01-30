import React from "react";
import {withFormik,Form,Field,} from "formik";



 const UserForm=({values,status})=>{
     console.log(values)
    return(
        <Form className="form__container">
            <label htmlFor="name">Name</label>
            <Field id="name" name="name"/>

            <label htmlFor="email">E-mail</label>
            <Field id="email" name="email"/>

            <label htmlFor="password">Password</label>
            <Field id="password" name="password"/>
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
    }
})(UserForm)
export default FormikUserForm;


// - [ ] Name
// - [ ] Email
// - [ ] Password
// - [ ] Terms of Service (checkbox)
// - [ ] A Submit button to send our form data to the server.