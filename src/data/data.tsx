import { BiSolidVideos } from "react-icons/bi";
import { FaMusic } from "react-icons/fa";
import { MdLock } from "react-icons/md";

export const distros = [
  { image: "/img/distros/spotify-auth.svg", name: "Deezer" },
  { image: "/img/distros/deezer-auth.svg", name: "Spotify" },
  { image: "/img/distros/apple-music-auth.svg", name: "Apple Music" },
  { image: "/img/distros/tidal-auth.svg", name: "Tidal" },
  { image: "/img/distros/youtube-music-auth.svg", name: "YouTube" },
  { image: "/img/distros/vevo-auth.svg", name: "Vevo" },
  { image: "/img/distros/tiktok-auth.svg", name: "Tiktok" },
];

export const navData = [
  { name: "Music Distribution", href: "/music-distribution" },
  { name: "Pricing", href: "/pricing" },
  { name: "VEVO", href: "/vevo" },
  { name: "Support", href: "/support" },
  { name: "Promotion", href: "/promo" },
  { name: "Blog", href: "/blog" },
];

export const mobileNavData = [
  { name: "Home", href: "/" },
  { name: "Music Distribution", href: "/music-distribution" },
  { name: "Pricing", href: "/pricing" },
  { name: "VEVO", href: "/vevo" },
  { name: "Promotion", href: "/promo" },
  { name: "Support", href: "/support" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export const mobileLoginNavData = [
  { name: "Login", href: "/login" },
  { name: "Sign Up", href: "/register" },
];

export const dashboardNav = [
  { name: "Artist", href: "/dashboard/artist" },
  { name: "Music", href: "/dashboard/music" },
  { name: "Videos", href: "/dashboard/videos" },
  { name: "Royalties", href: "/dashboard/sales" },
  { name: "Analytics", href: "/dashboard/analytics" },
  { name: "Support", href: "/dashboard/tickets" },
];

export const userNavData = [
  { name: "Music", href: "/dashboard/music" },
  { name: "Videos", href: "/dashboard/videos" },
  { name: "Royalties & Analytics", href: "/dashboard/sales" },
  { name: "Promotion", href: "/promo" },
  { name: "Support", href: "/support" },
];
import { MdSettingsInputComposite } from "react-icons/md";

export const profileData = [
  {
    name: "Update Account",
    href: "/dashboard/account",
    icon: <MdSettingsInputComposite size={20} />,
  },
  {
    name: "Change Password",
    href: "/forgot-password",
    icon: <MdLock size={20} />,
  },
];

export const uploadData = [
  {
    name: "Upload Music",
    href: "/dashboard/music/release",
    icon: <FaMusic size={20} />,
  },
  {
    name: "Upload Videos",
    href: "/dashboard/videos",
    icon: <BiSolidVideos size={20} />,
  },
];

export const features = [
  {
    id: 1,
    product: "Bronze",
    description: "Basic Distribution to top digital music services",
    price_in_usd: "50",
    price: "60,000",
    features: [
      "Unlimited releases to 100+ platforms for a year",
      "75% Revenue Pay-out",
      "Monthly Analytics",
      "Monthly Royalty Payments",
      "Fast, direct-to-bank royalty payouts",
      "Upload lyrics to music platforms",
      "Chat, Email and WhatsApp Support",
    ],
  },
  {
    id: 2,
    product: "Gold",
    description: "Basic Distribution to top digital music services",
    price: "80,000",
    price_in_usd: "60",
    features: [
      "Everything in Bronze Plan",
      "80% Revenue Pay-out",
      "Fast, direct-to-bank royalty payouts",
      "Chat, Email and WhatsApp Support",
      "Priority 24/7 support",
      "Auto-release to new platforms for free",
    ],
  },
  {
    id: 3,
    product: "Platinum",
    description: "Basic Distribution to top digital music services",
    price: "100,000",
    price_in_usd: "70",
    features: [
      "Everything in Bronze Plan & Gold Plan",
      "85% Revenue Pay-out",
      "Upload lyrics to music platforms",
      "Priority 24/7 support",
      "Auto-release to new platforms for free",
    ],
  },
];

export const testimonials = [
  {
    name: `Chike`,
    img: `/testimonials/chike.jpeg`,
    review: `
   They have been instrumental in helping me reach a wider audience with my music. Their distribution network is extensive, and their analytics tools have been invaluable in understanding my listenership demographics. Plus, their customer support team is always there to assist whenever I have questions or need guidance.`,
  },
  {
    name: `KAPITAL IFEX`,
    img: `/testimonials/Kapital.jpg`,
    review: `They have been a game-changer for me. Their platform is user-friendly, their customer service is top-notch, and the speed at which my music gets distributed is incredible. Thanks to Them, I've been able to focus more on creating music and less on the logistics of distribution.`,
  },
  {
    name: `Yemi Alade`,
    img: `/testimonials/yemi-alade.jpeg`,
    review: `I can't say enough good things about their Distribution. Their platform is intuitive, their customer service team is responsive and knowledgeable, and their marketing tools have helped me expand my fanbase exponentially. Working with Symphonic has been a game-changer for my music career.`,
  },
  {
    name: `Tito Da.fire`,
    img: `/testimonials/Tito.webp`,
    review: `They has been a revelation for me as an independent artist R. Their completely free distribution model is unheard of in the industry, and their transparent royalty system gives me peace of mind knowing that I'm getting paid fairly for my music. I highly recommend Amuse to any artist R looking to retain full control over their work.`,
  },
];

export const subscriptionPlanToChoose = [
  {
    feature: "Unlimited releases to 100+ platforms",
    includes: ["yes", "yes", "yes"],
  },
  {
    feature: "Automatic split royalty payments",
    includes: ["yes", "yes", "yes"],
  },
  {
    feature: "Free Smartlinks with every release",
    includes: ["yes", "yes", "yes"],
  },
  {
    feature: "In-depth analytics & listener data",
    includes: ["yes", "yes", "yes"],
  },
  {
    feature: "Fast, direct-to-bank royalty payouts",
    includes: ["yes", "yes", "yes"],
  },
  {
    feature: "Upload lyrics to music platforms",
    includes: ["yes", "yes", "yes"],
  },
  {
    feature: "Auto-release to new platforms for free",
    includes: ["yes", "yes", "yes"],
  },
  {
    feature: "YouTube Official Artist R Channel set-up",
    includes: ["yes", "yes", "yes"],
  },
  {
    feature: "Priority 24/7 support",
    includes: ["no", "yes", "yes"],
  },
  {
    feature: "Auto-release to new platforms for free",
    includes: ["no", "yes", "yes"],
  },
  {
    feature: "YouTube Content ID",
    includes: ["no", "yes", "yes"],
  },
];

// FAQ Data -------------------------------------------------
export const pricingFAQ = [
  {
    question: "What is the refund policy?",
    answer:
      "We offer a 30-day money back guarantee if you are not satisfied with our service.",
  },
  {
    question: "What is the difference between the plans?",
    answer:
      "The main difference between the plans is the number of songs you can distribute. The more songs you distribute, the cheaper the price per song.",
  },
  {
    question: "How long does it take to distribute my music?",
    answer:
      "It usually takes 1-2 days to distribute your music to all major platforms.",
  },
  {
    question: "Can I cancel my subscription at any time?",
    answer:
      "Yes, you can cancel your subscription at any time. Your music will remain on all major platforms until the end of your billing cycle.",
  },
  {
    question: "What do I need to upload a release?",
    answer: [
      "Music files in WAV format (alternatively: MP3)",
      "Artwork in JPG format",
      "Metadata information such as genre and performers etc.",
    ],
  },
  {
    question: "How much money do I earn per stream?",
    answer:
      "That depends how much your music is streamed and downloaded. But with us you’ll always keep a percentage of the royalties you earn based on the subscription plan, as well as all the rights to your music.",
  },
];

export const vevoFAQ = [
  {
    question: "What is Vevo?",
    answer: [
      "Vevo is a music video hosting service that allows artist Rs to upload their music videos to the platform. Vevo is a joint venture between Universal Music Group, Sony Music Entertainment, and Warner Music Group.",
    ],
  },
  {
    question: "How do I get my music on Vevo?",
    answer: [
      "To get your music on Vevo, you need to sign up for an account and set up an official Vevo artist R channel. You can then submit your music videos for review and start earning money from your videos.",
    ],
  },
  {
    question: "How much does it cost to get on Vevo?",
    answer: [
      "There is no cost to get your music on Vevo. Vevo is a free service for artist Rs to use to promote their music videos.",
    ],
  },
  {
    question: "How do I make money on Vevo?",
    answer: [
      "You can make money on Vevo by monetizing your music videos. Vevo pays artist Rs a share of the revenue generated from ads that play before and during their videos.",
    ],
  },
  {
    question: "How do I track my earnings on Vevo?",
    answer: [
      "You can track your earnings on Vevo through our Dashboard. This platform allows you to see how much money your videos are making and withdraw your earnings.",
    ],
  },
  {
    question: "How do I withdraw my earnings from Vevo?",
    answer: [
      "You can withdraw your earnings from Vevo through our Dashboard. You can choose to receive your earnings via direct deposit or PayPal.",
    ],
  },
];

export const musicUploadFAQ = [
  {
    question: "What do I need to upload a release?",
    answer: [
      "Music files in WAV format (alternatively: MP3)",
      "Artwork in JPG format",
      "Metadata information such as genre and performers etc.",
    ],
  },
  {
    question: "How long does it take to distribute my music?",
    answer:
      "It usually takes 1-2 days to distribute your music to all major platforms.",
  },
  {
    question: "Can I cancel my subscription at any time?",
    answer:
      "Yes, you can cancel your subscription at any time. Your music will remain on all major platforms until the end of your billing cycle.",
  },
  {
    question: "How much money do I earn per stream?",
    answer:
      "That depends how much your music is streamed and downloaded. But with use you’ll always keep a percentage of the royalties you earn based on the subscription plan as well as all the rights to your music.",
  },
];

export const supportFAQ = [
  {
    Header: "Subscription & Pricing",
    faqs: pricingFAQ,
  },
  {
    Header: "VEVO",
    faqs: vevoFAQ,
  },
  {
    Header: "Music Upload",
    faqs: musicUploadFAQ,
  },
];
