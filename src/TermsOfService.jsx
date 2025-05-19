import Logo from "./assets/logo.png";

function TermsOfService() {
    return (
        <>
            <div className="w-full h-[10000px] overflow-x-hidden">
                {/* Navigation */}
                <div className="w-full h-[55px] bg-[#006699]">
                    <div className="h-full flex items-center px-6 sm:px-5 md:px-10">
                        <img src={Logo} className="h-[80%]" alt="" />
                        <h1 style={{ fontFamily: 'Brans' }} className="text-3xl ml-2 text-white">
                            Compass
                        </h1>
                    </div>
                </div>

                {/* Content */}
                <div className="w-full flex flex-col items-center px-3 sm:px-5 md:px-10">
                    <div className="w-full">
                        <h1 className="font-afacad text-[50px] mt-[20px] px-10">TERMS OF SERVICE</h1>
                    </div>
                    <div className="h-[10px] w-full bg-[#006699] mt-2"></div>
                </div>

                {/* Terms Sections */}
                <div className="px-[86px] space-y-8 mt-10">
                    <div className="flex flex-col">
                        <h1 className="font-outfit font-bold text-xl">Acceptance of Terms</h1>
                        <p className="text-sm ml-10">
                            By accessing and using "Compass," you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you should not use the website.
                        </p>
                    </div>

                    <div className="flex flex-col">
                        <h1 className="font-outfit font-bold text-xl">Description of Service</h1>
                        <p className="text-sm ml-10">
                            "Compass" provides users with information about extreme adventures, including destinations, trip planning resources, and travel logs.
                        </p>
                    </div>

                    <div className="flex flex-col">
                        <h1 className="font-outfit font-bold text-xl">User Conduct</h1>
                        <ul className="list-disc text-sm ml-10 mt-1 space-y-1">
                            <li>You agree to use "Compass" only for lawful purposes.</li>
                            <li>You agree not to engage in any activity that disrupts or interferes with the website's operation.</li>
                            <li>
                                You are responsible for any content you submit to "Compass," including travel logs or other user-generated content. You agree that your content will be accurate,
                                not violate any third-party rights, and not contain any harmful or offensive material.
                            </li>
                        </ul>
                    </div>

                    <div className="flex flex-col">
                        <h1 className="font-outfit font-bold text-xl">Intellectual Property</h1>
                        <ul className="list-disc text-sm ml-10 mt-1 space-y-1">
                            <li>The content on "Compass," including text, images, and logos, is protected by copyright and other intellectual property laws.</li>
                            <li>You may not reproduce, distribute, or modify any content from "Compass" without prior written consent.</li>
                        </ul>
                    </div>

                    <div className="flex flex-col">
                        <h1 className="font-outfit font-bold text-xl">Links to Third-Party Websites</h1>
                        <p className="text-sm ml-10">
                            "Compass" may contain links to third-party websites. These links are provided for your convenience only, and "Compass" does not endorse or control the content of these websites.
                        </p>
                    </div>

                    <div className="flex flex-col">
                        <h1 className="font-outfit font-bold text-xl">Disclaimer of Warranties</h1>
                        <ul className="list-disc text-sm ml-10 mt-1 space-y-1">
                            <li>"Compass" is provided on an "as is" and "as available" basis.</li>
                            <li>"Compass" makes no warranties, express or implied, about the website's accuracy, reliability, or availability.</li>
                            <li>"Compass" disclaims all warranties, including but not limited to, implied warranties of merchantability and fitness for a particular purpose.</li>
                        </ul>
                    </div>

                    <div className="flex flex-col">
                        <h1 className="font-outfit font-bold text-xl">Limitation of Liability</h1>
                        <ul className="list-disc text-sm ml-10 mt-1 space-y-1">
                            <li>"Compass" shall not be liable for any damages arising from your use of the website, including direct, indirect, incidental, consequential, or punitive damages.</li>
                            <li>This limitation of liability applies to all claims, whether based on warranty, contract, tort, or any other legal theory.</li>
                        </ul>
                    </div>

                    <div className="flex flex-col">
                        <h1 className="font-outfit font-bold text-xl">Indemnification</h1>
                        <p className="text-sm ml-10">
                            You agree to indemnify and hold "Compass" harmless from any claims, damages, or losses arising from your use of the website or your violation of these Terms.
                        </p>
                    </div>

                    <div className="flex flex-col">
                        <h1 className="font-outfit font-bold text-xl">Changes to Terms</h1>
                        <p className="text-sm ml-10">
                            "Compass" may update these Terms of Service at any time. Any changes will be posted on this page, and your continued use of the website constitutes acceptance of the revised Terms.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TermsOfService;
