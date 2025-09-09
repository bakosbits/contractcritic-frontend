import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Eye, Lock, Trash2 } from "lucide-react";

const Privacy = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Privacy Policy
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Your privacy matters to us. Here's how we protect your
                        information and what we do with it.
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
                <Card className="mb-8 border-blue-200 bg-blue-50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-blue-900">
                            <Shield className="w-5 h-5" />
                            The Short Version
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-blue-800">
                            We collect only what we need to provide our service,
                            we never sell your data, your contracts are
                            encrypted and secure, and you can delete everything
                            at any time. We're the good guys! 🙂
                        </p>
                    </CardContent>
                </Card>

                {/* What We Collect */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Eye className="w-5 h-5 text-green-500" />
                            What Information We Collect
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">
                                Account Information
                            </h3>
                            <p className="text-gray-700">
                                When you create an account, we collect your
                                email address and any name you provide. That's
                                it! We don't ask for unnecessary personal
                                information.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">
                                Contract Documents
                            </h3>
                            <p className="text-gray-700">
                                We temporarily store the contracts you upload
                                for analysis. These are encrypted and
                                automatically deleted after 30 days unless you
                                choose to save them longer.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">
                                Usage Information
                            </h3>
                            <p className="text-gray-700">
                                We collect basic usage data like which features
                                you use and when, to help us improve the
                                service. This is anonymized and doesn't include
                                your contract content.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">
                                Technical Information
                            </h3>
                            <p className="text-gray-700">
                                Standard web stuff like your IP address, browser
                                type, and device information. This helps us fix
                                bugs and keep the service running smoothly.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* How We Use Information */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>How We Use Your Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">
                                Providing Our Service
                            </h3>
                            <p className="text-gray-700">
                                We use your contracts to perform AI analysis and
                                provide you with insights. Your email helps us
                                send you analysis results and important account
                                updates.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">
                                Improving Contract Critic
                            </h3>
                            <p className="text-gray-700">
                                We analyze usage patterns (not contract content)
                                to understand how to make the service better.
                                All of this is done with anonymized data.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">
                                Communication
                            </h3>
                            <p className="text-gray-700">
                                We'll email you about your analyses, important
                                service updates, and occasionally helpful tips.
                                You can unsubscribe from non-essential emails
                                anytime.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">
                                Legal Compliance
                            </h3>
                            <p className="text-gray-700">
                                Sometimes we're legally required to keep certain
                                information or respond to valid legal requests.
                                We'll always fight for your privacy within the
                                law.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Data Security */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Lock className="w-5 h-5 text-red-500" />
                            How We Protect Your Data
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">
                                Encryption
                            </h3>
                            <p className="text-gray-700">
                                All your data is encrypted both in transit (when
                                you upload) and at rest (when we store it). We
                                use industry-standard encryption methods.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">
                                Access Controls
                            </h3>
                            <p className="text-gray-700">
                                Only authorized team members can access systems
                                containing your data, and only when necessary
                                for providing support or maintaining the
                                service.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">
                                Regular Security Audits
                            </h3>
                            <p className="text-gray-700">
                                We regularly review our security practices and
                                update them as needed. We also monitor for any
                                suspicious activity.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">
                                Data Minimization
                            </h3>
                            <p className="text-gray-700">
                                We only keep data as long as necessary. Contract
                                files are automatically deleted after 30 days,
                                and you can delete them sooner if you want.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Your Rights */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Trash2 className="w-5 h-5 text-purple-500" />
                            Your Rights and Choices
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">
                                Access Your Data
                            </h3>
                            <p className="text-gray-700">
                                You can view all your contracts and analyses in
                                your account dashboard. If you need additional
                                information, just ask!
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">
                                Delete Your Data
                            </h3>
                            <p className="text-gray-700">
                                You can delete individual contracts or your
                                entire account at any time. When you delete
                                something, it's gone for good.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">
                                Update Your Information
                            </h3>
                            <p className="text-gray-700">
                                You can update your email address and other
                                account information in your account settings.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">
                                Data Portability
                            </h3>
                            <p className="text-gray-700">
                                Want to take your data elsewhere? We can provide
                                you with a copy of your information in a
                                standard format.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Third Parties */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Third-Party Services</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">
                                AI Processing
                            </h3>
                            <p className="text-gray-700">
                                We use trusted AI services to analyze your
                                contracts. These providers have strict data
                                protection agreements and don't retain your
                                contract content.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">
                                Cloud Storage
                            </h3>
                            <p className="text-gray-700">
                                We use secure cloud storage providers with
                                enterprise-grade security. Your data is
                                encrypted and access is strictly controlled.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">
                                Analytics
                            </h3>
                            <p className="text-gray-700">
                                We use privacy-focused analytics to understand
                                how people use our service. This data is
                                anonymized and doesn't include personal
                                information.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Contact and Changes */}
                <div className="grid md:grid-cols-2 gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Questions About Privacy?</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-700 mb-4">
                                If you have any questions about this privacy
                                policy or how we handle your data, please don't
                                hesitate to reach out.
                            </p>
                            <a
                                href="mailto:privacy@contractcritic.com"
                                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                            >
                                Contact Us About Privacy
                            </a>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Policy Updates</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-700 mb-4">
                                We may update this policy occasionally. When we
                                do, we'll notify you via email and update the
                                date at the top of this page.
                            </p>
                            <p className="text-gray-600 text-sm">
                                Major changes will always be communicated
                                clearly, and we'll never make changes that
                                reduce your privacy rights without your consent.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Privacy;
