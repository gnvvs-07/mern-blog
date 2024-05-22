export default function Tutorials(props) {
  return (
    <div className="group relative w-full border border-teal-500 hover:border-2 h-[350px] overflow-hidden rounded-lg sm:w-[350px] transition-all">
      <a href={props.link} target="_blank" rel="noopener noreferrer">
        <div className="h-[260px] w-full object-cover transition-all duration-300 transform scale-100 group-hover:scale-105">
          <img
            className="w-full h-full object-cover"
            src={props.image}
            alt="post cover"
          />
        </div>
      </a>
      <div className="p-3 flex flex-col gap-2">
        <p className="text-lg font-semibold line-clamp-2 transition-all duration-300">
          {props.title}
        </p>
        <span className="italic text-sm transition-all duration-300">
          {props.category}
        </span>
        <a
          href={props.link}
          target="_blank"
          rel="noopener noreferrer"
          className="z-10 group-hover:bottom-0 absolute bottom-0 left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2"
        >
          Read more
        </a>
      </div>
    </div>
  );
}
