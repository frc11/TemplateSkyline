import React from 'react';
import { motion } from 'framer-motion';

const PropertyCardSkeleton: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="group relative"
        >
            {/* Image Skeleton */}
            <div className="overflow-hidden mb-6 relative aspect-[4/5] bg-gray-200 animate-pulse">
                <div className="absolute top-4 left-4 w-20 h-6 bg-gray-300 rounded-sm" />
                <div className="absolute top-4 right-4 w-16 h-6 bg-gray-300 rounded-sm" />
            </div>

            {/* Content Skeleton */}
            <div className="border-t border-gray-200 pt-6">
                <div className="flex justify-between items-start">
                    <div className="space-y-2 flex-1">
                        <div className="h-4 bg-gray-200 rounded-sm w-3/4 animate-pulse" />
                        <div className="h-3 bg-gray-200 rounded-sm w-1/2 animate-pulse" />
                    </div>
                    <div className="text-right">
                        <div className="h-4 bg-gray-200 rounded-sm w-24 animate-pulse" />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default PropertyCardSkeleton;
