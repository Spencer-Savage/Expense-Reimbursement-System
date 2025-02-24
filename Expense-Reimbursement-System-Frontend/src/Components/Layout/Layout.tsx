import React from 'react';
import { Outlet } from 'react-router-dom';
import { NavigationBar } from '../NavigationBar/NavigationBar';

interface LayoutProps {
    loginStatus: string;
}

export const Layout: React.FC<LayoutProps> = ({ loginStatus }) => {
    return (
        <div>
            <NavigationBar loginStatus={loginStatus} />
            <Outlet />
        </div>
    );
};