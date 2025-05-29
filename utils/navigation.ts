// utils/navigation.ts - Create this file for smooth scrolling utility
export const smoothScrollTo = (elementId: string, offset: number = 80) => {
    const element = document.getElementById(elementId);
    if (element) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
};

export const handleNavClick = (href: string, closeMenu?: () => void) => {
    if (href.startsWith('/#')) {
        const elementId = href.replace('/#', '');
        smoothScrollTo(elementId);
        if (closeMenu) closeMenu();
    } else if (href.startsWith('#')) {
        const elementId = href.replace('#', '');
        smoothScrollTo(elementId);
        if (closeMenu) closeMenu();
    }
};