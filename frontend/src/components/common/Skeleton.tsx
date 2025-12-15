import React from 'react';
import styles from './Skeleton.module.css';

interface SkeletonProps {
    variant?: 'text' | 'rect' | 'circle';
    width?: string | number;
    height?: string | number;
    className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
    variant = 'text',
    width,
    height,
    className,
}) => {
    const style: React.CSSProperties = {
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
    };

    return (
        <div
            className={`${styles.skeleton} ${styles[variant]} ${className || ''}`}
            style={style}
        />
    );
};

// Product Card Skeleton
export const ProductCardSkeleton: React.FC = () => {
    return (
        <div className={styles.productCard}>
            <Skeleton variant="rect" height={250} className={styles.image} />
            <div className={styles.content}>
                <Skeleton variant="text" width="70%" height={24} />
                <Skeleton variant="text" width="40%" height={20} />
                <Skeleton variant="text" width="90%" height={16} />
                <Skeleton variant="text" width="60%" height={16} />
            </div>
        </div>
    );
};

// Product Grid Skeleton
export const ProductGridSkeleton: React.FC<{ count?: number }> = ({ count = 6 }) => {
    return (
        <div className={styles.grid}>
            {Array.from({ length: count }).map((_, index) => (
                <ProductCardSkeleton key={index} />
            ))}
        </div>
    );
};

// Table Row Skeleton
export const TableRowSkeleton: React.FC<{ columns?: number }> = ({ columns = 6 }) => {
    return (
        <tr className={styles.tableRow}>
            {Array.from({ length: columns }).map((_, index) => (
                <td key={index}>
                    <Skeleton variant="text" width="80%" />
                </td>
            ))}
        </tr>
    );
};

// Table Skeleton
export const TableSkeleton: React.FC<{ rows?: number; columns?: number }> = ({
    rows = 5,
    columns = 6,
}) => {
    return (
        <div className={styles.tableContainer}>
            <table className={styles.table}>
                <tbody>
                    {Array.from({ length: rows }).map((_, index) => (
                        <TableRowSkeleton key={index} columns={columns} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};
