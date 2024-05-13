import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
export default function FooterCom() {
  return (
    <Footer className="border border-t-4 p-4 mt-6 border-teal-500">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="">
            <Link
              to="/"
              className="self-center whitespace-nowrap text-3xl font-bold dark:text-white"
            >
              <span className="px-2 py-1 bg-gradient-to-r from-blue-600 via bg-purple-600 to-red-600 text-white rounded-md font-bold">
                L
              </span>
              Blogs
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:mt-4 sm:grid-cols-3 sm:gap-5 py-2">
            {/* components of footer */}
            <div>
              <Footer.Title title="About" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://github.com/gnvvs-07"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  L projects
                </Footer.Link>
                <Footer.Link
                  href="https://github.com/gnvvs-07"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  L Blogs
                </Footer.Link>
                <Footer.Link
                  href="https://github.com/gnvvs-07"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  L vision
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow us" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://github.com/gnvvs-07"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github
                </Footer.Link>
                <Footer.Link
                  href="https://github.com/gnvvs-07"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://github.com/gnvvs-07"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacy Policy
                </Footer.Link>
                <Footer.Link
                  href="https://github.com/gnvvs-07"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Terms and Conditions
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="">
          <Footer.Copyright
            href="#"
            by="L's Blog"
            year={new Date().getFullYear()}
          />
          <div className="flex gap-3 justify-center mt-2">
            <a href="#" target="_blank">
              <FaLinkedin />
            </a>
            <a href="#" target="_blank">
              <FaInstagram />
            </a>
            <a href="#" target="_blank">
              <FaDiscord />
            </a>
            <a href="#" target="_blank">
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>
    </Footer>
  );
}
