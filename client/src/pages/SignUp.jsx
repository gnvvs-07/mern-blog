import { Button, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";

export default function SignUp() {
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
          <form className="flex flex-col gap-4">
            <div>
              <Label value="User name" />
              <TextInput
                type="text"
                placeholder="Enter your user name"
                id="username"
                className=""
              />
            </div>
            <div>
              <Label value="Email" />
              <TextInput
                type="text"
                placeholder="email@company.com"
                id="email"
                className=""
              />
            </div>
            <div>
              <Label value="Password" />
              <TextInput
                type="text"
                placeholder="Enter your password"
                id="password"
                className=""
              />
            </div>
            {/* submit button */}
            <Button gradientDuoTone="purpleToBlue" outline type="submit">
              SignUp
            </Button>
          </form>
          <div className="flex flex-row gap-3 text-sm">
            <span className="font-semibold">Have an account</span>
            <Link to="/sign-in" className=" font-bold text-blue-500">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
