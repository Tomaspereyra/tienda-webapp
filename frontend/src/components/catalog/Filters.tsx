import React from 'react';
import { GENDERS } from '@utils/constants';
import styles from './Filters.module.css';

export interface FilterValues {
    gender: string;
    oversize: boolean | null;
}

interface FiltersProps {
    filters: FilterValues;
    onFilterChange: (filters: FilterValues) => void;
    resultsCount: number;
}

export const Filters: React.FC<FiltersProps> = ({
    filters,
    onFilterChange,
    resultsCount
}) => {
    const handleGenderClick = (gender: string) => {
        onFilterChange({
            ...filters,
            gender: filters.gender === gender ? '' : gender
        });
    };



    const handleOversizeToggle = () => {
        onFilterChange({
            ...filters,
            oversize: filters.oversize ? null : true
        });
    };

    const clearFilters = () => {
        onFilterChange({
            gender: '',
            oversize: null,
        });
    };

    const hasActiveFilters = filters.gender || filters.oversize;

    return (
        <div className={styles.filtersContainer}>
            <div className={styles.filtersWrapper}>
                <h3 className={styles.filtersTitle}>Filtrar Productos</h3>

                {/* Filter Buttons Row */}
                <div className={styles.filtersRow}>
                    {/* Gender Filters */}
                    <div className={styles.filterSection}>
                        <span className={styles.filterLabel}>Género:</span>
                        {GENDERS.map((gender) => (
                            <button
                                key={gender}
                                type="button"
                                className={`${styles.filterButton} ${filters.gender === gender ? styles.active : ''
                                    }`}
                                onClick={() => handleGenderClick(gender)}
                            >
                                {gender}
                            </button>
                        ))}
                    </div>

                    <div className={styles.divider} />

                    {/* Oversize Filter */}
                    <div className={styles.filterSection}>
                        <button
                            type="button"
                            className={`${styles.checkboxButton} ${filters.oversize ? styles.active : ''
                                }`}
                            onClick={handleOversizeToggle}
                        >
                            <input
                                type="checkbox"
                                checked={filters.oversize === true}
                                onChange={handleOversizeToggle}
                                className={styles.checkbox}
                                onClick={(e) => e.stopPropagation()}
                            />
                            Solo Oversize
                        </button>
                    </div>
                </div>

                {/* Actions Row */}
                <div className={styles.actionsRow}>
                    <span className={styles.resultsCount}>
                        {resultsCount} {resultsCount === 1 ? 'producto' : 'productos'}
                    </span>
                    {hasActiveFilters && (
                        <button
                            type="button"
                            className={styles.clearButton}
                            onClick={clearFilters}
                        >
                            Limpiar filtros
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
