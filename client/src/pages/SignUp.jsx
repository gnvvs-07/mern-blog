import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  }; // form data

  // submtting the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("Please fill all the fields");
    }
    // submit to backend
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if (res.ok) {
        navigate("/sign-in");
      }
    } catch (error) {
      // console.log(error);
      setErrorMessage(error.message);
      setLoading(false);
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
              <Label value="User name" />
              <TextInput
                type="text"
                placeholder="Enter your user name"
                id="username"
                className=""
                onChange={handleChange}
              />
            </div>
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
                placeholder="Enter your password"
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
                "SignUp"
              )}
            </Button>
          </form>
          <div className="flex flex-row gap-3 text-sm">
            <span className="font-semibold">Have an account</span>
            <Link to="/sign-in" className=" font-bold text-blue-500">
              Login
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
