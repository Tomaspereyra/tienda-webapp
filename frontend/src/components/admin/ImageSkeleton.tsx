import React from 'react';
import styles from './ImageSkeleton.module.css';

interface ImageSkeletonProps {
    count?: number;
}

export const ImageSkeleton: React.FC<ImageSkeletonProps> = ({ count = 4 }) => {
    return (
        <>
            {Array.from({ length: count }).map((_, index) => (
                <div key={index} className={styles.skeletonCard}>
                    <div className={styles.skeletonImage} />
                    <div className={styles.skeletonContent}>
                        <div className={styles.skeletonTitle} />
                        <div className={styles.skeletonMeta} />
                    </div>
                    <div className={styles.skeletonButton} />
                </div>
            ))}
        </>
    );
};
