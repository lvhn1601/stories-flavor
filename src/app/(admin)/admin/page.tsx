"use client";

import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Users, ShoppingBag, DollarSign, Activity } from "lucide-react";

const DashboardPage = () => {
    const [stats] = useState({
        users: 1280,
        orders: 342,
        revenue: 12900,
        active: 87,
    });

    const salesData = [
        { name: "Mon", revenue: 1200 },
        { name: "Tue", revenue: 900 },
        { name: "Wed", revenue: 1400 },
        { name: "Thu", revenue: 1100 },
        { name: "Fri", revenue: 1600 },
        { name: "Sat", revenue: 800 },
        { name: "Sun", revenue: 1000 },
    ];

    return (
        <div className="max-w-[1170px] w-full flex flex-col gap-10 mx-auto px-4 sm:px-8 xl:px-0 mt-36">
            {/* ===== Top Stats Section ===== */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Users */}
                <div className="bg-white rounded-2xl shadow p-5">
                    <div className="flex items-center justify-between">
                        <h3 className="text-gray-500 text-sm font-medium">Users</h3>
                        <Users className="w-5 h-5 text-gray-400" />
                    </div>
                    <p className="text-3xl font-semibold mt-2">{stats.users}</p>
                    <p className="text-sm text-green-600 mt-1">+12% from last week</p>
                </div>

                {/* Orders */}
                <div className="bg-white rounded-2xl shadow p-5">
                    <div className="flex items-center justify-between">
                        <h3 className="text-gray-500 text-sm font-medium">Orders</h3>
                        <ShoppingBag className="w-5 h-5 text-gray-400" />
                    </div>
                    <p className="text-3xl font-semibold mt-2">{stats.orders}</p>
                    <p className="text-sm text-green-600 mt-1">+5% from last week</p>
                </div>

                {/* Revenue */}
                <div className="bg-white rounded-2xl shadow p-5">
                    <div className="flex items-center justify-between">
                        <h3 className="text-gray-500 text-sm font-medium">Revenue</h3>
                        <DollarSign className="w-5 h-5 text-gray-400" />
                    </div>
                    <p className="text-3xl font-semibold mt-2">${stats.revenue}</p>
                    <p className="text-sm text-green-600 mt-1">+8% from last week</p>
                </div>

                {/* Active */}
                <div className="bg-white rounded-2xl shadow p-5">
                    <div className="flex items-center justify-between">
                        <h3 className="text-gray-500 text-sm font-medium">Active</h3>
                        <Activity className="w-5 h-5 text-gray-400" />
                    </div>
                    <p className="text-3xl font-semibold mt-2">{stats.active}</p>
                    <p className="text-sm text-gray-500 mt-1">Currently online</p>
                </div>
            </div>

            {/* ===== Chart Section ===== */}
            <div className="bg-white rounded-2xl shadow p-6">
                <h2 className="text-lg font-semibold mb-4">Revenue Overview</h2>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={salesData}>
                            <XAxis dataKey="name" stroke="#9ca3af" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
