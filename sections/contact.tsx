// Fixed reference type in the modern contact section
import ContactCard from '@/components/cards/contact'
import Heading from '@/components/heading/heading'
import FancyButton from '@/components/ui/fancy-button'
import Card from '@/components/ui/card'
import Input from '@/components/ui/input'
import SelectInput from '@/components/ui/select-input'
import TextArea from '@/components/ui/text-area'
import React, { FormEvent, useRef, useState } from 'react'
import { FaPhoneVolume, FaProjectDiagram, FaUser, FaCheckCircle } from 'react-icons/fa'
import { MdEmail, MdSubject } from 'react-icons/md'
import { SiMinutemailer } from 'react-icons/si'
import { BiErrorCircle } from 'react-icons/bi'
import emailjs from "@emailjs/browser"

interface FormStatus {
    type: 'idle' | 'loading' | 'success' | 'error';
    message: string;
}

export default function ContactSection() {
    const formRef = useRef<HTMLFormElement>(null!);
    // Fixed: Proper type for button ref
    const btnRef = useRef<HTMLButtonElement>(null);

    const [services, setServices] = useState<string[]>([]);
    const [formStatus, setFormStatus] = useState<FormStatus>({ type: 'idle', message: '' });

    const sendEmail = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setFormStatus({ type: 'loading', message: 'Sending your message...' });

        try {
            const result = await emailjs.sendForm(
                "service_uiyj1nc",
                "template_4jx4kdc",
                formRef.current,
                "-Iy3F3-QdzH108xcu"
            );

            console.log(result.text);
            setFormStatus({
                type: 'success',
                message: 'Thank you! Your message has been sent successfully. I\'ll get back to you soon.'
            });

            // Reset form after successful submission
            formRef.current.reset();
            setServices([]);

            // Clear success message after 5 seconds
            setTimeout(() => {
                setFormStatus({ type: 'idle', message: '' });
            }, 5000);

        } catch (error) {
            console.error("Error sending email:", error);
            setFormStatus({
                type: 'error',
                message: 'Oops! Something went wrong. Please try again or email me directly.'
            });

            // Clear error message after 5 seconds
            setTimeout(() => {
                setFormStatus({ type: 'idle', message: '' });
            }, 5000);
        }
    };

    const handleFormSubmit = () => {
        if (formStatus.type !== 'loading' && btnRef.current) {
            btnRef.current.click();
        }
    };

    const isLoading = formStatus.type === 'loading';

    return (
        <section id="contact" className='pt-24 px-3 lg:px-8'>
            <Heading number='03' title_1='Contact' title_2='Me' />
            <Card>
                <div className='grid gap-8 grid-cols-1 lg:grid-cols-3'>
                    {/* Contact Cards */}
                    <div className='flex flex-col gap-8'>
                        <ContactCard
                            title="Let's Connect Directly"
                            icon={<FaPhoneVolume className='fill-[#333] text-lg' />}
                            text="Ready to discuss your project"
                            btnText="Schedule Call"
                        />
                        <ContactCard
                            title="Send an Email"
                            icon={<MdEmail className='fill-[#333] text-lg' />}
                            text="mrvivekthumar@gmail.com"
                            btnText="Email Me"
                        />

                        {/* Professional Info Card */}
                        <div className="bg-gradient-to-br from-blue-joust/10 to-green-benzol/10 border border-border rounded-lg p-6 backdrop-blur-sm">
                            <h3 className="text-lg font-bold text-primary-foreground mb-3">Response Time</h3>
                            <div className="space-y-2 text-sm text-secondary-foreground">
                                <p>📧 Email: Within 24 hours</p>
                                <p>🚀 Projects: 2-3 business days</p>
                                <p>💼 Collaborations: Same day</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <form
                        onSubmit={sendEmail}
                        ref={formRef}
                        className='lg:col-span-2 bg-secondary-background border border-border rounded-lg space-y-6 relative overflow-hidden py-6 px-6 shadow-md'
                    >
                        {/* Form Status Message */}
                        {formStatus.message && (
                            <div className={`
                                p-4 rounded-lg border flex items-center gap-3 transition-all duration-300
                                ${formStatus.type === 'success'
                                    ? 'bg-green-500/10 border-green-500/20 text-green-400'
                                    : formStatus.type === 'error'
                                        ? 'bg-red-500/10 border-red-500/20 text-red-400'
                                        : 'bg-blue-500/10 border-blue-500/20 text-blue-400'
                                }
                            `}>
                                {formStatus.type === 'success' && <FaCheckCircle className="flex-shrink-0" />}
                                {formStatus.type === 'error' && <BiErrorCircle className="flex-shrink-0" />}
                                {formStatus.type === 'loading' && (
                                    <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin flex-shrink-0"></div>
                                )}
                                <span className="text-sm">{formStatus.message}</span>
                            </div>
                        )}

                        {/* Personal Information */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-primary-foreground">Personal Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                    type='text'
                                    name='name'
                                    placeholder='Your Full Name'
                                    icon={<FaUser />}
                                    required
                                />
                                <Input
                                    type='email'
                                    name='email'
                                    placeholder='Your Email Address'
                                    icon={<MdEmail />}
                                    required
                                />
                            </div>
                            <Input
                                type='text'
                                name='subject'
                                placeholder='Project Subject'
                                icon={<MdSubject />}
                                required
                            />
                        </div>

                        {/* Project Interests */}
                        <div className='space-y-4'>
                            <h3 className="text-lg font-semibold text-primary-foreground">What can I help you with?</h3>
                            <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3'>
                                {serviceOptions.map((service) => (
                                    <SelectInput
                                        key={service.id}
                                        type="checkbox"
                                        id={service.id}
                                        text={service.text}
                                        selectedOptions={services}
                                        setSelectedOptions={setServices}
                                        allowMultiple
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Project Details */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-primary-foreground">Project Details</h3>
                            <TextArea
                                placeholder='Tell me about your project, goals, timeline, and any specific requirements...'
                                name='message'
                                icon={<FaProjectDiagram />}
                                required
                            />
                        </div>

                        {/* Hidden Services Input */}
                        <input
                            type='hidden'
                            value={services.join(", ")}
                            name='services'
                        />

                        {/* Submit Button */}
                        <div className='flex flex-col sm:flex-row gap-4 sm:justify-between sm:items-center pt-4'>
                            <div className="text-xs text-secondary-foreground">
                                <p>By submitting this form, you agree to be contacted about your project.</p>
                            </div>

                            <div className="flex justify-center sm:justify-end">
                                <FancyButton
                                    text={isLoading ? "Sending..." : "Send Message"}
                                    icon={<SiMinutemailer />}
                                    size="md"
                                    onClick={handleFormSubmit}
                                    className={`
                                        w-full sm:w-auto min-w-[160px]
                                        ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}
                                    `}
                                />
                            </div>
                        </div>

                        {/* Hidden submit button */}
                        <button
                            type='submit'
                            ref={btnRef}
                            hidden
                            disabled={isLoading}
                            aria-label="Submit form"
                        />
                    </form>
                </div>
            </Card>
        </section>
    )
}

// Updated service options with better professional terminology
const serviceOptions = [
    {
        id: "Web Development",
        text: "Web Development"
    },
    {
        id: "Full-Stack Solutions",
        text: "Full-Stack Solutions"
    },
    {
        id: "Technical Consultation",
        text: "Technical Consultation"
    },
    {
        id: "Code Review",
        text: "Code Review"
    },
    {
        id: "Project Collaboration",
        text: "Project Collaboration"
    },
    {
        id: "Mentorship",
        text: "Mentorship"
    },
]