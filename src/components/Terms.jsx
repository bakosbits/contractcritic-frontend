import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, AlertTriangle, Users, Gavel } from "lucide-react";

const Terms = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Terms of Use
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        The friendly legal stuff. We've tried to keep this
                        simple and fair for everyone.
                    </p>
                    <p className="text-sm text-gray-500 mt-4">
                        Last updated:{" "}
                        {new Date().toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </p>
                </div>

                {/* Quick Summary */}
                <Card className="mb-8 border-green-200 bg-green-50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-green-900">
                            <FileText className="w-5 h-5" />
                            The Basics
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-green-800">
                            Use Contract Critic responsibly, don't try to break
                            it, remember that our AI analysis is helpful but not
                            legal advice, and be nice to everyone. That covers
                            most of it! 😊
                        </p>
                    </CardContent>
                </Card>

                {/* Using Our Service */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Users className="w-5 h-5 text-blue-500" />
                            Using Contract Critic
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">
                                Who Can Use It
                            </h3>
                            <p className="text-gray-700">
                                Anyone 18 or older can use Contract Critic. If
                                you're under 18, you'll need a parent or
                                guardian to create an account for you.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">
                                Your Account
                            </h3>
                            <p className="text-gray-700">
                                You're responsible for keeping your account
                                secure. Don't share your login credentials, and
                                let us know if you think someone else has
                                accessed your account.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">
                                Acceptable Use
                            </h3>
                            <p className="text-gray-700">
                                Use Contract Critic for legitimate contract
                                analysis. Don't upload anything illegal, try to
                                hack our systems, or use the service to harm
                                others.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">
                                Your Content
                            </h3>
                            <p className="text-gray-700">
                                The contracts you upload remain yours. We only
                                use them to provide our analysis service and
                                don't claim any ownership over your documents.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Important Disclaimers */}
                <Card className="mb-8 border-yellow-200 bg-yellow-50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-yellow-900">
                            <AlertTriangle className="w-5 h-5" />
                            Important: Not Legal Advice
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h3 className="font-semibold text-yellow-900 mb-2">
                                AI Analysis Limitations
                            </h3>
                            <p className="text-yellow-800">
                                Our AI provides helpful insights and identifies
                                potential issues, but it's not a replacement for
                                professional legal advice. For important
                                contracts or complex legal matters, always
                                consult with a qualified attorney.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-yellow-900 mb-2">
                                No Attorney-Client Relationship
                            </h3>
                            <p className="text-yellow-800">
                                Using Contract Critic doesn't create an
                                attorney-client relationship. We're a technology
                                service, not a law firm.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-yellow-900 mb-2">
                                Use Your Judgment
                            </h3>
                            <p className="text-yellow-800">
                                Our analysis is meant to help you understand
                                contracts better, but you should always use your
                                own judgment and seek professional advice when
                                needed.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Service Availability */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Service Availability</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">
                                Uptime
                            </h3>
                            <p className="text-gray-700">
                                We work hard to keep Contract Critic available
                                24/7, but sometimes we need to perform
                                maintenance or deal with technical issues. We'll
                                try to give advance notice when possible.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">
                                Changes to the Service
                            </h3>
                            <p className="text-gray-700">
                                We're constantly improving Contract Critic. We
                                may add new features, modify existing ones, or
                                occasionally remove features that aren't working
                                well.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">
                                Data Backup
                            </h3>
                            <p className="text-gray-700">
                                While we backup our systems regularly, you
                                should keep your own copies of important
                                contracts. We're not responsible if something
                                gets lost.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Payment and Billing */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Payment and Billing</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">
                                Pricing
                            </h3>
                            <p className="text-gray-700">
                                Our current pricing is clearly displayed on our
                                website. We may change prices from time to time,
                                but we'll give existing users advance notice.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">
                                Billing
                            </h3>
                            <p className="text-gray-700">
                                We use secure third-party payment processors.
                                You'll be charged according to the plan you
                                choose, and you can cancel anytime.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">
                                Refunds
                            </h3>
                            <p className="text-gray-700">
                                If you're not happy with our service, contact us
                                within 30 days and we'll work something out. We
                                want you to be satisfied!
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Intellectual Property */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Intellectual Property</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">
                                Our Stuff
                            </h3>
                            <p className="text-gray-700">
                                Contract Critic's software, design, and content
                                belong to us. You can use our service, but you
                                can't copy, modify, or redistribute our
                                technology.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">
                                Your Stuff
                            </h3>
                            <p className="text-gray-700">
                                Your contracts and data remain yours. By using
                                our service, you give us permission to process
                                your contracts to provide analysis, but that's
                                it.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">
                                Feedback
                            </h3>
                            <p className="text-gray-700">
                                If you give us feedback or suggestions, we can
                                use them to improve Contract Critic without any
                                obligation to you. We appreciate all feedback!
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Limitation of Liability */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Gavel className="w-5 h-5 text-red-500" />
                            Limitation of Liability
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">
                                Service "As Is"
                            </h3>
                            <p className="text-gray-700">
                                We provide Contract Critic "as is" without
                                warranties. While we work hard to make it
                                reliable and useful, we can't guarantee it will
                                always be perfect.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">
                                Liability Limits
                            </h3>
                            <p className="text-gray-700">
                                Our liability is limited to the amount you've
                                paid us in the past 12 months. We're not
                                responsible for indirect damages or losses.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">
                                Your Responsibility
                            </h3>
                            <p className="text-gray-700">
                                You're responsible for your own decisions based
                                on our analysis. Always use your judgment and
                                seek professional advice for important matters.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Termination */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Account Termination</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">
                                You Can Leave Anytime
                            </h3>
                            <p className="text-gray-700">
                                You can delete your account at any time. When
                                you do, we'll delete your data according to our
                                privacy policy.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">
                                We Might Ask You to Leave
                            </h3>
                            <p className="text-gray-700">
                                If you violate these terms or use our service
                                inappropriately, we may suspend or terminate
                                your account. We'll try to work things out
                                first, though.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">
                                What Happens After
                            </h3>
                            <p className="text-gray-700">
                                After termination, you won't be able to access
                                your account, but these terms will still apply
                                to any past use of the service.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Contact and Changes */}
                <div className="grid md:grid-cols-2 gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Questions About These Terms?</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-700 mb-4">
                                If anything in these terms is unclear or you
                                have questions, please reach out. We're happy to
                                explain!
                            </p>
                            <a
                                href="mailto:legal@contractcritic.com"
                                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                            >
                                Contact Us About Terms
                            </a>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Changes to Terms</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-700 mb-4">
                                We may update these terms occasionally. When we
                                do, we'll notify you and update the date at the
                                top of this page.
                            </p>
                            <p className="text-gray-600 text-sm">
                                Continued use of Contract Critic after changes
                                means you accept the new terms. If you don't
                                agree, you can always delete your account.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Terms;
