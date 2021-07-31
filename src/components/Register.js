  import React, { useState, useRef } from "react";
  import { useDispatch, useSelector } from "react-redux";

  import Form from "react-validation/build/form";
  import Input from "react-validation/build/input";
  import CheckButton from "react-validation/build/button";
  import { isEmail } from "validator";

  import { register } from "../actions/auth";

  const required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };

  const validEmail = (value) => {
    if (!isEmail(value)) {
      return (
        <div className="alert alert-danger" role="alert">
          This is not a valid email.
        </div>
      );
    }
  };

  const vfirstname = (value) => {
    if (value.length < 2) {
      return (
        <div className="alert alert-danger" role="alert">
          Name character should be more than this
        </div>
      );
    }
  };

  const vlastname = (value) => {
    if (value.length < 2) {
      return (
        <div className="alert alert-danger" role="alert">
          Name character should be more than this
        </div>
      );
    }
  };

  const vphone = (value) => {
    if (value.length < 11) {
      return (
        <div className="alert alert-danger" role="alert">
          Phone number cannot be less than 11
        </div>
      );
    }
  };

  const vpassword = (value) => {
    if (value.length < 6 || value.length > 40) {
      return (
        <div className="alert alert-danger" role="alert">
          The password must be between 6 and 40 characters.
        </div>
      );
    }
  };

  const Register = () => {
    const form = useRef();
    const checkBtn = useRef();

    const [first_name, setFirstname] = useState("");
    const [last_name, setLastname] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [successful, setSuccessful] = useState(false);

    const { message } = useSelector(state => state.message);
    const dispatch = useDispatch();

    const onChangeFirstName = (e) => {
      const first_name = e.target.value;
      setFirstname(first_name);
    };

    const onChangeLastName = (e) => {
      const last_name = e.target.value;
      setLastname(last_name);
    };

    const onChangePhone = (e) => {
      const phone = e.target.value;
      setPhone(phone);
    };

    const onChangeEmail = (e) => {
      const email = e.target.value;
      setEmail(email);
    };

    const onChangePassword = (e) => {
      const password = e.target.value;
      setPassword(password);
    };

    const handleRegister = (e) => {
      e.preventDefault();

      setSuccessful(false);

      form.current.validateAll();

      if (checkBtn.current.context._errors.length === 0) {
        let user = {
          email: email, 
          password: password, 
          first_name: first_name, 
          last_name: last_name, 
          phone: phone
        }
        dispatch(register(user))
          .then(() => {
            
            setSuccessful(true);
          })
          .catch(() => {
            setSuccessful(false);
          });
      }
    };

    return (
      <div className="col-md-12">
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <Form onSubmit={handleRegister} ref={form}>
            {!successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="first_name">First Name</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="first_name"
                    value={first_name}
                    onChange={onChangeFirstName}
                    validations={[required, vfirstname]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="last_name">Last Name</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="last_name"
                    value={last_name}
                    onChange={onChangeLastName}
                    validations={[required, vlastname]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="phone"
                    value={phone}
                    onChange={onChangePhone}
                    validations={[required, vphone]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="email"
                    value={email}
                    onChange={onChangeEmail}
                    validations={[required, validEmail]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    value={password}
                    onChange={onChangePassword}
                    validations={[required, vpassword]}
                  />
                </div>

                <div className="form-group">
                  <button className="btn btn-primary btn-block">Sign Up</button>
                </div>
              </div>
            )}

            {message && (
              <div className="form-group">
                <div className={ successful ? "alert alert-success" : "alert alert-danger" } role="alert">
                  {message}
                </div>
              </div>
            )}
            <CheckButton style={{ display: "none" }} ref={checkBtn} />
          </Form>
        </div>
      </div>
    );
  };

  export default Register;
