"use client";

import { BsArrowDownRight } from "react-icons/bs"
import Link from "next/link";

const service = [
  {
    num: '01',
    title: 'Web Development',
    description:'I build powerful, user-centered web solutions — from sleek, responsive designs to robust back-end systems. Using React.js and Node.js, I craft fast, secure, and scalable applications that help brands grow, engage, and thrive online effortlessly.',
    href:'/contact',
  },
  {
    num: '02',
    title: 'UI/UX Design',
    description:'I’m a UI/UX designer passionate about creating intuitive and visually engaging digital experiences. From research to prototyping, I design smooth interactions, consistent systems, and user journeys that connect people with brands effortlessly.',
    href:'/contact',
  },
  {
    num: '03',
    title: 'SEO',
    description:"I help businesses boost their online visibility by optimizing websites for search engines. Through keyword research, technical SEO, content strategy, link building, and analytics, I drive higher rankings, increased traffic, and measurable results.",
    href:'/contact',
  },
  {
    num: '04',
    title: 'Digital Marketing',
    description:"I help businesses grow online by crafting and executing results-driven digital strategies. From paid ads and social media to email marketing, SEO, and analytics, I boost visibility, engagement, and brand impact across all digital channels.",
    href:'/contact',
  },
  
];

import { easeIn, motion } from "framer-motion";

const Services = () =>{
  return( <section className="min-h-[80vh] flex flex-col justify-center py-12 xl:py-0 ">

        <div className="container mx-auto">
          <motion.div 
            initial={{opacity: 0}} 
            animate={{
              opacity: 1, 
              transition:{delay:2.4, duration:0.4, ease: "easeIn" },
          }} 
            className="grid grid-cols-1 md:grid-cols-2 gap-[60px] "
          >

            {service.map((service, index)=> {
              return <div key={index} className="flex-1 flex flex-col justify-center gap-6 group" >
                {/* top */}
                <div className="w-full flex justify-between items-center" >
                  <div className="text-5xl font-extrabold text-outline 
                  text-transparent group-hover:text-outline-hover transition all 
                  duration-500 ">{service.num}</div>
                  <Link href={service.href} className="w-[70px] h-[70px] rounded-full
                  bg-white group-hover:bg-accent transition-all duration-500 flex
                  justify-center items-center hover:-rotate-45"
                   >
                    <BsArrowDownRight className="text-primary text-3xl" />
                  </Link>
                </div>
                {/* title */}
                <h2 className="text-[42px] font-bold leading-none text-white 
                group-hover:text-accent transition-all duration-500" >{service.title}</h2>
                {/* description */}
                 <p className="text-white/60" >{service.description}</p>
                 {/* border */} 
                  <div className="border-b border-white/20 w-full "></div>

              </div>
            })}

          </motion.div>
        </div>
     </section>
     );
  };

export default Services; 