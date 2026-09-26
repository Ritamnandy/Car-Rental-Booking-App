import { Link } from "react-router-dom";
import { assets } from "../assets/assets";


export default function Footer ()
{
    return (
        <div className='px-6 md:px-16 lg:px-24 xl:px-32 mt-50 text-sm text-gray-500'>
            <div className='flex flex-wrap justify-between items-start gap-8 pb-6 '>
                <div >
                    <img src={ assets.logo } alt="logo" className=' h-8 md:h-9' />
                    <p className='text-sm'>
                        Premium car rental service with a wide selection of
                        luxury and everyday vehicles for all your driving
                        needs.
                    </p>
                    <div className='flex items-center gap-3 mt-4'>
                        {/* Instagram */ }
                        <img src={ assets.instagram_logo } alt="Instagram" className='w-6 h-6' />
                        {/* Facebook */ }
                        <img src={ assets.facebook_logo } alt="Facebook" className='w-6 h-6' />
                        {/* Twitter */ }
                        <img src={ assets.twitter_logo } alt="twitter_logo" className='w-6 h-6' />
                        {/* Gmail logo */ }
                        <img src={ assets.gmail_logo } alt="gmail_logo" className='w-6 h-6' />
                    </div>
                </div>

                <div>
                    <p className='text-lg text-gray-800'>Quick Links</p>
                    <ul className='mt-3 flex flex-col gap-1.5 '>
                        <Link to="/">Home</Link>
                        <Link to="/cars">Browse Cars</Link>
                        <Link to="/cars">List Your Car</Link>
                        <Link to="/contact">About Us</Link>
                    </ul>
                </div>

                <div>
                    <p className='text-lg text-gray-800'>Resources</p>
                    <ul className='mt-3 flex flex-col gap-2 text-sm'>
                        <li><a href="#">Help Center</a></li>
                        <li><a href="#">Terms of Service</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Insurance</a></li>

                    </ul>
                </div>

                <div>
                    <p className='text-lg text-gray-800'>Contact</p>
                    <ul className='mt-3 flex flex-col gap-2 text-sm'>
                        <li>1234 Luxury Drive</li>
                        <li>San Francisco, CA 94107</li>
                        <li>+1 (555) 123-4567</li>
                        <li>car@example.com</li>

                    </ul>
                </div>
            </div>
            <hr className='border-gray-300 mt-8' />
            <div className='flex flex-col md:flex-row gap-2 items-center justify-between py-5'>
                <p>© { new Date().getFullYear() } <a href="/">CarRental</a>. All rights reserved.</p>
                <ul className='flex items-center gap-4'>
                    <li><a href="#">Privacy</a></li>
                    <li><a href="#">Terms</a></li>
                    <li><a href="#">Sitemap</a></li>
                </ul>
            </div>
        </div>
    );

}
