// sections/contact.tsx - Fixed Hydration Issue
import ContactCard from '@/components/cards/contact'
import Heading from '@/components/heading/heading'
import FancyButton from '@/components/ui/fancy-button'
import Card from '@/components/ui/card'
import Input from '@/components/ui/input'
import SelectInput from '@/components/ui/select-input'
import TextArea from '@/components/ui/text-area'
import { useContactForm } from '@/lib/hooks/useContactForm'
import React, { FormEvent, useRef, useState, useEffect } from 'react'
import { FaPhoneVolume, FaProjectDiagram, FaUser, FaCheckCircle, FaClock } from 'react-icons/fa'
import { MdEmail, MdSubject } from 'react-icons/md'
import { SiMinutemailer } from 'react-icons/si'
import { BiErrorCircle } from 'react-icons/bi'

export default function ContactSection() {
    const formRef = useRef<HTMLFormElement>(null!);
    const btnRef = useRef<HTMLButtonElement>(null);

    const [services, setServices] = useState<string[]>([]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const {
        formStatus,
        fieldErrors,
        sendEmail,
        resetStatus,
        validateField,
        isLoading,
        retryAfter
    } = useContactForm();

    // Auto-clear status messages
    useEffect(() => {
        if (formStatus.type === 'success' || formStatus.type === 'error') {
            const timer = setTimeout(() => {
                resetStatus();
            }, 6000);
            return () => clearTimeout(timer);
        }
    }, [formStatus.type, resetStatus]);

    // Handle input changes with real-time validation
    const handleInputChange = (field: keyof typeof formData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        if (!formRef.current || isLoading) return; // 👈 FIXED: Prevent double submission

        const submitData = {
            ...formData,
            services: services.join(', ')
        };

        const result = await sendEmail(submitData);

        if (result.success) {
            // Reset form after successful submission
            formRef.current.reset();
            setFormData({ name: '', email: '', subject: '', message: '' });
            setServices([]);
        }
    };

    const handleFormSubmit = () => {
        if (!isLoading && btnRef.current) {
            btnRef.current.click();
        }
    };

    return (
        <section id="contact" className='pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-16 sm:pb-20 md:pb-24 lg:pb-28 px-3 sm:px-6 lg:px-8'>
            {/* Heading with better spacing */}
            <div className="mb-8 sm:mb-12 lg:mb-16">
                <Heading number='03' title_1='Contact' title_2='Me' />
            </div>
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

                        {/* Professional Info Card - 👈 FIXED: Changed p to div */}
                        <div className="bg-gradient-to-br from-blue-joust/10 to-green-benzol/10 border border-border rounded-lg p-6 backdrop-blur-sm">
                            <h3 className="text-lg font-bold text-primary-foreground mb-3">Response Time</h3>
                            <div className="space-y-2 text-sm text-secondary-foreground">
                                <div>📧 Email: Within 24 hours</div>
                                <div>🚀 Projects: 2-3 business days</div>
                                <div>💼 Collaborations: Same day</div>
                            </div>
                        </div>

                        {/* Security Notice - 👈 FIXED: Changed p to div */}
                        <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                <span className="text-sm font-medium text-green-400">Secure Contact Form</span>
                            </div>
                            <div className="text-xs text-secondary-foreground">
                                Your information is encrypted and never shared with third parties.
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <form
                        onSubmit={handleSubmit}
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
                                <div className="flex-1">
                                    <span className="text-sm">{formStatus.message}</span>
                                    {retryAfter && (
                                        <div className="flex items-center gap-2 mt-2 text-xs opacity-75">
                                            <FaClock className="w-3 h-3" />
                                            <span>Please wait {retryAfter} seconds before trying again</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Personal Information */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-primary-foreground">Personal Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Input
                                        type='text'
                                        name='name'
                                        placeholder='Your Full Name'
                                        icon={<FaUser />}
                                        required
                                        value={formData.name}
                                        onChange={(e) => handleInputChange('name', e.target.value)}
                                        className={fieldErrors.name ? 'border-red-500/50' : ''}
                                    />
                                    {fieldErrors.name && (
                                        <div className="text-red-400 text-xs mt-1 flex items-center gap-1">
                                            <BiErrorCircle className="w-3 h-3" />
                                            {fieldErrors.name}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <Input
                                        type='email'
                                        name='email'
                                        placeholder='Your Email Address'
                                        icon={<MdEmail />}
                                        required
                                        value={formData.email}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                        className={fieldErrors.email ? 'border-red-500/50' : ''}
                                    />
                                    {fieldErrors.email && (
                                        <div className="text-red-400 text-xs mt-1 flex items-center gap-1">
                                            <BiErrorCircle className="w-3 h-3" />
                                            {fieldErrors.email}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div>
                                <Input
                                    type='text'
                                    name='subject'
                                    placeholder='Project Subject'
                                    icon={<MdSubject />}
                                    required
                                    value={formData.subject}
                                    onChange={(e) => handleInputChange('subject', e.target.value)}
                                    className={fieldErrors.subject ? 'border-red-500/50' : ''}
                                />
                                {fieldErrors.subject && (
                                    <div className="text-red-400 text-xs mt-1 flex items-center gap-1">
                                        <BiErrorCircle className="w-3 h-3" />
                                        {fieldErrors.subject}
                                    </div>
                                )}
                            </div>
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
                            <div>
                                <TextArea
                                    placeholder='Tell me about your project, goals, timeline, and any specific requirements...'
                                    name='message'
                                    icon={<FaProjectDiagram />}
                                    required
                                    value={formData.message}
                                    onChange={(e) => handleInputChange('message', e.target.value)}
                                    className={fieldErrors.message ? 'border-red-500/50' : ''}
                                    maxLength={5000}
                                />
                                {fieldErrors.message && (
                                    <div className="text-red-400 text-xs mt-1 flex items-center gap-1">
                                        <BiErrorCircle className="w-3 h-3" />
                                        {fieldErrors.message}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Honeypot field (hidden from users, visible to bots) */}
                        <input
                            type="text"
                            name="website"
                            style={{ display: 'none' }}
                            tabIndex={-1}
                            autoComplete="off"
                        />

                        {/* Submit Button */}
                        <div className='flex flex-col sm:flex-row gap-4 sm:justify-between sm:items-center pt-4'>
                            <div className="text-xs text-secondary-foreground space-y-1">
                                <div>By submitting this form, you agree to be contacted about your project.</div>
                                <div className="flex items-center gap-1 text-green-400">
                                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                                    SSL encrypted • GDPR compliant
                                </div>
                            </div>

                            <div className="flex justify-center sm:justify-end">
                                <FancyButton
                                    text={isLoading ? "Sending..." : "Send Message"}
                                    icon={isLoading ?
                                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                        : <SiMinutemailer />
                                    }
                                    size="md"
                                    onClick={handleFormSubmit}
                                    className={`
                                        w-full sm:w-auto min-w-[160px]
                                        ${isLoading || retryAfter ? 'opacity-70 cursor-not-allowed' : ''}
                                    `}
                                />
                            </div>
                        </div>

                        {/* Character counter for message */}
                        <div className="text-xs text-secondary-foreground/60 text-right">
                            {formData.message.length}/5000 characters
                        </div>

                        {/* Hidden submit button */}
                        <button
                            type='submit'
                            ref={btnRef}
                            hidden
                            disabled={isLoading || !!retryAfter}
                            aria-label="Submit form"
                        />
                    </form>
                </div>
            </Card>
        </section>
    )
}

// Enhanced service options with better categorization
const serviceOptions = [
    {
        id: "Frontend Development",
        text: "Frontend Development"
    },
    {
        id: "Backend Development",
        text: "Backend Development"
    },
    {
        id: "Full-Stack Solutions",
        text: "Full-Stack Solutions"
    },
    {
        id: "API Development",
        text: "API Development"
    },
    {
        id: "Code Review & Optimization",
        text: "Code Review & Optimization"
    },
    {
        id: "Technical Consultation",
        text: "Technical Consultation"
    },
    {
        id: "Project Collaboration",
        text: "Project Collaboration"
    },
    {
        id: "Mentorship & Learning",
        text: "Mentorship & Learning"
    },
]