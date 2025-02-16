import { faInbox, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function ContactPage() {
  return (
    <div className=" flex md:flex-row-reverse  gap-10 px-10 flex-col  items-center ">
      <form className="shadow-md w-[100%] lg:max-w-[800px] h-[100%] md:h-[557px] p-12    ">
        <div className="flex  lg:flex-row   flex-col  gap-8   mb-11">
          <input
            type={'text'}
            className=" rounded-sm h-8 focus:outline-none  px-2 bg-[#F5F5F5] w-[100%]     "
            placeholder="Your Name "
          />
          <input
            type={'text'}
            className=" rounded-sm h-8 focus:outline-none  px-2 bg-[#F5F5F5] w-[100%]     "
            placeholder="Your Name "
          />
          <input
            type="number"
            className=" rounded-sm h-8 focus:outline-none  px-2 bg-[#F5F5F5] w-[100%]     "
            placeholder="Your Phone "
          />
        </div>
        <input
          type="text"
          className=" rounded-sm  focus:outline-none  px-2 bg-[#F5F5F5] h-[207px] w-[100%]  placeholder:translate-y-[-70px]          "
          placeholder="Your Massage"
        />

        <button
          className=" p-1 rounded-sm bg-red-600 text-white  mt-5 "
          type="submit"
        >
          Send Massage
        </button>
      </form>
      <div className=" w-[340px] h-[557px] p-5  shadow-md space-y-12 ">
        <div className="flex flex-col  gap-2">
          <h1 className="font-semibold flex gap-2">
            <FontAwesomeIcon
              icon={faPhone}
              className="bg-red-600 w-5 h-5 p-2 rounded-full  text-white"
            />
            <p>Call To Us</p>
          </h1>
          <p>We are available 24/7, 7 days a week.</p>
          <p>Phone: +8801611112222</p>
        </div>
        <hr />
        <div className="flex flex-col gap-2 ">
          <h1 className="font-semibold flex gap-2  items-center">
            <FontAwesomeIcon
              icon={faInbox}
              className="bg-red-600 w-5 h-5 p-2 rounded-full  text-white"
            />
            <p> Write To US</p>
          </h1>
          <p>Fill out our form and we will contact you within 24 hours.</p>
          <p>Emails: customer@exclusive.com</p>
          <p>Emails: support@exclusive.com</p>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
