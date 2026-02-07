'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Check, Copy, Facebook, Link2, Linkedin, Share2, Twitter } from 'lucide-react';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';

import { cn } from '@/lib/utils';
import useOnClickOutside from '@/hooks/useOnClickOutside';
import Button from '@/components/buttons/Button';

interface ShareButtonProps {
    title: string;
    url: string;
    className?: string;
}

export default function ShareButton({ title, url, className }: ShareButtonProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [hasCopied, setHasCopied] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useOnClickOutside(ref, () => setIsOpen(false));

    const toggleOpen = () => setIsOpen(!isOpen);

    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    const shareLinks = [
        {
            name: 'Twitter',
            icon: Twitter,
            href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
            color: 'hover:text-[#1DA1F2] hover:bg-[#1DA1F2]/10',
        },
        {
            name: 'Facebook',
            icon: Facebook,
            href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
            color: 'hover:text-[#4267B2] hover:bg-[#4267B2]/10',
        },
        {
            name: 'LinkedIn',
            icon: Linkedin,
            href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
            color: 'hover:text-[#0077b5] hover:bg-[#0077b5]/10',
        },
    ];

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setHasCopied(true);
            toast.success('Link copied to clipboard!');
            setTimeout(() => {
                setHasCopied(false);
                setIsOpen(false);
            }, 2000);
        } catch (err) {
            toast.error('Failed to copy link');
        }
    };

    return (
        <div className={cn('relative', className)} ref={ref}>
            <Button
                variant="ghost"
                size="sm"
                onClick={toggleOpen}
                className={cn('active:scale-95 transition-transform', isOpen && 'bg-gray-200')}
                aria-label="Share article"
            >
                <Share2 className="h-4 w-4 mr-2" />
                Share
            </Button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        transition={{ duration: 0.1 }}
                        className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-50 overflow-hidden"
                    >
                        <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-50 mb-1">
                            Share via
                        </div>

                        {shareLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={cn(
                                    'flex items-center px-4 py-2.5 text-sm text-gray-700 transition-colors',
                                    link.color
                                )}
                                onClick={() => setIsOpen(false)}
                            >
                                <link.icon className="h-4 w-4 mr-3" />
                                {link.name}
                            </a>
                        ))}

                        <button
                            onClick={copyToClipboard}
                            className="w-full flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left"
                        >
                            {hasCopied ? (
                                <Check className="h-4 w-4 mr-3 text-green-500" />
                            ) : (
                                <Link2 className="h-4 w-4 mr-3" />
                            )}
                            {hasCopied ? 'Copied!' : 'Copy Link'}
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
