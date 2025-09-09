import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Scale, Building, Globe, Mail } from "lucide-react";

const Legal = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Legal Information
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Important legal details about Contract Critic and how we
                        operate.
                    </p>
                </div>

                {/* Service Information */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Building className="w-5 h-5 text-blue-500" />
                            About Our Service
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">
                                Service Name
                            </h3>
                            <p className="text-gray-700">Contract Critic</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">
                                Service Description
                            </h3>
                            <p className="text-gray-700">
                                Contract Critic is an AI-powered contract
                                analysis platform that helps users understand
                                legal documents by providing plain-English
                                summaries, risk assessments, and key term
                                identification.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">
                                Service Type
                            </h3>
                            <p className="text-gray-700">
                                Software as a Service (SaaS) - Technology
                                platform providing automated contract analysis
                                tools.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Business Information */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Globe className="w-5 h-5 text-green-500" />
                            Business Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">
                                Business Status
                            </h3>
                            <p className="text-gray-700">
                                Contract Critic operates as an independent
                                software service. We are not a registered
                                business entity at this time.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">
                                Service Location
                            </h3>
                            <p className="text-gray-700">
                                Our service is operated from North America, with
                                team members distributed across multiple time
                                zones to provide better support coverage.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">
                                Jurisdiction
                            </h3>
                            <p className="text-gray-700">
                                These terms and our service are governed by the
                                laws of the jurisdiction where our primary
                                operations are based. Any disputes will be
                                resolved through friendly discussion first, with
                                formal legal processes as a last resort.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Legal Disclaimers */}
                <Card className="mb-8 border-yellow-200 bg-yellow-50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-yellow-900">
                            <Scale className="w-5 h-5" />
                            Important Legal Disclaimers
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h3 className="font-semibold text-yellow-900 mb-2">
                                Not Legal Advice
                            </h3>
                            <p className="text-yellow-800">
                                Contract Critic provides technology-based
                                analysis and information only. Our service does
                                not constitute legal advice, and we are not a
                                law firm. Always consult with qualified legal
                                professionals for legal advice.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-yellow-900 mb-2">
                                No Attorney-Client Privilege
                            </h3>
                            <p className="text-yellow-800">
                                Using Contract Critic does not create an
                                attorney-client relationship or privilege.
                                Information you share with our service is not
                                protected by attorney-client privilege.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-yellow-900 mb-2">
                                AI Limitations
                            </h3>
                            <p className="text-yellow-800">
                                Our AI analysis is based on patterns and
                                training data. While we strive for accuracy, AI
                                can make mistakes or miss important nuances that
                                a human legal professional would catch.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-yellow-900 mb-2">
                                Use at Your Own Risk
                            </h3>
                            <p className="text-yellow-800">
                                You use Contract Critic at your own risk. We
                                recommend using our analysis as one tool among
                                many in your decision-making process, not as the
                                sole basis for important legal or business
                                decisions.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Compliance and Standards */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Compliance and Standards</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">
                                Data Protection
                            </h3>
                            <p className="text-gray-700">
                                We follow industry best practices for data
                                protection and privacy. While we may not be
                                subject to specific regulations like GDPR, we
                                voluntarily implement similar privacy
                                protections for all users.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">
                                Security Standards
                            </h3>
                            <p className="text-gray-700">
                                We implement enterprise-grade security measures
                                including encryption, access controls, and
                                regular security audits to protect your data.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">
                                Service Availability
                            </h3>
                            <p className="text-gray-700">
                                We strive to maintain high service availability
                                but do not guarantee 100% uptime. We may need to
                                perform maintenance or updates that temporarily
                                affect service availability.
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
                                Our Technology
                            </h3>
                            <p className="text-gray-700">
                                The Contract Critic platform, including its
                                software, algorithms, design, and content, is
                                our intellectual property. Users receive a
                                license to use the service but do not acquire
                                ownership rights.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">
                                Your Content
                            </h3>
                            <p className="text-gray-700">
                                You retain all rights to the contracts and
                                documents you upload. We only use your content
                                to provide our analysis service and do not claim
                                ownership or additional rights to your
                                documents.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">
                                Third-Party Content
                            </h3>
                            <p className="text-gray-700">
                                Our service may include or reference third-party
                                content, tools, or services. We respect the
                                intellectual property rights of others and
                                expect users to do the same.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Dispute Resolution */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Dispute Resolution</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">
                                Friendly Resolution First
                            </h3>
                            <p className="text-gray-700">
                                If you have any issues or disputes with our
                                service, please contact us first. We're
                                committed to resolving problems fairly and
                                quickly through direct communication.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">
                                Formal Processes
                            </h3>
                            <p className="text-gray-700">
                                If we can't resolve a dispute through
                                discussion, we'll work together to find an
                                appropriate resolution method, which may include
                                mediation or other alternative dispute
                                resolution approaches.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">
                                Good Faith
                            </h3>
                            <p className="text-gray-700">
                                We commit to handling all disputes in good
                                faith, with the goal of finding fair solutions
                                that work for everyone involved.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Contact Information */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Mail className="w-5 h-5 text-purple-500" />
                            Legal Contact Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">
                                Legal Inquiries
                            </h3>
                            <p className="text-gray-700 mb-2">
                                For legal questions, compliance issues, or
                                formal notices:
                            </p>
                            <a
                                href="mailto:legal@contractcritic.com"
                                className="text-blue-600 hover:text-blue-800 transition-colors"
                            >
                                legal@contractcritic.com
                            </a>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">
                                General Contact
                            </h3>
                            <p className="text-gray-700 mb-2">
                                For general questions or support:
                            </p>
                            <a
                                href="mailto:hello@contractcritic.com"
                                className="text-blue-600 hover:text-blue-800 transition-colors"
                            >
                                hello@contractcritic.com
                            </a>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">
                                Response Time
                            </h3>
                            <p className="text-gray-700">
                                We aim to respond to legal inquiries within 5
                                business days. For urgent matters, please
                                indicate the urgency in your subject line.
                            </p>
                        </div>
                        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                            <p className="text-sm text-gray-600">
                                <strong>Note:</strong> This legal information
                                page is provided for transparency and general
                                information purposes. It does not constitute
                                legal advice and may be updated from time to
                                time. For the most current version of our terms
                                and policies, please refer to the respective
                                pages on our website.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Legal;
