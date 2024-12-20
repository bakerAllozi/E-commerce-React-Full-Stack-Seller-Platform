import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Image from "../../assets/Frame 720.png";

function Footer() {
  return (
    <>
      <div className="  w-full mt-28 bg-black list-none   grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4     p-10   text-[#FAFAFA] text-sm  ">
        <div className=" justify-center items-center flex flex-col gap-2 lg:justify-start ">
          <h1 className=" mb-3 font-bold  text-lg  "> Exclusive</h1>
          <LinkLi text="Subscribe" />
          <LinkLi text="Get 10% off your first order" />
          <input
            placeholder="Enter your email"
            className="rounded-sm h-8 focus:outline-none  px-2 bg-[#F5F5F5] text-black "
          ></input>
        </div>
        <div className=" justify-center items-center flex flex-col gap-2 lg:justify-start ">
          <h1 className=" mb-3 font-bold  text-lg ">Support</h1>
          <LinkLi text="111 Bijoy sarani, Dhaka,  DH 1515, Bangladesh." to="" />
          <LinkLi text="exclusive@gmail.com" to="" />
          <LinkLi text=" +88015-88888-9999" to="" />
        </div>
        <div className=" justify-center items-center flex flex-col gap-2 lg:justify-start ">
          <h1 className=" mb-3 font-bold  text-lg ">Account</h1>
          <LinkLi text="My Account" to="MyAccount" />
          <LinkLi text="Login / Register" to="LogIn" />
          <LinkLi text="Cart " to="Cart" />
          <LinkLi text=" Wishlist " to="Wishlist" />
          <LinkLi text=" My Stor" to="UserPage" />
        </div>
        <div className=" justify-center items-center flex flex-col gap-2 lg:justify-start ">
          <h1 className=" mb-3 font-bold  text-lg "> Qdivck Link</h1>
          <LinkLi text="Privacy Policy" to="" />
          <LinkLi text="Terms Of Use " to=" About" />
          <LinkLi text=" FAQ " to="Commentpage" />
          <LinkLi text=" Contact" to="Contact" />
          <LinkLi text=" Add Product To Tour Store " to="AddNewProduct" />
        </div>
        <div className=" justify-center items-center flex flex-col gap-2 lg:justify-start ">
          <h1 className=" mb-3 font-bold  text-lg ">Download App</h1>
          <Link to="/">
            <img src={Image} alt="bakerQ1" />
          </Link>

          <div className=" flex gap-5 text-lg justify-center items-center lg:justify-start ">
            <FontAwesomeIcon
              className=" hover:text-teal-300  cursor-pointer "
              icon={faFacebook}
            />
            <FontAwesomeIcon
              className="hover:text-teal-300 cursor-pointer "
              icon={faInstagram}
            />
            <FontAwesomeIcon
              className="hover:text-teal-300 cursor-pointer "
              icon={faLinkedin}
            />
            <FontAwesomeIcon
              className="hover:text-teal-300 cursor-pointer "
              icon={faTwitter}
            />
          </div>
        </div>
      </div>
      <hr className="text-[#aaaa] " />
      <p className="bg-black text-[#aaaa] text-center p-2">
        Copyright Baker Allozi 2024. All right reserved
      </p>
    </>
  );
}

export default Footer;

const LinkLi = ({ text, to }) => {
  return (
    <Link to={to}>
      <li className=" hover:hover:text-teal-300">{text}</li>
    </Link>
  );
};
