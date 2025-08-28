'use client';

import { useLocale } from 'next-intl';
import { RiTranslate } from 'react-icons/ri';

const locales = [
    { code: 'zh-Hans', label: '简体中文' },
    { code: 'en', label: 'English' }
];

export default function LanguageSwitcher() {
    const locale = useLocale();

    const handleSelect = (nextLocale: string) => {
        document.cookie = `NEXT_LOCALE=${nextLocale}; path=/;`;
        window.location.reload();
    };

    return (
        <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn  btn-circle ">
                <RiTranslate className=' size-6' />
                {/* {locales.find(l => l.code === locale)?.label ?? 'Language'} */}
            </div>
            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-32 md:w-52 p-2 shadow-sm gap-1">
                {locales.map(l => (
                    <li key={l.code}>
                        <a
                            className={l.code === locale ? 'bg-primary text-base-100 ' : ''}
                            onClick={() => handleSelect(l.code)}
                        >
                            {l.label}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}