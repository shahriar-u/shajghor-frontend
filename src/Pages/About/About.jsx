import React from 'react';

const About = () => {
    const stats = [
        { id: 1, label: "Projects Completed", value: "2500+" },
        { id: 2, label: "Happy Clients", value: "1800+" },
        { id: 3, label: "Expert Designers", value: "25+" },
        { id: 4, label: "Years Experience", font: "9+" }
    ];

    return (
        <div className="bg-white">
            {/* Header Section */}
            <section className="relative py-20 bg-[#111827] text-white">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-6xl font-black uppercase mb-4">
                        About <span className="text-[#FBBF24]">Shajghor</span>
                    </h1>
                    <div className="w-24 h-1 bg-[#E11D48] mx-auto mb-6"></div>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Leading the way in modern interior design and premium decoration solutions in Bangladesh since 2015.
                    </p>
                </div>
            </section>

            {/* Main Content - Story Section */}
            <section className="py-20">
                <div className="container mx-auto px-6 lg:px-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="relative">
                            <img 
                                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000" 
                                alt="Interior Design" 
                                className="rounded-lg shadow-2xl"
                            />
                            <div className="absolute -bottom-10 -right-10 hidden md:block bg-[#E11D48] p-8 rounded-lg text-white max-w-[250px]">
                                <p className="text-3xl font-bold mb-2">9+ Years</p>
                                <p className="text-sm opacity-90 font-medium">Of turning house spaces into dream homes.</p>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-3xl md:text-4xl font-black text-black mb-6 uppercase">
                                Your Vision, Our <span className="text-[#E11D48]">Expertise</span>
                            </h2>
                            <p className="text-gray-600 text-lg leading-relaxed mb-6">
                                SHAJGHOR is a full-service interior design firm based in Dhaka, specializing in both residential and commercial design. We believe that a well-designed space can significantly impact your quality of life and productivity.
                            </p>
                            <p className="text-gray-600 text-lg leading-relaxed mb-8">
                                Our journey started with a simple goal: to make luxury interior design accessible and functional for everyone. Today, we are proud to be one of the most trusted names in the industry, known for our attention to detail and commitment to quality.
                            </p>
                            <button className="btn bg-[#FBBF24] hover:bg-black hover:text-white text-black border-none px-10 font-bold uppercase tracking-widest transition-all">
                                Learn More
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Statistics Section */}
            <section className="py-16 bg-gray-50 border-y border-gray-100">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                        {stats.map((stat) => (
                            <div key={stat.id}>
                                <p className="text-4xl md:text-5xl font-black text-[#E11D48] mb-2">{stat.value || stat.font}</p>
                                <p className="text-gray-500 font-bold uppercase tracking-wide text-sm">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission & Vision Section */}
            <section className="py-20">
                <div className="container mx-auto px-6 lg:px-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="p-10 bg-[#111827] text-white rounded-2xl">
                            <h3 className="text-2xl font-bold mb-4 text-[#FBBF24]">Our Mission</h3>
                            <p className="text-gray-400 leading-relaxed">
                                To provide innovative and sustainable interior solutions that reflect our clients' personalities and enhance their lifestyle through creative excellence and professional integrity.
                            </p>
                        </div>
                        <div className="p-10 bg-[#E11D48] text-white rounded-2xl">
                            <h3 className="text-2xl font-bold mb-4 text-white">Our Vision</h3>
                            <p className="text-white/80 leading-relaxed">
                                To be the premier interior design destination in Bangladesh, setting new benchmarks in quality, craftsmanship, and customer satisfaction for every home and workspace.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;