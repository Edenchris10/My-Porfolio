 "use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import emailjs from '@emailjs/browser';

import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectLabel, 
  SelectTrigger,
  SelectValue
 } from "@/components/ui/select";

 import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa"

const info = [
  {
    icon: <FaPhoneAlt />,
    title: "phone - WhatsApp",
    description: "+241 077 089 776 / 065 97 30 19 ",
  },
  {
    icon: <FaEnvelope />,
    title: "Email",
    description: "mboribrandon@gmail.com",
  },
  {
    icon: <FaMapMarkerAlt />,
    title: "Address",
    description: "Libreville, GABON",
  },
];

// Country codes list
const countryCodes = [
  { code: '+241', country: 'Gabon', flag: '🇬🇦' },
  { code: '+1', country: 'USA/Canada', flag: '🇺🇸' },
  { code: '+44', country: 'UK', flag: '🇬🇧' },
  { code: '+33', country: 'France', flag: '🇫🇷' },
  { code: '+49', country: 'Germany', flag: '🇩🇪' },
  { code: '+237', country: 'Cameroon', flag: '🇨🇲' },
  { code: '+234', country: 'Nigeria', flag: '🇳🇬' },
  { code: '+27', country: 'South Africa', flag: '🇿🇦' },
  { code: '+254', country: 'Kenya', flag: '🇰🇪' },
  { code: '+91', country: 'India', flag: '🇮🇳' },
  { code: '+86', country: 'China', flag: '🇨🇳' },
  { code: '+971', country: 'UAE', flag: '🇦🇪' },
  { code: '+966', country: 'Saudi Arabia', flag: '🇸🇦' },
];

import { motion } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    countryCode: '+241',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCountryCodeChange = (value) => {
    setFormData({
      ...formData,
      countryCode: value
    });
  };

  const handleServiceChange = (value) => {
    setFormData({
      ...formData,
      service: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const fullPhoneNumber = `${formData.countryCode} ${formData.phone}`;

    try {
      const result = await emailjs.send(
        'service_j906klh',      // Replace with your Service ID from Step 3
        'template_m43119h',     // Replace with your Template ID from Step 4
        {
          from_firstname: formData.firstname,
          from_lastname: formData.lastname,
          from_email: formData.email,
          phone: fullPhoneNumber,
          service: formData.service,
          message: formData.message,
        },
        'QuuLbE0-ODpdKr0tK'       // Replace with your Public Key from Step 5
      );

      console.log('SUCCESS!', result.text);
      alert('✅ Message sent successfully! I will get back to you soon.');
      
      // Reset form
      setFormData({
        firstname: '',
        lastname: '',
        email: '',
        countryCode: '+241',
        phone: '',
        service: '',
        message: ''
      });
    } catch (error) {
      console.error('FAILED...', error);
      alert('❌ Failed to send message. Please try again or contact me directly via email.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.section
      initial ={{ opacity: 0}}
      animate={{
        opacity: 1,
        transition: { delay: 2.4, duration: 0.4, ease:"easeIn"},
      }}
      className="py-6"
    > 
    <div className="container mx-auto">
      <div className="flex flex-col xl:flex-row gap-[30px]">
        {/* form */}
        <div className="xl:h-[54%] order-2 xl:order-none">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-10 bg-[#27272c]
          rounded-xl ">
            <h3 className="text-4xl text-accent">Let's work together</h3>
            <p className="text-white/60">Looking for a creative and strategic partner? Contact me to discuss how my 
            skills can add value to your company or brand.</p>
             {/* input */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input 
                type="text" 
                name="firstname"
                placeholder="Firstname"
                value={formData.firstname}
                onChange={handleChange}
                required
              />
              <Input 
                type="text" 
                name="lastname"
                placeholder="Lastname"
                value={formData.lastname}
                onChange={handleChange}
                required
              />
              <Input 
                type="email" 
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {/* Phone number with country code */}
              <div className="flex gap-2">
                <Select onValueChange={handleCountryCodeChange} value={formData.countryCode}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="+241" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Country Code</SelectLabel>
                      {countryCodes.map((item) => (
                        <SelectItem key={item.code} value={item.code}>
                          {item.flag} {item.code}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Input 
                  type="tel" 
                  name="phone"
                  placeholder="Phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="flex-1"
                />
              </div>
             </div>
             {/* select */}
             <Select onValueChange={handleServiceChange} value={formData.service} required>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select a service</SelectLabel>
                  <SelectItem value="Web Development">Web Development</SelectItem>
                  <SelectItem value="UI/UX Design">UI/UX Design</SelectItem>
                  <SelectItem value="Digital Marketing">Digital Marketing</SelectItem>
                  <SelectItem value="Online Ads">Online Ads</SelectItem>
                </SelectGroup>
              </SelectContent>
             </Select>
             {/* textarea*/}
             <Textarea 
              className="h-[200px]"
              name="message"
              placeholder="Enter your message here."
              value={formData.message}
              onChange={handleChange}
              required
              />
              {/* submit button */}
              <Button 
                type="submit" 
                size="md" 
                className="max-w-44"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Submit message'}
              </Button>
          </form>
        </div>
        {/* info */}
        <div className="flex-1 flex items-center xl:justify-end order-1
        xl:order-none mb-8 xl:mb-0">
          <ul className="flex flex-col gap-10">
            {info.map((item, index)=> {
              return ( 
              <li key={index} className="flex items-center gap-6">
              <div className="w-[52px] h-[52px] xl:w-[72px] xl:h-[72px] bg-[#27272c] 
              text-accent rounded-md flex items-center
              justify-center">
                <div className="text-[28px]">{item.icon}</div>
              </div>
              <div className="flex-1">
                <p className="text-white/60">{item.title}</p>
                <h3 className="text-xl">{item.description}</h3>
              </div>
              </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
    </motion.section>
  );
};

export default Contact;