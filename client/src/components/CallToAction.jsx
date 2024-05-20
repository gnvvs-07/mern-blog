import { Button } from "flowbite-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function CallToAction() {
  const { currentUser } = useSelector((state) => state.user);
  const isAuthenticated = currentUser !== null;
  const isAdmin = isAuthenticated && currentUser.isAdmin;

  return (
    <div>
      <div className="">
        {!isAuthenticated ? (
          <div className="text-gray-500 flex justify-between">
            <h2 className="cursor-default">
              Welcome! Sign up to access more features.
            </h2>
            <Link to={"/sign-up"}>
              <Button color="primary">Sign Up</Button>
            </Link>
          </div>
        ) : isAdmin ? (
          <div className="flex justify-center text-center border p-3 rounded-md border-dotted">
            <Link to={"/dashboard?tab=profile"}>
              <Button color="success">Go To Profile</Button>
            </Link>
          </div>
        ) : (
          <div className="text-gray-500 flex justify-between">
            <h2 className="cursor-default">Want to become an admin ?</h2>
            <a href="https://forms.gle/VTq7k1Hui6PTaLUU8" target="_blank">
              Fill this google Form
            </a>
          </div>
        )}
      </div>
      <div className="flex flex-col p-3 border border-gray-100 rounded-lg mt-5 justify-center items-center">
        <div className="flex flex-col p-3 border border-gray-500 rounded-lg mt-5 justify-center items-center gap-2">
          <h2>Want to learn more about web Development?</h2>
          <p>Check out our new blogs and projects on this L Blogs</p>
          <Button gradientDuoTone="purpleToPink">
            <a href="" target="_blank" rel="noopener noreferrer">
              Learn more
            </a>
          </Button>
        </div>
        <div className="p-7">
          <img
            src="https://th.bing.com/th/id/R.a6af528227e27e80934c0aa3d912f474?rik=Actokd9ELynA2g&riu=http%3a%2f%2fimages6.fanpop.com%2fimage%2fphotos%2f35800000%2fThe-Death-Note-Wallpaper-death-note-35845680-1920-1200.jpg&ehk=uZSs1bHXbgb4fiVaWg3lXR4KkMmc4k6awGxD%2bZydrzY%3d&risl=&pid=ImgRaw&r=0"
            alt="Web.png"
          />
        </div>
      </div>
    </div>
  );
}
