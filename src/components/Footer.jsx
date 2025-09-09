import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Contract Critic
                        </h3>
                        <p className="text-gray-600 text-sm mb-4">
                            Making contract analysis simple and accessible. Get
                            insights into your legal documents with AI-powered
                            analysis that helps you understand risks and
                            opportunities.
                        </p>
                        <p className="text-gray-500 text-xs">
                            © {new Date().getFullYear()} Contract Critic. All
                            rights reserved.
                        </p>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-4">
                            Legal
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    to="/about"
                                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                                >
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/privacy"
                                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                                >
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/terms"
                                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                                >
                                    Terms of Use
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/legal"
                                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                                >
                                    Legal Information
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-4">
                            Support
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    to="/contact"
                                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                                >
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <a
                                    href="mailto:support@contractcritic.com"
                                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                                >
                                    Email Support
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                    <div className="flex flex-col sm:flex-row justify-between items-center">
                        <p className="text-xs text-gray-500">
                            Built with ❤️ for better contract understanding
                        </p>
                        <div className="flex space-x-4 mt-4 sm:mt-0">
                            <Link
                                to="/privacy"
                                className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
                            >
                                Privacy
                            </Link>
                            <Link
                                to="/terms"
                                className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
                            >
                                Terms
                            </Link>
                            <Link
                                to="/legal"
                                className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
                            >
                                Legal
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
