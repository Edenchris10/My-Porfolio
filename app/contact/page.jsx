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
  SelectValue,
} from "@/components/ui/select";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { ChevronsUpDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";

// ─── CONTACT INFO ─────────────────────────────────────────────────────────────
const info = [
  { icon: <FaPhoneAlt />,      title: "phone - WhatsApp", description: "+241 077 089 776 / 065 97 30 19" },
  { icon: <FaEnvelope />,      title: "Email",            description: "mboribrandon@gmail.com" },
  { icon: <FaMapMarkerAlt />,  title: "Address",          description: "Libreville, GABON" },
];

// ─── WORLDWIDE COUNTRY CODES ──────────────────────────────────────────────────
// Gabon first, then all other countries alphabetically
const countryCodes = [
  { code: '+241', country: 'Gabon',                   flag: '🇬🇦' },
  { code: '+93',  country: 'Afghanistan',              flag: '🇦🇫' },
  { code: '+355', country: 'Albania',                  flag: '🇦🇱' },
  { code: '+213', country: 'Algeria',                  flag: '🇩🇿' },
  { code: '+376', country: 'Andorra',                  flag: '🇦🇩' },
  { code: '+244', country: 'Angola',                   flag: '🇦🇴' },
  { code: '+1',   country: 'Antigua and Barbuda',      flag: '🇦🇬' },
  { code: '+54',  country: 'Argentina',                flag: '🇦🇷' },
  { code: '+374', country: 'Armenia',                  flag: '🇦🇲' },
  { code: '+61',  country: 'Australia',                flag: '🇦🇺' },
  { code: '+43',  country: 'Austria',                  flag: '🇦🇹' },
  { code: '+994', country: 'Azerbaijan',               flag: '🇦🇿' },
  { code: '+1',   country: 'Bahamas',                  flag: '🇧🇸' },
  { code: '+973', country: 'Bahrain',                  flag: '🇧🇭' },
  { code: '+880', country: 'Bangladesh',               flag: '🇧🇩' },
  { code: '+1',   country: 'Barbados',                 flag: '🇧🇧' },
  { code: '+375', country: 'Belarus',                  flag: '🇧🇾' },
  { code: '+32',  country: 'Belgium',                  flag: '🇧🇪' },
  { code: '+501', country: 'Belize',                   flag: '🇧🇿' },
  { code: '+229', country: 'Benin',                    flag: '🇧🇯' },
  { code: '+975', country: 'Bhutan',                   flag: '🇧🇹' },
  { code: '+591', country: 'Bolivia',                  flag: '🇧🇴' },
  { code: '+387', country: 'Bosnia & Herzegovina',     flag: '🇧🇦' },
  { code: '+267', country: 'Botswana',                 flag: '🇧🇼' },
  { code: '+55',  country: 'Brazil',                   flag: '🇧🇷' },
  { code: '+673', country: 'Brunei',                   flag: '🇧🇳' },
  { code: '+359', country: 'Bulgaria',                 flag: '🇧🇬' },
  { code: '+226', country: 'Burkina Faso',             flag: '🇧🇫' },
  { code: '+257', country: 'Burundi',                  flag: '🇧🇮' },
  { code: '+238', country: 'Cabo Verde',               flag: '🇨🇻' },
  { code: '+855', country: 'Cambodia',                 flag: '🇰🇭' },
  { code: '+237', country: 'Cameroon',                 flag: '🇨🇲' },
  { code: '+1',   country: 'Canada',                   flag: '🇨🇦' },
  { code: '+236', country: 'Central African Republic', flag: '🇨🇫' },
  { code: '+235', country: 'Chad',                     flag: '🇹🇩' },
  { code: '+56',  country: 'Chile',                    flag: '🇨🇱' },
  { code: '+86',  country: 'China',                    flag: '🇨🇳' },
  { code: '+57',  country: 'Colombia',                 flag: '🇨🇴' },
  { code: '+269', country: 'Comoros',                  flag: '🇰🇲' },
  { code: '+242', country: 'Congo',                    flag: '🇨🇬' },
  { code: '+243', country: 'Congo (DRC)',              flag: '🇨🇩' },
  { code: '+506', country: 'Costa Rica',               flag: '🇨🇷' },
  { code: '+385', country: 'Croatia',                  flag: '🇭🇷' },
  { code: '+53',  country: 'Cuba',                     flag: '🇨🇺' },
  { code: '+357', country: 'Cyprus',                   flag: '🇨🇾' },
  { code: '+420', country: 'Czech Republic',           flag: '🇨🇿' },
  { code: '+45',  country: 'Denmark',                  flag: '🇩🇰' },
  { code: '+253', country: 'Djibouti',                 flag: '🇩🇯' },
  { code: '+1',   country: 'Dominica',                 flag: '🇩🇲' },
  { code: '+1',   country: 'Dominican Republic',       flag: '🇩🇴' },
  { code: '+593', country: 'Ecuador',                  flag: '🇪🇨' },
  { code: '+20',  country: 'Egypt',                    flag: '🇪🇬' },
  { code: '+503', country: 'El Salvador',              flag: '🇸🇻' },
  { code: '+240', country: 'Equatorial Guinea',        flag: '🇬🇶' },
  { code: '+291', country: 'Eritrea',                  flag: '🇪🇷' },
  { code: '+372', country: 'Estonia',                  flag: '🇪🇪' },
  { code: '+268', country: 'Eswatini',                 flag: '🇸🇿' },
  { code: '+251', country: 'Ethiopia',                 flag: '🇪🇹' },
  { code: '+679', country: 'Fiji',                     flag: '🇫🇯' },
  { code: '+358', country: 'Finland',                  flag: '🇫🇮' },
  { code: '+33',  country: 'France',                   flag: '🇫🇷' },
  { code: '+220', country: 'Gambia',                   flag: '🇬🇲' },
  { code: '+995', country: 'Georgia',                  flag: '🇬🇪' },
  { code: '+49',  country: 'Germany',                  flag: '🇩🇪' },
  { code: '+233', country: 'Ghana',                    flag: '🇬🇭' },
  { code: '+30',  country: 'Greece',                   flag: '🇬🇷' },
  { code: '+1',   country: 'Grenada',                  flag: '🇬🇩' },
  { code: '+502', country: 'Guatemala',                flag: '🇬🇹' },
  { code: '+224', country: 'Guinea',                   flag: '🇬🇳' },
  { code: '+245', country: 'Guinea-Bissau',            flag: '🇬🇼' },
  { code: '+592', country: 'Guyana',                   flag: '🇬🇾' },
  { code: '+509', country: 'Haiti',                    flag: '🇭🇹' },
  { code: '+504', country: 'Honduras',                 flag: '🇭🇳' },
  { code: '+36',  country: 'Hungary',                  flag: '🇭🇺' },
  { code: '+354', country: 'Iceland',                  flag: '🇮🇸' },
  { code: '+91',  country: 'India',                    flag: '🇮🇳' },
  { code: '+62',  country: 'Indonesia',                flag: '🇮🇩' },
  { code: '+98',  country: 'Iran',                     flag: '🇮🇷' },
  { code: '+964', country: 'Iraq',                     flag: '🇮🇶' },
  { code: '+353', country: 'Ireland',                  flag: '🇮🇪' },
  { code: '+972', country: 'Israel',                   flag: '🇮🇱' },
  { code: '+39',  country: 'Italy',                    flag: '🇮🇹' },
  { code: '+1',   country: 'Jamaica',                  flag: '🇯🇲' },
  { code: '+81',  country: 'Japan',                    flag: '🇯🇵' },
  { code: '+962', country: 'Jordan',                   flag: '🇯🇴' },
  { code: '+7',   country: 'Kazakhstan',               flag: '🇰🇿' },
  { code: '+254', country: 'Kenya',                    flag: '🇰🇪' },
  { code: '+686', country: 'Kiribati',                 flag: '🇰🇮' },
  { code: '+965', country: 'Kuwait',                   flag: '🇰🇼' },
  { code: '+996', country: 'Kyrgyzstan',               flag: '🇰🇬' },
  { code: '+856', country: 'Laos',                     flag: '🇱🇦' },
  { code: '+371', country: 'Latvia',                   flag: '🇱🇻' },
  { code: '+961', country: 'Lebanon',                  flag: '🇱🇧' },
  { code: '+266', country: 'Lesotho',                  flag: '🇱🇸' },
  { code: '+231', country: 'Liberia',                  flag: '🇱🇷' },
  { code: '+218', country: 'Libya',                    flag: '🇱🇾' },
  { code: '+423', country: 'Liechtenstein',            flag: '🇱🇮' },
  { code: '+370', country: 'Lithuania',                flag: '🇱🇹' },
  { code: '+352', country: 'Luxembourg',               flag: '🇱🇺' },
  { code: '+261', country: 'Madagascar',               flag: '🇲🇬' },
  { code: '+265', country: 'Malawi',                   flag: '🇲🇼' },
  { code: '+60',  country: 'Malaysia',                 flag: '🇲🇾' },
  { code: '+960', country: 'Maldives',                 flag: '🇲🇻' },
  { code: '+223', country: 'Mali',                     flag: '🇲🇱' },
  { code: '+356', country: 'Malta',                    flag: '🇲🇹' },
  { code: '+692', country: 'Marshall Islands',         flag: '🇲🇭' },
  { code: '+222', country: 'Mauritania',               flag: '🇲🇷' },
  { code: '+230', country: 'Mauritius',                flag: '🇲🇺' },
  { code: '+52',  country: 'Mexico',                   flag: '🇲🇽' },
  { code: '+691', country: 'Micronesia',               flag: '🇫🇲' },
  { code: '+373', country: 'Moldova',                  flag: '🇲🇩' },
  { code: '+377', country: 'Monaco',                   flag: '🇲🇨' },
  { code: '+976', country: 'Mongolia',                 flag: '🇲🇳' },
  { code: '+382', country: 'Montenegro',               flag: '🇲🇪' },
  { code: '+212', country: 'Morocco',                  flag: '🇲🇦' },
  { code: '+258', country: 'Mozambique',               flag: '🇲🇿' },
  { code: '+95',  country: 'Myanmar',                  flag: '🇲🇲' },
  { code: '+264', country: 'Namibia',                  flag: '🇳🇦' },
  { code: '+674', country: 'Nauru',                    flag: '🇳🇷' },
  { code: '+977', country: 'Nepal',                    flag: '🇳🇵' },
  { code: '+31',  country: 'Netherlands',              flag: '🇳🇱' },
  { code: '+64',  country: 'New Zealand',              flag: '🇳🇿' },
  { code: '+505', country: 'Nicaragua',                flag: '🇳🇮' },
  { code: '+227', country: 'Niger',                    flag: '🇳🇪' },
  { code: '+234', country: 'Nigeria',                  flag: '🇳🇬' },
  { code: '+850', country: 'North Korea',              flag: '🇰🇵' },
  { code: '+389', country: 'North Macedonia',          flag: '🇲🇰' },
  { code: '+47',  country: 'Norway',                   flag: '🇳🇴' },
  { code: '+968', country: 'Oman',                     flag: '🇴🇲' },
  { code: '+92',  country: 'Pakistan',                 flag: '🇵🇰' },
  { code: '+680', country: 'Palau',                    flag: '🇵🇼' },
  { code: '+507', country: 'Panama',                   flag: '🇵🇦' },
  { code: '+675', country: 'Papua New Guinea',         flag: '🇵🇬' },
  { code: '+595', country: 'Paraguay',                 flag: '🇵🇾' },
  { code: '+51',  country: 'Peru',                     flag: '🇵🇪' },
  { code: '+63',  country: 'Philippines',              flag: '🇵🇭' },
  { code: '+48',  country: 'Poland',                   flag: '🇵🇱' },
  { code: '+351', country: 'Portugal',                 flag: '🇵🇹' },
  { code: '+974', country: 'Qatar',                    flag: '🇶🇦' },
  { code: '+40',  country: 'Romania',                  flag: '🇷🇴' },
  { code: '+7',   country: 'Russia',                   flag: '🇷🇺' },
  { code: '+250', country: 'Rwanda',                   flag: '🇷🇼' },
  { code: '+1',   country: 'Saint Kitts and Nevis',    flag: '🇰🇳' },
  { code: '+1',   country: 'Saint Lucia',              flag: '🇱🇨' },
  { code: '+1',   country: 'Saint Vincent',            flag: '🇻🇨' },
  { code: '+685', country: 'Samoa',                    flag: '🇼🇸' },
  { code: '+378', country: 'San Marino',               flag: '🇸🇲' },
  { code: '+239', country: 'Sao Tome & Principe',      flag: '🇸🇹' },
  { code: '+966', country: 'Saudi Arabia',             flag: '🇸🇦' },
  { code: '+221', country: 'Senegal',                  flag: '🇸🇳' },
  { code: '+381', country: 'Serbia',                   flag: '🇷🇸' },
  { code: '+248', country: 'Seychelles',               flag: '🇸🇨' },
  { code: '+232', country: 'Sierra Leone',             flag: '🇸🇱' },
  { code: '+65',  country: 'Singapore',                flag: '🇸🇬' },
  { code: '+421', country: 'Slovakia',                 flag: '🇸🇰' },
  { code: '+386', country: 'Slovenia',                 flag: '🇸🇮' },
  { code: '+677', country: 'Solomon Islands',          flag: '🇸🇧' },
  { code: '+252', country: 'Somalia',                  flag: '🇸🇴' },
  { code: '+27',  country: 'South Africa',             flag: '🇿🇦' },
  { code: '+82',  country: 'South Korea',              flag: '🇰🇷' },
  { code: '+211', country: 'South Sudan',              flag: '🇸🇸' },
  { code: '+34',  country: 'Spain',                    flag: '🇪🇸' },
  { code: '+94',  country: 'Sri Lanka',                flag: '🇱🇰' },
  { code: '+249', country: 'Sudan',                    flag: '🇸🇩' },
  { code: '+597', country: 'Suriname',                 flag: '🇸🇷' },
  { code: '+46',  country: 'Sweden',                   flag: '🇸🇪' },
  { code: '+41',  country: 'Switzerland',              flag: '🇨🇭' },
  { code: '+963', country: 'Syria',                    flag: '🇸🇾' },
  { code: '+886', country: 'Taiwan',                   flag: '🇹🇼' },
  { code: '+992', country: 'Tajikistan',               flag: '🇹🇯' },
  { code: '+255', country: 'Tanzania',                 flag: '🇹🇿' },
  { code: '+66',  country: 'Thailand',                 flag: '🇹🇭' },
  { code: '+670', country: 'Timor-Leste',              flag: '🇹🇱' },
  { code: '+228', country: 'Togo',                     flag: '🇹🇬' },
  { code: '+676', country: 'Tonga',                    flag: '🇹🇴' },
  { code: '+1',   country: 'Trinidad and Tobago',      flag: '🇹🇹' },
  { code: '+216', country: 'Tunisia',                  flag: '🇹🇳' },
  { code: '+90',  country: 'Turkey',                   flag: '🇹🇷' },
  { code: '+993', country: 'Turkmenistan',             flag: '🇹🇲' },
  { code: '+688', country: 'Tuvalu',                   flag: '🇹🇻' },
  { code: '+256', country: 'Uganda',                   flag: '🇺🇬' },
  { code: '+380', country: 'Ukraine',                  flag: '🇺🇦' },
  { code: '+971', country: 'UAE',                      flag: '🇦🇪' },
  { code: '+44',  country: 'United Kingdom',           flag: '🇬🇧' },
  { code: '+1',   country: 'United States',            flag: '🇺🇸' },
  { code: '+598', country: 'Uruguay',                  flag: '🇺🇾' },
  { code: '+998', country: 'Uzbekistan',               flag: '🇺🇿' },
  { code: '+678', country: 'Vanuatu',                  flag: '🇻🇺' },
  { code: '+39',  country: 'Vatican City',             flag: '🇻🇦' },
  { code: '+58',  country: 'Venezuela',                flag: '🇻🇪' },
  { code: '+84',  country: 'Vietnam',                  flag: '🇻🇳' },
  { code: '+967', country: 'Yemen',                    flag: '🇾🇪' },
  { code: '+260', country: 'Zambia',                   flag: '🇿🇲' },
  { code: '+263', country: 'Zimbabwe',                 flag: '🇿🇼' },
];

// ─── WHITELISTS ───────────────────────────────────────────────────────────────
const ALLOWED_COUNTRY_CODES = [...new Set(countryCodes.map((c) => c.code))];
const ALLOWED_SERVICES = ['Web Development', 'UI/UX Design', 'Digital Marketing', 'Online Ads'];

// ─── SANITIZERS ──────────────────────────────────────────────────────────────
const sanitizeText = (val) =>
  val
    .replace(/<[^>]*>/g, '')
    .replace(/[<>"'`]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .trim()
    .slice(0, 500);

const sanitizeEmail = (val) => val.trim().toLowerCase().slice(0, 254);
const sanitizePhone = (val) => val.replace(/[^\d\s]/g, '').slice(0, 15);

// ─── VALIDATORS ──────────────────────────────────────────────────────────────
const validators = {
  firstname: (v) => {
    if (!v.trim()) return 'Firstname is required';
    if (v.trim().length < 2) return 'Firstname must be at least 2 characters';
    if (v.trim().length > 50) return 'Firstname is too long (max 50)';
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

// ─── SEARCHABLE COUNTRY CODE PICKER ──────────────────────────────────────────
// Replaces the old <Select> with a Command-powered Combobox.
// Typing in the search box filters by both country name AND dial code.
const CountryCodePicker = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);

  // Find the selected entry — prioritise the Gabon entry for the default +241
  const selected =
    countryCodes.find((c) => c.code === value && c.country === 'Gabon') ||
    countryCodes.find((c) => c.code === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[140px] justify-between font-normal"
        >
          <span className="truncate">
            {selected ? `${selected.flag} ${selected.code}` : '+241'}
          </span>
          <ChevronsUpDown className="ml-1 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[260px] p-0">
        <Command>
          {/* CommandInput handles all filtering — searches country name + code */}
          <CommandInput placeholder="Search country or code…" />
          <CommandList>
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup>
              {countryCodes.map((item, idx) => (
                <CommandItem
                  key={`${item.code}-${item.country}-${idx}`}
                  // 'value' is the string CommandInput matches against
                  value={`${item.country} ${item.code}`}
                  onSelect={() => {
                    onChange(item.code);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === item.code && selected?.country === item.country
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {item.flag} {item.country} ({item.code})
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

// ─── CONTACT PAGE ─────────────────────────────────────────────────────────────
const Contact = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    countryCode: '+241',
    phone: '',
    service: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (name, value) => {
    if (!validators[name]) return '';
    const error = validators[name](value);
    setErrors((prev) => ({ ...prev, [name]: error }));
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if ((name === 'firstname' || name === 'lastname') && /\d/.test(value)) return;
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(validators).forEach((field) => {
      newErrors[field] = validators[field](formData[field] ?? '');
    });
    setErrors(newErrors);
    if (Object.values(newErrors).some(Boolean)) return;

    setIsSubmitting(true);

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
      setFormData({ firstname: '', lastname: '', email: '', countryCode: '+241', phone: '', service: '', message: '' });
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 2.4, duration: 0.4, ease: "easeIn" } }}
      className="py-6"
    >
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row gap-[30px]">
          {/* form */}
          <div className="xl:h-[54%] order-2 xl:order-none">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-10 bg-[#27272c] rounded-xl">
              <h3 className="text-4xl text-accent">Let's work together</h3>
              <p className="text-white/60">
                Looking for a creative and strategic partner? Contact me to discuss how my skills can add value to your company or brand.
              </p>

              {/* inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1">
                  <Input type="text" name="firstname" placeholder="Firstname" value={formData.firstname} onChange={handleChange} required />
                  {errors.firstname && <p className="text-red-400 text-xs">{errors.firstname}</p>}
                </div>

                <div className="flex flex-col gap-1">
                  <Input type="text" name="lastname" placeholder="Lastname" value={formData.lastname} onChange={handleChange} required />
                  {errors.lastname && <p className="text-red-400 text-xs">{errors.lastname}</p>}
                </div>

                <div className="flex flex-col gap-1">
                  <Input type="email" name="email" placeholder="Email address" value={formData.email} onChange={handleChange} required />
                  {errors.email && <p className="text-red-400 text-xs">{errors.email}</p>}
                </div>

                {/* Phone + searchable country code picker */}
                <div className="flex flex-col gap-1">
                  <div className="flex gap-2">
                    <CountryCodePicker value={formData.countryCode} onChange={handleCountryCodeChange} />
                    <Input type="tel" name="phone" placeholder="Phone number" value={formData.phone} onChange={handleChange} required className="flex-1" />
                  </div>
                  {(errors.phone || errors.countryCode) && (
                    <p className="text-red-400 text-xs">{errors.phone || errors.countryCode}</p>
                  )}
                </div>
              </div>

              {/* service select */}
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

              {/* message */}
              <div className="flex flex-col gap-1">
                <Textarea className="h-[200px]" name="message" placeholder="Enter your message here." value={formData.message} onChange={handleChange} required />
                {errors.message && <p className="text-red-400 text-xs">{errors.message}</p>}
              </div>

              <Button type="submit" size="md" className="max-w-44" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Submit message'}
              </Button>
            </form>
          </div>

          {/* info */}
          <div className="flex-1 flex items-center xl:justify-end order-1 xl:order-none mb-8 xl:mb-0">
            <ul className="flex flex-col gap-10">
              {info.map((item, index) => (
                <li key={index} className="flex items-center gap-6">
                  <div className="w-[52px] h-[52px] xl:w-[72px] xl:h-[72px] bg-[#27272c] text-accent rounded-md flex items-center justify-center">
                    <div className="text-[28px]">{item.icon}</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-white/60">{item.title}</p>
                    <h3 className="text-xl">{item.description}</h3>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;
