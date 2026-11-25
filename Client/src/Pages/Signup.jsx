
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Link, useNavigate } from "react-router-dom";
import * as formik from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "./Pages.css";
import { userRegister } from "../store/Slices/userSlice";
import instance from "../axios/instance";

import { TbLockPassword } from "react-icons/tb";
import { FaUserAlt } from "react-icons/fa";


function Signup() {
  const { Formik } = formik;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const schema = yup.object().shape({
    fullname: yup
      .string()
      .required("Please enter your full name")
      .min(6, "Name must be at least 6 characters")
      .max(50, "Maximum 50 characters allowed"),

    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Email is required"),

    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
  });

  const handleSignup = async (values) => {
    try {
      const { data } = await instance.post("/user/signup", values);

      toast.success(data?.message || "Account created successfully!");

      dispatch(userRegister(values));

      navigate("/login");

    } catch (error) {
      toast.error(
        error?.response?.data?.message || error.message
      );
    }
  };

  return (
    <div className="signup-page">

      {/* Background Effects */}
      <div className="signup-glow signup-glow-one"></div>
      <div className="signup-glow signup-glow-two"></div>
      <div className="signup-grid"></div>

      <div className="signup-wrapper">

        {/* Left Side */}
        <div className="signup-info">

          <div className="brand-logo">
            <span className="brand-icon">✦</span>
            TaskFlow
          </div>

          <div className="signup-info-content">
            <span className="welcome-label">
              YOUR PRODUCTIVITY JOURNEY STARTS HERE
            </span>

            <h1>
              Organize your work.
              <span> Own your time.</span>
            </h1>

            <p>
              Everything you need to stay focused, manage your
              tasks and achieve more every single day.
            </p>

            <div className="feature-list">
              <div className="feature-item">
                <span className="feature-check">✓</span>
                Manage all your tasks in one place
              </div>

              <div className="feature-item">
                <span className="feature-check">✓</span>
                Track your daily progress
              </div>

              <div className="feature-item">
                <span className="feature-check">✓</span>
                Stay organized and productive
              </div>
            </div>
          </div>

          <div className="signup-footer-text">
            Build better habits. Get things done.
          </div>

        </div>

        {/* Right Side - Signup Form */}
        <div className="signup-form-section">

          <div className="signup-card">

            <div className="signup-card-header">
              <div className="signup-icon">
                ✨
              </div>

              <h2>Create your account</h2>

              <p>
                Get started with your free account today.
              </p>
            </div>

            <Formik
              validationSchema={schema}
              onSubmit={handleSignup}
              initialValues={{
                fullname: "",
                email: "",
                password: "",
              }}
            >
              {({
                handleSubmit,
                handleChange,
                handleBlur,
                values,
                touched,
                errors,
                isSubmitting,
              }) => (

                <Form noValidate onSubmit={handleSubmit}>

                  {/* Full Name */}
                  <Form.Group className="signup-field">
                    <Form.Label>Full name</Form.Label>

                    <InputGroup>
                      <InputGroup.Text className="signup-input-icon">
                        <span><FaUserAlt/></span>
                      </InputGroup.Text>

                      <Form.Control
                        type="text"
                        name="fullname"
                        placeholder="Enter your full name"
                        value={values.fullname}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={
                          touched.fullname && !!errors.fullname
                        }
                        autoComplete="name"
                      />
                    </InputGroup>

                    {touched.fullname && errors.fullname && (
                      <div className="signup-error">
                        {errors.fullname}
                      </div>
                    )}
                  </Form.Group>

                  {/* Email */}
                  <Form.Group className="signup-field">
                    <Form.Label>Email address</Form.Label>

                    <InputGroup>
                      <InputGroup.Text className="signup-input-icon">
                        <span>✉</span>
                      </InputGroup.Text>

                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="name@example.com"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={
                          touched.email && !!errors.email
                        }
                        autoComplete="email"
                      />
                    </InputGroup>

                    {touched.email && errors.email && (
                      <div className="signup-error">
                        {errors.email}
                      </div>
                    )}
                  </Form.Group>

                  {/* Password */}
                  <Form.Group className="signup-field">
                    <Form.Label>Password</Form.Label>

                    <InputGroup>
                      <InputGroup.Text className="signup-input-icon">
                        <span><TbLockPassword/>


</span>
                      </InputGroup.Text>

                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Create a strong password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={
                          touched.password && !!errors.password
                        }
                        autoComplete="new-password"
                      />

                      <Button
                        type="button"
                        className="password-toggle"
                        onClick={() =>
                          setShowPassword(!showPassword)
                        }
                      >
                        {showPassword ? "Hide" : "Show"}
                      </Button>
                    </InputGroup>

                    {touched.password && errors.password && (
                      <div className="signup-error">
                        {errors.password}
                      </div>
                    )}

                    <div className="password-hint">
                      Use at least 8 characters.
                    </div>
                  </Form.Group>

                  {/* Submit */}
                  <Button
                    type="submit"
                    className="signup-submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Creating account..."
                    ) : (
                      <>
                        Create Account
                        <span className="submit-arrow"> →</span>
                      </>
                    )}
                  </Button>

                </Form>
              )}
            </Formik>

            <div className="signup-divider">
              <span>ALREADY HAVE AN ACCOUNT?</span>
            </div>

            <div className="signup-login">
              <Link to="/login">
                Sign in to your account →
              </Link>
            </div>

          </div>

          <p className="signup-bottom-text">
            © 2026 TaskFlow. All rights reserved.
          </p>

        </div>

      </div>
    </div>
  );
}

export default Signup;
