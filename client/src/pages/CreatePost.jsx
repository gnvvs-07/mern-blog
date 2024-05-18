import {TextInput,Select, FileInput, Button} from "flowbite-react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
export default function CreatePost() {
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-4xl my-4 font-semibold">Create a post</h1>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          {/* form starts here */}
          <TextInput className="flex-1" type="text" placeholder="Title" required id="title" />
          <Select>
            <option value="uncategorized">Select Category</option>
            <option value="python">Python</option>
            <option value="reactjs">React.js</option>
            <option value="backend">Backend</option>
            <option value="mern">MERN</option>
            <option value="mean">MEAN</option>
            <option value="full-stack">Full Stack Web Development</option>
          </Select>
        </div>
        <div className="flex gap-5 justify-between items-center border-4 border-teal-400 border-dotted p-3">
          <FileInput type="file" accept="image/*" />
          <Button type="button" size="sm" outline gradientDuoTone="tealToLime">
            Upload Image
          </Button>
        </div>
        <ReactQuill theme = "snow" placeholder="Write something" className="h-80 mb-10" required/>
        <Button type="submit" gradientDuoTone="tealToLime" outline>POST</Button>
      </form>
    </div>
  )
}
