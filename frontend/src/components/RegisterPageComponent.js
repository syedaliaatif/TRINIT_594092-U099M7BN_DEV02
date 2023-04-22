import React, { useState } from 'react';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import "../App.css";
import { Alert, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { FormikContext, useFormik } from "formik";
import * as Yup from 'yup';


import { useNavigate } from 'react-router-dom';
import AuthService from '../services/auth.service';



function RegisterPageComponent({ registerUserApiRequest }) {

  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(null);
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required").
      min(6, "Name should have atleast 6 characters").
      max(40, "Name shouldn't have more than 40 characters."),

    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
    reEnterPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password"), null], "Confirm Password does not match"),
    rememberMe: Yup.bool().oneOf([false, true], "")
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      reEnterPassword: "",
      rememberMe: false,
    },
    validationSchema,
    // validateOnChange: false,
    // validateOnBlur: false,
    onSubmit: async (data, { setSubmitting }) => {
      console.log("clicked");
      console.log(AuthService);
      setSubmitting(false);
      try {
        const user = await AuthService.registerService(data.name, data.email, data.password);
        console.log(user);
        if (user.success) {
          localStorage.setItem("user", JSON.stringify(user.user));
          navigate('/', { replace: true });
          window.location.reload();
        }
        else {
          setShowAlert(user);

        }
      } catch (error) {
        console.log(error);
      }
    },
  });



  return (
    <MDBContainer fluid className="p-3 my-5 h-custom">


      <MDBRow>

        <MDBCol col='10' md='6'>
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt="Sample image" />
        </MDBCol>

        <MDBCol col='4' md='6'>

          {showAlert ? <Alert variant='danger'>{showAlert}</Alert> : null}
          <Form onSubmit={formik.handleSubmit}>

            <Form.Group className='mb-4'>

              <Form.Control size='lg' type='text' className='mb-1' name='name' onChange={formik.handleChange} value={formik.values.name} isInvalid={formik.errors.name && formik.touched.name} />
              <Form.Label>Name</Form.Label>
              {
                formik.errors.name && formik.touched.name ?
                  <Form.Control.Feedback type='invalid'>{formik.errors.name}</Form.Control.Feedback> : null
              }
            </Form.Group>
            <Form.Group className='mb-4'>

              <Form.Control size='lg' type='email' className='mb-1' name='email' onChange={formik.handleChange} value={formik.values.email} isInvalid={formik.errors.email && formik.touched.email} />
              <Form.Label>Email</Form.Label>
              {
                formik.errors.email && formik.touched.email ?
                  <Form.Control.Feedback type='invalid'>{formik.errors.email}</Form.Control.Feedback> : null
              }
            </Form.Group>
            <Form.Group className='mb-4'>

              <Form.Control size='lg' type='password' className='mb-1' name='password' onChange={formik.handleChange} value={formik.values.password} isInvalid={formik.errors.password && formik.touched.password} />
              <Form.Label>Password</Form.Label>
              {
                formik.errors.password && formik.touched.password ?
                  <Form.Control.Feedback type='invalid' >{formik.errors.password}</Form.Control.Feedback> : null
              }

              <Form.Text className='text-white' ><br />Password should be atleast 8 characters long.</Form.Text>
            </Form.Group>

            <Form.Group className='mb-5'>

              <Form.Control size='lg' type='password' className='mb-1' name='reEnterPassword' onChange={formik.handleChange} value={formik.values.reEnterPassword} isInvalid={formik.errors.reEnterPassword && formik.touched.reEnterPassword} />
              <Form.Label>Retype Password</Form.Label>
              {
                formik.errors.reEnterPassword && formik.touched.reEnterPassword ?
                  < Form.Control.Feedback type='invalid' >{formik.errors.reEnterPassword}</Form.Control.Feedback> : null
              }
            </Form.Group>

            <Form.Check label='Remember Me' type='checkbox' className='mb-3' name='rememberMe' onChange={formik.handleChange} value={formik.values.rememberMe} />

            <Button size='lg' variant='dark' type='submit'>Register</Button>


          </Form>

        </MDBCol>

      </MDBRow>



    </MDBContainer >
  );
}

export default RegisterPageComponent;