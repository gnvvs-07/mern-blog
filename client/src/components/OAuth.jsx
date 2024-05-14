import { Button } from "flowbite-react";
import React from "react";
import { AiFillGoogleCircle } from "react-icons/ai";
export default function OAuth() {
  return (
    <Button type="button" gradientDuoTone="purpleToPink" outline>
        <AiFillGoogleCircle className="w-6 h-6 mr-3" />
      <span>Continue with Google</span>
    </Button>
  );
}
