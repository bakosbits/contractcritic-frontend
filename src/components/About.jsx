import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Users, Zap, Heart } from "lucide-react";

const About = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        About Contract Critic
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        We're on a mission to make contract analysis accessible
                        to everyone. No more legal jargon confusion or expensive
                        lawyer consultations for basic contract review.
                    </p>
                </div>

                {/* Story Section */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Heart className="w-5 h-5 text-red-500" />
                            Our Story
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="prose prose-gray max-w-none">
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Contract Critic was born from a simple frustration:
                            why should understanding your own contracts be so
                            difficult and expensive? We've all been there -
                            staring at pages of legal text, wondering what we're
                            actually agreeing to, and whether we should spend
                            hundreds of dollars on a lawyer just to understand
                            the basics.
                        </p>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Our team of developers and legal enthusiasts decided
                            to change that. We built Contract Critic to be your
                            friendly contract companion - using AI to break down
                            complex legal language into plain English, highlight
                            potential risks, and help you make informed
                            decisions.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            We believe everyone deserves to understand what
                            they're signing, whether it's a freelance agreement,
                            rental lease, or business contract. That's why we've
                            made Contract Critic simple, affordable, and
                            genuinely helpful.
                        </p>
                    </CardContent>
                </Card>

                {/* Values Grid */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Shield className="w-5 h-5 text-blue-500" />
                                Transparency
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600">
                                We believe in clear, honest communication. No
                                hidden fees, no confusing terms, and no legal
                                mumbo-jumbo. What you see is what you get.
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Users className="w-5 h-5 text-green-500" />
                                Accessibility
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600">
                                Legal help shouldn't be a luxury. We're
                                committed to making contract analysis affordable
                                and accessible to individuals, small businesses,
                                and everyone in between.
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Zap className="w-5 h-5 text-yellow-500" />
                                Simplicity
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600">
                                Complex problems don't need complex solutions.
                                We focus on making contract analysis as simple
                                as uploading a file and getting clear,
                                actionable insights.
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* What We Do */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>What We Do</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">
                                    Smart Contract Analysis
                                </h3>
                                <p className="text-gray-700">
                                    Our AI reads through your contracts and
                                    identifies key terms, potential risks, and
                                    important clauses you should know about.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">
                                    Plain English Summaries
                                </h3>
                                <p className="text-gray-700">
                                    We translate legal jargon into language you
                                    actually understand, so you know exactly
                                    what you're agreeing to.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">
                                    Risk Assessment
                                </h3>
                                <p className="text-gray-700">
                                    We highlight potential red flags and areas
                                    where you might want to negotiate or seek
                                    additional clarification.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">
                                    Secure & Private
                                </h3>
                                <p className="text-gray-700">
                                    Your contracts are your business. We use
                                    enterprise-grade security to keep your
                                    documents safe and never share your
                                    information.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Contact CTA */}
                <Card className="text-center">
                    <CardContent className="pt-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            Questions or Feedback?
                        </h3>
                        <p className="text-gray-600 mb-4">
                            We'd love to hear from you! Whether you have
                            questions, suggestions, or just want to say hi.
                        </p>
                        <a
                            href="mailto:hello@contractcritic.com"
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        >
                            Get in Touch
                        </a>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default About;
