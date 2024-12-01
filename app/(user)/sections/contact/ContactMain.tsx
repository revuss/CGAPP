import {
  SlideFromLeft,
  SlideFromRight,
} from "@/app/global/components/animations";
import ContactForm from "./ContactForm";

function ContactMain() {
  return (
    <section className="min-h-[95vh] flex flex-col overflow-hidden gap-y-10 items-center justify-center bg-gray-50">
      <div className="flex flex-col mx-4 gap-2">
        <SlideFromLeft>
          <h2 className="md:text-4xl text-3xl font-bold text-primary bg-gradient-to-r from-secondary via-third to-primary bg-clip-text text-transparent">
            Get in Touch with Us
          </h2>
        </SlideFromLeft>
        <SlideFromLeft>
          <p className="md:text-3xl text-md font-semibold bg-gradient-to-r from-secondary via-third to-primary bg-clip-text text-transparent">
            We&apos;re here to help you with any questions, feedback, or
            partnership inquiries. Please fill out the form below, and our team
            will respond promptly.
          </p>
        </SlideFromLeft>
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 w-[90%] items-center">
        <div className="col-span-1 space-y-3">
          <SlideFromLeft>
            <h2 className="text-xl md:text-3xl font-bold text-primary bg-gradient-to-r from-secondary via-third to-primary bg-clip-text text-transparent">
              Our Address
            </h2>
          </SlideFromLeft>
          <SlideFromLeft>
            <div className="font-medium space-y-1 md:text-xl tracking-normal text-xs text-gray-500">
              <p>Plot No-59, Sivasadan Building</p>
              <p>Harshavardhan Colony, Old Bowenpally</p>
              <p>Secunderabad, 500011.</p>
              <p>cytogenesis@gmail.com</p>
              <div className="cursor-pointer">
                <span>9182765713</span>,&nbsp;<span>8096005601</span>,&nbsp;
                <span>9742278825</span>
              </div>
            </div>
          </SlideFromLeft>
        </div>
        <div className="col-span-1">
          <SlideFromRight>
            <ContactForm />
          </SlideFromRight>
        </div>
      </div>
    </section>
  );
}

export default ContactMain;
