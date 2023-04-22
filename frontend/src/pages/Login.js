import React, { useState } from 'react';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import "../App.css";
import AuthService from '../services/auth.service';
import { FormikContext, useFormik } from "formik";
import * as Yup from 'yup';


import { useNavigate } from 'react-router-dom';
import { Alert, Button, Form } from 'react-bootstrap';
function Login() {

  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(null);
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required"),
    doNotLogOut: Yup.bool().oneOf([false, true], "")
  });

  const formik = useFormik({
    initialValues: {

      email: "",
      password: "",
      doNotLogOut: false,
    },
    validationSchema,
    // validateOnChange: false,
    // validateOnBlur: false,
    onSubmit: async (data, { setSubmitting }) => {
      setSubmitting(false);
      try {
        const user = await AuthService.loginService(data.email, data.password, data.doNotLogOut);
        console.log(user);
        if (user.success) {
          localStorage.setItem("user", JSON.stringify(user.user));
          navigate('/', { replace: true });
          window.location.reload();
        }
        else {

          alert('Wrong Credentials');
          navigate('/login');

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
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" class="img-fluid" alt="Sample image" />
        </MDBCol>

        <MDBCol col='4' md='6'>

          {showAlert ? <Alert variant='danger'>{showAlert}</Alert> : null}
          <Form onSubmit={formik.handleSubmit}>

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

            </Form.Group>

            <Form.Check label='Do not logout' type='checkbox' className='mb-3' name='doNotLogOut' onChange={formik.handleChange} value={formik.values.doNotLogOut} />

            <Button size='lg' variant='dark' type='submit'>Register</Button>


          </Form>

        </MDBCol>

      </MDBRow>



    </MDBContainer>
  );
}

export default Login;