import { Button, TextInput } from "flowbite-react";
import { useSelector } from "react-redux";

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-8 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-3">
        <div className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full">
          <img
            src={currentUser.profilePicture}
            alt="Userimgage.png"
            className="rounded-full w-full h-full object-cover border-8 border-[lightgray]"
          />
        </div>
        <TextInput
          placeholder="Username"
          id="username"
          type="text"
          defaultValue={currentUser.username}
        />
        <TextInput
          placeholder="Email"
          id="email"
          type="email"
          defaultValue={currentUser.email}
        />
        <TextInput placeholder="password" id="username" type="password" />
        <Button type="submit" gradientDuoTone="purpleToPink" outline>
            Update
        </Button>
      </form>
      <div className="text-red-500 flex justify-between mt-7">
        <span>Delete Account</span>
        <span>SignOut</span>
      </div>
    </div>
  );
}
