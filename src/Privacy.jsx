import Logo from "./assets/logo.png";

function Privacy() {
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
                        <h1 className="font-afacad text-[50px] mt-[20px] px-10">PRIVACY POLICY</h1>
                    </div>
                    <div className="h-[10px] w-full bg-[#006699] mt-2"></div>
                </div>

                {/* Privacy Sections */}
                <div className="px-[86px] space-y-8 mt-10">

                    <div className="flex flex-col">
                        <h1 className="font-outfit font-bold text-xl">Information Collection</h1>
                        <p className="text-sm ml-10">
                            "Compass" may collect the following types of information from users:
                        </p>
                        <ul className="list-disc text-sm ml-14 mt-1 space-y-1">
                            <li><strong>Information you provide:</strong> This may include information you submit when creating an account, posting travel logs, or contacting us.</li>
                            <li><strong>Automatically collected information:</strong> This may include your IP address, browser type, and usage patterns.</li>
                        </ul>
                    </div>

                    <div className="flex flex-col">
                        <h1 className="font-outfit font-bold text-xl">Use of Information</h1>
                        <p className="text-sm ml-10">
                            "Compass" may use your information for the following purposes:
                        </p>
                        <ul className="list-disc text-sm ml-14 mt-1 space-y-1">
                            <li>To provide and improve the website.</li>
                            <li>To personalize your experience.</li>
                            <li>To communicate with you, such as sending updates or responding to inquiries.</li>
                            <li>To analyze website usage and trends.</li>
                        </ul>
                    </div>

                    <div className="flex flex-col">
                        <h1 className="font-outfit font-bold text-xl">Information Sharing</h1>
                        <p className="text-sm ml-10">
                            "Compass" may share your information with third parties in the following circumstances:
                        </p>
                        <ul className="list-disc text-sm ml-14 mt-1 space-y-1">
                            <li>With your consent.</li>
                            <li>With service providers who assist us in operating the website.</li>
                            <li>When required by law.</li>
                            <li>In connection with a merger, acquisition, or sale of assets.</li>
                        </ul>
                    </div>

                    <div className="flex flex-col">
                        <h1 className="font-outfit font-bold text-xl">Data Security</h1>
                        <p className="text-sm ml-10">
                            "Compass" takes reasonable measures to protect your information from unauthorized access, use, or disclosure. However, no data transmission over the internet is completely secure, and we cannot guarantee the security of your information.
                        </p>
                    </div>

                    <div className="flex flex-col">
                        <h1 className="font-outfit font-bold text-xl">Your Choices</h1>
                        <p className="text-sm ml-10">
                            You may be able to access, update, or delete your personal information by contacting us.
                        </p>
                        <p className="text-sm ml-10 mt-2">
                            You may be able to opt out of receiving promotional emails from us.
                        </p>
                    </div>

                    <div className="flex flex-col">
                        <h1 className="font-outfit font-bold text-xl">Children's Privacy</h1>
                        <p className="text-sm ml-10">
                            "Compass" is not intended for children under the age of [Insert Age], and we do not knowingly collect personal information from children.
                        </p>
                    </div>

                    <div className="flex flex-col">
                        <h1 className="font-outfit font-bold text-xl">Changes to Privacy Policy</h1>
                        <p className="text-sm ml-10">
                            "Compass" may update this Privacy Policy at any time. Any changes will be posted on this page, and your continued use of the website constitutes acceptance of the revised Policy.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Privacy;
