import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Container } from '@/components/Container';
import { Section } from '@/components/Section';
import { Button } from '@/components/Button';
import { BrandSection, CategorySection, Footer, HeroCarousel, ProductSection, } from '@/features/home';
import { BRANDS, CATEGORIES, FOOTER_CONTACT, FOOTER_COPYRIGHT, FOOTER_DOWNLOAD_APPS, FOOTER_LOGO, FOOTER_SECTIONS, FOOTER_SOCIALS, getProductsByCategory, } from '@/data';
export function HomePage() {
    const smartphoneProducts = getProductsByCategory('electronics');
    const dailyEssentials = getProductsByCategory('grocery');
    const electronicsBrands = BRANDS.filter((brand) => brand.featured);
    const viewAllAction = (_jsx(Button, { variant: "ghost", size: "sm", className: "text-primary font-medium", children: "View All >" }));
    return (_jsxs("main", { className: "bg-[#F3F9FB] pb-16", children: [_jsx(Section, { spacing: "hero", className: "pt-6", children: _jsx(Container, { size: "hero", children: _jsx("div", { className: "overflow-hidden rounded-2xl", children: _jsx(HeroCarousel, {}) }) }) }), _jsx(Section, { spacing: "large", children: _jsx(Container, { size: "hero", children: _jsx(ProductSection, { title: "Grab the best deal on Smartphones", products: smartphoneProducts, action: viewAllAction, limit: 6 }) }) }), _jsx(Section, { spacing: "large", children: _jsx(Container, { size: "hero", children: _jsx(CategorySection, { title: "Shop From Top Categories", categories: CATEGORIES, action: viewAllAction, columns: "eight", categoryCardSize: "sm", categoryCardVariant: "elevated", limit: 8 }) }) }), _jsx(Section, { spacing: "large", children: _jsx(Container, { size: "hero", children: _jsx(BrandSection, { title: "Top Electronics Brands", brands: electronicsBrands, action: viewAllAction, columns: "five", limit: 5, cardProps: { variant: 'elevated', size: 'lg' } }) }) }), _jsx(Section, { spacing: "large", children: _jsx(Container, { size: "hero", children: _jsx(ProductSection, { title: "Daily Essentials", products: dailyEssentials, action: viewAllAction, limit: 6 }) }) }), _jsx(Footer, { logo: FOOTER_LOGO, contacts: FOOTER_CONTACT, downloadApps: FOOTER_DOWNLOAD_APPS, columns: FOOTER_SECTIONS, socials: FOOTER_SOCIALS, copyright: FOOTER_COPYRIGHT })] }));
}
