import React,{useState,useEffect}from "react";
import {withFormik,Form,Field,} from "formik";
import * as Yup from "yup";
import axios from "axios";



 const UserForm=({values,status,errors,touched})=>{
     const [users,setUsers] = useState([]);
     console.log(values)
     useEffect(()=>{
         console.log("status has changed!", status);
         status && setUsers(users => [...users,status])
     },[status]);
    return(
        <div className="container">
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
            <label htmlFor="terms" className="checkbox">
                <Field type="checkbox" id="terms" value="terms" checked={values.terms}/>
                <span className="checkmark"></span>
            </label>
            <button type="submit">Add User</button>
        </Form>
        {users.map(user =>{
            return (
                <div className="userCard">
                <h2>{user.name}</h2>
                <h3>{user.email}</h3>
                </div>
            )
        })}
        </div>
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
        name:Yup.string().required().min(3,"Your name is must be at least 3 characters, sorry to all the Bo's of the world"),
        email: Yup.string().required().email("Please enter a proper Email"),
        password: Yup.string()
        .required("Please Enter Your Password")
        .min(8,"Your Password must be at least 8 characters")
        .matches(/[a-zA-Z]/,"Your Password Can Only Contain Letters")
        terms: Yup.boolean().required();
    }),
    handleSubmit(values,{setStatus,resetForm}) {
        console.log("submitting",values);
        axios.post("https://reqres.in/api/users/",values)
        .then(res => {
            console.log("success", res);
            setStatus(res.data);
            resetForm();
        })
        .catch(error => console.log(error.response));
    }
})(UserForm)
export default FormikUserForm;


// - [ ] Name
// - [ ] Email
// - [ ] Password
// - [ ] Terms of Service (checkbox)
// - [ ] A Submit button to send our form data to the server.