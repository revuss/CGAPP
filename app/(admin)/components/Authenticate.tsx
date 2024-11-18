import Link from "next/link";

interface MainFormInterface {
  header: string;
  description: string;
  redirectText: string;
  linkNavigate: string;
  linkText: string;
}
function Authenticate({
  header,
  description,
  redirectText,
  linkNavigate,
  linkText,
}: MainFormInterface) {
  return (
    <div className="max-md:text-center">
      <h2 className="lg:text-4xl text-3xl font-extrabold lg:leading-[55px] bg-gradient-to-r from-secondary via-third to-primary bg-clip-text text-transparent py-2">
        {header}
      </h2>
      <p className="text-sm mt-6">{description}</p>
      <p className="text-sm mt-10">
        {redirectText},&nbsp;
        <Link
          href={linkNavigate}
          className="font-semibold cursor-pointer hover:underline ml-1 bg-gradient-to-r from-secondary via-third to-primary bg-clip-text text-transparent "
        >
          {linkText}
        </Link>
      </p>
    </div>
  );
}

export default Authenticate;
