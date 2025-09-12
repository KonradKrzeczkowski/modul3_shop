import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[var(--color-gray-50)] text-[var(--color-text)] py-[80px] px-[24px] lg:py-[140px] lg:px-[60px]">
      <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row justify-between gap-16">
       
       <div className="lg:w-[531.75px] flex flex-col items-start">

  <Image
    src="/home/nexushub.svg"
    alt="NexusHub Logo"
    width={200}       
    height={46}      
    className="object-contain"
  />


  <p className="mt-[32px] text-[var(--color-heading)] text-sm">
    © 2023 NexusHub. All rights reserved.
  </p>


  <div className="mt-[32px] flex flex-wrap gap-4 m-0 p-0">
    <Image src="/home/Badge.svg" alt="Visa 1" width={46.61} height={30.03} className="object-contain m-0 p-0" />
    <Image src="/home/Badge1.svg" alt="MasterCard" width={46.61} height={30.03} className="object-contain" />
    <Image src="/home/Badge2.svg" alt="PayPal" width={46.61} height={30.03} className="object-contain" />
    <Image src="/home/Badge3.svg" alt="ApplePay" width={46.61} height={30.03} className="object-contain" />
    <Image src="/home/Badge4.svg" alt="GooglePay" width={46.61} height={30.03} className="object-contain" />
  </div>
</div>


   
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-[40px] text-sm">
  
          <div className=" w-[191.06px]">
            <h3 className=" text-[20px] text-[var(--color-heading)] font-semibold mb-[32px]">Company</h3>
        <ul className=" text-[16px] flex flex-col gap-[6px] text-[var(--color-neutral-600)]" >
              <li>About Us</li>
              <li>Contact</li>
              <li>Partner</li>
            </ul>
          </div>

     
          <div className=" w-[191.06px]">
            <h3 className=" text-[20px] text-[var(--color-neutral-900)] font-semibold mb-[32px]">Social</h3>
          <ul className=" text-[16px] flex flex-col gap-[6px] text-[var(--color-neutral-600)]" >
              <li>Instagram</li>
              <li>Twitter</li>
              <li>Facebook</li>
              <li>LinkedIn</li>
            </ul>
          </div>


          <div className=" w-[191.06px]">
            <h3 className=" text-[20px] text-[var(--color-neutral-900)] font-semibold mb-[32px]">FAQ</h3>
             <ul className=" text-[16px] flex flex-col gap-[6px] text-[var(--color-neutral-600)]" >
              <li>Account</li>
              <li>Deliveries</li>
              <li>Orders</li>
              <li>Payments</li>
            </ul>
          </div>

        
          <div className=" w-[191.06px]">
            <h3 className=" text-[20px] text-[var(--color-neutral-900)] font-semibold mb-[32px]">Resources</h3>
            <ul className=" text-[16px] flex flex-col gap-[6px] text-[var(--color-neutral-600)]" >
              <li>E-books</li>
              <li>Tutorials</li>
              <li>Course</li>
              <li>Blog</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}