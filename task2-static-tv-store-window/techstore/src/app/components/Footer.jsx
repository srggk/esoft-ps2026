import Button from "./ui-elements/Button";
import Input from "./ui-elements/Input";

function Footer() {
    return (
        <footer className="text-gray-500 mt-auto border-t border-gray-300">
            <div className="container mx-auto px-4 py-6">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                    {/* About */}
                    <div>
                        <h3 className="text-black font-medium mb-4">About</h3>
                        <ul className="space-y-2">
                        <li><a href="#" className="hover:text-gray-900 hover:underline transition">About Us</a></li>
                        <li><a href="#" className="hover:text-gray-900 hover:underline transition">Careers</a></li>
                        <li><a href="#" className="hover:text-gray-900 hover:underline transition">Press</a></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-black font-medium mb-4">Support</h3>
                        <ul className="space-y-2">
                        <li><a href="#" className="hover:text-gray-900 hover:underline transition">Contact</a></li>
                        <li><a href="#" className="hover:text-gray-900 hover:underline transition">FAQ</a></li>
                        <li><a href="#" className="hover:text-gray-900 hover:underline transition">Shipping</a></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="text-black font-medium mb-4">Legal</h3>
                        <ul className="space-y-2">
                        <li><a href="#" className="hover:text-gray-900 hover:underline transition">Privacy Policy</a></li>
                        <li><a href="#" className="hover:text-gray-900 hover:underline transition">Terms of Service</a></li>
                        <li><a href="#" className="hover:text-gray-900 hover:underline transition">Returns</a></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="space-y-4">
                        <h3 className="text-black font-medium">Newsletter</h3>
                        <p>Subscribe for exclusive deals</p>
                        <form className="flex flex-row gap-3 w-full" onSubmit={(e) => e.preventDefault()}>
                            <Input type="email" placeholder="Email" />
                            <Button isSubmit={true} variant="dark">Subscribe</Button>
                        </form>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-300 mt-8 pt-6 text-center text-sm">
                    © 2026 TechStore. All rights reserved.
                </div>
            </div>
        </footer>
    );
}

export default Footer;