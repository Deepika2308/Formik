import {useFormik} from "formik";
import * as yup from "yup";

// let validateForm= (values) => {
//   console.log("validate values ", values)
//   let errors={};

//   if(values.password.length <8) {
//     errors.password="please provide password minimum of 8 of characters";
//   } else if(values.password.length>12){
//     errors.password="please provide password maximum of 12 characters";
//   }

//   if(values.email.length <5){
//     errors.email="please provide email minimum of 5 characters";
//   }
//   if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)){
//     errors.email="please provide a valid email";
//   }

//   console.log("errors ",errors);
//   return errors;
// }


export function BasicForm() {
  let {handleBlur,handleChange,handleSubmit,touched,errors,values} = useFormik({
    initialValues:{email:"hii",password:"abcd"},
    validationSchema: formValidationSchema,
    onSubmit : (values) => {
      console.log("onSubmit" , values);
    }
  })
  return (
    <form onSubmit={handleSubmit} className="basic-form">
      <input type="email" 
       id="email"
       name="email"
       onChange={handleChange}
       onBlur={handleBlur}
       placeholder="email" 
        value={values.email} />

      <input type="password" 
       id="password"
       name="password"
       onChange={handleChange}
       onBlur={handleBlur}
       placeholder="password" 
       value={values.password}/>
      <button type="submit">submit</button>
      {/* {errors.password && touched.password ? 
      errors.password : ""}

      {errors.email && touched.email ? 
      errors.email : ""} */}
    </form>
  );
}

let formValidationSchema = yup.object({
  email:yup.string().min(5),
  password:yup.string().min(8).max(12)
})