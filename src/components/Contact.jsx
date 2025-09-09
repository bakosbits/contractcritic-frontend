import React from "react";
import { useToast } from "@/contexts/ToastContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MessageCircle, Clock, MapPin } from "lucide-react";

const Contact = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Get in Touch
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        We'd love to hear from you! Whether you have questions,
                        feedback, or just want to say hello, we're here to help
                        make your contract analysis experience better.
                    </p>
                </div>

                {/* Contact Methods */}
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Mail className="w-5 h-5 text-blue-500" />
                                Email Us
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 mb-4">
                                The fastest way to reach us! We typically
                                respond within 24 hours.
                            </p>
                            <div className="space-y-2">
                                <div>
                                    <span className="font-medium text-gray-900">
                                        General Questions:
                                    </span>
                                    <br />
                                    <a
                                        href="mailto:hello@contractcritic.com"
                                        className="text-blue-600 hover:text-blue-800 transition-colors"
                                    >
                                        hello@contractcritic.com
                                    </a>
                                </div>
                                <div>
                                    <span className="font-medium text-gray-900">
                                        Technical Support:
                                    </span>
                                    <br />
                                    <a
                                        href="mailto:support@contractcritic.com"
                                        className="text-blue-600 hover:text-blue-800 transition-colors"
                                    >
                                        support@contractcritic.com
                                    </a>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <MessageCircle className="w-5 h-5 text-green-500" />
                                Live Chat
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 mb-4">
                                Need immediate help? Our live chat is available
                                during business hours.
                            </p>
                            <div className="bg-gray-100 rounded-lg p-4 text-center">
                                <p className="text-gray-600 text-sm mb-2">
                                    Chat widget coming soon!
                                </p>
                                <p className="text-gray-500 text-xs">
                                    In the meantime, feel free to email us for
                                    quick responses.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* FAQ Section */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Frequently Asked Questions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">
                                    How secure is my contract data?
                                </h3>
                                <p className="text-gray-700">
                                    We take security seriously! Your contracts
                                    are encrypted in transit and at rest. We
                                    never share your data with third parties,
                                    and you can delete your contracts at any
                                    time.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">
                                    What file formats do you support?
                                </h3>
                                <p className="text-gray-700">
                                    We currently support PDF and DOCX files.
                                    More formats are coming soon! If you have a
                                    specific format you need, let us know.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">
                                    How accurate is the AI analysis?
                                </h3>
                                <p className="text-gray-700">
                                    Our AI is trained on thousands of contracts
                                    and provides helpful insights, but it's not
                                    a replacement for professional legal advice.
                                    For complex legal matters, we always
                                    recommend consulting with a qualified
                                    attorney.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">
                                    Can I analyze contracts in different
                                    languages?
                                </h3>
                                <p className="text-gray-700">
                                    Currently, we support English contracts.
                                    We're working on adding support for other
                                    languages. If you have a specific language
                                    need, please reach out!
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">
                                    Is there a limit to contract size?
                                </h3>
                                <p className="text-gray-700">
                                    We can handle most standard contracts up to
                                    50 pages. For larger documents, contact us
                                    and we'll see what we can do!
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Business Hours & Response Times */}
                <div className="grid md:grid-cols-2 gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Clock className="w-5 h-5 text-orange-500" />
                                Response Times
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">
                                        Email Support:
                                    </span>
                                    <span className="font-medium text-gray-900">
                                        Within 24 hours
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">
                                        Technical Issues:
                                    </span>
                                    <span className="font-medium text-gray-900">
                                        Within 12 hours
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">
                                        General Questions:
                                    </span>
                                    <span className="font-medium text-gray-900">
                                        Within 48 hours
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-purple-500" />
                                Our Team
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 mb-4">
                                We're a small, dedicated team passionate about
                                making legal documents more accessible. We're
                                distributed across different time zones, which
                                means someone is usually around to help!
                            </p>
                            <p className="text-gray-500 text-sm">
                                Based primarily in North America, with team
                                members in EST, CST, and PST time zones.
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-12">
                    <Card>
                        <CardContent className="pt-6">
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                Still have questions?
                            </h3>
                            <p className="text-gray-600 mb-4">
                                Don't hesitate to reach out! We're friendly
                                people who genuinely want to help.
                            </p>
                            <a
                                href="mailto:hello@contractcritic.com"
                                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                            >
                                <Mail className="w-4 h-4 mr-2" />
                                Send us an Email
                            </a>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Contact;
