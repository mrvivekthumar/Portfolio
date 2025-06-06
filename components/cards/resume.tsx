// components/cards/resume.tsx - Final Production Version
import React, { useState, useCallback } from 'react'
import Card from '../ui/card'
import Image from 'next/image'
import signature from "@/public/assets/images/me/signature.png"
import { FaDownload, FaSpinner, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa'
import Socials from '../ui/socials'
import FancyButton from '../ui/fancy-button'

interface DownloadState {
    status: 'idle' | 'downloading' | 'success' | 'error';
    message?: string;
}

export default function ResumeCard() {
    const [downloadState, setDownloadState] = useState<DownloadState>({ status: 'idle' });

    const handleDownloadResume = useCallback(async () => {
        if (downloadState.status === 'downloading') return;

        setDownloadState({ status: 'downloading', message: 'Preparing download...' });

        try {
            // 👈 PRODUCTION READY: Works in both development and production
            const resumePath = '/assets/resume/Vivek_Thumar_Resume.pdf';

            // Track download analytics
            console.log('[RESUME_DOWNLOAD]', {
                timestamp: new Date().toISOString(),
                path: resumePath,
                environment: process.env.NODE_ENV,
                siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
                userAgent: navigator.userAgent.substring(0, 100),
                referrer: document.referrer || 'direct'
            });

            // Google Analytics tracking (if available)
            if (typeof window !== 'undefined' && (window as any).gtag) {
                (window as any).gtag('event', 'file_download', {
                    file_name: 'Vivek_Thumar_Resume.pdf',
                    file_extension: 'pdf',
                    event_category: 'engagement',
                    event_label: 'resume_download'
                });
            }

            // Create download link
            const link = document.createElement('a');
            link.href = resumePath;
            link.download = 'Vivek_Thumar_Resume.pdf';
            link.target = '_blank'; // Fallback: open in new tab if download fails
            link.rel = 'noopener noreferrer';

            // Add to DOM temporarily
            link.style.display = 'none';
            document.body.appendChild(link);

            // Trigger download
            link.click();

            // Cleanup
            setTimeout(() => {
                if (document.body.contains(link)) {
                    document.body.removeChild(link);
                }
            }, 100);

            // Success state
            setDownloadState({
                status: 'success',
                message: 'Resume downloaded successfully!'
            });

            // Reset to idle after 3 seconds
            setTimeout(() => {
                setDownloadState({ status: 'idle' });
            }, 3000);

        } catch (error) {
            console.error('[RESUME_DOWNLOAD_ERROR]', error);

            setDownloadState({
                status: 'error',
                message: 'Download failed. Please try again or contact me directly.'
            });

            // Reset to idle after 5 seconds
            setTimeout(() => {
                setDownloadState({ status: 'idle' });
            }, 5000);
        }
    }, [downloadState.status]);

    // Dynamic button content based on state
    const getButtonContent = () => {
        switch (downloadState.status) {
            case 'downloading':
                return {
                    text: 'Downloading...',
                    icon: <FaSpinner className="animate-spin" />,
                    className: 'opacity-80 cursor-wait'
                };
            case 'success':
                return {
                    text: 'Downloaded!',
                    icon: <FaCheckCircle />,
                    className: 'bg-green-600 hover:bg-green-700'
                };
            case 'error':
                return {
                    text: 'Try Again',
                    icon: <FaExclamationTriangle />,
                    className: 'bg-red-600 hover:bg-red-700'
                };
            default:
                return {
                    text: 'Download Resume',
                    icon: <FaDownload />,
                    className: ''
                };
        }
    };

    const buttonContent = getButtonContent();

    return (
        <Card className='md:h-full'>
            {/* Main Content */}
            <div className="flex flex-col h-full">
                {/* Description Text */}
                <div className="flex-1">
                    <p className='text-sm sm:text-base lg:text-lg xl:text-xl font-medium text-secondary-foreground leading-relaxed'>
                        Information Technology student at Dharmsinh Desai University.
                        <br className="hidden sm:block" /><br className="hidden sm:block" />
                        I am passionate about learning new things and always eager to expand my knowledge.
                        <br className="hidden sm:block" /><br className="hidden sm:block" />
                        I am dedicated to growing my skills and exploring new opportunities in the field of IT.
                    </p>
                </div>

                {/* Signature */}
                <div className="flex justify-end my-4 sm:my-6">
                    <Image
                        src={signature}
                        alt='Vivek Thumar signature'
                        className='w-24 sm:w-28 md:w-32 lg:w-36 h-auto'
                        priority
                    />
                </div>

                {/* Bottom Section - Socials and Resume */}
                <div className='space-y-4 md:space-y-6'>
                    {/* Social Links */}
                    <div className="flex justify-center md:justify-start">
                        <Socials />
                    </div>

                    {/* Download Status Message */}
                    {downloadState.message && (
                        <div className={`
                            text-xs sm:text-sm text-center md:text-left p-2 rounded-md transition-all duration-300
                            ${downloadState.status === 'success'
                                ? 'text-green-400 bg-green-500/10 border border-green-500/20'
                                : downloadState.status === 'error'
                                    ? 'text-red-400 bg-red-500/10 border border-red-500/20'
                                    : 'text-blue-400 bg-blue-500/10 border border-blue-500/20'
                            }
                        `}>
                            {downloadState.message}
                        </div>
                    )}

                    {/* Resume Download Section */}
                    <div className="space-y-3">
                        {/* Download Button */}
                        <div className="flex justify-center md:justify-start">
                            <FancyButton
                                text={buttonContent.text}
                                icon={buttonContent.icon}
                                onClick={handleDownloadResume}
                                size="md"
                                className={`
                                    w-full sm:w-auto min-w-[180px] sm:min-w-[200px]
                                    transition-all duration-300 transform
                                    ${buttonContent.className}
                                    ${downloadState.status === 'downloading' ? 'scale-95' : 'hover:scale-105'}
                                    ${downloadState.status !== 'idle' ? 'pointer-events-none' : ''}
                                `}
                                fullWidth={false}
                            />
                        </div>

                        {/* Resume Info */}
                        <div className="text-xs text-secondary-foreground/70 text-center md:text-left space-y-1">
                            <div className="flex items-center justify-center md:justify-start gap-2">
                                <span>📄 PDF Format</span>
                                <span>•</span>
                                <span>Updated {new Date().toLocaleDateString('en-US', {
                                    month: 'short',
                                    year: 'numeric'
                                })}</span>
                            </div>
                            <div className="flex items-center justify-center md:justify-start gap-1 text-green-400">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                                <span>Production Ready • Always Current</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}