import React from 'react';

interface LoginButtonProps {
    name: string; // e.g., "Sign in with Google", "Continue with Apple"
    icon: React.ReactNode; // Pass the actual icon component or SVG
    onClick: () => void; // Handle the login action
    provider: 'google' | 'apple' | 'microsoft' | 'email'; // To conditionally apply styles
}

const LoginButton: React.FC<LoginButtonProps> = ({ name, icon, onClick, provider }) => {
    let buttonClasses = "w-full flex flex-start items-center justify-center py-3 px-6 rounded-4xl text-lg font-medium transition-all duration-200 ease-in-out";
    let iconClasses = "mr-3 text-2xl";

    switch (provider) {
        case 'google':
            buttonClasses += " bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400 shadow-sm";
            break;
        case 'apple':
            buttonClasses += " bg-black text-white hover:bg-gray-800 shadow-sm";
            iconClasses = "mr-3 text-3xl";
            break;
        case 'microsoft':
            buttonClasses += " bg-blue-600 text-white hover:bg-blue-700 shadow-sm";
            break;
        case 'email':
            buttonClasses += " bg-blue-500 text-white hover:bg-blue-600 shadow-sm";
            break;
        default:
            buttonClasses += " bg-white text-gray-800 border border-gray-300 hover:bg-gray-100";
    }

    return (
        <button
            className={buttonClasses}
            onClick={onClick}
            aria-label={`Login with ${name.replace('Sign in with ', '').replace('Continue with ', '')}`}
        >
            <div className={iconClasses}>{icon}</div>
            <div>{name}</div>
        </button>
    );
};

export default LoginButton;

// How you might use it:
// import { FcGoogle } from 'react-icons/fc'; // Example for Google icon
// import { FaApple } from 'react-icons/fa'; // Example for Apple icon

/*
<LoginButton
    name="Sign in with Google"
    icon={<FcGoogle />} // Use an actual icon component
    onClick={() => console.log('Google login')}
    provider="google"
/>

<LoginButton
    name="Continue with Apple"
    icon={<FaApple />}
    onClick={() => console.log('Apple login')}
    provider="apple"
/>

<LoginButton
    name="Sign in with Email"
    icon={<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.94721 0.164594C7.66569 0.0238299 7.33431 0.0238302 7.05279 0.164594L0.552786 3.41459C0.214002 3.58399 0 3.93025 0 4.30902V12C0 12.5523 0.447715 13 1 13H14C14.5523 13 15 12.5523 15 12V4.30902C15 3.93025 14.786 3.58399 14.4472 3.41459L7.94721 0.164594ZM13.5689 4.09349L7.5 1.05902L1.43105 4.09349L7.5 7.29136L13.5689 4.09349ZM1 4.88366V12H14V4.88366L7.70977 8.19813C7.57848 8.26731 7.42152 8.26731 7.29023 8.19813L1 4.88366Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>} // Example for a mail icon
    onClick={() => console.log('Email login')}
    provider="email"
/>
*/