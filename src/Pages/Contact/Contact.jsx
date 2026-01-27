import React from 'react';

const Contact = () => {
    return (
        <div className="bg-white min-h-screen">
            {/* Page Header */}
            <section className="py-16 bg-[#111827] text-white text-center">
                <div className="container mx-auto px-6">
                    <h1 className="text-4xl md:text-5xl font-black uppercase mb-4 tracking-tight">
                        Contact <span className="text-[#FBBF24]">Us</span>
                    </h1>
                    <div className="w-20 h-1 bg-[#E11D48] mx-auto mb-6"></div>
                    <p className="text-gray-400 max-w-xl mx-auto">
                        Have a project in mind? Let's talk about your dream interior decoration.
                    </p>
                </div>
            </section>

            <section className="py-20">
                <div className="container mx-auto px-6 lg:px-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        
                        {/* Contact Information */}
                        <div>
                            <h2 className="text-3xl font-black text-black mb-8 uppercase">
                                Get In <span className="text-[#E11D48]">Touch</span>
                            </h2>
                            <p className="text-gray-600 mb-10 leading-relaxed">
                                Whether you're looking to renovate your home or start a new commercial project, our team is here to help you every step of the way.
                            </p>

                            <div className="space-y-8">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-[#F9F9F9] flex items-center justify-center rounded-lg text-[#E11D48] text-2xl shadow-sm">
                                        📍
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-black text-lg">Our Office</h4>
                                        <p className="text-gray-500">Dhanmondi, Road 27, Dhaka, Bangladesh</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-[#F9F9F9] flex items-center justify-center rounded-lg text-[#E11D48] text-2xl shadow-sm">
                                        📞
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-black text-lg">Call Us</h4>
                                        <p className="text-gray-500">+880 1234 567 890</p>
                                        <p className="text-gray-500">+880 1876 543 210</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-[#F9F9F9] flex items-center justify-center rounded-lg text-[#E11D48] text-2xl shadow-sm">
                                        ✉️
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-black text-lg">Email Address</h4>
                                        <p className="text-gray-500">info@shajghor.com</p>
                                        <p className="text-gray-500">support@shajghor.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-[#F9F9F9] p-8 md:p-12 rounded-2xl shadow-sm border-t-4 border-[#FBBF24]">
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="form-control">
                                        <label className="label font-bold text-black text-sm uppercase">Full Name</label>
                                        <input type="text" placeholder="John Doe" className="input input-bordered w-full bg-white focus:outline-[#E11D48]" />
                                    </div>
                                    <div className="form-control">
                                        <label className="label font-bold text-black text-sm uppercase">Email Address</label>
                                        <input type="email" placeholder="john@example.com" className="input input-bordered w-full bg-white focus:outline-[#E11D48]" />
                                    </div>
                                </div>
                                
                                <div className="form-control">
                                    <label className="label font-bold text-black text-sm uppercase">Subject</label>
                                    <input type="text" placeholder="Interior Design Query" className="input input-bordered w-full bg-white focus:outline-[#E11D48]" />
                                </div>

                                <div className="form-control">
                                    <label className="label font-bold text-black text-sm uppercase">Your Message</label>
                                    <textarea className="textarea textarea-bordered h-32 bg-white focus:outline-[#E11D48]" placeholder="Tell us about your project..."></textarea>
                                </div>

                                <button type="submit" className="btn w-full bg-[#E11D48] hover:bg-black text-white border-none font-black uppercase tracking-widest h-14 transition-all duration-300">
                                    Send Message
                                </button>
                            </form>
                        </div>

                    </div>
                </div>
            </section>

            {/* Google Maps Placeholder */}
            <section className="h-[400px] w-full bg-gray-200">
                <iframe 
                    title="map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.9024424301355!2d90.36542157589!3d23.75085817867!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755bf4e6900f097%3A0xc3f982136e0d4c81!2sDhanmondi%2027!5e0!3m2!1sen!2sbd!4v1714494832561!5m2!1sen!2sbd" 
                    className="w-full h-full border-0 grayscale contrast-125"
                    allowFullScreen="" 
                    loading="lazy"
                ></iframe>
            </section>
        </div>
    );
};

export default Contact;