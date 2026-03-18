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

// ─── WHITELISTS ───────────────────────────────────────────────────────────────
const ALLOWED_COUNTRY_CODES = countryCodes.map((c) => c.code);
const ALLOWED_SERVICES = ['Web Development', 'UI/UX Design', 'Digital Marketing', 'Online Ads'];

// ─── SANITIZERS ──────────────────────────────────────────────────────────────
// Strips HTML tags, XSS vectors, and trims to safe length
const sanitizeText = (val) =>
  val
    .replace(/<[^>]*>/g, '')          // strip HTML tags
    .replace(/[<>"'`]/g, '')          // strip XSS characters
    .replace(/javascript:/gi, '')     // strip JS protocol
    .replace(/on\w+\s*=/gi, '')       // strip inline event handlers (onclick=, onerror=…)
    .trim()
    .slice(0, 500);

const sanitizeEmail = (val) =>
  val.trim().toLowerCase().slice(0, 254);

// Keeps only digits and spaces for display; no letters or symbols
const sanitizePhone = (val) =>
  val.replace(/[^\d\s]/g, '').slice(0, 15);

// ─── VALIDATORS ──────────────────────────────────────────────────────────────
const validators = {
  firstname: (v) => {
    if (!v.trim()) return 'Firstname is required';
    if (v.trim().length < 2) return 'Firstname must be at least 2 characters';
    if (v.trim().length > 50) return 'Firstname is too long (max 50)';
    // Only Unicode letters, spaces, hyphens, apostrophes and dots — no digits
    if (!/^[\p{L}\s'\-.]+$/u.test(v.trim())) return 'Firstname must contain letters only';
    return '';
  },
  lastname: (v) => {
    if (!v.trim()) return 'Lastname is required';
    if (v.trim().length < 2) return 'Lastname must be at least 2 characters';
    if (v.trim().length > 50) return 'Lastname is too long (max 50)';
    if (!/^[\p{L}\s'\-.]+$/u.test(v.trim())) return 'Lastname must contain letters only';
    return '';
  },
  email: (v) => {
    if (!v.trim()) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())) return 'Enter a valid email address';
    return '';
  },
  countryCode: (v) => {
    if (!ALLOWED_COUNTRY_CODES.includes(v)) return 'Select a valid country code';
    return '';
  },
  phone: (v) => {
    if (!v.trim()) return 'Phone number is required';
    // After stripping spaces: 6–15 digits only
    if (!/^\d{6,15}$/.test(v.replace(/\s/g, ''))) return 'Phone must contain 6–15 digits';
    return '';
  },
  service: (v) => {
    if (!v || !ALLOWED_SERVICES.includes(v)) return 'Select a valid service';
    return '';
  },
  message: (v) => {
    if (!v.trim()) return 'Message is required';
    if (v.trim().length < 10) return 'Message must be at least 10 characters';
    if (v.trim().length > 2000) return 'Message is too long (max 2000 characters)';
    return '';
  },
};

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
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ─── Validate a single field and update errors state ───────────────────────
  const validateField = (name, value) => {
    if (!validators[name]) return '';
    const error = validators[name](value);
    setErrors((prev) => ({ ...prev, [name]: error }));
    return error;
  };

  // ─── HANDLERS ─────────────────────────────────────────────────────────────

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Block digits in name fields at input time
    if ((name === 'firstname' || name === 'lastname') && /\d/.test(value)) return;

    // Block non-digit characters in phone field at input time
    if (name === 'phone' && /[^\d\s]/.test(value)) return;

    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const handleCountryCodeChange = (value) => {
    setFormData({ ...formData, countryCode: value });
    validateField('countryCode', value);
  };

  const handleServiceChange = (value) => {
    setFormData({ ...formData, service: value });
    validateField('service', value);
  };

  // ─── SUBMIT ───────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Run all validators at once
    const newErrors = {};
    Object.keys(validators).forEach((field) => {
      newErrors[field] = validators[field](formData[field] ?? '');
    });
    setErrors(newErrors);

    // Abort if any error exists
    if (Object.values(newErrors).some(Boolean)) return;

    setIsSubmitting(true);

    // Build sanitized payload — never send raw formData
    const sanitizedPayload = {
      from_firstname: sanitizeText(formData.firstname),
      from_lastname:  sanitizeText(formData.lastname),
      from_email:     sanitizeEmail(formData.email),
      phone:          `${formData.countryCode} ${sanitizePhone(formData.phone)}`,
      service:        ALLOWED_SERVICES.includes(formData.service) ? formData.service : '',
      message:        sanitizeText(formData.message),
    };

    try {
      const result = await emailjs.send(
        'service_j906klh',
        'template_m43119h',
        sanitizedPayload,
        'QuuLbE0-ODpdKr0tK'
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
      setErrors({});
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
              <div className="flex flex-col gap-1">
                <Input 
                  type="text" 
                  name="firstname"
                  placeholder="Firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  required
                />
                {errors.firstname && <p className="text-red-400 text-xs">{errors.firstname}</p>}
              </div>

              <div className="flex flex-col gap-1">
                <Input 
                  type="text" 
                  name="lastname"
                  placeholder="Lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  required
                />
                {errors.lastname && <p className="text-red-400 text-xs">{errors.lastname}</p>}
              </div>

              <div className="flex flex-col gap-1">
                <Input 
                  type="email" 
                  name="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                {errors.email && <p className="text-red-400 text-xs">{errors.email}</p>}
              </div>

              {/* Phone number with country code */}
              <div className="flex flex-col gap-1">
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
                {(errors.phone || errors.countryCode) && (
                  <p className="text-red-400 text-xs">{errors.phone || errors.countryCode}</p>
                )}
              </div>
             </div>

             {/* select */}
             <div className="flex flex-col gap-1">
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
               {errors.service && <p className="text-red-400 text-xs">{errors.service}</p>}
             </div>

             {/* textarea */}
             <div className="flex flex-col gap-1">
               <Textarea 
                className="h-[200px]"
                name="message"
                placeholder="Enter your message here."
                value={formData.message}
                onChange={handleChange}
                required
                />
               {errors.message && <p className="text-red-400 text-xs">{errors.message}</p>}
             </div>

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
