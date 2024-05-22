import Tutorials from "../components/Tutorials";

export default function Projects() {
  return (
    <>
      <div className=" flex justify-between border m-2 border-teal-500 text-gray-500 p-10">
        <div className="flex flex-col gap-7">
          <p className="font-bold text-black dark:text-white">My</p>
          <p>🟢Web Development Projects</p>
          <p>🔴App Development Projects</p>
          <p>🔴Machine Learning Projects</p>
          <a
            href="https://github.com/gnvvs-07"
            target="_blank"
            className="border border-teal-500 p-2 text-center text-teal-500 hover:text-white hover:bg-teal-500 rounded-md"
          >
            Click Here
          </a>
        </div>
        <div>
          <img
            src="https://images.unsplash.com/photo-1492551557933-34265f7af79e?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHByb2plY3RzfGVufDB8fDB8fHww"
            alt="projects.png"
            height={450}
            width={350}
            className="rounded-md"
          />
        </div>
      </div>
      <div className="flex gap-5 flex-wrap justify-center">
        <Tutorials
          image="https://shethink.in/wp-content/uploads/2021/07/react.js-img.png"
          link="https://react.dev/"
        />
        <Tutorials
          image="https://www.omeecron.com/wp-content/uploads/2022/06/vuejs.png"
          link="https://vuejs.org/"
        />
        <Tutorials
          image="https://miro.medium.com/v2/resize:fit:1200/1*QJnvahq_EBdUGjYQUYrhvA.png"
          link="https://www.mongodb.com/"
        />
        <Tutorials
          image="https://www.loginradius.com/blog/static/6ee159acf6c294342ec04f86aede5d14/701ee/coverImage.jpg"
          link="https://nodejs.org/en"
        />
        <Tutorials
          image="https://www.freecodecamp.org/news/content/images/2020/04/Copy-of-Copy-of-Travel-Photography.png"
          link="https://angular.io/"
        />
        <Tutorials
          image="https://ajeetchaulagain.com/static/7cb4af597964b0911fe71cb2f8148d64/87351/express-js.png"
          link="https://expressjs.com/"
        />
        <Tutorials
          image="https://www.tensorflow.org/static/images/tf_logo_social.png"
          link="https://www.tensorflow.org/resources/learn-ml"
        />
        <Tutorials
          image="https://cdn.freebiesupply.com/logos/large/2x/quote-logo-png-transparent.png"
          link="/quotes"
        />
      </div>
    </>
  );
}
