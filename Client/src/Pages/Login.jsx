
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { MdMarkEmailRead } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { FaTasks } from "react-icons/fa";


import "./Pages.css";
import instance from "../axios/instance";
import { userLogin } from "../store/Slices/userSlice";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Yup validation schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Please enter a valid email address")
      .required("Email is required"),

    password: Yup.string()
      .required("Password is required"),
  });

  // Formik
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema,

    onSubmit: async (values) => {
      try {
        setLoading(true);

        const { data } = await instance.post(
          "/user/login",
          values
        );

        dispatch(userLogin(data?.user));

        toast.success(data?.message || "Login successful!");

        navigate("/");
      } catch (error) {
        toast.error(
          error?.response?.data?.message ||
          error.message ||
          "Login failed"
        );
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="login-page">

      {/* Background Effects */}
      <div className="login-glow login-glow-one"></div>
      <div className="login-glow login-glow-two"></div>
      <div className="login-grid"></div>

      <div className="login-wrapper">

        {/* Left Side */}
        <div className="login-info">

          <div className="login-brand-logo">
            <span className="login-brand-icon">✦</span>
            TASK MANAGER 
          </div>

          <div className="login-info-content">

            <span className="login-welcome-label">
              WELCOME BACK TO TASKFLOW
            </span>

            <h1>
              Your goals are waiting.
              <span> Let's get started.</span>
            </h1>

            <p>
              Pick up where you left off. Stay focused,
              manage your tasks and make today productive.
            </p>

            <div className="login-feature-list">

              <div className="login-feature-item">
                <span className="login-feature-check">✓</span>
                Access your personal workspace
              </div>

              <div className="login-feature-item">
                <span className="login-feature-check">✓</span>
                Continue tracking your progress
              </div>

              <div className="login-feature-item">
                <span className="login-feature-check">✓</span>
                Turn your plans into achievements
              </div>

            </div>
          </div>

          <div className="login-footer-text">
            Stay focused. Stay productive.
          </div>

        </div>

        {/* Right Side */}
        <div className="login-form-section">

          <div className="login-card">

            <div className="login-card-header">

              <div className="login-icon">
                <FaTasks />

              </div>

              <h2>Welcome back!</h2>

              <p>
                Enter your credentials to access your account.
              </p>

            </div>

            <Form onSubmit={formik.handleSubmit} noValidate>

              {/* Email */}
              <Form.Group className="login-field">
                <Form.Label>Email address</Form.Label>

                <InputGroup>

                  <InputGroup.Text className="login-input-icon">
                    <MdMarkEmailRead />

                  </InputGroup.Text>

                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="name@example.com"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={
                      formik.touched.email &&
                      !!formik.errors.email
                    }
                    autoComplete="email"
                  />

                  <Form.Control.Feedback type="invalid">
                    {formik.errors.email}
                  </Form.Control.Feedback>

                </InputGroup>
              </Form.Group>

              {/* Password */}
              <Form.Group className="login-field">

                <Form.Label>Password</Form.Label>

                <InputGroup>

                  <InputGroup.Text className="login-input-icon">
                    <TbLockPassword />

                  </InputGroup.Text>

                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={
                      formik.touched.password &&
                      !!formik.errors.password
                    }
                    autoComplete="current-password"
                  />

                  <Button
                    type="button"
                    className="login-password-toggle"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                  >
                    {showPassword ? "Hide" : "Show"}
                  </Button>

                  <Form.Control.Feedback type="invalid">
                    {formik.errors.password}
                  </Form.Control.Feedback>

                </InputGroup>

              </Form.Group>

              {/* Remember Me */}
              <div className="login-options">

                <Form.Check
                  type="checkbox"
                  id="rememberMe"
                  label="Remember me"
                  checked={remember}
                  onChange={(e) =>
                    setRemember(e.target.checked)
                  }
                />

                <Link
                  to="/forgot-password"
                  className="forgot-password"
                >
                  Forgot password?
                </Link>

              </div>

              {/* Login Button */}
              <Button
                type="submit"
                className="login-submit"
                disabled={loading}
              >

                {loading ? (
                  "Signing in..."
                ) : (
                  <>
                    Sign In
                    <span className="login-submit-arrow"> →</span>
                  </>
                )}

              </Button>

            </Form>

            <div className="login-divider">
              <span>NEW TO TASKFLOW?</span>
            </div>

            <div className="login-signup">
              <Link to="/signup">
                Create your free account →
              </Link>
            </div>

          </div>

          <p className="login-bottom-text">
            © 2026 TaskFlow. All rights reserved.
          </p>

        </div>

      </div>
    </div>
  );
}

export default Login;
