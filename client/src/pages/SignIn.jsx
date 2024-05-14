import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInSuccess,
  signInFailure,
  signInStart,
} from "../redux/user/userSlice.js";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  // dispatching
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  }; // form data

  // submtting the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("Please fill all the fields"));
    }
    // submit to backend
    try {
      dispatch(signInStart());
      const res = await fetch("api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      // failure
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex gap-4 p-4 max-w-3xl mx-auto flex-col md:flex-row md:items-center">
        {/* left container  */}
        <div className="flex-1">
          <Link to="/" className="text-4xl font-bold dark:text-white">
            <span className="px-2 py-1 bg-gradient-to-r from-blue-600 via bg-purple-600 to-red-600 text-white rounded-md font-bold">
              L
            </span>
            Blogs
          </Link>
          <p className="text-sm mt-5">
            Welcome to L blogs created for techologies of development signIn
            using google or email
          </p>
        </div>
        {/* right side container  */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Email" />
              <TextInput
                type="email"
                placeholder="email@company.com"
                id="email"
                className=""
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Password" />
              <TextInput
                type="password"
                placeholder="*******"
                id="password"
                className=""
                onChange={handleChange}
              />
            </div>
            {/* submit button */}
            <Button
              gradientDuoTone="purpleToBlue"
              outline
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading</span>
                </>
              ) : (
                "SignIn"
              )}
            </Button>
          </form>
          <div className="flex flex-row gap-3 text-sm">
            <span className="font-semibold">Don&apos;t have an account</span>
            <Link to="/sign-up" className=" font-bold text-blue-500">
              SignUp
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-2" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
